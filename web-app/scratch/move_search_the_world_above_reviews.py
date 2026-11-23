with open("src/components/LandingPage.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Locate section search-the-world
marker_start = '      {/* 3.5. Search the World - Dotted World Map & Bidirectional Coaches Scroller */}\n      <section id="search-the-world"'
pos_start = content.find(marker_start)

# Find the closing </section> for search-the-world
pos_end = content.find('</section>', pos_start)
if pos_end != -1:
    pos_end += len('</section>')

print("pos_start:", pos_start)
print("pos_end:", pos_end)

if pos_start != -1 and pos_end != -1:
    section_code = content[pos_start:pos_end]
    print("Section length:", len(section_code))
    # Cut it out
    content_without = content[:pos_start] + content[pos_end:]
    # Now find where section id="reviews" starts
    rev_marker = '      {/* 11. Loved by Learners Around the World - Testimonials & Social Proof (50 Global Reviews) */}'
    pos_rev = content_without.find(rev_marker)
    print("pos_rev:", pos_rev)
    if pos_rev != -1:
        # Insert right before reviews
        new_content = content_without[:pos_rev] + section_code + "\n\n" + content_without[pos_rev:]
        with open("src/components/LandingPage.tsx", "w", encoding="utf-8") as out:
            out.write(new_content)
        print("SUCCESS: Moved search-the-world above reviews!")
    else:
        print("Could not find reviews marker!")
else:
    print("Could not find search-the-world section!")
