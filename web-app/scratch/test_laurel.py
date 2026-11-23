import os

# Laurel Wreath SVG path generator
# Generates leaves positioned along a smooth bezier curve
leaves = [
    # (cx, cy, rx, ry, angle)
    (14, 8, 3.5, 7, -25),
    (20, 18, 4, 8, -10),
    (23, 29, 4.2, 8.5, 10),
    (22, 40, 4.2, 8.5, 25),
    (18, 51, 4, 8, 45),
    (11, 60, 3.8, 7.5, 65),
]

svg_elements = []
# Branch stem
svg_elements.append('<path d="M 12 6 C 24 22 26 44 8 66" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" />')

for cx, cy, rx, ry, angle in leaves:
    svg_elements.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" transform="rotate({angle} {cx} {cy})" fill="currentColor" />')

laurel_svg = "\n".join(svg_elements)
print("Laurel Branch SVG elements:")
print(laurel_svg)
