from PIL import Image

im = Image.open("public/images/landing/laurel_branch.png")
print("Size:", im.size)
print("Mode:", im.mode)
