from PIL import Image

im = Image.open("public/images/landing/world_map_dotted.webp")
print("Size:", im.size)
print("Mode:", im.mode)
print("Bands:", im.getbands())
ext = im.getextrema()
print("Extrema:", ext)
