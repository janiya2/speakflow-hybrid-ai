import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# 1080 x 1920 px (9:16 aspect ratio - Google Play Store recommended)
WIDTH = 1080
HEIGHT = 1920

BASE_DIR = r"G:\MY APPLICATIONS\LANGUAGE PRACTICE"
SCREENSHOT_DIR = os.path.join(BASE_DIR, "playstore assets", "screenshots")
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

USER_UPLOADED_DIR = r"C:\Users\INNO XPERT\.gemini\antigravity\brain\2ff2f4e3-542b-42b3-9dc4-2e9c6d95ef32\.user_uploaded"

# Available system fonts on Windows
FONT_BOLD_PATH = r"C:\Windows\Fonts\segoeuib.ttf"
FONT_SEMI_PATH = r"C:\Windows\Fonts\segoeui.ttf"
FONT_BADGE_PATH = r"C:\Windows\Fonts\seguiemj.ttf"

def get_fonts():
    try:
        title_font = ImageFont.truetype(FONT_BOLD_PATH, 56)
        sub_font = ImageFont.truetype(FONT_SEMI_PATH, 28)
        badge_font = ImageFont.truetype(FONT_BOLD_PATH, 22)
    except:
        title_font = ImageFont.load_default()
        sub_font = ImageFont.load_default()
        badge_font = ImageFont.load_default()
    return title_font, sub_font, badge_font

title_font, sub_font, badge_font = get_fonts()

