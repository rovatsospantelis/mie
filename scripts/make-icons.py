"""Φτιάχνει favicon / apple-touch / PWA icons από το public/logo.png.

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


def make(size, fill):
    """Logo κεντραρισμένο σε κρεμ τετράγωνο· fill = ποσοστό πλάτους."""
    canvas = Image.new("RGBA", (size, size), BG)
    w = int(size * fill)
    h = round(logo.height * w / logo.width)
    mark = logo.resize((w, h), Image.LANCZOS)
    canvas.alpha_composite(mark, ((size - w) // 2, (size - h) // 2))
    return canvas


# backup των παλιών
backup = ROOT / "old-icons-backup"  # εκτός public, για να μη γίνει deploy
backup.mkdir(exist_ok=True)
for name in ["favicon.svg", "favicon.ico", "favicon-16.png", "favicon-32.png",
             "apple-touch-icon.png", "pwa-192x192.png", "pwa-512x512.png",
             "pwa-maskable-512x512.png"]:
    if (PUBLIC / name).exists():
        shutil.copy2(PUBLIC / name, backup / name)

make(16, 0.96).save(PUBLIC / "favicon-16.png")
make(32, 0.94).save(PUBLIC / "favicon-32.png")
make(64, 0.92).save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
make(180, 0.82).convert("RGB").save(PUBLIC / "apple-touch-icon.png")
make(192, 0.80).save(PUBLIC / "pwa-192x192.png")
make(512, 0.80).save(PUBLIC / "pwa-512x512.png")
make(512, 0.62).save(PUBLIC / "pwa-maskable-512x512.png")  # safe zone για maskable

buf = io.BytesIO()
make(128, 0.92).save(buf, "PNG", optimize=True)
data = base64.b64encode(buf.getvalue()).decode()
(PUBLIC / "favicon.svg").write_text(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'
    '<rect width="64" height="64" rx="13" fill="#F5F4F2"/>'
    f'<image href="data:image/png;base64,{data}" x="0" y="0" width="64" height="64"/>'
    "</svg>"
)

print("OK — icons ενημερώθηκαν (παλιά στο old-icons-backup/)")
