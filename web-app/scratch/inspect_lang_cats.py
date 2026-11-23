import json
import re

with open(r'g:\MY PORTFOLIO\06_HACKATHONS\07_GOOGLE_FIREBASE_BUILDHYBRIDAI_HACKATHON\project_source\LANGUAGE PRACTICE\web-app\src\app\topicsCatalog.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Parse items
items = []
blocks = text.split('{\n    "id":')
for b in blocks[1:]:
    b = '{\n    "id":' + b.split('\n  },\n')[0].split('\n  }\n]')[0]
    try:
        data = json.loads(b)
        items.append(data)
    except Exception as e:
        pass

print('Parsed items:', len(items))
from collections import defaultdict
lang_cats = defaultdict(list)
for it in items:
    lang_cats[it['language']].append(it.get('category'))

for lang, cats in sorted(lang_cats.items()):
    print(f'=== {lang} ({len(cats)}) ===')
    from collections import Counter
    print(dict(Counter(cats)))
