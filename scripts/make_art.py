#!/usr/bin/env python3
"""
Atelier Nótos — placeholder artwork generator.
Φτιάχνει abstract εικαστικά (copyright-safe) σε παλέτα μουσείου/πατίνας,
ώστε το demo να δείχνει ολοκληρωμένο. Αντικατέστησέ τα με πραγματικά έργα.

Χρήση:  python3 scripts/make_art.py
Output → public/art/
"""
import os, math, random
from PIL import Image, ImageDraw, ImageFilter

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "art")
os.makedirs(OUT, exist_ok=True)

# Παλέτα brand "mie" (κρεμ / ink / κοραλί / ζεστά ουδέτερα)
INK      = (26, 24, 21)
PAPER    = (245, 244, 242)
SOFT     = (236, 232, 224)
CORAL    = (181, 113, 95)
TERRA    = (158, 94, 77)
TAN      = (200, 168, 124)
SAGE     = (146, 152, 132)
PLASTER  = (214, 206, 193)
SLATE    = (92, 86, 76)

PALETTES = [
    [PAPER, SOFT, CORAL, INK],
    [PLASTER, TAN, TERRA, INK],
    [PAPER, SAGE, CORAL, PLASTER],
    [SOFT, CORAL, TAN, INK],
    [PLASTER, SLATE, CORAL, PAPER],
    [PAPER, TAN, SAGE, TERRA],
]

def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

def vgrad(w, h, top, bot):
    img = Image.new("RGB", (w, h))
    px = img.load()
    for y in range(h):
        c = lerp(top, bot, y / max(1, h - 1))
        for x in range(w):
            px[x, y] = c
    return img

def grain(img, amount=10):
    import numpy as np
    arr = np.asarray(img).astype("int16")
    noise = np.random.randint(-amount, amount + 1, arr.shape[:2])
    for ch in range(3):
        arr[:, :, ch] = (arr[:, :, ch] + noise).clip(0, 255)
    return Image.fromarray(arr.astype("uint8"), "RGB")

def composition(w, h, pal, seed):
    rnd = random.Random(seed)
    base = vgrad(w, h, lerp(pal[0], pal[1], 0.15), pal[1])
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    style = seed % 4

    if style == 0:  # large planes / color fields
        for _ in range(rnd.randint(2, 3)):
            c = rnd.choice(pal[1:])
            x0 = rnd.randint(-w // 4, w // 2)
            y0 = rnd.randint(-h // 4, h // 2)
            d.rectangle([x0, y0, x0 + rnd.randint(w // 3, w), y0 + rnd.randint(h // 3, h)],
                        fill=c + (rnd.randint(150, 230),))
    elif style == 1:  # circles / lunar
        for _ in range(rnd.randint(2, 4)):
            c = rnd.choice(pal[1:])
            r = rnd.randint(w // 6, w // 2)
            cx = rnd.randint(0, w); cy = rnd.randint(0, h)
            d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=c + (rnd.randint(120, 210),))
    elif style == 2:  # diagonal bands
        n = rnd.randint(3, 6)
        for i in range(n):
            c = rnd.choice(pal[1:])
            off = int(w * i / n) + rnd.randint(-40, 40)
            d.polygon([(off, 0), (off + w // 5, 0), (off + w // 5 - h, h), (off - h, h)],
                      fill=c + (rnd.randint(120, 200),))
    else:  # brush arcs
        for _ in range(rnd.randint(3, 5)):
            c = rnd.choice(pal[1:])
            bb = [rnd.randint(-w // 3, w // 2), rnd.randint(-h // 3, h // 2),
                  rnd.randint(w // 2, w + w // 3), rnd.randint(h // 2, h + h // 3)]
            d.arc(bb, rnd.randint(0, 180), rnd.randint(180, 360),
                  fill=c + (255,), width=rnd.randint(h // 18, h // 8))

    layer = layer.filter(ImageFilter.GaussianBlur(rnd.choice([0, 0, 1, 2])))
    out = Image.alpha_composite(base.convert("RGBA"), layer).convert("RGB")
    out = grain(out, 8)
    # λεπτό vignette
    vig = Image.new("L", (w, h), 0)
    vd = ImageDraw.Draw(vig)
    vd.ellipse([-w // 4, -h // 4, w + w // 4, h + h // 4], fill=40)
    vig = vig.filter(ImageFilter.GaussianBlur(w // 8))
    dark = Image.new("RGB", (w, h), (0, 0, 0))
    out = Image.composite(out, Image.blend(out, dark, 0.18), vig)
    return out

def save(img, name):
    p = os.path.join(OUT, name)
    img.save(p, quality=86)
    print("  ✓ art/" + name)

# Hero banners (wide)
for i in range(4):
    save(composition(1600, 1000, PALETTES[i % len(PALETTES)], 100 + i), f"hero-{i+1}.jpg")

# Works (square)
for i in range(9):
    save(composition(1000, 1000, PALETTES[i % len(PALETTES)], 200 + i), f"work-{i+1}.jpg")

# Collection tiles (portrait)
for i in range(4):
    save(composition(800, 1000, PALETTES[(i + 2) % len(PALETTES)], 300 + i), f"collection-{i+1}.jpg")

# Feature + editorial + about
save(composition(1400, 900, PALETTES[3], 400), "feature.jpg")
for i in range(3):
    save(composition(900, 1100, PALETTES[(i + 1) % len(PALETTES)], 500 + i), f"editorial-{i+1}.jpg")
save(composition(1000, 1200, PALETTES[1], 600), "portrait.jpg")

print("done")
