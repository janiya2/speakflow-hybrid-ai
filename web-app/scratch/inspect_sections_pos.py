with open("src/components/LandingPage.tsx", "r", encoding="utf-8") as f:
    text = f.read()

# Let's inspect the sections in detail
import re
sections = [
    'id="search-the-world"',
    '{/* 4. Panoramic Scenarios Section',
    'id="exchange"',
    'id="practice-modes"',
    'id="moments"',
    'id="voicerooms"',
    'id="reviews"'
]

for s in sections:
    pos = text.find(s)
    print(f"Marker '{s}': pos {pos}")
