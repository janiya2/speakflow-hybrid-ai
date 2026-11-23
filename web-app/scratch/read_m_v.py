with open("src/components/LandingPage.tsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'id="moments"' in line or 'id="voicerooms"' in line:
        print(f"--- Line {i+1} ---")
        print("".join(lines[i:i+40]))
