# Picture Games — Vocab File Format Spec
## For Claude Desktop: extracting remaining Let's Go PDFs

---

## File naming
One JS file per book:
  vocab-letsgol1.js   ← Level 1 (done)
  vocab-letsgol2.js   ← Level 2
  vocab-letsgol3.js   ← Level 3
  ... etc

All files live in:  classroom-games/picture-games/

---

## Image naming & location
Images extracted from each PDF go in:
  classroom-games/img/letsgol2/   (for Level 2)
  classroom-games/img/letsgol3/   (for Level 3)
  ... etc

Image filename format:  u{unit}_{num:03d}_{label}.jpg
Examples:
  u1_001_a-pencil.jpg
  u2_015_a-dog.jpg

Image spec:
  - Crop: top ~63% of card (picture area only, not the word label)
  - Trim: remove ~6% padding each side (the red border)
  - Resize: 300x300 pixels, square
  - Format: JPEG quality 82
  - Size target: ~10-15kb each

---

## JS file format — copy this exactly

```javascript
// ─────────────────────────────────────────────────────────────
// Let's Go Level 2 — Flashcard Vocabulary
// ─────────────────────────────────────────────────────────────

(function() {
  window.VOCAB_REGISTRY = window.VOCAB_REGISTRY || [];
  window.VOCAB_REGISTRY.push({
    key:      "letsgol2",
    label:    "Let's Go · Level 2",
    imgBase:  "../../img/letsgol2/",
    units: [
      {
        unit: 1, label: "Unit 1 — [topic name]",
        words: [
          { word: "PENCIL", hint: "a pencil", img: "u1_001_a-pencil.jpg", emoji: "✏️", lesson: "a" },
          { word: "PEN",    hint: "a pen",    img: "u1_002_a-pen.jpg",    emoji: "🖊️", lesson: "a" },
          { word: "BAG",    hint: "a bag",    img: "u1_003_a-bag.jpg",    emoji: "🎒", lesson: "b" },
        ]
      },
      {
        unit: 2, label: "Unit 2 — [topic name]",
        words: [
          ...
        ]
      },
    ],
    revisionSets: [
      { label: "Revision 1 — Units 1 + 2", units: [1, 2] },
      { label: "Revision 2 — Units 3 + 4", units: [3, 4] },
    ]
  });
})();
```

---

## Field rules

| Field   | Rule |
|---------|------|
| word    | UPPERCASE. Strip articles (a/an/the). "A PEN" → "PEN". Phrases OK: "OPEN YOUR BOOK" |
| hint    | Lowercase exactly as it appears on the card: "a pen", "open your book" |
| img     | Filename only — no path. e.g. "u1_002_a-pen.jpg" |
| emoji   | Best matching emoji, or "🖼️" if none fits |
| lesson  | "a" or "b". First 50% of cards in unit = "a", remaining = "b". Round down for "a". |

## lesson field — 50/50 rule

Each unit's cards are split 50/50 into lesson a and b.
Round DOWN for lesson a if odd number.

Example: 10 cards → first 5 = "a", last 5 = "b"
Example: 9 cards  → first 4 = "a", last 5 = "b"
Example: 7 cards  → first 3 = "a", last 4 = "b"

The teacher will use a splitter tool to correct any unit where 50/50 is wrong.
Do NOT try to guess the real split — just apply the 50/50 rule consistently.

## revisionSets — auto-generate

Assuming units come in pairs (1+2, 3+4, 5+6 etc), generate revision sets automatically.
If there is an odd number of units, group the last one alone.

Example for 8 units:
  { label: "Revision 1 — Units 1 + 2", units: [1, 2] },
  { label: "Revision 2 — Units 3 + 4", units: [3, 4] },
  { label: "Revision 3 — Units 5 + 6", units: [5, 6] },
  { label: "Revision 4 — Units 7 + 8", units: [7, 8] },

---

## Python extraction script

