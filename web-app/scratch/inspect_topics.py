import re
from collections import Counter

path = r'g:\MY PORTFOLIO\06_HACKATHONS\07_GOOGLE_FIREBASE_BUILDHYBRIDAI_HACKATHON\project_source\LANGUAGE PRACTICE\web-app\src\app\topicsCatalog.ts'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

languages = re.findall(r'"language":\s*"([^"]+)"', text)
counts = Counter(languages)
print('Total topics in topicsCatalog.ts:', len(languages))
for lang, count in sorted(counts.items(), key=lambda x: x[1], reverse=True):
    print(f'{lang}: {count}')

categories = re.findall(r'"category":\s*"([^"]+)"', text)
cat_counts = Counter(categories)
print('\nTotal categories in topicsCatalog.ts:', len(categories))
for cat, count in sorted(cat_counts.items(), key=lambda x: x[1], reverse=True):
    print(f'{cat}: {count}')
