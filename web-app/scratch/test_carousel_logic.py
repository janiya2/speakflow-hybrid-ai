# test_carousel_logic.py
import json

reviews = json.load(open("scratch/reviews_50.json", encoding="utf-8"))
print(f"Total reviews: {len(reviews)}")

# Test filtering
for cat in ["All", "English", "Spanish", "Japanese", "French", "German"]:
    f = reviews if cat == "All" else [r for r in reviews if r["category"] == cat]
    pages = (len(f) + 3) // 4
    print(f"Category '{cat}': {len(f)} reviews, {pages} pages (4 per page)")