```python
import fitz, re, os, math
from PIL import Image

PDF_PATH   = "path/to/letsgol2.pdf"
LEVEL_KEY  = "letsgol2"        # change per book
LEVEL_NUM  = 2                 # change per book
IMG_DIR    = f"img/{LEVEL_KEY}"

doc = fitz.open(PDF_PATH)
os.makedirs(IMG_DIR, exist_ok=True)

# ── 1. Collect card metadata ──────────────────────────────────
cards = []
for i in range(len(doc)):
    page = doc[i]
    text = page.get_text().strip()
    lines = [l.strip() for l in text.split('\n') if l.strip()]
    unit_match = None
    card_num   = None
    for line in lines:
        if re.match(r'^Unit \d+$', line):
            unit_match = re.search(r'\d+', line).group()
        if re.match(r'^\d+$', line) and int(line) < 200:
            card_num = line
    content_lines = [l for l in lines
                     if not l.startswith('©')
                     and not l.startswith('Copying')
                     and not re.match(r'^Unit \d+$', l)
                     and not re.match(r'^\d+$', l)
                     and not l.startswith('TEACHER')
                     and len(l) > 1]
    if unit_match and content_lines and card_num and i > 0:
        cards.append({
            'page':  i,
            'unit':  int(unit_match),
            'num':   int(card_num),
            'label': content_lines[0]
        })

# ── 2. Assign lesson a/b (50/50, round down for a) ───────────
from collections import defaultdict
by_unit = defaultdict(list)
for c in cards:
    by_unit[c['unit']].append(c)

for unit_cards in by_unit.values():
    n      = len(unit_cards)
    a_end  = math.floor(n / 2)   # round DOWN for lesson a
    for idx, c in enumerate(unit_cards):
        c['lesson'] = 'a' if idx < a_end else 'b'

# ── 3. Extract and crop images ────────────────────────────────
mat = fitz.Matrix(1.5, 1.5)
for c in cards:
    page     = doc[c['page']]
    pix      = page.get_pixmap(matrix=mat)
    img      = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    crop_h   = int(pix.height * 0.63)
    pad_x    = int(pix.width  * 0.06)
    pad_y    = int(pix.height * 0.06)
    img_crop = img.crop((pad_x, pad_y, pix.width - pad_x, crop_h))
    img_sq   = img_crop.resize((300, 300), Image.LANCZOS)
    safe     = re.sub(r'[^a-z0-9]+', '-', c['label'].lower()).strip('-')[:30]
    fname    = f"u{c['unit']}_{c['num']:03d}_{safe}.jpg"
    c['img'] = fname
    img_sq.save(f"{IMG_DIR}/{fname}", 'JPEG', quality=82)

print(f"Saved {len(cards)} images to {IMG_DIR}/")

# ── 4. Generate vocab JS ──────────────────────────────────────
units_sorted = sorted(by_unit.keys())
n_units      = len(units_sorted)

# Build revision sets (pairs)
rev_sets = []
for i in range(0, n_units, 2):
    pair = units_sorted[i:i+2]
    if len(pair) == 2:
        label = f"Revision {i//2 + 1} — Units {pair[0]} + {pair[1]}"
    else:
        label = f"Revision — Unit {pair[0]}"
    rev_sets.append({'label': label, 'units': pair})

# Emoji fallback map
EMOJI = {
    'PENCIL':'✏️','PEN':'🖊️','BAG':'🎒','BOOK':'📚','DESK':'🖥️',
    'CHAIR':'🪑','RULER':'📏','ERASER':'🧹','MAP':'🗺️','MARKER':'🖊️',
    'GLOBE':'🌍','TABLE':'🪑','BOARD':'📋','CRAYON':'🖍️',
    'BIRD':'🐦','BALL':'⚽','BOY':'👦','GIRL':'👧','PEACH':'🍑',
    'CAT':'🐱','DOG':'🐶','FISH':'🐟','RABBIT':'🐰','BEAR':'🐻',
    'RED':'❤️','BLUE':'💙','YELLOW':'💛','GREEN':'💚','ORANGE':'🧡',
    'PURPLE':'💜','PINK':'🩷','BLACK':'🖤','WHITE':'🤍','BROWN':'🟫',
    'MOTHER':'👩','FATHER':'👨','SISTER':'👧','BROTHER':'👦',
    'GRANDMOTHER':'👵','GRANDFATHER':'👴',
}

js_lines = []
js_lines.append(f"// {'─'*61}")
js_lines.append(f"// Let's Go Level {LEVEL_NUM} — Flashcard Vocabulary")
js_lines.append(f"// Auto-generated. Lesson a/b split is 50/50 — adjust with splitter tool.")
js_lines.append(f"// {'─'*61}")
js_lines.append("")
js_lines.append("(function() {")
js_lines.append("  window.VOCAB_REGISTRY = window.VOCAB_REGISTRY || [];")
js_lines.append("  window.VOCAB_REGISTRY.push({")
js_lines.append(f'    key:      "{LEVEL_KEY}",')
js_lines.append(f"    label:    \"Let's Go · Level {LEVEL_NUM}\",")
js_lines.append(f'    imgBase:  "../../img/{LEVEL_KEY}/",')
js_lines.append("    units: [")

for u in units_sorted:
    unit_cards = by_unit[u]
    # Try to infer topic from most common non-article words
    topic = f"Unit {u}"
    js_lines.append(f"      {{")
    js_lines.append(f'        unit: {u}, label: "Unit {u} — [topic]",')
    js_lines.append(f"        words: [")
    for c in unit_cards:
        raw   = c['label']
        word  = re.sub(r'^(a |an |the )', '', raw, flags=re.IGNORECASE).strip().upper()
        emoji = EMOJI.get(word, '🖼️')
        js_lines.append(
            f'          {{ word: "{word}", hint: "{raw}", '
            f'img: "{c["img"]}", emoji: "{emoji}", lesson: "{c["lesson"]}" }},'
        )
    js_lines.append(f"        ]")
    js_lines.append(f"      }},")

js_lines.append("    ],")
js_lines.append("    revisionSets: [")
for rs in rev_sets:
    units_str = ", ".join(str(u) for u in rs['units'])
    js_lines.append(f'      {{ label: "{rs["label"]}", units: [{units_str}] }},')
js_lines.append("    ]")
js_lines.append("  });")
js_lines.append("})();")

out_path = f"picture-games/vocab-{LEVEL_KEY}.js"
os.makedirs("picture-games", exist_ok=True)
with open(out_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(js_lines))

print(f"Written: {out_path}")
print(f"Units: {units_sorted}")
for u in units_sorted:
    uc = by_unit[u]
    a  = sum(1 for c in uc if c['lesson']=='a')
    b  = sum(1 for c in uc if c['lesson']=='b')
    print(f"  Unit {u}: {len(uc)} cards  ({a}A / {b}B)")
```

---

## After each PDF is processed

1. Review the printed unit summary (A/B counts look reasonable?)
2. Open lesson-splitter.html to correct any unit where 50/50 is wrong
3. Push corrected vocab-letsgol{N}.js + img folder to GitHub
4. In picture-games/index.html, uncomment the matching script tag

---

## Activating in index.html

  <script src="vocab-letsgol1.js"></script>                 ← already active
  <!-- <script src="vocab-letsgol2.js"></script> -->         ← uncomment when ready
  <!-- <script src="vocab-letsgol3.js"></script> -->
  etc.

The game picker automatically shows all registered books — no other changes needed.
