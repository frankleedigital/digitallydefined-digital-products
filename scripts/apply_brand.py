#!/usr/bin/env python
"""
Apply the DigitallyDefined brand standard to every HTML product.

    python scripts/apply_brand.py            # rewrite files
    python scripts/apply_brand.py --dry-run  # report only

What it does, per file:
  1. Retires third typefaces (JetBrains Mono / Plus Jakarta Sans / Space Grotesk)
     so only Inter + DM Sans remain, and guarantees the Google Fonts link.
  2. Maps every off-brand colour to a brand token -- hue-aware for brand drift,
     luminance- and property-aware for neutrals -- so no stray greys, greens,
     purples or dark-red variants survive.
  3. Repairs the `border: var(--x)` shorthand trap: structural variables become
     colours and every border declaration is rewritten to `1px solid var(--x)`,
     otherwise the shorthand resolves to an invalid value and the frame vanishes.
  4. Normalises every frame to 1px solid (2px/3px/1.5px and dashed -> 1px solid).
  5. Inlines the canonical block from brand/dd-brand.css as
     <style id="dd-brand-standard"> immediately before </head>.
  6. Inserts the official DIGITALLYDEFINED. brand bar.

Idempotent: safe to re-run.
"""

from __future__ import annotations

import argparse
import colorsys
import html
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BRAND_CSS = ROOT / "brand" / "dd-brand.css"
SKIP_DIRS = {".git", "node_modules", "dist"}

STYLE_ID = "dd-brand-standard"
FONT_LINK_ID = "dd-brand-fonts"
FONT_HREF = (
    "https://fonts.googleapis.com/css2"
    "?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400"
    "&family=Inter:ital,wght@0,400;0,600;0,700;0,800;0,900;1,900"
    "&display=swap"
)

# ── Brand tokens ────────────────────────────────────────────────────────────
ORANGE, BLUE, RED = "#F18B25", "#47B7D4", "#C20F0A"
INK, MUTED, MUTED_ON_DARK = "#111111", "#5F5F5F", "#B8B8B8"
BG, CARD, PANEL = "#FFFCF9", "#FFFFFF", "#FFFAF5"
WASH_O, WASH_B, WASH_R = "#FFF0DE", "#E6F5F9", "#FBEAEA"
BRAND_TOKENS = {ORANGE, BLUE, RED, INK, MUTED, MUTED_ON_DARK, BG, CARD, PANEL,
                WASH_O, WASH_B, WASH_R, "#F0F8FF", "#FFFFC9", "#0F0F0F"}

# Explicit drift -> token. These were a *different colour* wearing a brand name.
EXPLICIT = {
    # dark-red / maroon variants that were standing in for #C20F0A
    "#8B1A0A": RED, "#D64545": RED, "#C60201": RED, "#B91C1C": RED, "#8B0A06": RED,
    # aqua / teal variants that were standing in for #47B7D4
    "#42BCCC": BLUE, "#12788A": BLUE, "#1A6A80": BLUE, "#0369A1": BLUE, "#127968": BLUE,
    # green implied "success"; brand has no green -- secondary blue carries it
    "#1A7A4A": BLUE, "#1A7A3A": BLUE, "#15803D": BLUE, "#2A9D5C": BLUE, "#4ADE80": BLUE,
    "#A7F3D0": WASH_B, "#DCFCE7": WASH_B,
    # orange variants -> canonical orange
    "#F58F17": ORANGE, "#C55A00": ORANGE, "#D4761A": ORANGE, "#D47520": ORANGE,
    "#E07D1B": ORANGE, "#C96E14": ORANGE, "#B45309": ORANGE, "#FFD21E": ORANGE,
    "#FED7AA": WASH_O, "#FBCFE8": WASH_O, "#DDD6FE": ORANGE, "#FFE9D6": WASH_O,
    # washes
    "#FFE0DF": WASH_R, "#FEE2E2": WASH_R, "#FFF0F0": WASH_R,
    "#FFF5F5": WASH_R, "#FFF3E5": WASH_O, "#F0F9FF": WASH_B,
    "#D7F0F7": WASH_B, "#E0F2FE": WASH_B, "#E2E8F0": MUTED,
    "#FEE9CC": WASH_O, "#FEF3C7": WASH_O, "#FFF5EB": WASH_O, "#FFF2CC": WASH_O,
    # light surfaces
    "#FFFDF0": BG, "#FFFBF4": BG, "#F4F4F0": BG,
    "#FAFAFA": PANEL, "#F9F9F9": PANEL, "#F7F7F7": PANEL, "#F3F4F6": PANEL,
    "#F9FAFB": PANEL, "#F8F5F0": PANEL, "#F0EDE8": PANEL, "#CBD5E0": PANEL,
    # neutrals
    "#2D3748": INK, "#2B2B2B": INK, "#1A202C": INK, "#333333": INK, "#374151": INK,
    "#555555": MUTED, "#666666": MUTED, "#888888": MUTED, "#999999": MUTED,
    "#AAAAAA": MUTED, "#B9B9B9": MUTED, "#4A4A4A": MUTED, "#4B5563": MUTED,
    "#6B6B6B": MUTED, "#6B7280": MUTED, "#9CA3AF": MUTED, "#A0AEC0": MUTED,
    # hairline greys -> brand frame
    "#EEEEEE": INK, "#E5E5E5": INK, "#DDDDDD": INK, "#CCCCCC": INK,
    "#F0F0F0": INK, "#E5E7EB": INK,
}

