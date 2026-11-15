#!/usr/bin/env python
"""
Verify every HTML product against the DigitallyDefined brand standard.

    python scripts/brand_check.py           # all files
    python scripts/brand_check.py a.html    # specific files

Exit code 0 = all clean, 1 = at least one violation.
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKIP_DIRS = {".git", "node_modules", "dist"}
STYLE_ID = "dd-brand-standard"

APPROVED = {
    # core palette
    "#F18B25", "#47B7D4", "#C20F0A",
    # ink / neutrals
    "#111111", "#5F5F5F", "#B8B8B8", "#FFFFFF", "#0F0F0F", "#2E2E2E", "#000000",
    # surfaces
    "#FFFCF9", "#FFFAF5", "#FFF0DE", "#E6F5F9", "#FBEAEA", "#FFFFC9", "#F0F8FF",
    # washes used by the brand layer
    "#FFE9D6", "#D7F0F7",
}

BANNED_FONTS = [
    "JetBrains Mono", "Plus Jakarta Sans", "Space Grotesk", "IBM Plex Mono",
    "Roboto", "Montserrat", "Poppins", "Playfair Display", "Lato",
    "Open Sans", "Source Sans Pro", "Merriweather", "Nunito", "Raleway",
    "Work Sans", "Manrope", "Outfit", "Sora", "DM Mono", "Fira Code",
]

BRAND_BLOCK_RE = re.compile(rf'<style id="{STYLE_ID}">(.*?)</style>', re.S)
HEX_RE = re.compile(r"#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b")
RADIUS_RE = re.compile(r"border(?:-[a-z]+)*-radius\s*:\s*([^;}\"']+)", re.I)
SHADOW_RE = re.compile(r"(box-shadow|text-shadow)\s*:\s*([^;}\"']+)", re.I)
WIDTH_RE = re.compile(
    r"border(?:-(?:top|bottom|left|right))?(?:-width)?\s*:\s*"
    r"(?:(\d*\.?\d+)\s*px\s+)?[a-z]+\s+[^;}\n]*?"
    r"|border(?:-(?:top|bottom|left|right))?\s*:\s*(\d*\.?\d+)\s*px",
    re.I,
)


def norm_hex(h: str) -> str:
    h = h.upper()
    if len(h) == 4:
        h = "#" + "".join(c * 2 for c in h[1:])
    return h


def strip_brand_block(text: str) -> str:
    return BRAND_BLOCK_RE.sub("", text)


def check(path: Path) -> list[str]:
    problems: list[str] = []
    text = path.read_text(encoding="utf-8", errors="surrogateescape")
    body = strip_brand_block(text)

    # 1. canonical layer present
    block = BRAND_BLOCK_RE.search(text)
    if not block:
        problems.append(f'missing <style id="{STYLE_ID}">')
    else:
        css = block.group(1)
        for token, value in (("--dd-orange", "#F18B25"), ("--dd-blue", "#47B7D4"),
                             ("--dd-red", "#C20F0A"), ("--dd-ink", "#111111")):
            if token not in css:
                problems.append(f"brand block missing {token}")
            elif value.lower() not in css.lower():
                problems.append(f"{token} is not {value}")

    # 2. official typefaces only
    if not re.search(r"family=Inter", text) or not re.search(r"family=DM\+Sans", text):
        problems.append("missing Inter + DM Sans font link")
    faces = set()
    for m in re.finditer(r"font-family\s*:\s*([^;}\"'<]+)", body, re.I):
        faces.update(p.strip().strip("'\"").lower() for p in m.group(1).split(","))
    faces.update(
        f.split(":")[0].replace("+", " ").strip().lower()
        for f in re.findall(r"family=([^&\"']+)", body)
    )
    for font in BANNED_FONTS:
        if font.lower() in faces:
            problems.append(f"third typeface {font}")

    # 3. off-palette colours
    offenders: dict[str, int] = {}
    for m in HEX_RE.finditer(body):
        h = norm_hex(m.group(0))
        if h in APPROVED:
            continue
        # 3-digit expansions of approved colours
        if h in {"#000000", "#111111", "#FFFFFF"}:
            continue
        offenders[h] = offenders.get(h, 0) + 1
    if offenders:
        listed = ", ".join(f"{h}x{c}" for h, c in
                           sorted(offenders.items(), key=lambda kv: -kv[1])[:6])
        problems.append(f"off-palette colours ({len(offenders)}): {listed}")

    # 4. flat + square
    radii = [m.group(1).strip() for m in RADIUS_RE.finditer(body)
             if m.group(1).strip().rstrip("!important").strip() not in ("0", "0px", "none")]
    if radii:
        problems.append(f"border-radius not 0 x{len(radii)}: {radii[:3]}")
    shadows = [m.group(2).strip() for m in SHADOW_RE.finditer(body)
               if m.group(2).strip().rstrip("!important").strip().lower() != "none"]
    if shadows:
        problems.append(f"shadows x{len(shadows)}: {shadows[:2]}")

    # 5. 1px frames only
    thick = []
    for m in re.finditer(r"border(?:-(?:top|bottom|left|right))?\s*:\s*(\d*\.?\d+)px\s+([a-z]+)", body, re.I):
        width, style = float(m.group(1)), m.group(2).lower()
        if (width > 1) or (style != "solid" and style != "none"):
            thick.append(m.group(0))
    for m in re.finditer(r"border-width\s*:\s*(\d*\.?\d+)px", body, re.I):
        if float(m.group(1)) > 1:
            thick.append(m.group(0))
    if thick:
        problems.append(f"frames over 1px / not solid x{len(thick)}: {thick[:3]}")

    # 6. official lockup somewhere on the page
    if 'class="dd-brandmark"' not in text and "DDIBLE" not in text:
        if not re.search(r'class="[^"]*dd-brand(?:mark|bar)', text):
            problems.append("no official DIGITALLYDEFINED lockup")

    return problems


def html_files() -> list[Path]:
    out = []
    for p in sorted(ROOT.rglob("*.html")):
        if any(part in SKIP_DIRS for part in p.parts):
            continue
        if p.parent.name in ("brand", "brand-review"):
            continue
        out.append(p)
    return out


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("files", nargs="*")
    ap.add_argument("-q", "--quiet", action="store_true", help="only list failures")
    args = ap.parse_args()

    targets = [Path(f) for f in args.files] if args.files else html_files()
    failed = 0
    for p in targets:
        problems = check(p)
        rel = p.relative_to(ROOT) if p.is_relative_to(ROOT) else p
        if problems:
            failed += 1
            print(f"FAIL  {rel}")
            for x in problems:
                print(f"      - {x}")
        elif not args.quiet:
            print(f"PASS  {rel}")

    total = len(targets)
    print(f"\n{total - failed}/{total} clean, {failed} with violations")
    return 0 if failed == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
