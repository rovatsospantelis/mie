#!/usr/bin/env python3
"""
TENLUX STARTER — Icon & OG image generator
===========================================
Φτιάχνει PWA icons + apple-touch + OG image από ένα λογότυπο.

Χρήση:
  python3 scripts/make_assets.py path/to/logo.png "#FFFFFF" "Tagline κειμένου"

Args:
  1) logo path (PNG/JPG — αν έχει φόντο, κάνε keying με --keyed)
  2) background color (hex) για icons/OG
  3) (προαιρετικό) tagline για το OG image

Output → public/  (pwa-192, pwa-512, maskable, apple-touch, og-image)

Απαιτεί: pip install pillow numpy --break-system-packages
"""
import sys, os
from PIL import Image, ImageDraw, ImageFont
import numpy as np

def hex_to_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def load_transparent(src):
    """Φορτώνει logo· αν έχει συμπαγές φόντο, το αφαιρεί με color keying."""
    img = Image.open(src).convert('RGBA')
    arr = np.asarray(img)
    # Αν έχει ήδη alpha (διαφάνεια), κράτησέ το
    if arr.shape[2] == 4 and arr[:, :, 3].min() < 250:
        logo = img
    else:
        rgb = np.asarray(img.convert('RGB')).astype(np.float32)
        h, w, _ = rgb.shape
        c = 24
        corners = np.concatenate([
            rgb[0:c, 0:c].reshape(-1, 3), rgb[0:c, w-c:w].reshape(-1, 3),
            rgb[h-c:h, 0:c].reshape(-1, 3), rgb[h-c:h, w-c:w].reshape(-1, 3),
        ])
        bg = np.median(corners, axis=0)
        dist = np.sqrt(((rgb - bg) ** 2).sum(axis=2))
        alpha = np.clip((dist - 38.0) / (105.0 - 38.0), 0, 1) * 255.0
        logo = Image.fromarray(np.dstack([rgb.astype(np.uint8), alpha.astype(np.uint8)]), 'RGBA')
    return logo.crop(logo.getbbox())

def make_icon(logo, size, frac, bg, path):
    canvas = Image.new('RGBA', (size, size), bg + (255,))
    tw = int(size * frac)
    ratio = tw / logo.width
    th = int(logo.height * ratio)
    mh = int(size * frac)
    if th > mh:
        th = mh; ratio = th / logo.height; tw = int(logo.width * ratio)
    r = logo.resize((tw, th), Image.LANCZOS)
    canvas.paste(r, ((size-tw)//2, (size-th)//2), r)
    canvas.convert('RGB').save(path, 'PNG')
    print('  ✓', os.path.basename(path))

def make_og(logo, bg, tagline, path):
    W, H = 1200, 630
    canvas = Image.new('RGB', (W, H), bg)
    tw = int(W * 0.62)
    ratio = tw / logo.width
    th = int(logo.height * ratio)
    r = logo.resize((tw, th), Image.LANCZOS)
    ly = (H - th)//2 - (18 if tagline else 0)
    canvas.paste(r, ((W-tw)//2, ly), r)
    if tagline:
        draw = ImageDraw.Draw(canvas)
        try:
            font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf', 34)
        except Exception:
            font = ImageFont.load_default()
        tb = draw.textbbox((0,0), tagline, font=font)
        draw.text(((W-(tb[2]-tb[0]))//2, ly+th+6), tagline, fill=(110,102,94), font=font)
    canvas.save(path, 'PNG')
    print('  ✓', os.path.basename(path))

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print(__doc__); sys.exit(1)
    src = sys.argv[1]
    bg = hex_to_rgb(sys.argv[2])
    tagline = sys.argv[3] if len(sys.argv) > 3 else ''
    out = 'public'
    os.makedirs(out, exist_ok=True)
    logo = load_transparent(src)
    print('Generating assets →', out + '/')
    make_icon(logo, 512, 0.72, bg, f'{out}/pwa-512x512.png')
    make_icon(logo, 192, 0.72, bg, f'{out}/pwa-192x192.png')
    make_icon(logo, 512, 0.55, bg, f'{out}/pwa-maskable-512x512.png')
    make_icon(logo, 180, 0.72, bg, f'{out}/apple-touch-icon.png')
    make_og(logo, bg, tagline, f'{out}/og-image.png')
    print('Done.')
