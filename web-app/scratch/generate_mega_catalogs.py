import json
import os
import re

# We will read existing items to retain all authentic existing data, then backfill every language to >= 25 topics, >= 25 vocabs, >= 10 grammar rules.

# Read existing topics
with open(r'g:\MY PORTFOLIO\06_HACKATHONS\07_GOOGLE_FIREBASE_BUILDHYBRIDAI_HACKATHON\project_source\LANGUAGE PRACTICE\web-app\src\app\topicsCatalog.ts', 'r', encoding='utf-8') as f:
    topics_content = f.read()

# Read existing vocab & grammar
with open(r'g:\MY PORTFOLIO\06_HACKATHONS\07_GOOGLE_FIREBASE_BUILDHYBRIDAI_HACKATHON\project_source\LANGUAGE PRACTICE\web-app\src\app\vocabAndGrammarCatalog.ts', 'r', encoding='utf-8') as f:
    vocab_grammar_content = f.read()

def canonical_cat(cat):
    c = (cat or '').lower()
    if 'sport' in c or 'fitness' in c or 'cricket' in c or 'football' in c or 'tennis' in c:
        return 'Sports'
    if 'travel' in c or 'transit' in c or 'transport' in c or 'airport' in c or 'hotel' in c:
        return 'Travel'
    if 'food' in c or 'din' in c or 'cafe' in c or 'restaurant' in c or 'street food' in c:
        return 'Food'
    if 'career' in c or 'business' in c or 'work' in c or 'interview' in c or 'salary' in c:
        return 'Career'
    if 'social' in c or 'party' in c or 'meetup' in c or 'club' in c or 'reunion' in c:
        return 'Social'
    if 'entertain' in c or 'movie' in c or 'gaming' in c or 'music' in c or 'cinema' in c or 'art' in c:
        return 'Entertainment'
    if 'tech' in c or 'robot' in c or 'ai' in c or 'software' in c or 'cloud' in c:
        return 'Tech'
    return 'Daily Life'

def norm_lang(lang):
    l = (lang or '').strip()
    if l.lower().startswith('chinese'):
        return 'Chinese (Mandarin)'
    return l

# Parse existing topics
existing_topics = []
for m in re.finditer(r'\{\s*"id":\s*"([^"]+)"[\s\S]*?\}\s*(?=,\s*\{|\s*\];)', topics_content):
    block = m.group(0)
    try:
        t = json.loads(block)
        t['category'] = canonical_cat(t.get('category', 'Daily Life'))
        t['language'] = norm_lang(t.get('language', 'English'))
        existing_topics.append(t)
    except Exception as e:
        pass

print(f"Existing topics count: {len(existing_topics)}")

# Parse existing vocabs and grammars
vocab_split = vocab_grammar_content.split('export const FULL_GRAMMAR_CATALOG')
vocab_part = vocab_split[0]
grammar_part = vocab_split[1] if len(vocab_split) > 1 else ''

existing_vocab = []
for m in re.finditer(r'\{\s*"id":\s*"([^"]+)"[\s\S]*?\}\s*(?=,\s*\{|\s*\];)', vocab_part):
    try:
        v = json.loads(m.group(0))
        v['language'] = norm_lang(v.get('language', 'English'))
        v['category'] = canonical_cat(v.get('category', 'Daily Life'))
        existing_vocab.append(v)
    except: pass

existing_grammar = []
for m in re.finditer(r'\{\s*"id":\s*"([^"]+)"[\s\S]*?\}\s*(?=,\s*\{|\s*\];)', grammar_part):
    try:
        g = json.loads(m.group(0))
        g['language'] = norm_lang(g.get('language', 'English'))
        existing_grammar.append(g)
    except: pass

print(f"Existing vocabs: {len(existing_vocab)}, Existing grammars: {len(existing_grammar)}")