STRUCTURAL_VARS = {
    "border", "dd-border", "bdr", "line", "frame", "dd-frame", "dd-frame-sm",
    "black-border", "border-gray",
}
BG_VARS = {"bg", "cream-bg", "cream"}
CARD_VARS = {"card", "card-bg", "dd-card-bg", "pure-white", "white", "dd-white"}
PANEL_VARS = {"panel", "light-gray"}
INK_VARS = {"text", "dd-text", "ink", "dk", "black", "dark-grey"}
MUTED_VARS = {"muted", "medium-grey"}
ORANGE_VARS = {"or", "orange", "orange-highlight", "accent", "primary", "dd-accent-primary"}
BLUE_VARS = {"bl", "aqua", "dd-aqua", "dd-blue", "aqua-blue", "secondary", "dd-accent-secondary"}
RED_VARS = {"rd", "red", "dd-red", "deep-red-warning", "tertiary", "dd-accent-tertiary"}
DARK_VARS = {"dark", "dd-dark"}


def hex_to_rgb(h: str) -> tuple[int, int, int]:
    h = h.strip().lstrip("#")
    if len(h) == 3:
        h = "".join(c * 2 for c in h)
    if len(h) >= 6:
        h = h[:6]
    return int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)


def luminance(h: str) -> float:
    def ch(v: int) -> float:
        v /= 255
        return v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4
    r, g, b = (ch(c) for c in hex_to_rgb(h))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def hue_sat(h: str) -> tuple[float, float]:
    r, g, b = (c / 255 for c in hex_to_rgb(h))
    hh, ll, ss = colorsys.rgb_to_hls(r, g, b)
    return hh * 360, ss * (1 - abs(2 * ll - 1))


def nearest_brand_by_hue(h: str) -> str:
    hue, sat = hue_sat(h)
    if sat < 0.18:
        return INK if luminance(h) < 0.5 else MUTED
    if 55 <= hue < 165:      # greens/yellow-green -> secondary
        return BLUE
    if 20 <= hue < 55:       # amber/orange/yellow -> primary
        return ORANGE
    if 165 <= hue < 250:     # cyan/blue -> secondary
        return BLUE
    if hue >= 300:           # magenta/pink -> primary accent
        return ORANGE
    return RED


def enclosing_block(text: str, pos: int) -> str:
    start = text.rfind("{", 0, pos)
    end = text.find("}", pos)
    if start == -1 or end == -1:
        return ""
    return text[start:end]


def enclosing_selector(text: str, pos: int) -> str:
    """Selector text of the CSS rule that contains `pos`."""
    brace = text.rfind("{", 0, pos)
    if brace == -1:
        return ""
    prev = max(text.rfind("}", 0, brace), text.rfind("{", 0, brace))
    return text[prev + 1:brace]


