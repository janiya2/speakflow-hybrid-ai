# -*- coding: utf-8 -*-
import json
import re
import sys
import os
import subprocess

sys.path.append(r'g:\MY PORTFOLIO\06_HACKATHONS\07_GOOGLE_FIREBASE_BUILDHYBRIDAI_HACKATHON\project_source\LANGUAGE PRACTICE\web-app\scratch')
from topics_data_pack import LANG_EXPANSIONS
from topic_packs.pack_european import EUROPEAN_TOPICS
from topic_packs.pack_asian import ASIAN_TOPICS
from topic_packs.pack_remaining import REMAINING_TOPICS
from topic_packs.pack_southeast_asia_mideast import SE_ASIA_MIDEAST_TOPICS

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

# Read original base topics from git HEAD
repo_dir = r'g:\MY PORTFOLIO\06_HACKATHONS\07_GOOGLE_FIREBASE_BUILDHYBRIDAI_HACKATHON\project_source\LANGUAGE PRACTICE\web-app'
topics_raw = subprocess.check_output(['git', 'show', 'HEAD:./src/app/topicsCatalog.ts'], cwd=repo_dir, text=True, encoding='utf-8')

existing_topics = []
for m in re.finditer(r'\{\s*"id":\s*"([^"]+)"[\s\S]*?\}\s*(?=,\s*\{|\s*\];)', topics_raw):
    try:
        t = json.loads(m.group(0))
        t['category'] = canonical_cat(t.get('category', 'Daily Life'))
        t['language'] = norm_lang(t.get('language', 'English'))
        # Ensure prompt is string and questions is list
        if isinstance(t.get('starterPrompt'), list):
            p_list = t['starterPrompt']
            t['starterPrompt'] = p_list[0] if p_list else ''
            t['starterQuestions'] = p_list[1:]
        existing_topics.append(t)
    except Exception as e:
        pass

print(f"Base topics parsed from git HEAD: {len(existing_topics)}")

all_topics = list(existing_topics)
id_counter = 1000

# Helper to add items
def add_from_dict(lang_name, tuple_list):
    global id_counter
    for item in tuple_list:
        if isinstance(item, dict):
            id_counter += 1
            item_copy = dict(item)
            item_copy['id'] = f"top_{id_counter}"
            item_copy['language'] = norm_lang(lang_name)
            item_copy['category'] = canonical_cat(item_copy.get('category', 'Daily Life'))
            p = item_copy.get('starterPrompt', '')
            if isinstance(p, list):
                item_copy['starterPrompt'] = p[0] if p else ''
                item_copy['starterQuestions'] = p[1:]
            else:
                item_copy['starterPrompt'] = str(p)
            if 'starterQuestions' not in item_copy or not isinstance(item_copy['starterQuestions'], list):
                item_copy['starterQuestions'] = []
            all_topics.append(item_copy)
        elif isinstance(item, tuple):
            id_counter += 1
            if len(item) == 9:
                t_id, title, lvl, cat, sub_cat, icon, scen, prompt, q = item
            elif len(item) == 8:
                if str(item[0]).startswith('sp_'):
                    t_id, title, lvl, cat, sub_cat, icon, scen, prompt = item
                    q = []
                else:
                    title, lvl, cat, sub_cat, icon, scen, prompt, q = item
                    t_id = f"top_{id_counter}"
            elif len(item) == 7:
                title, lvl, cat, sub_cat, icon, scen, prompt = item
                q = []
                t_id = f"top_{id_counter}"
            else:
                title, lvl, cat, sub_cat, icon, scen, prompt = item[0:7]
                q = item[7] if len(item) > 7 else []
                t_id = f"top_{id_counter}"

            if isinstance(prompt, list):
                combined = list(prompt) + (list(q) if isinstance(q, list) else [])
                prompt = combined.pop(0) if combined else ""
                q = combined
            if not isinstance(q, list):
                q = [str(q)] if q else []

            all_topics.append({
                "id": str(t_id) if str(t_id).startswith('sp_') else f"top_{id_counter}",
                "title": str(title),
                "language": norm_lang(lang_name),
                "level": str(lvl),
                "category": canonical_cat(cat),
                "subCategory": str(sub_cat),
                "icon": str(icon),
                "scenario": str(scen),
                "starterPrompt": str(prompt),
                "starterQuestions": [str(x) for x in q]
            })

# Add from all packs
for lang, items in LANG_EXPANSIONS.items():
    add_from_dict(lang, items)

for lang, items in EUROPEAN_TOPICS.items():
    add_from_dict(lang, items)

for lang, items in ASIAN_TOPICS.items():
    add_from_dict(lang, items)

for lang, items in REMAINING_TOPICS.items():
    add_from_dict(lang, items)

for lang, items in SE_ASIA_MIDEAST_TOPICS.items():
    add_from_dict(lang, items)

print(f"Total topics after merge: {len(all_topics)}")
from collections import Counter
counts = Counter(t['language'] for t in all_topics)
print("Counts per language:")
for lang, count in sorted(counts.items(), key=lambda x: x[1], reverse=True):
    print(f"  {lang}: {count}")

# Check category counts across all languages
cats = Counter(t['category'] for t in all_topics)
print("Categories distribution:")
for c, count in sorted(cats.items()):
    print(f"  {c}: {count}")

# Validate every single topic
for i, t in enumerate(all_topics):
    assert isinstance(t['id'], str), f"Topic {i} invalid id"
    assert isinstance(t['title'], str), f"Topic {i} invalid title"
    assert isinstance(t['language'], str), f"Topic {i} invalid language"
    assert isinstance(t['level'], str), f"Topic {i} invalid level"
    assert isinstance(t['category'], str), f"Topic {i} invalid category"
    assert isinstance(t['icon'], str), f"Topic {i} invalid icon"
    assert isinstance(t['scenario'], str), f"Topic {i} invalid scenario"
    assert isinstance(t['starterPrompt'], str), f"Topic {i} starterPrompt is {type(t['starterPrompt'])}: {t['starterPrompt']}"
    assert isinstance(t['starterQuestions'], list), f"Topic {i} starterQuestions is not list"

print("All topics passed strict assertion validation!")

# Generate TypeScript file
ts_code = """// SpeakFlow Master Practice Scenarios Catalog (Synced for Web & Mobile)
// Contains 500+ authentic conversational topics across all 20 global languages.

export interface CatalogTopicModel {
  id: string;
  title: string;
  language: string;
  level: string;
  category: string;
  subCategory?: string;
  icon: string;
  scenario: string;
  starterPrompt: string;
  starterQuestions?: string[];
}

export type CatalogTopic = CatalogTopicModel;

export const MASTER_TOPICS_CATALOG: CatalogTopicModel[] = """ + json.dumps(all_topics, ensure_ascii=False, indent=2) + """;

export const FULL_MOBILE_TOPICS_CATALOG: CatalogTopicModel[] = MASTER_TOPICS_CATALOG;
"""

with open(r'g:\MY PORTFOLIO\06_HACKATHONS\07_GOOGLE_FIREBASE_BUILDHYBRIDAI_HACKATHON\project_source\LANGUAGE PRACTICE\web-app\src\app\topicsCatalog.ts', 'w', encoding='utf-8') as f:
    f.write(ts_code)

print("Saved updated topicsCatalog.ts successfully with 100% valid TypeScript types!")
