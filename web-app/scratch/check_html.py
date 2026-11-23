import urllib.request

html = urllib.request.urlopen("http://localhost:3001").read().decode("utf-8")
print("Found 'Loved by learners':", "Loved by learners" in html)
print("Found 'id=\"reviews\"':", 'id="reviews"' in html)
print("Found 'Wall of Love':", 'Wall of Love' in html)
print("Found 'Alex_D88':", 'Alex_D88' in html)
