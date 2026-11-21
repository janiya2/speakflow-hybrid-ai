import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import os from "os";

export const VOICE_MAP: Record<string, string> = {
  // Female Voices
  sophia: "en-US-AriaNeural",
  sarah: "en-US-JennyNeural",
  emma: "en-GB-SoniaNeural",
  chloe: "fr-FR-DeniseNeural",
  aoi: "ja-JP-NanamiNeural",
  female_en: "en-US-JennyNeural",
  female_ja: "ja-JP-NanamiNeural",
  female_ko: "ko-KR-SunHiNeural",
  female_es: "es-ES-ElviraNeural",
  female_ar: "ar-EG-SalmaNeural",
  female_ta: "ta-IN-PallaviNeural",

  // Male Voices
  alex: "en-US-GuyNeural",
  oliver: "en-GB-RyanNeural",
  kenji: "ja-JP-KeitaNeural",
  male_en: "en-US-GuyNeural",
  male_ja: "ja-JP-KeitaNeural",
  male_ko: "ko-KR-InJoonNeural",
  male_es: "es-ES-AlvaroNeural",
  male_ar: "ar-EG-ShakirNeural",
  male_ta: "ta-IN-ValluvarNeural",
};

export function resolveEdgeVoice(coachId: string, gender: string, language: string): string {
  const coachKey = coachId.toLowerCase().trim();
  const l = language.toLowerCase();

  // If the practice language is non-English, use the native language neural voice
  const isNonEnglish = l.includes("arab") || l.includes("ar") ||
                       l.includes("jap") || l.includes("ja") ||
                       l.includes("kor") || l.includes("ko") ||
                       l.includes("span") || l.includes("es") ||
                       l.includes("tamil") || l.includes("ta");

  if (isNonEnglish) {
    let langKey = "en";
    if (l.includes("jap") || l.includes("ja")) langKey = "ja";
    else if (l.includes("kor") || l.includes("ko")) langKey = "ko";
    else if (l.includes("span") || l.includes("es")) langKey = "es";
    else if (l.includes("arab") || l.includes("ar")) langKey = "ar";
    else if (l.includes("tamil") || l.includes("ta")) langKey = "ta";

    const isMale = coachKey === "alex" || coachKey === "oliver" || coachKey === "kenji" || gender.toLowerCase() === "male";
    const g = isMale ? "male" : "female";
    return VOICE_MAP[`${g}_${langKey}`] || (isMale ? "ar-EG-ShakirNeural" : "ar-EG-SalmaNeural");
  }

  // If language is English, use the coach's signature studio accent
  if (coachKey === "kenji") {
    return "en-US-ChristopherNeural";
  }

  if (VOICE_MAP[coachKey]) {
    return VOICE_MAP[coachKey];
  }

  const g = gender.toLowerCase() === "male" ? "male" : "female";
  return VOICE_MAP[`${g}_en`] || "en-US-JennyNeural";
}

// In-memory cache for fast serverless responses
const inMemoryCache = new Map<string, Buffer>();

// File cache directory (/tmp on Vercel or local project directory)
function getCacheDir(): string {
  if (process.env.VERCEL) {
    const tmp = path.join(os.tmpdir(), "speakflow_tts_cache");
    if (!fs.existsSync(tmp)) fs.mkdirSync(tmp, { recursive: true });
    return tmp;
  }
  const localCache = path.join(process.cwd(), "scripts", ".tts_cache");
  if (!fs.existsSync(localCache)) fs.mkdirSync(localCache, { recursive: true });
  return localCache;
}

export async function synthesizeEdgeSpeech(
  text: string,
  voice: string
): Promise<Buffer> {
  const hash = crypto.createHash("md5").update(`${text}_${voice}`).digest("hex");

  // 1. Check in-memory RAM cache first (strictly require non-empty buffer)
  if (inMemoryCache.has(hash)) {
    const memBuf = inMemoryCache.get(hash)!;
    if (memBuf && memBuf.length > 0) {
      return memBuf;
    }
    inMemoryCache.delete(hash);
  }

  // 2. Check disk cache (strictly require non-empty buffer)
  const cacheDir = getCacheDir();
  const filePath = path.join(cacheDir, `${hash}.mp3`);
  if (fs.existsSync(filePath)) {
    try {
      const cachedBuffer = fs.readFileSync(filePath);
      if (cachedBuffer && cachedBuffer.length > 0) {
        inMemoryCache.set(hash, cachedBuffer);
        return cachedBuffer;
      }
      fs.unlinkSync(filePath);
    } catch (_) { }
  }

  // 3. Synthesize via pure Node.js MsEdgeTTS (WebSocket to Microsoft Edge Neural speech)
  const tts = new MsEdgeTTS();
  await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
  const { audioStream } = tts.toStream(text);

  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    audioStream.on("data", (chunk: Buffer) => chunks.push(chunk));
    audioStream.on("end", () => {
      const fullBuffer = Buffer.concat(chunks);
      if (fullBuffer.length > 0) {
        try {
          fs.writeFileSync(filePath, fullBuffer);
        } catch (_) { }
        inMemoryCache.set(hash, fullBuffer);
        resolve(fullBuffer);
      } else {
        reject(new Error("MsEdgeTTS returned empty audio stream"));
      }
    });
    audioStream.on("error", (err: any) => reject(err));
  });
}

