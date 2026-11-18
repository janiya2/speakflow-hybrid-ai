import { NextRequest, NextResponse } from "next/server";
import { execFile } from "child_process";
import path from "path";
import fs from "fs";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

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
    const searchParams = request.nextUrl.searchParams;
    const text = searchParams.get("text")?.trim();
    const coach = searchParams.get("coach")?.toLowerCase() || "sarah";
    const gender = searchParams.get("gender")?.toLowerCase() || "female";
    const language = searchParams.get("language") || "English";
    const voice = searchParams.get("voice") || coach;

    if (!text) {
      return NextResponse.json(
        { error: "Query parameter 'text' is required" },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    // Path to the python edge_tts service script
    const scriptPath = path.join(process.cwd(), "scripts", "edge_tts_service.py");

    // Execute python script to generate or retrieve cached MP3
    const { stdout, stderr } = await execFileAsync("python", [
      scriptPath,
      text,
      voice,
      gender,
      language,
    ]);

    if (stderr && stderr.trim().length > 0) {
      console.warn("TTS generator warning:", stderr);
    }

    const mp3FilePath = stdout.trim();

    if (!fs.existsSync(mp3FilePath)) {
      return NextResponse.json(
        { error: "Failed to generate audio file" },
        { status: 500, headers: { "Access-Control-Allow-Origin": "*" } }
      );
    }

    const audioBuffer = fs.readFileSync(mp3FilePath);
    const total = audioBuffer.length;
    const rangeHeader = request.headers.get("range");

    if (rangeHeader) {
      const parts = rangeHeader.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : total - 1;
      const chunkSize = end - start + 1;
      const chunk = audioBuffer.subarray(start, end + 1);

      return new NextResponse(chunk, {
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

    return new NextResponse(audioBuffer, {
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
