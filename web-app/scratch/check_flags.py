import json, os

data = json.load(open("scratch/reviews_50.json", encoding="utf-8"))
missing = set()
for r in data:
    u = "public/" + r["userFlag"].lstrip("/")
    if not os.path.exists(u):
        missing.add(u)
    t = "public/" + r["targetFlag"].lstrip("/")
    if not os.path.exists(t):
        missing.add(t)

print("Missing flags:", missing)
missing_avatars = set()
for r in data:
    a = "public/" + r["avatar"].lstrip("/")
    if not os.path.exists(a):
        missing_avatars.add(a)

print("Missing avatars:", missing_avatars)
