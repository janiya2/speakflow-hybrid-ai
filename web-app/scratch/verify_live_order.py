import urllib.request

html = urllib.request.urlopen("http://localhost:3001").read().decode("utf-8")

pos_vr = html.find('id="voicerooms"')
pos_stw = html.find('id="search-the-world"')
pos_rev = html.find('id="reviews"')

print("voicerooms pos:", pos_vr)
print("search-the-world pos:", pos_stw)
print("reviews pos:", pos_rev)

if pos_vr < pos_stw < pos_rev:
    print("PERFECT! Order is voicerooms -> search-the-world -> reviews")
else:
    print("Order error!")
