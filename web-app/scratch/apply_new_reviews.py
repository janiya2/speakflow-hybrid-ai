import re
import json

with open("scratch/generate_new_reviews.py", "r", encoding="utf-8") as f:
    gen_script = f.read()

# Extract new_reviews_section string from gen_script
start_marker = 'new_reviews_section = """'
end_marker = '"""\n\nprint("New reviews section generated successfully!")'
start_idx = gen_script.find(start_marker) + len(start_marker)
end_idx = gen_script.find(end_marker)
new_reviews_section = gen_script[start_idx:end_idx]

with open("src/components/LandingPage.tsx", "r", encoding="utf-8") as f:
    c = f.read()

# 1. Add states if not present
state_target = '  const [selectedReviewFilter, setSelectedReviewFilter] = useState<string>("All");\n  const [activeReviewModal, setActiveReviewModal] = useState<any | null>(null);'
state_replace = '''  const [selectedReviewFilter, setSelectedReviewFilter] = useState<string>("All");
  const [activeReviewModal, setActiveReviewModal] = useState<any | null>(null);
  const [reviewPage, setReviewPage] = useState<number>(0);
  const [isReviewPaused, setIsReviewPaused] = useState<boolean>(false);'''

if state_target in c:
    c = c.replace(state_target, state_replace, 1)

# Add auto-advance effect
effect_code = '''  // Auto-advance reviews carousel every 7s (pauses on hover)
  useEffect(() => {
    if (isReviewPaused) return;
    const timer = setInterval(() => {
      setReviewPage((prev) => {
        const filtered = selectedReviewFilter === "All"
          ? ALL_REVIEWS_50
          : ALL_REVIEWS_50.filter((r) => r.category === selectedReviewFilter);
        const totalPages = Math.ceil(filtered.length / 4);
        return (prev + 1) % (totalPages || 1);
      });
    }, 7000);
    return () => clearInterval(timer);
  }, [isReviewPaused, selectedReviewFilter]);
'''

if "// Auto-advance reviews carousel" not in c:
    # insert right after useEffect for theme
    pos_eff = c.find('  useEffect(() => {\n    if (themeMode) {')
    if pos_eff != -1:
        c = c[:pos_eff] + effect_code + "\n" + c[pos_eff:]

# 2. Replace section id="reviews"
sec_start_marker = '      {/* 11. Loved by Learners Around the World - Testimonials & Social Proof (50 Global Reviews) */}\n      <section id="reviews"'
pos_sec_start = c.find(sec_start_marker)

# Find closing </section>
pos_sec_end = c.find('      {/* 12. Footer */}')
# Find the last </section> before footer
pos_close_sec = c.rfind('</section>', pos_sec_start, pos_sec_end) + len('</section>')

if pos_sec_start != -1 and pos_close_sec != -1:
    c = c[:pos_sec_start] + new_reviews_section.strip() + "\n\n" + c[pos_close_sec:]
    print("SUCCESS: Replaced Reviews section with 4-card carousel and Image 5 laurel wreaths!")
else:
    print(f"ERROR: pos_sec_start={pos_sec_start}, pos_close_sec={pos_close_sec}")

with open("src/components/LandingPage.tsx", "w", encoding="utf-8") as f:
    f.write(c)

print("Saved LandingPage.tsx!")
