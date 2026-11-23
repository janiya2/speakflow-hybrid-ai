import re
from collections import Counter

with open(r'g:\MY PORTFOLIO\06_HACKATHONS\07_GOOGLE_FIREBASE_BUILDHYBRIDAI_HACKATHON\project_source\LANGUAGE PRACTICE\web-app\src\app\vocabAndGrammarCatalog.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Separate vocab and grammar
parts = text.split('FULL_GRAMMAR_CATALOG')
vocab_part = parts[0]
grammar_part = parts[1] if len(parts) > 1 else ""

vocab_langs = re.findall(r'"language":\s*"([^"]+)"', vocab_part)
print('FULL_VOCABULARY_CATALOG count:', len(vocab_langs))
print(Counter(vocab_langs))

grammar_langs = re.findall(r'"language":\s*"([^"]+)"', grammar_part)
print('\nFULL_GRAMMAR_CATALOG count:', len(grammar_langs))
print(Counter(grammar_langs))
