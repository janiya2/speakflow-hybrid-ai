# -*- coding: utf-8 -*-
import json
import re

# Canonical Category Normalizer
def canonical_cat(cat):
    c = (cat or '').lower()
    if 'sport' in c or 'fitness' in c or 'cricket' in c or 'football' in c or 'tennis' in c or 'volleyball' in c:
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

# Read existing topics
with open(r'g:\MY PORTFOLIO\06_HACKATHONS\07_GOOGLE_FIREBASE_BUILDHYBRIDAI_HACKATHON\project_source\LANGUAGE PRACTICE\web-app\src\app\topicsCatalog.ts', 'r', encoding='utf-8') as f:
    topics_raw = f.read()

existing_topics = []
for m in re.finditer(r'\{\s*"id":\s*"([^"]+)"[\s\S]*?\}\s*(?=,\s*\{|\s*\];)', topics_raw):
    try:
        t = json.loads(m.group(0))
        t['category'] = canonical_cat(t.get('category', 'Daily Life'))
        t['language'] = norm_lang(t.get('language', 'English'))
        existing_topics.append(t)
    except Exception as e:
        pass

# Read existing vocab & grammar
with open(r'g:\MY PORTFOLIO\06_HACKATHONS\07_GOOGLE_FIREBASE_BUILDHYBRIDAI_HACKATHON\project_source\LANGUAGE PRACTICE\web-app\src\app\vocabAndGrammarCatalog.ts', 'r', encoding='utf-8') as f:
    vg_raw = f.read()

vg_parts = vg_raw.split('export const FULL_GRAMMAR_CATALOG')
vocab_part = vg_parts[0]
grammar_part = vg_parts[1] if len(vg_parts) > 1 else ''

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

print(f"Loaded existing: Topics={len(existing_topics)}, Vocab={len(existing_vocab)}, Grammar={len(existing_grammar)}")

# We have 20 target languages
TARGET_LANGS = [
    "English", "Spanish", "French", "German", "Italian", "Portuguese",
    "Japanese", "Korean", "Chinese (Mandarin)", "Arabic", "Hindi", "Russian",
    "Tamil", "Sinhala", "Dutch", "Turkish", "Vietnamese", "Indonesian", "Thai", "Swedish"
]

print("Target languages:", len(TARGET_LANGS))
