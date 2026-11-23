import json
import re

# Comprehensive language dictionary with authentic native content across 20 languages
# Format:
# Top categories: "Sports", "Travel", "Food", "Career", "Daily Life", "Social", "Entertainment", "Tech"

LANG_META = {
    "English": {"code": "en-US", "native": "English"},
    "Spanish": {"code": "es-ES", "native": "Español"},
    "French": {"code": "fr-FR", "native": "Français"},
    "German": {"code": "de-DE", "native": "Deutsch"},
    "Italian": {"code": "it-IT", "native": "Italiano"},
    "Portuguese": {"code": "pt-BR", "native": "Português"},
    "Japanese": {"code": "ja-JP", "native": "日本語"},
    "Korean": {"code": "ko-KR", "native": "한국어"},
    "Chinese (Mandarin)": {"code": "zh-CN", "native": "中文 (普通话)"},
    "Arabic": {"code": "ar-SA", "native": "العربية"},
    "Hindi": {"code": "hi-IN", "native": "हिन्दी"},
    "Russian": {"code": "ru-RU", "native": "Русский"},
    "Tamil": {"code": "ta-LK", "native": "தமிழ்"},
    "Sinhala": {"code": "si-LK", "native": "සිංහල"},
    "Dutch": {"code": "nl-NL", "native": "Nederlands"},
    "Turkish": {"code": "tr-TR", "native": "Türkçe"},
    "Vietnamese": {"code": "vi-VN", "native": "Tiếng Việt"},
    "Indonesian": {"code": "id-ID", "native": "Bahasa Indonesia"},
    "Thai": {"code": "th-TH", "native": "ไทย"},
    "Swedish": {"code": "sv-SE", "native": "Svenska"},
}

print(f"Loaded {len(LANG_META)} languages metadata.")
