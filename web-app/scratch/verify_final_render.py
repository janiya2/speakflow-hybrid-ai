import urllib.request

html = urllib.request.urlopen("http://localhost:3001").read().decode("utf-8")
print("Found 'laurel_branch.png':", "laurel_branch.png" in html)
print("Found '2k+ ratings':", "2k+ ratings" in html)
print("Found '100K':", "100K" in html)
print("Found 'Alex_D88':", "Alex_D88" in html)
print("Found 'Showing':", "Showing" in html)
