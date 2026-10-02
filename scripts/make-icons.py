"""Φτιάχνει favicon / apple-touch / PWA icons + OG image (link preview) από το public/logo.png.

Favicons (16/32/ico/svg): μόνο το «M» — το «ie» δεν διαβάζεται σε 16px.
Μετά από αλλαγή logo, ανέβασε το ?v= του og-image στο index.html ώστε
WhatsApp / Facebook / Viber να μην δείχνουν την παλιά cached εικόνα.

Χρήση:  python3 scripts/make-icons.py
"""
import base64
import io
import shutil
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
BG = (245, 244, 242, 255)  # brand cream, ίδιο με --color-bg

logo = Image.open(PUBLIC / "logo.png").convert("RGBA")
logo = logo.crop(logo.getbbox())


def m_only(img):
    """Κρατά μόνο το «M»: κόβει στο πρώτο κενό κάθετο διάκενο από αριστερά."""
    alpha = img.getchannel("A")
    for x in range(img.width // 3, img.width):
        if alpha.crop((x, 0, x + 1, img.height)).getbbox() is None:
            m = img.crop((0, 0, x, img.height))
            return m.crop(m.getbbox())
    return img


mark_m = m_only(logo)


def make(size, fill, src=logo):
    """Logo κεντραρισμένο σε κρεμ τετράγωνο· fill = ποσοστό της μεγαλύτερης διάστασης."""
    canvas = Image.new("RGBA", (size, size), BG)
    scale = size * fill / max(src.width, src.height)
    w, h = round(src.width * scale), round(src.height * scale)
    mark = src.resize((w, h), Image.LANCZOS)
    canvas.alpha_composite(mark, ((size - w) // 2, (size - h) // 2))
    return canvas


def make_og(width=1200, height=630, fill=0.5):
    """OG / link-preview εικόνα: logo στο κέντρο σε κρεμ φόντο."""
    canvas = Image.new("RGBA", (width, height), BG)
    w = int(width * fill)
    h = round(logo.height * w / logo.width)
    mark = logo.resize((w, h), Image.LANCZOS)
    canvas.alpha_composite(mark, ((width - w) // 2, (height - h) // 2))
    return canvas.convert("RGB")


# backup των παλιών
backup = ROOT / "old-icons-backup"  # εκτός public, για να μη γίνει deploy
backup.mkdir(exist_ok=True)
for name in ["favicon.svg", "favicon.ico", "favicon-16.png", "favicon-32.png",
             "apple-touch-icon.png", "pwa-192x192.png", "pwa-512x512.png",
             "pwa-maskable-512x512.png", "og-image.png"]:
    if (PUBLIC / name).exists():
        shutil.copy2(PUBLIC / name, backup / name)

make(16, 0.96, mark_m).save(PUBLIC / "favicon-16.png")
make(32, 0.94, mark_m).save(PUBLIC / "favicon-32.png")
make(64, 0.92, mark_m).save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
make(180, 0.82).convert("RGB").save(PUBLIC / "apple-touch-icon.png")
make(192, 0.80).save(PUBLIC / "pwa-192x192.png")
make(512, 0.80).save(PUBLIC / "pwa-512x512.png")
make(512, 0.62).save(PUBLIC / "pwa-maskable-512x512.png")  # safe zone για maskable
make_og().save(PUBLIC / "og-image.png", optimize=True)

buf = io.BytesIO()
make(128, 0.92, mark_m).save(buf, "PNG", optimize=True)
data = base64.b64encode(buf.getvalue()).decode()
(PUBLIC / "favicon.svg").write_text(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'
    '<rect width="64" height="64" rx="13" fill="#F5F4F2"/>'
    f'<image href="data:image/png;base64,{data}" x="0" y="0" width="64" height="64"/>'
    "</svg>"
)

print("OK — icons ενημερώθηκαν (παλιά στο old-icons-backup/)")
