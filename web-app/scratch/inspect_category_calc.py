with open(r'g:\MY PORTFOLIO\06_HACKATHONS\07_GOOGLE_FIREBASE_BUILDHYBRIDAI_HACKATHON\project_source\LANGUAGE PRACTICE\web-app\src\app\page.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

import re

# Look for category count calculation or BROWSE CALLS BY CATEGORY
idx = text.find('BROWSE CALLS BY CATEGORY')
if idx != -1:
    print('Found BROWSE CALLS BY CATEGORY around:', idx)
    print(text[max(0, idx-1000):idx+2500])
else:
    print('Not found')
