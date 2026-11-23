import json
import re

# Read current topicsCatalog.ts
with open(r'g:\MY PORTFOLIO\06_HACKATHONS\07_GOOGLE_FIREBASE_BUILDHYBRIDAI_HACKATHON\project_source\LANGUAGE PRACTICE\web-app\src\app\topicsCatalog.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract existing objects
pattern = re.compile(r'\{\s*"id":\s*"([^"]+)",[\s\S]*?"title":\s*"([^"]+)",[\s\S]*?"language":\s*"([^"]+)",[\s\S]*?"level":\s*"([^"]+)",[\s\S]*?"category":\s*"([^"]+)",[\s\S]*?"icon":\s*"([^"]+)",[\s\S]*?"scenario":\s*"([^"]+)",[\s\S]*?"starterPrompt":\s*"([^"]+)"(?:,[\s\S]*?"starterQuestions":\s*(\[[^\]]*\]))?[\s\S]*?\}', re.MULTILINE)

# Map any category to the 8 canonical categories
def canonical_cat(cat):
    c = cat.lower()
    if 'sport' in c or 'fitness' in c or 'cricket' in c or 'football' in c:
        return 'Sports'
    if 'travel' in c or 'transit' in c or 'transport' in c or 'airport' in c:
        return 'Travel'
    if 'food' in c or 'din' in c or 'cafe' in c or 'restaurant' in c:
        return 'Food'
    if 'career' in c or 'business' in c or 'work' in c or 'interview' in c:
        return 'Career'
    if 'social' in c or 'party' in c or 'meetup' in c or 'culture & arts' in c:
        return 'Social'
    if 'entertain' in c or 'movie' in c or 'gaming' in c or 'music' in c:
        return 'Entertainment'
    if 'tech' in c or 'robot' in c or 'ai' in c or 'software' in c:
        return 'Tech'
    return 'Daily Life'

def norm_lang(lang):
    if lang == 'Chinese':
        return 'Chinese (Mandarin)'
    return lang

existing_topics = []
for m in re.finditer(r'\{\s*"id":\s*"([^"]+)"[\s\S]*?\}\s*(?=,\s*\{|\s*\];)', content):
    block = m.group(0)
    try:
        t = json.loads(block)
        t['category'] = canonical_cat(t.get('category', 'Daily Life'))
        t['language'] = norm_lang(t.get('language', 'English'))
        existing_topics.append(t)
    except Exception as e:
        pass

print(f"Loaded {len(existing_topics)} existing topics cleanly.")
from collections import Counter
counts = Counter(t['language'] for t in existing_topics)
for l, c in counts.items():
    print(f"{l}: {c}")