SCREENSHOTS_CONFIG = [
    {
        "id": "1_live_ai_video_calls.png",
        "badge": "✦ REAL-TIME AI VIDEO COACH",
        "badge_color": (59, 130, 246),      # Blue
        "glow_color": (37, 99, 235, 70),
        "title": "Face-to-Face AI Video Calls",
        "subtitle": "Practice real conversations anytime with expressive AI coaches",
        "image_file": "media_1794208820161_c1f5619c.jpg",
        "crop_top": 0.0,
    },
    {
        "id": "2_instant_grammar_feedback.png",
        "badge": "✦ INSTANT SMART FEEDBACK",
        "badge_color": (16, 185, 129),     # Emerald
        "glow_color": (5, 150, 105, 70),
        "title": "Live Grammar Corrections",
        "subtitle": "Get instant hints, better vocabulary & natural sentence tips",
        "image_file": "media_1794210863392_2a7422d5.png",
        "crop_top": 0.0,
    },
    {
        "id": "3_choose_ai_coach.png",
        "badge": "✦ PERSONALIZED LEARNING",
        "badge_color": (139, 92, 246),     # Purple
        "glow_color": (124, 58, 237, 70),
        "title": "Choose Your AI Coach",
        "subtitle": "Select native coaches & customize session duration",
        "image_file": "media_1794211711685_065d1e73.png",
        "crop_top": 0.0,
    },
    {
        "id": "4_multilingual_fluency.png",
        "badge": "✦ MULTILINGUAL MASTERY",
        "badge_color": (236, 72, 153),     # Pink
        "glow_color": (219, 39, 119, 70),
        "title": "Speak Korean, Japanese & More",
        "subtitle": "Native pronunciation & natural accents in 6+ world languages",
        "image_file": "media_1794212936944_2d6e0bb3.jpg",
        "crop_top": 0.0,
    },
    {
        "id": "5_real_world_scenarios.png",
        "badge": "✦ REAL-LIFE ROLEPLAYS",
        "badge_color": (245, 158, 11),     # Amber
        "glow_color": (217, 119, 6, 70),
        "title": "Interactive Roleplay Scenarios",
        "subtitle": "Order food, ace job interviews & navigate travel situations",
        "image_file": "media_1794213465928_f22edf7e.jpg",
        "crop_top": 0.0,
    },
    {
        "id": "6_fluency_analytics_cefr.png",
        "badge": "✦ PROGRESS & ACCURACY",
        "badge_color": (6, 182, 212),      # Cyan
        "glow_color": (8, 145, 178, 70),
        "title": "Track CEFR Score & Fluency",
        "subtitle": "Detailed analytics for grammar, vocabulary & pronunciation",
        "image_file": "media_1794203666698_162356ca.png",
        "crop_top": 0.0,
    },
    {
        "id": "7_practice_any_topic.png",
        "badge": "✦ UNLIMITED FREEDOM",
        "badge_color": (99, 102, 241),     # Indigo
        "glow_color": (79, 70, 229, 70),
        "title": "Discuss Any Custom Topic",
        "subtitle": "Talk about tech, hobbies, business or free casual chatting",
        "image_file": "media_1794207293514_3be375c3.png",
        "crop_top": 0.0,
    },
    {
        "id": "8_pronunciation_drills.png",
        "badge": "✦ ACCENT & CONFIDENCE",
        "badge_color": (14, 165, 233),     # Sky Blue
        "glow_color": (2, 132, 199, 70),
        "title": "Build Real Speaking Confidence",
        "subtitle": "Zero fear of mistakes - private, friendly 24/7 AI tutor",
        "image_file": "media_1794212154468_82aa317c.png",
        "crop_top": 0.0,
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
    # Create glow overlay
    glow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(glow)
    r_val, g_val, b_val, a_val = color
    steps = 40
    for s in range(steps, 0, -1):
        cur_r = int(radius * (s / steps))
        alpha = int(a_val * (1 - (s / steps)) ** 1.8)
        draw.ellipse(
            [center_x - cur_r, center_y - cur_r, center_x + cur_r, center_y + cur_r],
            fill=(r_val, g_val, b_val, alpha)
        )
    glow = glow.filter(ImageFilter.GaussianBlur(radius=35))
    canvas.alpha_composite(glow)

def make_screenshot(config):
    # Base background: deep slate navy gradient
    bg = create_gradient(WIDTH, HEIGHT, (11, 17, 32), (3, 7, 18))

    # Add ambient glow matching feature badge
    draw_radial_glow(bg, WIDTH // 2, 380, 500, config["glow_color"])
    draw_radial_glow(bg, WIDTH // 2, 1200, 600, (config["glow_color"][0], config["glow_color"][1], config["glow_color"][2], 35))

    draw = ImageDraw.Draw(bg)

    # 1. Badge Pill
    badge_text = config["badge"]
    badge_bbox = badge_font.getbbox(badge_text)
    badge_w = badge_bbox[2] - badge_bbox[0]
    badge_h = badge_bbox[3] - badge_bbox[1]
    
    pill_padding_x = 24
    pill_padding_y = 10
    pill_w = badge_w + pill_padding_x * 2
    pill_h = badge_h + pill_padding_y * 2
    pill_x = (WIDTH - pill_w) // 2
    pill_y = 90

    # Draw pill background & glowing border
    pill_img = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    pill_draw = ImageDraw.Draw(pill_img)
    bc = config["badge_color"]
    pill_draw.rounded_rectangle(
        [pill_x, pill_y, pill_x + pill_w, pill_y + pill_h],
        radius=pill_h // 2,
        fill=(bc[0], bc[1], bc[2], 30),
        outline=(bc[0], bc[1], bc[2], 180),
        width=2
    )
    bg.alpha_composite(pill_img)
    
    # Text inside pill
    draw.text(
        (pill_x + pill_padding_x, pill_y + pill_padding_y - 2),
        badge_text,
        font=badge_font,
        fill=(bc[0], bc[1], bc[2], 255)
    )

    # 2. Main Title
    title_text = config["title"]
    title_bbox = title_font.getbbox(title_text)
    title_w = title_bbox[2] - title_bbox[0]
    title_x = (WIDTH - title_w) // 2
    title_y = pill_y + pill_h + 24
    
    # Draw soft title drop shadow
    draw.text((title_x + 1, title_y + 2), title_text, font=title_font, fill=(0, 0, 0, 160))
    draw.text((title_x, title_y), title_text, font=title_font, fill=(255, 255, 255, 255))

    # 3. Subtitle
    sub_text = config["subtitle"]
    sub_bbox = sub_font.getbbox(sub_text)
    sub_w = sub_bbox[2] - sub_bbox[0]
    sub_x = (WIDTH - sub_w) // 2
    sub_y = title_y + 70
    draw.text((sub_x, sub_y), sub_text, font=sub_font, fill=(148, 163, 184, 255))

    # 4. Modern Smartphone Mockup Frame
    phone_w = 780
    phone_h = 1480
    phone_x = (WIDTH - phone_w) // 2
    phone_y = sub_y + 65
    corner_radius = 54
    bezel_thickness = 16

    # Draw phone shadow on separate layer
    shadow_img = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow_img)
    s_draw.rounded_rectangle(
        [phone_x + 8, phone_y + 22, phone_x + phone_w + 14, phone_y + phone_h + 30],
        radius=corner_radius,
        fill=(0, 0, 0, 160)
    )
    shadow_img = shadow_img.filter(ImageFilter.GaussianBlur(radius=28))
    bg.alpha_composite(shadow_img)

    # Outer phone frame (Titanium dark border)
    phone_layer = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    p_draw = ImageDraw.Draw(phone_layer)
    p_draw.rounded_rectangle(
        [phone_x, phone_y, phone_x + phone_w, phone_y + phone_h],
        radius=corner_radius,
        fill=(15, 23, 42, 255),
        outline=(51, 65, 85, 255),
        width=4
    )

    # Screen dimensions
    screen_x = phone_x + bezel_thickness
    screen_y = phone_y + bezel_thickness
    screen_w = phone_w - (bezel_thickness * 2)
    screen_h = phone_h - (bezel_thickness * 2)
    screen_radius = corner_radius - 8

    # Load and fit screenshot inside screen
    raw_path = os.path.join(USER_UPLOADED_DIR, config["image_file"])
    if os.path.exists(raw_path):
        app_img = Image.open(raw_path).convert("RGBA")
        
        # Fit image: resize maintaining aspect ratio then center-crop or letterbox
        img_ratio = app_img.width / app_img.height
        screen_ratio = screen_w / screen_h
        
        if img_ratio > screen_ratio:
            # Image is wider -> scale by height
            new_h = screen_h
            new_w = int(new_h * img_ratio)
            resized = app_img.resize((new_w, new_h), Image.Resampling.LANCZOS)
            crop_x = (new_w - screen_w) // 2
            fitted_app = resized.crop((crop_x, 0, crop_x + screen_w, screen_h))
        else:
            # Image is taller -> scale by width
            new_w = screen_w
            new_h = int(new_w / img_ratio)
            resized = app_img.resize((new_w, new_h), Image.Resampling.LANCZOS)
            # Crop from top
            crop_top = int((new_h - screen_h) * config.get("crop_top", 0.0))
            if crop_top + screen_h > new_h:
                crop_top = max(0, new_h - screen_h)
            fitted_app = resized.crop((0, crop_top, screen_w, crop_top + screen_h))
    else:
        # Fallback dark placeholder
        fitted_app = Image.new("RGBA", (screen_w, screen_h), (30, 41, 59, 255))

    # Mask screen with rounded corners
    screen_mask = Image.new("L", (screen_w, screen_h), 0)
    mask_draw = ImageDraw.Draw(screen_mask)
    mask_draw.rounded_rectangle([0, 0, screen_w, screen_h], radius=screen_radius, fill=255)

    # Paste fitted app screen
    phone_layer.paste(fitted_app, (screen_x, screen_y), screen_mask)

    # Dynamic Island / Camera Punch Hole at top of screen
    notch_w = 140
    notch_h = 30
    notch_x = screen_x + (screen_w - notch_w) // 2
    notch_y = screen_y + 14
    p_draw.rounded_rectangle(
        [notch_x, notch_y, notch_x + notch_w, notch_y + notch_h],
        radius=notch_h // 2,
        fill=(0, 0, 0, 255)
    )

    # Composite phone onto background
    bg.alpha_composite(phone_layer)

    # Save final image
    out_path = os.path.join(SCREENSHOT_DIR, config["id"])
    bg.convert("RGB").save(out_path, quality=95)
    print(f"Generated: {out_path} ({WIDTH}x{HEIGHT})")

def main():
    print("Generating 8 Ultra-Premium Screenshots for Google Play Store...")
    for cfg in SCREENSHOTS_CONFIG:
        make_screenshot(cfg)
    print("All 8 screenshots generated successfully!")

if __name__ == "__main__":
    main()