def var_map(text: str) -> dict[str, str]:
    """Custom-property name -> raw value, for resolving `background: var(--x)`."""
    out: dict[str, str] = {}
    for m in re.finditer(r"(--[\w-]+)\s*:\s*([^;{}\n]+)", text):
        out.setdefault(m.group(1), m.group(2).strip())
    return out


_VAR_CACHE: dict[int, dict[str, str]] = {}


def _vars(text: str) -> dict[str, str]:
    key = hash(text)
    if key not in _VAR_CACHE:
        _VAR_CACHE[key] = var_map(text)
    return _VAR_CACHE[key]


def is_dark_value(value: str, varmap: dict[str, str], depth: int = 0) -> bool:
    value = value.strip().lower()
    if value in ("black", "#000", "#000000", "#0f0f0f"):
        return True
    m = re.fullmatch(r"var\(\s*(--[\w-]+)\s*\)", value)
    if m and depth < 4:
        nxt = varmap.get(m.group(1))
        if nxt:
            return is_dark_value(nxt, varmap, depth + 1)
        return False
    if re.fullmatch(r"#[0-9a-f]{6}|#[0-9a-f]{3}", value):
        return luminance(value) < 0.3
    return False


def dark_backdrops(text: str) -> set[str]:
    """Every class / tag selector whose rule paints a dark background."""
    vm = _vars(text)
    found: set[str] = set()
    for m in re.finditer(r"([^{}]+)\{([^}]*)\}", text):
        selector, body = m.group(1), m.group(2)
        if any(
            is_dark_value(bg.group(1), vm)
            for bg in re.finditer(r"background(?:-color)?\s*:\s*([^;}]+)", body)
        ):
            found.update(re.findall(r"[.#][\w-]+", selector))
    return found


_DARK_CACHE: dict[int, set[str]] = {}


def in_dark_context(text: str, pos: int, block: str) -> bool:
    if has_dark_backdrop(block, text):
        return True
    key = hash(text)
    if key not in _DARK_CACHE:
        _DARK_CACHE[key] = dark_backdrops(text)
    darks = _DARK_CACHE[key]
    tokens = re.findall(r"[.#][\w-]+", enclosing_selector(text, pos))
    return any(t in darks for t in tokens)


def has_dark_backdrop(block: str, text: str = "") -> bool:
    vm = _vars(text) if text else {}
    for m in re.finditer(r"background(?:-color)?\s*:\s*([^;}]+)", block):
        if is_dark_value(m.group(1), vm):
            return True
    return False


FOREGROUND_PROPS = {"color", "fill", "stroke", "caret-color", "text-decoration-color"}
# Only the dark neutrals need a light twin on a dark card; whites and washes stay.
DARK_SURFACE_FIXUPS = {INK, MUTED}


def classify(prop: str, value_hex: str, block: str, dark: bool = False) -> str:
    """Return the brand token a given declaration should use."""
    hx = value_hex.upper()
    prop = prop.lower()

    # Custom properties are document-scoped, so the role in the name decides.
    if prop.startswith("--"):
        name = prop[2:]
        for names, token in (
            (STRUCTURAL_VARS, INK), (BG_VARS, BG), (CARD_VARS, CARD),
            (PANEL_VARS, PANEL), (INK_VARS, INK), (MUTED_VARS, MUTED),
            (ORANGE_VARS, ORANGE), (BLUE_VARS, BLUE), (RED_VARS, RED),
            (DARK_VARS, "#0F0F0F"),
        ):
            if name in names:
                return token
        return EXPLICIT.get(hx) or (hx if hx in BRAND_TOKENS else nearest_brand_by_hue(hx))

    base = EXPLICIT.get(hx)
    if base is None and hx in BRAND_TOKENS:
        base = hx
    if base is None:
        lum = luminance(hx)
        if prop.startswith("background"):
            base = PANEL if lum >= 0.25 else "#0F0F0F"
            if lum > 0.93:
                base = PANEL
            elif lum > 0.82:
                base = BG
        elif prop.startswith("border") or prop in ("outline", "outline-color") or prop.endswith("border-color"):
            base = INK
        elif prop in FOREGROUND_PROPS:
            base = MUTED if lum > 0.55 else INK
        else:
            base = nearest_brand_by_hue(hx)

    # Neutrals that would vanish against a dark card get their light twin.
    if dark and base in DARK_SURFACE_FIXUPS:
        if prop.startswith("border") or prop.startswith("outline") or prop.endswith("border-color"):
            return MUTED
        if prop in FOREGROUND_PROPS:
            return MUTED_ON_DARK
    return base


