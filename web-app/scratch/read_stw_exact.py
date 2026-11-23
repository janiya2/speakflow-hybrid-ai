with open("src/components/LandingPage.tsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'id="search-the-world"' in line:
        print("".join(lines[i-2:i+30]))
        break
