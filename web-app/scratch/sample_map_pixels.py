from PIL import Image

im = Image.open("public/images/landing/world_map_dotted.webp")
colors = im.getcolors(maxcolors=10000)
print(f"Total unique colors: {len(colors) if colors else 'more than 10000'}")

# Sample non-transparent pixels
sample_pixels = []
for y in range(0, im.height, 50):
    for x in range(0, im.width, 50):
        p = im.getpixel((x, y))
        if p[3] > 20: # non-transparent
            sample_pixels.append(p)

print(f"Non-transparent sample count: {len(sample_pixels)}")
if sample_pixels:
    print("First 10 non-transparent pixels (R, G, B, A):", sample_pixels[:10])