DECL_RE = re.compile(
    r"([A-Za-z-]{2,30})\s*:\s*([^;{}\n]*?)(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3})\b"
)


def normalize_hexes(text: str, stats: dict) -> str:
    out, last = [], 0
    for m in DECL_RE.finditer(text):
        prop, hexval = m.group(1), m.group(3)
        if len(hexval) == 4:
            hexval = "#" + "".join(c * 2 for c in hexval[1:])
        block = enclosing_block(text, m.start())
        dark = in_dark_context(text, m.start(), block)
        target = classify(prop, hexval, block, dark)
        if target.upper() == hexval.upper():
            continue
        out.append(text[last:m.start(3)])
        out.append(target)
        last = m.end(3)
        stats["colors"] += 1
    out.append(text[last:])
    return "".join(out)


# Bare hexes: Tailwind arbitrary values `bg-[#RRGGBB]` and JS string literals
BARE_HEX_RE = re.compile(r"#[0-9a-fA-F]{6}\b")


def _bare_target(text: str, start: int) -> str:
    ctx = text[max(0, start - 24):start].lower()
    m = re.search(r"(bg|background|fill|stroke|border|text|color|shadow|outline)[\w.\[\]-]*$", ctx)
    role = m.group(1) if m else ""
    return role


def normalize_bare_hexes(text: str, stats: dict) -> str:
    out, last = [], 0
    for m in BARE_HEX_RE.finditer(text):
        hx = m.group(0).upper()
        role = _bare_target(text, m.start())
        if hx in EXPLICIT:
            target = EXPLICIT[hx]
        elif hx in BRAND_TOKENS:
            continue
        else:
            lum = luminance(hx)
            if role in ("text", "color", "fill", "stroke"):
                target = MUTED if lum > 0.55 else INK
            elif role in ("border", "outline"):
                target = INK
            elif lum > 0.93:
                target = PANEL
            elif lum > 0.82:
                target = BG
            else:
                target = nearest_brand_by_hue(hx)
        if target.upper() == hx:
            continue
        out.append(text[last:m.start()])
        out.append(target)
        last = m.end()
        stats["colors"] += 1
    out.append(text[last:])
    return "".join(out)


# ── Structural repairs ─────────────────────────────────────────────────────
VAR_DECL_RE = re.compile(
    r"(--(?:[A-Za-z0-9-]*?-)?(?:%s))\s*:\s*([^;{}\n]+)" % "|".join(
        sorted(STRUCTURAL_VARS, key=len, reverse=True)
    )
)


def normalize_structural_vars(text: str, stats: dict) -> str:
    def repl(m: re.Match) -> str:
        name, value = m.group(1), m.group(2).strip()
        if "solid" in value or "dashed" in value or "dotted" in value:
            stats["var_repairs"] += 1
            return f"{name}: {INK}"
        return m.group(0)

    return VAR_DECL_RE.sub(repl, text)


BORDER_SHORTHAND_RE = re.compile(
    r"(?<![\w-])border(-top|-bottom|-left|-right)?\s*:\s*var\(\s*(--(?:[A-Za-z0-9-]*?-)?(?:%s))\s*\)"
    % "|".join(sorted(STRUCTURAL_VARS, key=len, reverse=True))
)


def fix_border_shorthand(text: str, stats: dict) -> str:
    def repl(m: re.Match) -> str:
        stats["border_repairs"] += 1
        side = m.group(1) or ""
        return f"border{side}: 1px solid var({m.group(2)})"

    return BORDER_SHORTHAND_RE.sub(repl, text)


BORDER_WIDTH_RE = re.compile(
    r"(?<![\w-])border(-top|-bottom|-left|-right)?\s*:\s*(\d*\.?\d+)\s*px\s+"
    r"(solid|dashed|dotted|double)(?:\s+([^;}\n]+))?",
    re.I,
)


