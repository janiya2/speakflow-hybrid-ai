import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

WIDTH = 1080
HEIGHT = 1920

SCREENSHOTS_DIR = r"G:\MY APPLICATIONS\LANGUAGE PRACTICE\playstore assets\screenshots"
RAW_DIR = r"C:\Users\INNO XPERT\.gemini\antigravity\brain\2ff2f4e3-542b-42b3-9dc4-2e9c6d95ef32\user_screenshots"

FONT_BOLD_PATH = r"C:\Windows\Fonts\segoeuib.ttf"
FONT_SEMI_PATH = r"C:\Windows\Fonts\segoeui.ttf"

def get_fonts():
    try:
        title_font = ImageFont.truetype(FONT_BOLD_PATH, 54)
        sub_font = ImageFont.truetype(FONT_SEMI_PATH, 28)
        badge_font = ImageFont.truetype(FONT_BOLD_PATH, 20)
    except:
        title_font = ImageFont.load_default()
        sub_font = ImageFont.load_default()
        badge_font = ImageFont.load_default()
    return title_font, sub_font, badge_font

title_font, sub_font, badge_font = get_fonts()

SCREEN_CONFIGS = [
    {
        "out_name": "1_ai_video_calls.png",
        "raw_file": "WhatsApp Image 2026-11-09 at 23.32.50.jpeg", # Emma Call
        "badge": "60 FPS HD LIVE CALLS",
        "badge_color": (59, 130, 246), # Electric Blue
        "glow_color": (37, 99, 235, 90),
        "title_p1": "Face-to-Face ",
        "title_p2": "AI Video Calls",
        "subtitle": "Practice speaking naturally anytime with human-like AI coaches",
    },
    {
        "out_name": "2_multilingual_mastery.png",
        "raw_file": "WhatsApp Image 2026-11-09 at 23.30.58.jpeg", # Language Picker Modal
        "badge": "6+ GLOBAL LANGUAGES",
        "badge_color": (168, 85, 247), # Purple
        "glow_color": (147, 51, 234, 90),
        "title_p1": "Master 6+ ",
        "title_p2": "World Languages",
        "subtitle": "English, Spanish, Japanese, Korean, Arabic & Tamil with native accents",
    },
    {
        "out_name": "3_real_world_roleplays.png",
        "raw_file": "WhatsApp Image 2026-11-09 at 23.30.59.jpeg", # Sarah Call (Dosa/Ordering food)
        "badge": "REAL-LIFE SCENARIOS",
        "badge_color": (16, 185, 129), # Emerald
        "glow_color": (5, 150, 105, 90),
        "title_p1": "Interactive ",
        "title_p2": "Spoken Roleplays",
        "subtitle": "Order food, ace job interviews & navigate daily conversations",
    },
    {
        "out_name": "4_personalized_coaches.png",
        "raw_file": "WhatsApp Image 2026-11-09 at 23.32.56.jpeg", # Aoi Call (Cricket topic)
        "badge": "CUSTOM TOPIC DISCUSSIONS",
        "badge_color": (6, 182, 212), # Cyan
        "glow_color": (8, 145, 178, 90),
        "title_p1": "Discuss Any ",
        "title_p2": "Custom Topic",
        "subtitle": "Choose your coach & talk freely about sports, business, or tech",
    },
    {
        "out_name": "5_fluency_analytics.png",
        "raw_file": "WhatsApp Image 2026-11-09 at 23.30.57.jpeg", # Home dashboard
        "badge": "FLUENCY & ACCURACY METRICS",
        "badge_color": (245, 158, 11), # Amber
        "glow_color": (217, 119, 6, 90),
        "title_p1": "Track Fluency & ",
        "title_p2": "Daily Progress",
        "subtitle": "AI accent analysis, speaking accuracy score & weekly goals",
    },
    {
        "out_name": "6_streaks_and_leaderboard.png",
        "raw_file": "WhatsApp Image 2026-11-09 at FGSXG.jpeg", # Targets & Podium
        "badge": "DAILY STREAKS & PODIUM",
        "badge_color": (234, 179, 8), # Gold
        "glow_color": (202, 138, 4, 90),
        "title_p1": "Build Habits & ",
        "title_p2": "Reach #1 Podium",
        "subtitle": "Daily speaking habits, XP rewards & global champion leaderboard",
    },
    {
        "out_name": "7_fear_free_learning.png",
        "raw_file": "WhatsApp Image 2026-11-09 at 23.33.33.jpeg", # Robot Welcome
        "badge": "100% PRIVATE & JUDGMENT-FREE",
        "badge_color": (99, 102, 241), # Indigo
        "glow_color": (79, 70, 229, 90),
        "title_p1": "Speak Without ",
        "title_p2": "Fear of Mistakes",
        "subtitle": "Friendly, patient AI companion to build effortless speaking confidence",
    },
    {
        "out_name": "8_fast_onboarding.png",
        "raw_file": "WhatsApp Image 2026-11-09 at 23.33.34.jpeg", # Sign In Screen
        "badge": "INSTANT 1-TAP START",
        "badge_color": (14, 165, 233), # Sky Blue
        "glow_color": (2, 132, 199, 90),
        "title_p1": "Start Speaking in ",
        "title_p2": "Seconds",
        "subtitle": "1-Tap Google login with instant progress sync across all devices",
    }
]

