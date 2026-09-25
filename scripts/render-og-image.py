"""Render public/og-image.jpg — the social card — in the notebook world.

Composed (not generated) with Pillow from the site's own assets and fonts,
mirroring the home page's first viewport. Re-run after changing the hero copy:

    python3 scripts/render-og-image.py
"""
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1200, 630
CLOTH, PAGE, INK = (29, 59, 47), (244, 247, 242), (26, 33, 80)
MUTED, ACCENT, HIGH = (82, 90, 80), (36, 56, 166), (220, 234, 74)
GRID_MINOR, GRID_MAJOR = (225, 234, 224), (205, 220, 206)

FD = 'node_modules/@fontsource-variable/sofia-sans-extra-condensed/files/sofia-sans-extra-condensed-latin-wght-normal.woff2'
FS = 'node_modules/@fontsource-variable/sofia-sans/files/sofia-sans-latin-wght-normal.woff2'
FH = 'node_modules/@fontsource/kalam/files/kalam-latin-400-normal.woff2'

HEADLINE = ['I’VE LED ENGINEERING', 'TEAMS —', 'AND I STILL BUILD.']


def face(path, size, weight=None):
    f = ImageFont.truetype(path, size)
    if weight is not None:
        try:
            f.set_variation_by_axes([weight])
        except Exception:
            pass
    return f


img = Image.new('RGB', (W, H), CLOTH)
d = ImageDraw.Draw(img)
for x in range(0, W, 3):
    d.line([(x, 0), (x, H)], fill=(25, 52, 41))
for y in range(0, H, 3):
    d.line([(0, y), (W, y)], fill=(33, 64, 51))

px0, py0, px1, py1 = 44, 40, W - 44, H - 40
shadow = Image.new('RGBA', (W, H), (0, 0, 0, 0))
ImageDraw.Draw(shadow).rectangle([px0 + 4, py0 + 14, px1 + 4, py1 + 14], fill=(0, 0, 0, 110))
img.paste(Image.new('RGB', (W, H), (0, 0, 0)), (0, 0), shadow.filter(ImageFilter.GaussianBlur(14)))
d = ImageDraw.Draw(img)
d.rectangle([px0, py0, px1, py1], fill=PAGE)
for x in range(px0, px1, 20):
    d.line([(x, py0), (x, py1)], fill=GRID_MAJOR if (x - px0) % 100 == 0 else GRID_MINOR)
for y in range(py0, py1, 20):
    d.line([(px0, y), (px1, y)], fill=GRID_MAJOR if (y - py0) % 100 == 0 else GRID_MINOR)
spine = 470
for i in range(-18, 19):
    a = max(0, 60 - abs(i) * 3)
    d.line([(spine + i, py0), (spine + i, py1)], fill=tuple(c - a // 2 for c in PAGE))

lab = face(FD, 17, 720)
d.text((84, 70), 'NOTEBOOK OF K. KHARE', font=lab, fill=MUTED)
d.text((430, 70), 'P. 1', font=lab, fill=MUTED)
d.line([(84, 96), (446, 96)], fill=INK, width=2)
d.text((520, 70), 'ENTRY — SEPT 2026', font=lab, fill=MUTED)
d.text((1090, 70), 'P. 2', font=lab, fill=MUTED)
d.line([(520, 96), (1116, 96)], fill=INK, width=2)

photo = Image.open('src/assets/portrait.jpg').convert('RGB').resize((300, 300), Image.LANCZOS)
card = Image.new('RGB', (322, 370), (255, 255, 255))
card.paste(photo, (11, 11))
ImageDraw.Draw(card).text((161, 332), 'runs teams, still ships code', font=face(FH, 24), fill=INK, anchor='mm')
card = card.convert('RGBA').rotate(3, expand=True, resample=Image.BICUBIC)
sh = Image.new('RGBA', card.size, (0, 0, 0, 0))
sh.paste((0, 0, 0, 90), (0, 0, card.width, card.height), card.split()[3])
cx, cy = 104, 134
img.paste(Image.new('RGB', card.size, (0, 0, 0)), (cx + 6, cy + 14), sh.filter(ImageFilter.GaussianBlur(10)).split()[3])
img.paste(card, (cx, cy), card)
tape = Image.new('RGBA', (110, 30), (236, 224, 192, 220)).rotate(-4, expand=True)
img.paste(tape, (cx + 110, cy - 14), tape)
d = ImageDraw.Draw(img)

hd = face(FD, 76, 820)
y = 128
for line in HEADLINE:
    d.text((520, y), line, font=hd, fill=INK)
    y += 70
pts = [(522 + i * 10.6, y + 6 + (3 if i % 8 < 4 else -2)) for i in range(41)]
d.line(pts, fill=ACCENT, width=4, joint='curve')

body, bold = face(FS, 25, 420), face(FS, 25, 650)
lead = 'driving, and generative AI. Building '
d.text((520, y + 40), 'Twelve years across storage, fintech, autonomous', font=body, fill=(46, 51, 64))
d.text((520, y + 74), lead, font=body, fill=(46, 51, 64))
w, tw = d.textlength(lead, font=body), d.textlength('Amazon Quick', font=bold)
d.rectangle([520 + w - 3, y + 78, 520 + w + tw + 3, y + 104], fill=HIGH)
d.text((520 + w, y + 74), 'Amazon Quick', font=bold, fill=INK)
d.text((520 + w + tw, y + 74), '.', font=body, fill=(46, 51, 64))
d.text((520, py1 - 58), 'scorpionmanace.github.io', font=face(FD, 22, 700), fill=MUTED)

img.save('public/og-image.jpg', 'JPEG', quality=88, optimize=True, progressive=True)
print('og-image written', img.size)