def normalize_border_width(text: str, stats: dict) -> str:
    def repl(m: re.Match) -> str:
        side, width = m.group(1) or "", m.group(2).strip()
        style = m.group(3).lower()
        color = (m.group(4) or "").strip()
        if width in ("0", "0.0"):
            return m.group(0)
        if width in ("1", "1.0") and style == "solid":
            return m.group(0)
        stats["width_repairs"] += 1
        return f"border{side}: 1px solid {color}".rstrip()

    return BORDER_WIDTH_RE.sub(repl, text)


RADIUS_DECL_RE = re.compile(r"(?<![\w-])(border(?:-[a-z]+)*-radius)\s*:\s*([^;}\n]+)", re.I)


def square_corners(text: str, stats: dict) -> str:
    def repl(m: re.Match) -> str:
        if m.group(2).strip().rstrip("!important").strip().lower() in ("0", "0px", "none"):
            return m.group(0)
        stats["radii"] += 1
        return f"{m.group(1)}: 0"

    return RADIUS_DECL_RE.sub(repl, text)


# ── Typography ─────────────────────────────────────────────────────────────
RETIRED_FACES = [
    "JetBrains Mono", "Plus Jakarta Sans", "Space Grotesk", "IBM Plex Mono",
    "IBM Plex Sans", "Roboto", "Roboto Mono", "Montserrat", "Poppins",
    "Playfair Display", "Lato", "Open Sans", "Source Sans Pro", "Merriweather",
    "Nunito", "Raleway", "Work Sans", "Manrope", "Outfit", "Sora",
    "Fira Code", "Fira Sans", "DM Mono", "Georgia", "Helvetica Neue",
    "Arial", "Verdana", "Tahoma", "Trebuchet MS", "Courier New",
]
KEEP_FACES = {"inter", "dm sans", "sans-serif", "system-ui", "-apple-system",
              "segoe ui", "ui-sans-serif", "inherit", "serif", "monospace"}
QUOTED_FACE_RE = re.compile(
    r"""(['"])(%s)\1""" % "|".join(re.escape(f) for f in
                                  sorted(RETIRED_FACES, key=len, reverse=True))
)
FONT_FAMILY_DECL_RE = re.compile(
    r"(font-family\s*:\s*)([^;}\n]+?)(?=\s*[;}]|\s*[\"']\s*>|\s*<|\s*$)", re.I | re.M
)

# The declaration pass used to prepend `'Inter'` in front of an already-quoted
# list, producing `'Inter''DM Sans'` (invalid CSS). Repair that first.
DOUBLED_FACE_RE = re.compile(r"""(['"])Inter\1\s*(['"])([^'"]+)\2""")


def repair_doubled_faces(text: str, stats: dict) -> str:
    def repl(m: re.Match) -> str:
        stats["fonts"] += 1
        return f"{m.group(2)}{m.group(3)}{m.group(2)}"

    return DOUBLED_FACE_RE.sub(repl, text)


def _brand_family_list(value: str, q: str = "'") -> str:
    parts = [p.strip().strip("'\"") for p in value.split(",")]
    kept: list[str] = []
    for p in parts:
        low = p.lower()
        if low in ("inter", "dm sans"):
            face = "Inter" if low == "inter" else "DM Sans"
            kept.append(f"{q}{face}{q}")
        elif low in KEEP_FACES:
            kept.append(p)
    # Only lead with Inter when the stack holds no brand face at all; a
    # declaration that already asks for DM Sans must keep DM Sans first.
    if not any(k.strip("'\"").lower() in ("inter", "dm sans") for k in kept):
        kept.insert(0, f"{q}Inter{q}")
    return ", ".join(kept)


