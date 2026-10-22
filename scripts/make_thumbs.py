#!/usr/bin/env python3
"""
mie — Μικρογραφίες έργων για το grid (/works)
=============================================
Για κάθε εικόνα στο public/works/<κατηγορία>/ φτιάχνει μια ελαφριά WebP
στο public/works/<κατηγορία>/thumbs/<όνομα>.webp (μικρή πλευρά 800px).
Τα αυθεντικά δεν αλλάζουν — το lightbox συνεχίζει να τα χρησιμοποιεί.

Χρήση:  python3 scripts/make_thumbs.py          (μόνο όσα λείπουν / άλλαξαν)
        python3 scripts/make_thumbs.py --force  (όλα από την αρχή)

Τρέξ' το ξανά κάθε φορά που προσθέτεις ή αλλάζεις έργο.

Απαιτεί: pip install pillow --break-system-packages
"""
import os, sys
from PIL import Image, ImageOps

ROOT = os.path.join(os.path.dirname(__file__), "..", "public", "works")
SIZE = 800      # px στη μικρή πλευρά (το grid κόβει τετράγωνο)
QUALITY = 80
EXTS = (".png", ".jpg", ".jpeg", ".webp")

force = "--force" in sys.argv
made = skipped = 0

for cat in sorted(os.listdir(ROOT)):
    src_dir = os.path.join(ROOT, cat)
    if not os.path.isdir(src_dir):
        continue
    out_dir = os.path.join(src_dir, "thumbs")
    os.makedirs(out_dir, exist_ok=True)

    for name in sorted(os.listdir(src_dir)):
        if not name.lower().endswith(EXTS):
            continue
        src = os.path.join(src_dir, name)
        out = os.path.join(out_dir, os.path.splitext(name)[0] + ".webp")

        if not force and os.path.exists(out) and os.path.getmtime(out) >= os.path.getmtime(src):
            skipped += 1
            continue

        im = ImageOps.exif_transpose(Image.open(src))
        im = im.convert("RGBA" if im.mode in ("RGBA", "LA", "P") else "RGB")
        scale = SIZE / min(im.size)
        if scale < 1:
            im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
        im.save(out, "WEBP", quality=QUALITY, method=6)

        made += 1
        print(f"  {cat}/{name}  {os.path.getsize(src) // 1024} KB → {os.path.getsize(out) // 1024} KB")

print(f"\n✓ {made} νέες μικρογραφίες, {skipped} ήδη ενημερωμένες")
