"""Synchronize local blog photos across article, listing, and social metadata."""

from __future__ import annotations

import html
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PHOTO_DIR = ROOT / "assets" / "images" / "blog"
SITE = "https://www.ashetag.com/"


def replace_one(source: str, pattern: str, replacement: str, label: str) -> str:
    updated, count = re.subn(pattern, replacement, source, count=1, flags=re.S)
    if count != 1:
        raise ValueError(f"Expected one {label}; found {count}")
    return updated


def photo(slug: str, absolute: bool = False) -> str:
    path = PHOTO_DIR / f"{slug}.jpg"
    if not path.is_file():
        raise FileNotFoundError(path)
    relative = f"assets/images/blog/{slug}.jpg"
    return SITE + relative if absolute else relative


def update_img_for_link(match: re.Match[str]) -> str:
    slug = match.group("slug")
    if not (PHOTO_DIR / f"{slug}.jpg").is_file():
        return match.group(0)
    return match.group("before") + photo(slug) + match.group("after")


def update_shared_links(source: str) -> str:
    # Cards on the listing and in related-article sections.
    source = re.sub(
        r'(?P<before><a href="(?P<slug>[a-z0-9-]+)\.html" class="card__media"[^>]*><img src=")[^"]+(?P<after>")',
        update_img_for_link,
        source,
    )
    # The three blog previews in the shared desktop navigation.
    previews = ["blog-detail", "signs-your-website-needs-a-redesign", "why-we-build-on-wordpress-elementor"]
    for index, slug in enumerate(previews):
        source = re.sub(
            rf'(<img src=")[^"]+("[^>]*data-ck-img="s\.mm\.blog\.{index}\.img")',
            lambda match: match.group(1) + photo(slug) + match.group(2),
            source,
        )
    return source


def update_article(path: Path, source: str) -> str:
    slug = path.stem
    relative = photo(slug)
    absolute = photo(slug, absolute=True)
    title_match = re.search(r'<meta property="og:title" content="([^"]+)"', source)
    if not title_match:
        raise ValueError(f"Missing article title: {path}")
    title = html.unescape(title_match.group(1))
    alt = html.escape(f"Malaysian Chinese AsheTag team working on {title}", quote=True)

    source = replace_one(source, r'(<meta property="og:image" content=")[^"]+', rf'\g<1>{absolute}', "og:image")
    source = replace_one(source, r'(<meta name="twitter:image" content=")[^"]+', rf'\g<1>{absolute}', "twitter:image")
    source = replace_one(source, r'(<meta property="og:image:width" content=")[^"]+', r'\g<1>1672', "og width")
    source = replace_one(source, r'(<meta property="og:image:height" content=")[^"]+', r'\g<1>941', "og height")
    source = replace_one(source, r'(<meta property="og:image:alt" content=")[^"]+', rf'\g<1>{alt}', "og alt")
    source = replace_one(
        source,
        r'(<figure class="article__figure[^>]*>\s*<img src=")[^"]+(" alt=")[^"]+',
        rf'\g<1>{relative}\g<2>{alt}',
        "article hero",
    )
    source = replace_one(
        source,
        r'(<figure class="article__figure[^>]*>\s*<img [^>]*? width=")\d+(" height=")\d+',
        r'\g<1>1672\g<2>941',
        "hero dimensions",
    )
    # The primary ImageObject is the image referenced by WebPage and BlogPosting.
    source = replace_one(
        source,
        r'("@type": "ImageObject",\s*"@id": "[^"]+#primaryimage",\s*"url": ")[^"]+(",\s*"contentUrl": ")[^"]+',
        rf'\g<1>{absolute}\g<2>{absolute}',
        "primary ImageObject",
    )
    source = replace_one(
        source,
        r'("@type": "ImageObject",\s*"@id": "[^"]+#primaryimage",\s*"url": "[^"]+",\s*"contentUrl": "[^"]+",\s*"width": )\d+(,\s*"height": )\d+',
        r'\g<1>1672\g<2>941',
        "primary dimensions",
    )
    return source


def update_listing_schema(source: str) -> str:
    def replace_post(match: re.Match[str]) -> str:
        slug = match.group("slug")
        return match.group("before") + photo(slug, absolute=True) + match.group("after")

    return re.sub(
        r'(?P<before>"@type": "BlogPosting",\s*"@id": "https://www\.ashetag\.com/(?P<slug>[a-z0-9-]+)\.html#article".*?"image": ")[^"]+(?P<after>")',
        replace_post,
        source,
        flags=re.S,
    )


def update_listing_meta(source: str) -> str:
    image = photo("blog-for-business-seo", absolute=True)
    source = replace_one(source, r'(<meta property="og:image" content=")[^"]+', rf'\g<1>{image}', "blog OG image")
    source = replace_one(source, r'(<meta name="twitter:image" content=")[^"]+', rf'\g<1>{image}', "blog Twitter image")
    source = replace_one(source, r'(<meta property="og:image:width" content=")[^"]+', r'\g<1>1672', "blog OG width")
    source = replace_one(source, r'(<meta property="og:image:height" content=")[^"]+', r'\g<1>941', "blog OG height")
    source = replace_one(source, r'(<meta property="og:image:alt" content=")[^"]+', r'\g<1>Malaysian Chinese AsheTag team creating practical business articles', "blog OG alt")
    return source


def main() -> None:
    cards = re.findall(r'<a href="([a-z0-9-]+)\.html" class="card__media"', (ROOT / "blog.html").read_text(encoding="utf-8"))
    article_pages = {
        path.stem
        for path in ROOT.glob("*.html")
        if 'class="article__figure' in path.read_text(encoding="utf-8")
    }
    slugs = set(cards) | article_pages
    missing = sorted(slug for slug in slugs if not (PHOTO_DIR / f"{slug}.jpg").is_file())
    if missing:
        raise FileNotFoundError(f"Missing blog photos: {', '.join(missing)}")

    changed = 0
    for path in ROOT.glob("*.html"):
        raw = path.read_bytes()
        original = raw.decode("utf-8").replace("\r\n", "\n")
        newline = "\r\n" if b"\r\n" in raw else "\n"
        updated = update_shared_links(original)
        if path.stem in slugs:
            updated = update_article(path, updated)
        if path.name == "blog.html":
            updated = update_listing_schema(updated)
            updated = update_listing_meta(updated)
        if updated != original:
            path.write_text(updated, encoding="utf-8", newline=newline)
            changed += 1
    print(f"Updated {changed} pages for {len(slugs)} blog photos")


if __name__ == "__main__":
    main()
