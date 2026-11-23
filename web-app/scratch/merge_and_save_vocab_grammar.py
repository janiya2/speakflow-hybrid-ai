# -*- coding: utf-8 -*-
import json
import re
import sys

sys.path.append(r'g:\MY PORTFOLIO\06_HACKATHONS\07_GOOGLE_FIREBASE_BUILDHYBRIDAI_HACKATHON\project_source\LANGUAGE PRACTICE\web-app\scratch')
from vocab_grammar_data_pack import LANG_VOCAB
from vocab_packs.vocab_pack_europe import EUROPE_VOCAB
from vocab_packs.vocab_pack_asia import ASIA_VOCAB
from vocab_packs.vocab_pack_mideast_slavic import MIDEAST_SLAVIC_OTHER_VOCAB
from vocab_packs.grammar_pack_all import ALL_GRAMMAR_REPAIRS
from vocab_packs.pack_final_additions import FINAL_VOCAB, EXTRA_GRAMMAR

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

# Read existing vocab and grammar
with open(r'g:\MY PORTFOLIO\06_HACKATHONS\07_GOOGLE_FIREBASE_BUILDHYBRIDAI_HACKATHON\project_source\LANGUAGE PRACTICE\web-app\src\app\vocabAndGrammarCatalog.ts', 'r', encoding='utf-8') as f:
    vg_raw = f.read()

vg_parts = vg_raw.split('export const FULL_GRAMMAR_CATALOG')
vocab_part = vg_parts[0]
grammar_part = vg_parts[1] if len(vg_parts) > 1 else ''

all_vocab = []
for m in re.finditer(r'\{\s*"id":\s*"([^"]+)"[\s\S]*?\}\s*(?=,\s*\{|\s*\];)', vocab_part):
    try:
        v = json.loads(m.group(0))
        # Keep if not temporary
        v['language'] = norm_lang(v.get('language', 'English'))
        v['category'] = canonical_cat(v.get('category', 'Daily Life'))
        all_vocab.append(v)
    except: pass

all_grammar = []
for m in re.finditer(r'\{\s*"id":\s*"([^"]+)"[\s\S]*?\}\s*(?=,\s*\{|\s*\];)', grammar_part):
    try:
        g = json.loads(m.group(0))
        g['language'] = norm_lang(g.get('language', 'English'))
        all_grammar.append(g)
    except: pass

print(f"Base Vocab: {len(all_vocab)}, Base Grammar: {len(all_grammar)}")

v_counter = 5000
def add_vocabs_from_pack(pack_dict):
    global v_counter
    for lang_name, items in pack_dict.items():
        for item in items:
            v_counter += 1
            word, phonetic, cat, sub_cat, lvl, cefr, meaning, tip, target, ctx, kw = item
            all_vocab.append({
                "id": f"voc_{v_counter}",
                "language": norm_lang(lang_name),
                "word": word,
                "phonetic": phonetic,
                "category": canonical_cat(cat),
                "subCategory": sub_cat,
                "level": lvl,
                "cefr": cefr,
                "meaning": meaning,
                "usageTip": tip,
                "exampleTarget": target,
                "exampleContext": ctx,
                "relatedKeyword": kw
            })

add_vocabs_from_pack(FINAL_VOCAB)

g_counter = 5000
def add_grammars_from_pack(pack_dict):
    global g_counter
    for lang_name, items in pack_dict.items():
        for item in items:
            g_counter += 1
            title, cat, lvl, wrong, correct, rule, tip, kw = item
            all_grammar.append({
                "id": f"g_rep_{g_counter}",
                "language": norm_lang(lang_name),
                "category": cat,
                "level": lvl,
                "title": title,
                "wrong": wrong,
                "correct": correct,
                "rule": rule,
                "tip": tip,
                "keyword": kw
            })

add_grammars_from_pack(EXTRA_GRAMMAR)

print(f"Total Vocab after merge: {len(all_vocab)}")
from collections import Counter
v_counts = Counter(v['language'] for v in all_vocab)
print("Vocab counts per language:")
for l, c in sorted(v_counts.items(), key=lambda x: x[1], reverse=True):
    print(f"  {l}: {c}")

print(f"\nTotal Grammar after merge: {len(all_grammar)}")
g_counts = Counter(g['language'] for g in all_grammar)
print("Grammar counts per language:")
for l, c in sorted(g_counts.items(), key=lambda x: x[1], reverse=True):
    print(f"  {l}: {c}")

# Build TypeScript file
ts_code = """export interface VocabCatalogItem {
  id: string;
  language: string;
  word: string;
  phonetic: string;
  category: string;
  subCategory: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  cefr: string;
  meaning: string;
  usageTip: string;
  exampleTarget: string;
  exampleContext: string;
  relatedKeyword: string;
}

export interface GrammarCatalogItem {
  id: string;
  language: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  title: string;
  wrong: string;
  correct: string;
  rule: string;
  tip: string;
  keyword: string;
}

export const FULL_VOCABULARY_CATALOG: VocabCatalogItem[] = """ + json.dumps(all_vocab, ensure_ascii=False, indent=2) + """;

export const FULL_GRAMMAR_CATALOG: GrammarCatalogItem[] = """ + json.dumps(all_grammar, ensure_ascii=False, indent=2) + """;
"""

with open(r'g:\MY PORTFOLIO\06_HACKATHONS\07_GOOGLE_FIREBASE_BUILDHYBRIDAI_HACKATHON\project_source\LANGUAGE PRACTICE\web-app\src\app\vocabAndGrammarCatalog.ts', 'w', encoding='utf-8') as f:
    f.write(ts_code)

print("Saved updated vocabAndGrammarCatalog.ts successfully!")
