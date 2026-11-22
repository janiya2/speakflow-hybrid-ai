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
  female_fr: "fr-FR-DeniseNeural",
  female_de: "de-DE-KatjaNeural",
  female_it: "it-IT-ElsaNeural",
  female_pt: "pt-BR-FranciscaNeural",
  female_zh: "zh-CN-XiaoxiaoNeural",
  female_hi: "hi-IN-SwaraNeural",
  female_ru: "ru-RU-SvetlanaNeural",
  female_si: "si-LK-ThiliniNeural",
  female_nl: "nl-NL-FennaNeural",
  female_tr: "tr-TR-EmelNeural",
  female_vi: "vi-VN-HoaiMyNeural",
  female_id: "id-ID-GadisNeural",
  female_th: "th-TH-PremwadeeNeural",
  female_se: "sv-SE-SofieNeural",

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
  male_fr: "fr-FR-HenriNeural",
  male_de: "de-DE-KillianNeural",
  male_it: "it-IT-DiegoNeural",
  male_pt: "pt-BR-AntonioNeural",
  male_zh: "zh-CN-YunxiNeural",
  male_hi: "hi-IN-MadhurNeural",
  male_ru: "ru-RU-DmitryNeural",
  male_si: "si-LK-SameeraNeural",
  male_nl: "nl-NL-MaartenNeural",
  male_tr: "tr-TR-AhmetNeural",
  male_vi: "vi-VN-NamMinhNeural",
  male_id: "id-ID-ArdiNeural",
  male_th: "th-TH-NiwatNeural",
  male_se: "sv-SE-MattiasNeural",
};

export function resolveEdgeVoice(coachId: string, gender: string, language: string): string {
  const coachKey = coachId.toLowerCase().trim();
  const l = language.toLowerCase().trim();
  const isMale =
    coachKey === "alex" ||
    coachKey === "oliver" ||
    coachKey === "kenji" ||
    gender.toLowerCase().trim() === "male";

  // Match explicit target language using safe word/locale boundaries
  let langKey = "en";
  if (l.includes("japan") || l === "ja" || l.startsWith("ja-") || l.startsWith("ja_")) {
    langKey = "ja";
  } else if (l.includes("korea") || l === "ko" || l.startsWith("ko-") || l.startsWith("ko_")) {
    langKey = "ko";
  } else if (l.includes("span") || l.includes("espa") || l === "es" || l.startsWith("es-") || l.startsWith("es_")) {
    langKey = "es";
  } else if (l.includes("arab") || l === "ar" || l.startsWith("ar-") || l.startsWith("ar_")) {
    langKey = "ar";
  } else if (l.includes("tamil") || l === "ta" || l.startsWith("ta-") || l.startsWith("ta_")) {
    langKey = "ta";
  } else if (l.includes("french") || l.includes("fran") || l === "fr" || l.startsWith("fr-") || l.startsWith("fr_")) {
    langKey = "fr";
  } else if (l.includes("german") || l.includes("deutsch") || l === "de" || l.startsWith("de-") || l.startsWith("de_")) {
    langKey = "de";
  } else if (l.includes("italian") || l === "it" || l.startsWith("it-") || l.startsWith("it_")) {
    langKey = "it";
  } else if (l.includes("portug") || l === "pt" || l.startsWith("pt-") || l.startsWith("pt_")) {
    langKey = "pt";
  } else if (l.includes("chinese") || l.includes("mandarin") || l === "zh" || l.startsWith("zh-") || l.startsWith("zh_")) {
    langKey = "zh";
  } else if (l.includes("hindi") || l === "hi" || l.startsWith("hi-") || l.startsWith("hi_")) {
    langKey = "hi";
  } else if (l.includes("russian") || l === "ru" || l.startsWith("ru-") || l.startsWith("ru_")) {
    langKey = "ru";
  } else if (l.includes("sinhala") || l.includes("sinha") || l === "si" || l.startsWith("si-") || l.startsWith("si_")) {
    langKey = "si";
  } else if (l.includes("dutch") || l.includes("nederland") || l === "nl" || l.startsWith("nl-") || l.startsWith("nl_")) {
    langKey = "nl";
  } else if (l.includes("turk") || l === "tr" || l.startsWith("tr-") || l.startsWith("tr_")) {
    langKey = "tr";
  } else if (l.includes("vietnam") || l === "vi" || l.startsWith("vi-") || l.startsWith("vi_")) {
    langKey = "vi";
  } else if (l.includes("indones") || l === "id" || l.startsWith("id-") || l.startsWith("id_")) {
    langKey = "id";
  } else if (l.includes("thai") || l === "th" || l.startsWith("th-") || l.startsWith("th_")) {
    langKey = "th";
  } else if (l.includes("swed") || l.includes("svensk") || l === "sv" || l === "se" || l.startsWith("sv-") || l.startsWith("sv_")) {
    langKey = "se";
  }

  // If practicing a non-English target language, strictly match coach gender in that language
  if (langKey !== "en") {
    const g = isMale ? "male" : "female";
    return VOICE_MAP[`${g}_${langKey}`] || (isMale ? "en-US-GuyNeural" : "en-US-JennyNeural");
  }

  // English practice: use coach's signature English accent AND guaranteed gender match
  if (coachKey === "kenji") return "en-US-ChristopherNeural";
  if (coachKey === "aoi") return "en-US-AriaNeural";
  if (VOICE_MAP[coachKey] && VOICE_MAP[coachKey].startsWith("en-")) {
    return VOICE_MAP[coachKey];
  }

  return isMale ? "en-US-GuyNeural" : "en-US-JennyNeural";
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

