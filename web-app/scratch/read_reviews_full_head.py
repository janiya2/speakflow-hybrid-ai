with open("src/components/LandingPage.tsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'id="reviews"' in line:
        print(f"Reviews start at line {i+1}")
        print("".join(lines[i:i+60]))
        break
