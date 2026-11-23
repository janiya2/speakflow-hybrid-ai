with open("src/components/LandingPage.tsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'id="search-the-world"' in line:
        print("".join(lines[i:i+45]))
        break
