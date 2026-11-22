import sys
import os
import asyncio
import hashlib

# Ensure Windows SelectorEventLoop is used for aiodns compatibility on Windows
if sys.platform == 'win32':
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

import edge_tts

VOICE_MAP = {
    # Female Voices
    "sarah": "en-US-JennyNeural",
    "emma": "en-GB-SoniaNeural",
    "aoi": "ja-JP-NanamiNeural",
    "female_en": "en-US-JennyNeural",
    "female_ja": "ja-JP-NanamiNeural",
    "female_ko": "ko-KR-SunHiNeural",
    "female_es": "es-ES-ElviraNeural",
    "female_ar": "ar-EG-SalmaNeural",
    "female_ta": "ta-IN-PallaviNeural",

    # Male Voices
    "alex": "en-US-GuyNeural",
    "oliver": "en-GB-RyanNeural",
    "kenji": "ja-JP-KeitaNeural",
    "male_en": "en-US-GuyNeural",
    "male_ja": "ja-JP-KeitaNeural",
    "male_ko": "ko-KR-InJoonNeural",
    "male_es": "es-ES-AlvaroNeural",
    "male_ar": "ar-EG-ShakirNeural",
    "male_ta": "ta-IN-ValluvarNeural",
}

CACHE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".tts_cache")
os.makedirs(CACHE_DIR, exist_ok=True)

async def synthesize(text: str, voice: str, output_path: str, rate: str = "+0%"):
    communicate = edge_tts.Communicate(text, voice, rate=rate)
    await communicate.save(output_path)

def get_voice(coach_id: str, gender: str, language: str) -> str:
    coach_key = coach_id.lower().strip()
    if coach_key in VOICE_MAP:
        return VOICE_MAP[coach_key]
    
    lang_key = "en"
    l = language.lower()
    if "jap" in l or "ja" in l: lang_key = "ja"
    elif "kor" in l or "ko" in l: lang_key = "ko"
    elif "span" in l or "es" in l: lang_key = "es"
    elif "arab" in l or "ar" in l: lang_key = "ar"
    elif "tamil" in l or "ta" in l: lang_key = "ta"

    g = "male" if gender.lower() == "male" else "female"
    combo_key = f"{g}_{lang_key}"
    return VOICE_MAP.get(combo_key, "en-US-JennyNeural")

def main():
    if len(sys.argv) < 2:
        print("Usage: python edge_tts_service.py <text> [voice_or_coach] [gender] [language]", file=sys.stderr)
        sys.exit(1)

    text = sys.argv[1].strip()
    if not text:
        sys.exit(1)

    voice_arg = sys.argv[2] if len(sys.argv) > 2 else "sarah"
    gender = sys.argv[3] if len(sys.argv) > 3 else "female"
    language = sys.argv[4] if len(sys.argv) > 4 else "English"

    # If an exact neural voice name is passed directly
    if "Neural" in voice_arg:
        voice = voice_arg
    else:
        voice = get_voice(voice_arg, gender, language)

    # Conversational rate: Sinhala neural voices sound significantly more human at -5%
    rate = "-5%" if voice.startswith("si-LK") else "+0%"

    # Compute cache key
    cache_hash = hashlib.md5(f"{text}_{voice}_{rate}".encode("utf-8")).hexdigest()
    cached_file = os.path.join(CACHE_DIR, f"{cache_hash}.mp3")

    if not os.path.exists(cached_file) or os.path.getsize(cached_file) == 0:
        try:
            asyncio.run(synthesize(text, voice, cached_file, rate=rate))
        except Exception as e:
            print(f"Error during synthesis: {e}", file=sys.stderr)
            sys.exit(2)

    # Output the path to stdout for Next.js API
    print(cached_file)

if __name__ == "__main__":
    main()
