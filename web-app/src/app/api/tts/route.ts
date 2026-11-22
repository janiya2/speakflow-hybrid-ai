import { NextRequest, NextResponse } from "next/server";
import { resolveEdgeVoice, synthesizeEdgeSpeech } from "@/lib/edge-tts-service";
import { execFile } from "child_process";
import path from "path";
import fs from "fs";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

// Simple sliding window rate limiter: maps IP -> timestamp list
const ipRequestBuckets = new Map<string, number[]>();
const MAX_REQUESTS_PER_MINUTE = 60;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - 60000;
  const timestamps = (ipRequestBuckets.get(ip) || []).filter((t) => t > windowStart);

  if (timestamps.length >= MAX_REQUESTS_PER_MINUTE) {
    return true;
  }

  timestamps.push(now);
  ipRequestBuckets.set(ip, timestamps);
  return false;
}

// Helper for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function GET(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "127.0.0.1";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too Many Requests: Rate limit of 60 calls/min exceeded" },
        { status: 429, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const text = searchParams.get("text")?.trim();
    const coach = searchParams.get("coach")?.toLowerCase() || "sarah";
    const gender = searchParams.get("gender")?.toLowerCase() || "female";
    const language = searchParams.get("language") || "English";
    const voiceParam = searchParams.get("voice") || coach;

    if (!text) {
      return NextResponse.json(
        { error: "Query parameter 'text' is required" },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    // Input length limit guard: Maximum 500 characters per TTS synthesis request
    if (text.length > 500) {
      return NextResponse.json(
        { error: "Input text exceeds maximum permitted length of 500 characters" },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    // Clean text: If practicing a non-English language, strip bracketed English translations
    // so acoustic neural models (e.g. Sinhala, Japanese) never phonetically butcher Latin English text
    let cleanText = text;
    if (language.toLowerCase() !== "english" && language.toLowerCase() !== "all") {
      const stripped = cleanText
        .replace(/\([^)]*[a-zA-Z]{2,}[^)]*\)/g, "")
        .replace(/\[[^\]]*[a-zA-Z]{2,}[^\]]*\]/g, "")
        .replace(/\s+/g, " ")
        .trim();
      if (stripped.length > 0) {
        cleanText = stripped;
      }
    }

    let audioBuffer: Buffer | null = null;
    const targetVoice = resolveEdgeVoice(voiceParam, gender, language);

    // Primary Engine: Pure Node.js Edge TTS (Zero Python dependencies for Vercel Serverless)
    try {
      audioBuffer = await synthesizeEdgeSpeech(cleanText, targetVoice);
    } catch (nodeTtsErr: any) {
      console.error("[TTS API] Pure Node Edge-TTS failed:", nodeTtsErr?.message || nodeTtsErr);

      // Secondary Fallback Engine: Python edge_tts script (for local dev / environments with python runtime)
      const scriptPath = path.join(process.cwd(), "scripts", "edge_tts_service.py");
      if (fs.existsSync(scriptPath)) {
        try {
          const { stdout } = await execFileAsync("python", [
            scriptPath,
            cleanText,
            targetVoice,
            gender,
            language,
          ]);
          const mp3FilePath = stdout.trim();
          if (fs.existsSync(mp3FilePath)) {
            const fileBuf = fs.readFileSync(mp3FilePath);
            if (fileBuf && fileBuf.length > 0) {
              audioBuffer = fileBuf;
            }
          }
        } catch (pyErr: any) {
          console.error("[TTS API] Python TTS fallback also failed:", pyErr?.message || pyErr);
        }
      }
    }

    if (!audioBuffer || audioBuffer.length === 0) {
      return NextResponse.json(
        { error: "TTS synthesis failed across all available engines" },
        { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const total = audioBuffer.length;
    const rangeHeader = request.headers.get("range");

    if (rangeHeader) {
      const parts = rangeHeader.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : total - 1;
      const chunkSize = end - start + 1;
      const chunk = audioBuffer.subarray(start, end + 1);

      return new NextResponse(chunk as any, {
        status: 206,
        headers: {
          "Content-Range": `bytes ${start}-${end}/${total}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunkSize.toString(),
          "Content-Type": "audio/mpeg",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
        },
      });
    }

    return new NextResponse(audioBuffer as any, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": total.toString(),
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
      },
    });
  } catch (error: any) {
    console.error("API /api/tts error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }
}
