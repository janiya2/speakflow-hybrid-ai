import re

with open(r'g:\MY PORTFOLIO\06_HACKATHONS\07_GOOGLE_FIREBASE_BUILDHYBRIDAI_HACKATHON\project_source\LANGUAGE PRACTICE\web-app\src\app\topicsCatalog.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Match each object { ... }
# Look for "language": "...", "category": "..."
items = []
pattern = re.compile(r'{\s*"id":\s*"([^"]+)",[\s\S]*?"language":\s*"([^"]+)",[\s\S]*?"category":\s*"([^"]+)"', re.MULTILINE)
matches = pattern.findall(text)
print(f'Found {len(matches)} matches')

from collections import defaultdict, Counter
lang_cats = defaultdict(list)
for id_, lang, cat in matches:
    lang_cats[lang].append(cat)

for lang, cats in sorted(lang_cats.items()):
    print(f'{lang} ({len(cats)}):', dict(Counter(cats)))
