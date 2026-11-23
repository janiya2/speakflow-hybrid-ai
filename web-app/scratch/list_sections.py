with open("src/components/LandingPage.tsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "<section" in line or "<footer" in line:
        print(f"Line {i+1}: {line.strip()[:80]}")