def retire_third_typefaces(text: str, stats: dict) -> str:
    def quoted(m: re.Match) -> str:
        stats["fonts"] += 1
        return f"{m.group(1)}Inter{m.group(1)}"

    text = QUOTED_FACE_RE.sub(quoted, text)

    def family(m: re.Match) -> str:
        raw = m.group(2)
        if "var(--" in raw:
            return m.group(0)
        core, tail = raw, ""
        # An unterminated inline style (`... sans-serif"`) keeps its closing
        # quote out of the rewrite: an odd count means that quote is a delimiter.
        stripped = raw.rstrip()
        if stripped and stripped[-1] in "'\"" and raw.count(stripped[-1]) % 2 == 1:
            tail = " " + stripped[-1]
            core = stripped[:-1]
        # Preserve the quote style already used in this declaration.
        q = "'"
        for cand in ("'", '"'):
            if core.count(cand) >= 2:
                q = cand
                break
        new = _brand_family_list(core, q)
        if new != core.strip():
            stats["fonts"] += 1
        return f"{m.group(1)}{new}{tail}"

    text = FONT_FAMILY_DECL_RE.sub(family, text)

    def family_param(m: re.Match) -> str:
        name = m.group(1).split(":")[0].replace("+", " ").strip().lower()
        if name in ("inter", "dm sans"):
            return m.group(0)
        stats["fonts"] += 1
        return ""

    text = re.sub(r"family=([^&\"']+)", family_param, text)
    text = re.sub(r"&&+", "&", text)
    text = re.sub(r"\?&", "?", text)
    text = re.sub(r"&(\"|')", r"\1", text)
    return text


def ensure_font_link(text: str, stats: dict) -> str:
    head = text.lower().find("</head>")
    if head == -1:
        return text
    if FONT_LINK_ID in text and "DM+Sans" in text and "Inter" in text:
        return text
    if re.search(r"family=Inter[^\"']*family=DM\+Sans", text) or re.search(
        r"family=DM\+Sans[^\"']*family=Inter", text
    ):
        return text
    link = f'<link id="{FONT_LINK_ID}" rel="stylesheet" href="{FONT_HREF}">'
    stats["font_links"] += 1
    return text[:head] + link + "\n" + text[head:]


# ── Brand block + brand bar ────────────────────────────────────────────────
def install_brand_block(text: str, css: str, stats: dict) -> str:
    block = f'<style id="{STYLE_ID}">\n{css}\n</style>'
    existing = re.search(
        rf'<style id="{STYLE_ID}">.*?</style>', text, re.S | re.I
    )
    if existing:
        text = text[: existing.start()] + block + text[existing.end():]
        stats["block_updated"] += 1
        return text
    head = text.lower().find("</head>")
    if head == -1:
        # Fragment files (no <head>) still get the layer at the top.
        stats["block_added"] += 1
        return block + "\n" + text
    stats["block_added"] += 1
    return text[:head] + block + "\n" + text[head:]


def product_label(text: str) -> str:
    m = re.search(r"<title>(.*?)</title>", text, re.S | re.I)
    if not m:
        return ""
    title = html.unescape(re.sub(r"\s+", " ", m.group(1)).strip())
    for sep in ("|", "—", "–", " - "):
        if sep in title:
            title = title.split(sep)[0].strip()
            break
    title = re.sub(r"^[^\w(\[]+", "", title)          # drop leading emoji / bullets
    title = re.sub(r"\s*[|·]\s*$", "", title)
    return title[:64].strip()


BRANDBAR = (
    '<header class="dd-brandbar" role="banner">'
    '<span class="dd-brandmark">DIGITALLY<em>DEFINED.</em></span>'
    '<span class="dd-brandbar-label">{label}</span>'
    "</header>"
)


def install_brandbar(text: str, stats: dict) -> str:
    label = html.escape(product_label(text), quote=False)
    if 'class="dd-brandbar"' in text:
        # Keep an existing bar but refresh its product label.
        new = re.sub(
            r'(<span class="dd-brandbar-label">)[^<]*(</span>)',
            lambda m: m.group(1) + label + m.group(2),
            text,
            count=1,
        )
        if new != text:
            stats["brandbars"] += 1
        return new
    bar = BRANDBAR.format(label=label)
    m = re.search(r"<body[^>]*>", text, re.I)
    if not m:
        stats["brandbars"] += 1
        return bar + "\n" + text
    after = text[m.end():]
    nxt = re.match(r"\s*<([A-Za-z][\w-]*)[^>]*>", after)
    body_tag = m.group(0)

    row_flex = bool(re.search(r"display\s*:\s*flex(?!-direction\s*:\s*column)", _body_css(text)))
    column_hint = re.search(r'class="[^"]*flex-col', body_tag) or re.search(
        r"flex-direction\s*:\s*column", _body_css(text)
    )
    stats["brandbars"] += 1

    if row_flex and not column_hint and nxt:
        insert_at = m.end() + nxt.end()
        return text[:insert_at] + "\n" + bar + text[insert_at:]
    return text[: m.end()] + "\n" + bar + text[m.end():]


