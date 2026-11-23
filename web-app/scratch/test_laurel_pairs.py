# test_laurel_pairs.py
stem_d = "M 10 4 C 26 22 28 48 8 72"
pairs = [
    # (cx1, cy1, a1, cx2, cy2, a2)
    (11, 7, -35, 17, 9, 20),
    (17, 18, -20, 24, 21, 35),
    (21, 30, -5, 28, 33, 45),
    (21, 42, 10, 27, 46, 60),
    (17, 54, 25, 22, 59, 75),
    (10, 64, 40, 14, 69, 85),
]

elements = [f'<path d="{stem_d}" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />']
for cx1, cy1, a1, cx2, cy2, a2 in pairs:
    elements.append(f'<ellipse cx="{cx1}" cy="{cy1}" rx="3.5" ry="7.5" transform="rotate({a1} {cx1} {cy1})" fill="currentColor" />')
    elements.append(f'<ellipse cx="{cx2}" cy="{cy2}" rx="3.5" ry="7.5" transform="rotate({a2} {cx2} {cy2})" fill="currentColor" />')

svg = f'<svg viewBox="0 0 36 78" className="w-9 h-20 text-blue-500 shrink-0">{"".join(elements)}</svg>'
print("SVG Generated successfully, total elements:", len(elements))