def create_gradient(width, height, top_color, bot_color):
    base = Image.new("RGBA", (width, height), top_color)
    top_r, top_g, top_b = top_color[:3]
    bot_r, bot_g, bot_b = bot_color[:3]
    draw = ImageDraw.Draw(base)
    for y in range(height):
        factor = y / height
        r = int(top_r + (bot_r - top_r) * factor)
        g = int(top_g + (bot_g - top_g) * factor)
        b = int(top_b + (bot_b - top_b) * factor)
        draw.line([(0, y), (width, y)], fill=(r, g, b, 255))
    return base

def draw_radial_glow(canvas, center_x, center_y, radius, color):
    glow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(glow)
    r_val, g_val, b_val, a_val = color
    steps = 45
    for s in range(steps, 0, -1):
        cur_r = int(radius * (s / steps))
        alpha = int(a_val * (1 - (s / steps)) ** 1.9)
        draw.ellipse(
            [center_x - cur_r, center_y - cur_r, center_x + cur_r, center_y + cur_r],
            fill=(r_val, g_val, b_val, alpha)
        )
    glow = glow.filter(ImageFilter.GaussianBlur(radius=45))
    canvas.alpha_composite(glow)

def generate_screenshot(cfg):
    # Deep luxury dark background
    bg = create_gradient(WIDTH, HEIGHT, (9, 14, 26), (2, 4, 8))

    # Dual ambient glows
    draw_radial_glow(bg, WIDTH // 2, 430, 560, cfg["glow_color"])
    draw_radial_glow(bg, WIDTH // 2, 1300, 680, (cfg["glow_color"][0], cfg["glow_color"][1], cfg["glow_color"][2], 45))

    draw = ImageDraw.Draw(bg)

    # 1. Badge Pill with clean geometric spark
    badge_text = cfg["badge"]
    badge_bbox = badge_font.getbbox(badge_text)
    badge_w = badge_bbox[2] - badge_bbox[0]
    badge_h = badge_bbox[3] - badge_bbox[1]

    dot_size = 8
    dot_margin = 12
    pill_padding_x = 22
    pill_padding_y = 10
    pill_w = badge_w + pill_padding_x * 2 + dot_size + dot_margin
    pill_h = badge_h + pill_padding_y * 2
    pill_x = (WIDTH - pill_w) // 2
    pill_y = 75

    pill_img = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    pill_draw = ImageDraw.Draw(pill_img)
    bc = cfg["badge_color"]
    pill_draw.rounded_rectangle(
        [pill_x, pill_y, pill_x + pill_w, pill_y + pill_h],
        radius=pill_h // 2,
        fill=(bc[0], bc[1], bc[2], 38),
        outline=(bc[0], bc[1], bc[2], 210),
        width=2
    )

    # Draw glowing dot inside pill
    dot_x = pill_x + pill_padding_x
    dot_y = pill_y + (pill_h - dot_size) // 2
    pill_draw.ellipse([dot_x, dot_y, dot_x + dot_size, dot_y + dot_size], fill=(bc[0], bc[1], bc[2], 255))
    bg.alpha_composite(pill_img)

    text_start_x = dot_x + dot_size + dot_margin
    draw.text(
        (text_start_x, pill_y + pill_padding_y - 2),
        badge_text,
        font=badge_font,
        fill=(bc[0], bc[1], bc[2], 255)
    )

    # 2. Main Title (Two-Tone: Part 1 in White, Part 2 in Glowing Accent Color)
    p1 = cfg["title_p1"]
    p2 = cfg["title_p2"]
    bb1 = title_font.getbbox(p1)
    bb2 = title_font.getbbox(p2)
    w1 = bb1[2] - bb1[0]
    w2 = bb2[2] - bb2[0]
    total_title_w = w1 + w2
    title_x = (WIDTH - total_title_w) // 2
    title_y = pill_y + pill_h + 24

    # Drop shadows
    draw.text((title_x + 1, title_y + 2), p1, font=title_font, fill=(0, 0, 0, 180))
    draw.text((title_x + w1 + 1, title_y + 2), p2, font=title_font, fill=(0, 0, 0, 180))

    # Foreground
    draw.text((title_x, title_y), p1, font=title_font, fill=(255, 255, 255, 255))
    draw.text((title_x + w1, title_y), p2, font=title_font, fill=(bc[0], bc[1], bc[2], 255))

    # 3. Subtitle
    sub_text = cfg["subtitle"]
    sub_bbox = sub_font.getbbox(sub_text)
    sub_w = sub_bbox[2] - sub_bbox[0]
    sub_x = (WIDTH - sub_w) // 2
    sub_y = title_y + 68
    draw.text((sub_x, sub_y), sub_text, font=sub_font, fill=(148, 163, 184, 255))

    # 4. Premium Smartphone Mockup Frame
    phone_w = 840
    phone_h = 1580
    phone_x = (WIDTH - phone_w) // 2
    phone_y = sub_y + 55
    corner_radius = 52
    bezel_thickness = 14

    # Soft ambient drop shadow underneath phone
    shadow_img = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow_img)
    s_draw.rounded_rectangle(
        [phone_x + 6, phone_y + 20, phone_x + phone_w + 14, phone_y + phone_h + 30],
        radius=corner_radius,
        fill=(0, 0, 0, 200)
    )
    shadow_img = shadow_img.filter(ImageFilter.GaussianBlur(radius=34))
    bg.alpha_composite(shadow_img)

    # Outer metallic bezel layer
    phone_layer = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    p_draw = ImageDraw.Draw(phone_layer)
    p_draw.rounded_rectangle(
        [phone_x, phone_y, phone_x + phone_w, phone_y + phone_h],
        radius=corner_radius,
        fill=(15, 23, 42, 255),
        outline=(51, 65, 85, 255),
        width=3
    )

    # Inner screen viewport
    screen_x = phone_x + bezel_thickness
    screen_y = phone_y + bezel_thickness
    screen_w = phone_w - (bezel_thickness * 2)
    screen_h = phone_h - (bezel_thickness * 2)
    screen_radius = corner_radius - 8

    # Load raw user screenshot (Full clean uncropped app display)
    raw_path = os.path.join(RAW_DIR, cfg["raw_file"])
    if os.path.exists(raw_path):
        raw_img = Image.open(raw_path).convert("RGBA")
        
        # Scale to match screen viewport width
        scale = screen_w / raw_img.width
        scaled_h = int(raw_img.height * scale)
        scaled_img = raw_img.resize((screen_w, scaled_h), Image.Resampling.LANCZOS)

        if scaled_h >= screen_h:
            fitted_screen = scaled_img.crop((0, 0, screen_w, screen_h))
        else:
            fitted_screen = Image.new("RGBA", (screen_w, screen_h), (15, 23, 42, 255))
            fitted_screen.paste(scaled_img, (0, 0))
    else:
        fitted_screen = Image.new("RGBA", (screen_w, screen_h), (30, 41, 59, 255))

    # Mask screen with smooth rounded corners
    mask = Image.new("L", (screen_w, screen_h), 0)
    m_draw = ImageDraw.Draw(mask)
    m_draw.rounded_rectangle([0, 0, screen_w, screen_h], radius=screen_radius, fill=255)

    phone_layer.paste(fitted_screen, (screen_x, screen_y), mask)

    # Sleek camera pinhole (modern tiny punch hole, zero content obscuring)
    cam_r = 6
    cam_x = screen_x + screen_w // 2
    cam_y = screen_y + 16
    p_draw.ellipse([cam_x - cam_r, cam_y - cam_r, cam_x + cam_r, cam_y + cam_r], fill=(5, 5, 10, 255), outline=(30, 41, 59, 255), width=1)

    # Composite phone onto background
    bg.alpha_composite(phone_layer)

    # Save output image
    out_file = os.path.join(SCREENSHOTS_DIR, cfg["out_name"])
    bg.convert("RGB").save(out_file, quality=96)
    print(f"Generated -> {out_file} ({WIDTH}x{HEIGHT})")

def main():
    print("Building 8 Ultra-High-End Marketing Screenshots for Google Play Store...")
    for cfg in SCREEN_CONFIGS:
        generate_screenshot(cfg)
    print("Done! All 8 screenshots generated successfully.")

if __name__ == "__main__":
    main()