def _body_css(text: str) -> str:
    m = re.search(r"(^|\n)\s*body\s*\{([^}]*)\}", text)
    return m.group(2) if m else ""


def drop_shadow_decls(text: str, stats: dict) -> str:
    def repl(m: re.Match) -> str:
        if "none" in m.group(2).lower():
            return m.group(0)
        stats["shadows"] += 1
        return f"{m.group(1)}: none"

    return re.sub(r"(box-shadow|text-shadow)\s*:\s*([^;{}\n]+)", repl, text)


# ── Driver ─────────────────────────────────────────────────────────────────
def html_files() -> list[Path]:
    out = []
    for p in sorted(ROOT.rglob("*.html")):
        if any(part in SKIP_DIRS for part in p.parts):
            continue
        if p.parent.name == "brand":
            continue
        out.append(p)
    return out


def flex_column_body(text: str, stats: dict) -> str:
    """If the body is a flex container without a column direction, add flex-direction: column."""
    m = re.search(r"(^|\n)\s*body\s*\{([^}]*)\}", text, re.I)
    if not m:
        return text
    body_css = m.group(2)
    if not re.search(r'display\s*:\s*flex', body_css, re.I):
        return text
    if re.search(r'flex-direction\s*:\s*column', body_css, re.I):
        return text
    # It's a flex body without column direction; rewrite it.
    def repl(m2: re.Match) -> str:
        stats["flex_column"] = stats.get("flex_column", 0) + 1
        return m2.group(1) + "; flex-direction: column" + m2.group(2)
    return re.sub(r"(^|\n)\s*(body\s*\{[^}]*)(\})", repl, text, count=1, flags=re.I)

def process(path: Path, css: str, dry: bool) -> dict:
    stats = dict.fromkeys(
        ["colors", "var_repairs", "border_repairs", "width_repairs", "radii", "fonts",
         "font_links", "block_added", "block_updated", "brandbars", "shadows"], 0)
    original = path.read_text(encoding="utf-8", errors="surrogateescape")
    text = original

    # Strip the previous layer first so the normalisers never churn it and the
    # counters reflect real body changes.
    text = re.sub(rf'<style id="{STYLE_ID}">.*?</style>\s*', "", text, flags=re.S | re.I)

    text = repair_doubled_faces(text, stats)
    text = retire_third_typefaces(text, stats)
    text = drop_shadow_decls(text, stats)
    text = square_corners(text, stats)
    text = normalize_structural_vars(text, stats)
    text = fix_border_shorthand(text, stats)
    text = normalize_border_width(text, stats)
    text = normalize_hexes(text, stats)
    text = normalize_bare_hexes(text, stats)
    text = ensure_font_link(text, stats)
    text = install_brand_block(text, css, stats)
    text = install_brandbar(text, stats)
    text = flex_column_body(text, stats)

    changed = text != original
    if changed and not dry:
        path.write_text(text, encoding="utf-8", errors="surrogateescape")
    stats["changed"] = changed
    return stats


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("files", nargs="*")
    args = ap.parse_args()

    css = BRAND_CSS.read_text(encoding="utf-8")
    targets = [Path(f) for f in args.files] if args.files else html_files()
    if not targets:
        print("No HTML files found.", file=sys.stderr)
        return 1

    totals = {}
    for p in targets:
        s = process(p, css, args.dry_run)
        rel = p.relative_to(ROOT) if p.is_relative_to(ROOT) else p
        flag = "rewritten" if s["changed"] and not args.dry_run else (
            "would change" if s["changed"] else "clean")
        print(f"{str(rel):58s} {flag:13s} colors={s['colors']:3d} "
              f"border={s['border_repairs'] + s['width_repairs']:3d} "
              f"fonts={s['fonts']:2d} block={s['block_added']}+{s['block_updated']}"
              f" bar={s['brandbars']}")
        for k, v in s.items():
            if isinstance(v, int):
                totals[k] = totals.get(k, 0) + v

    print("\nTOTAL", " ".join(f"{k}={v}" for k, v in sorted(totals.items())))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
