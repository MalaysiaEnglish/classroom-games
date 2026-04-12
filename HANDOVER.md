# Classroom Games — Handover Notes
_Last updated: April 2026_

This file documents recent changes and known patterns for Claude (or any developer) picking up this project. For full project context see `CLAUDE_PROJECT_NOTES.md`.

---

## What was done in the last session

### 1. Picture Games — Text-to-Speech on flashcards
**File**: `picture-games/index.html`

Added Web Speech API TTS so the word is spoken aloud when a flashcard is flipped, plus a 🔊 replay button.

- Uses `window.speechSynthesis` (browser-native, no API key, works offline)
- `lang='en-US'`, `rate=0.82`, `pitch=1.1`
- 🔊 button pulses while speaking (class `speaking` + CSS `@keyframes tts-pulse`)
- `fcMove()` calls `ttsSynth.cancel()` so speech doesn't bleed across cards
- Key functions added: `speak(text)`, `ttsReplay()`
- `fcFlip()` modified to auto-call `speak(curWords[fcIdx].hint)` on reveal

---

### 2. Bug fix — questions not loading in Battleships / Blockbusters / Noughts-Crosses
**Files**: `battleships/index.html`, `blockbusters/index.html`, `noughts-crosses/index.html`

**Root cause**: `rebuildPool()` called `questionsForUnit()`, which reads a `selectedUnit` variable set only by an old button UI that no longer exists → always returned `[]`.

**Fix in `rebuildPool()`**:
```js
// ❌ BEFORE (broken):
const candidates = questionsForUnit();

// ✅ AFTER (fixed):
const candidates = getQuestionsForFilter();  // reads cascade dropdown DOM directly
```

**Fix in `updateQFSummary()`** (same three files — was also reading `selectedUnit`):
```js
const level = document.querySelector('.qf-cascade-level')?.value;
const unit  = document.querySelector('.qf-cascade-unit')?.value;
const unitStr = (level && unit) ? 'L'+level+'/U'+unit+' · ' : '';
```

---

### 3. Battle Teams — three fixes
**File**: `battle-teams/index.html`

**a) Topic search input** — was missing, now added (present in all other toolkit games):
```html
<div style="margin-bottom:5px;">
  <input id="qTopicSearch" type="text" placeholder="🔍 Search topics…"
    oninput="qFilterTopics()"
    style="width:100%;box-sizing:border-box;background:rgba(255,255,255,0.06);
           border:1px solid rgba(255,255,255,0.15);color:#c8bfb0;border-radius:6px;
           padding:4px 8px;font-size:0.75rem;outline:none;">
</div>
```
```js
function qFilterTopics() {
  const search = (document.getElementById('qTopicSearch')?.value || '').toLowerCase();
  document.querySelectorAll('#qfTopics .qf-check-label').forEach(label => {
    label.style.display = search && !label.textContent.toLowerCase().includes(search) ? 'none' : '';
  });
}
```

**b) Topics visible without selecting a level** — `questionsForUnit()` had `if (!level) return []`:
```js
// ✅ FIXED — filter only when values present:
function questionsForUnit() {
  const level = document.getElementById('qfLevel')?.value;
  const unit  = document.getElementById('qfUnit')?.value;
  let qs = window.QUESTIONS || [];
  if (level) qs = qs.filter(q => String(q.level) === level);
  if (unit)  qs = qs.filter(q => String(q.unit)  === unit);
  return qs;
}
```

**c) Topics shown on page load** — `buildTopicsAndLessons()` had an early-return guard, and `buildUnitButtons()` never called it:
- Removed the "Select a unit first" guard from `buildTopicsAndLessons()`
- Added `buildTopicsAndLessons();` at the end of `buildUnitButtons()`

---

### 4. New game: Evil
**File**: `evil/index.html` (newly created)
**Homepage**: added to toolkit modal in `index.html`

**Mechanics**:
- 3–6 teams, each with a colour
- Questions drawn from `../questions.js` via the standard cascade picker
- Each question has a random point value from −9 to +9 (all 19 values, Fisher-Yates shuffled deck, cycled — reshuffle when exhausted)
- After a correct answer, the team sees the value and chooses: ✋ **Keep** (add to own score) or 😈 **Give** (add to another team's score)
- Wrong answer = Skip, next team's turn
- **Win**: closest to 0 at end. Tie-break: positive beats negative (+1 beats −1)

**Key code patterns**:
```js
const ALL_VALUES  = [-9,-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9];
const TEAM_COLORS = ['#00c9a7','#f7b731','#e74c3c','#a29bfe','#fd79a8','#74b9ff'];

function reshuffleDeck() { valueDeck = shuffle([...ALL_VALUES]); deckPos = 0; }
function drawValue()     { if (deckPos >= valueDeck.length) reshuffleDeck(); return valueDeck[deckPos++]; }

// Win ranking (sort by |score| ASC, tie-break +score DESC):
const ranked = [...teams].map((t,i) => ({...t, idx:i}))
  .sort((a,b) => {
    const da = Math.abs(a.score), db = Math.abs(b.score);
    if (da !== db) return da - db;
    return b.score - a.score;  // +1 beats -1
  });
```

**Game flow**: `startGame()` → `drawQuestion()` → `showQuestion(callback)` → if correct: `doReveal(val)` (2.2 s overlay) → `showChoice(val)` → `applyPoints(toIdx, val)` → `nextTurn()`

**Zero-line visualisation**: horizontal track, team markers positioned at `(50 + (score/maxAbs)*44)%`, CSS transition `left 0.6s cubic-bezier(0.34,1.56,0.64,1)`

**Score card colours**: teal = positive, red = negative, gold = zero

---

## Architecture cheatsheet — Question Picker

All toolkit games share a **cascade dropdown question picker**:
`Level dropdown → Unit dropdown → Topic checkboxes → Lesson checkboxes`

| Function | What it does | Use it for |
|----------|-------------|------------|
| `getQuestionsForFilter()` | Reads directly from cascade DOM | `rebuildPool()`, anywhere you need selected Qs |
| `questionsForUnit()` | Legacy — reads `selectedUnit` variable (may be stale/null) | **Avoid in rebuildPool** — use `getQuestionsForFilter()` instead |

**Topic visibility rule**: topics must show from page load, no level required:
1. `questionsForUnit()` — no `if (!level) return []` guard
2. `buildTopicsAndLessons()` — no early-return guard
3. `buildUnitButtons()` — must call `buildTopicsAndLessons()` at the end

---

## Nothing left outstanding
All tasks from the last session are complete:
- [x] TTS on picture-games flashcards
- [x] Battleships question bug fixed
- [x] Blockbusters question bug fixed
- [x] Noughts-Crosses question bug fixed
- [x] Battle Teams topic search added
- [x] Battle Teams topics visible without level
- [x] Evil game created (`evil/index.html`)
- [x] Evil added to homepage toolkit modal (`index.html`)
