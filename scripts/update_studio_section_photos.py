"""Keep Studio section and shared navigation photos consistent across static pages."""

from __future__ import annotations

import html
import re
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
IMAGE_DIR = ROOT / "assets" / "images" / "studio"

# data-ck-img key -> (asset filename, meaningful alt text, width, height)
PHOTOS = {
    "h.svc.0.img": ("ai-website-build.jpg", "Malaysian AsheTag designer building a website on a desktop screen with Claude and Codex badges above", 1200, 900),
    "h.svc.1.img": ("custom-wordpress-websites.jpg", "AsheTag designer editing a custom WordPress website with Elementor for a Malaysian client", 1200, 900),
    "h.svc.2.img": ("website-care-maintenance.jpg", "AsheTag specialist checking website backups, security updates and performance", 1200, 900),
    "h.why.img": ("why-ashetag.jpg", "Malaysian Chinese AsheTag team reviewing website performance in Kuala Lumpur", 1400, 350),
    "h.about.img": ("who-we-are.jpg", "Malaysian Chinese AsheTag team collaborating in matching navy and violet polos", 1200, 900),
    "ab.split1.img": ("who-we-are.jpg", "Malaysian Chinese AsheTag team planning websites together in Kuala Lumpur", 1200, 900),
    "ab.split2.img": ("our-approach.jpg", "AsheTag designers measuring website results with a Malaysian client", 1200, 900),
    "s.mm.about.0.img": ("who-we-are.jpg", "The Malaysian Chinese AsheTag web design team", 1200, 900),
    "s.mm.about.1.img": ("our-approach.jpg", "AsheTag designers reviewing a client website and results", 1200, 900),
    "s.mm.about.2.img": ("why-ashetag-preview.jpg", "AsheTag team reviewing website performance in Kuala Lumpur", 1200, 900),
    "s.mm.services.0.img": ("ai-website-build.jpg", "Website build on a desktop with Claude and Codex badges", 1200, 900),
    "s.mm.services.1.img": ("custom-wordpress-websites.jpg", "Custom WordPress website being edited in Elementor", 1200, 900),
    "s.mm.services.2.img": ("website-care-maintenance.jpg", "Website backup, security and performance dashboard", 1200, 900),
}


def update_tag(match: re.Match[str], counts: Counter[str]) -> str:
    tag = match.group(0)
    key_match = re.search(r'data-ck-img="([^"]+)"', tag)
    if not key_match or key_match.group(1) not in PHOTOS:
        return tag
    key = key_match.group(1)
    filename, alt, width, height = PHOTOS[key]
    if not (IMAGE_DIR / filename).is_file():
        raise FileNotFoundError(IMAGE_DIR / filename)
    values = {
        "src": f"assets/images/studio/{filename}",
        "alt": html.escape(alt, quote=True),
        "width": str(width),
        "height": str(height),
    }
    for attribute, value in values.items():
        tag, count = re.subn(rf'\b{attribute}="[^"]*"', f'{attribute}="{value}"', tag, count=1)
        if count != 1:
            raise ValueError(f"Missing {attribute} for {key}")
    counts[key] += 1
    return tag


def main() -> None:
    counts: Counter[str] = Counter()
    changed = 0
    for path in ROOT.glob("*.html"):
        raw = path.read_bytes()
        original = raw.decode("utf-8").replace("\r\n", "\n")
        newline = "\r\n" if b"\r\n" in raw else "\n"
        updated = re.sub(r'<img\b[^>]*\bdata-ck-img="[^"]+"[^>]*>', lambda match: update_tag(match, counts), original)
        if updated != original:
            path.write_text(updated, encoding="utf-8", newline=newline)
            changed += 1
    missing_keys = PHOTOS.keys() - counts.keys()
    if missing_keys:
        raise ValueError(f"No image tags found for: {', '.join(sorted(missing_keys))}")
    print(f"Updated {changed} pages for {len(PHOTOS)} Studio image placements")


if __name__ == "__main__":
    main()
