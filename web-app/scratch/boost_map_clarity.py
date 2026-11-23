from PIL import Image, ImageEnhance

im = Image.open("public/images/landing/world_map_dotted.webp").convert("RGBA")
r, g, b, a = im.split()

# Boost the alpha of all non-zero pixels so dots are crisp and clearly visible
import numpy as np
a_arr = np.array(a)
# Increase alpha where alpha > 0
mask = a_arr > 10
# Scale alpha up so 153 becomes ~230 (crisp!)
a_boosted = np.where(mask, np.clip(a_arr * 1.6, 0, 255).astype(np.uint8), a_arr)

# Also slightly darken/saturate the blue/purple dots so they stand out crisply on white backgrounds
r_arr = np.array(r)
g_arr = np.array(g)
b_arr = np.array(b)

# Shift towards a richer modern royal indigo/blue (e.g. 140, 160, 245)
r_new = np.where(mask, np.clip(r_arr * 0.85, 0, 255).astype(np.uint8), r_arr)
g_new = np.where(mask, np.clip(g_arr * 0.88, 0, 255).astype(np.uint8), g_arr)
b_new = np.where(mask, np.clip(b_arr * 0.98, 0, 255).astype(np.uint8), b_arr)

enhanced_im = Image.merge("RGBA", (
    Image.fromarray(r_new),
    Image.fromarray(g_new),
    Image.fromarray(b_new),
    Image.fromarray(a_boosted)
))

enhanced_im.save("public/images/landing/world_map_dotted_vibrant.webp", "WEBP", quality=95)
print("Saved public/images/landing/world_map_dotted_vibrant.webp successfully!")
print("Original size:", im.size, "Enhanced size:", enhanced_im.size)
