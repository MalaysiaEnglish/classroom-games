# Classroom Games — Project Notes for Claude

## What this is
A collection of **ESL classroom games** built as standalone HTML files, designed for a projector in class. Kids aged 5–15. Games should be fun — funny text is encouraged unless asked to be serious. No login, works offline, instant play.

## Where the code lives
- **GitHub folder**: `D:/github/classroom-games`  
- **Entry point**: `index.html` (homepage with level tabs)

## Design system
- **Fonts**: Unbounded (headings, bold UI) + DM Sans (body)
- **Background**: `#0a0d14` (near-black navy)
- **Surface/card**: `#111520` / `#161b2e`
- **Accent gold**: `#f0b429`
- **Accent teal**: `#3ecfcf`
- **Text**: `#e8eaf0` / muted `rgba(232,234,240,0.45)`
- **Border**: `rgba(255,255,255,0.07)`
- **Shared CSS**: `style.css` — defines glass-card UI, controls bar, scoreboard, modals, setup screens
- **Shared data**: `wordlists.json`, `content.js`, `questions.js`, `sheet-loader.js`

## Homepage structure
The `index.html` has:
- Level tabs (filter games by level/topic)
- Unit cards (group related games per grammar/language topic)
- A floating "Toolkit" button → opens a modal with all the reusable projector games
- An editor link → `content-manager.html`

## All game folders (47 total)

### Projector / Team Games (in modal toolkit)
| Folder | Game |
|--------|------|
| `battle-teams` | Power-up grid battles |
| `grammar-cards` | Higher/Lower + sentences |
| `hangman` | Basic, Consonant, Diceman modes |
| `connect4` | Question-based Connect 4 |
| `connect4-vocab` | Vocab version of Connect 4 |
| `blockbusters` | Hex path game (Gold vs Blue) |
| `boardgame` | Roll, move, challenge |
| `grammar-auction` | Bid on correct sentences |
| `passive-dice` | Build passive voice sentences |
| `battleships` | Classic with a language twist |
| `noughts-crosses` | Tic-tac-toe style |
| `wheel-of-fortune` | Spin the wheel |
| `homophones` | Homophones game |
| `word-search` | Word search puzzle |
| `jeopardy-toolkit` | Jeopardy-style quiz |
| `metaphor-machine` | Metaphor game |
| `figure-factory` | Figures of speech |
| `star-hunt` | Hot/Cold star hunt — text questions from questions.js, level filter |
| `star-hunt-jr` | Hot/Cold star hunt — picture/emoji questions, preschool categories |
| `evil` | Score closest to zero — keep or give your points away (3–6 teams) |

### Unit-based / Topic Games (linked from unit cards)
| Folder | Topic |
|--------|-------|
| `gangster-lineup` | Gangsters unit |
| `passive-or-active` | Passive voice |
| `gangsters-vocab` | Gangsters vocabulary |
| `conditional-builder` | Conditionals |
| `danny-adventure` | Danny adventure story |
| `detective-builder` | Detective writing |
| `crack-the-case` | Detective unit |
| `suspect-sorter` | Suspect sorting |
| `cutting-room` | Film/editing |
| `direct-cut` | Direct speech |
| `who-said-it` | Quotes / who said it |
| `fix-phrasal-verb` | Phrasal verbs |
| `sense-sorter` | Senses / description |
| `viewpoint-sorter` | Viewpoint writing |
| `emphasis-builder` | Emphasis / rhetoric |
| `history-of-language` | Language history |
| `language-sorter` | Language classification |
| `curse-story-builder` | Creative writing (curses!) |
| `slogan-matcher` | Advertising slogans |
| `ad-techniques` | Advertising techniques |
| `text-sorter` | Text type sorting |
| `persuasive-technique-spotter` | Persuasive writing |
| `adverb-challenge` | Adverbs |
| `news-structure-builder` | News writing |
| `persuasive-techniques` | Persuasive techniques |
| `quote-sorter` | Quote sorting |
| `road-not-taken` | Class adventure (dragons, gnomes, chaos) |
| `picture-games` | Picture-based games toolkit |

### Admin / Editor Tools
| File | Purpose |
|------|---------|
| `content-manager.html` | Manage game content |
| `content-editor.html` | Edit content |
| `questions-editor.html` | Edit questions |
| `lesson-splitter.html` | Split lessons |
| `dialect-converter.html` | Dialect converter |

## Game page conventions
Every game page typically has:
- A **setup screen** (pick teams, mode, word list) before the game starts
- A **controls bar** with: Fullscreen, Home, New Game buttons
- A **scoreboard** (team score cards, active team highlighted)
- Shared CSS from `../style.css` (relative path)
- A **Back to Home** button linking to `../index.html`

## Key style notes for new games
- New games go in their own subfolder, e.g. `new-game-name/index.html`
- Link CSS with `<link rel="stylesheet" href="../style.css">`
- Add entry to `index.html` (unit card or toolkit modal as appropriate)
- Keep tone fun and silly for ESL kids
- All content should work without internet (no CDN dependencies in game logic)

## Session history
- **April 2026**: Project connected to Cowork. Full inventory taken. 47 game folders documented.
- **April 2026**: Added Star Hunt (toolkit text version) and Star Hunt Jr. (preschool picture version). Both added to toolkit modal in index.html.
- **April 2026**: TTS added to Picture Games flashcards. Bug fixes across Battleships, Blockbusters, Noughts-Crosses, Battle Teams. Evil game created and added to toolkit.

## Star Hunt — design notes
- **Mechanics**: 7×7 grid, hidden star. Teams click cells to reveal hot/warm/cold hints. Each click costs 1 point (starts at 40). Finding the star scores remaining points.
- **Special cells**: +5 (green), −5 (red), 🔄 Reset (purple — new grid, score stays)
- **star-hunt**: uses `../questions.js`, filtered by level (All / L1–L9). Standard style.css design.
- **star-hunt-jr**: self-contained, emoji picture questions in categories: Animals, Colors, Food, Numbers, Shapes & Objects. Use for preschool / beginner classes.

## Evil — design notes
- **Mechanics**: Questions drawn from `../questions.js` (same cascade picker as other toolkit games). Each question has a random point value from −9 to +9 (equal numbers of each, deck shuffled Fisher-Yates, cycled). After answering correctly, the active team sees the value and chooses: ✋ Keep (add to own score) or 😈 Give (add to another team's score). Wrong answer = Skip, next team's turn.
- **Win condition**: Closest to 0 at game end. Tie-break: positive beats negative (+1 wins over −1).
- **Teams**: 3–6, each with a colour from `TEAM_COLORS = ['#00c9a7','#f7b731','#e74c3c','#a29bfe','#fd79a8','#74b9ff']`.
- **Visual**: Animated zero-line tracker — horizontal bar, team markers slide with CSS transition. Score cards colour-coded: teal = positive, red = negative, gold = zero.
- **Value reveal**: Full-screen dramatic overlay (2.2 s) before Keep/Give modal appears.
- **Keep/Give modal**: Shows projected score for both options before committing.
- **File**: `evil/index.html` — single self-contained file, no extra assets.

## CRITICAL ARCHITECTURE: Question picker pattern
Several toolkit games use a **cascade dropdown question picker** (Level → Unit → Topic checkboxes → Lesson checkboxes). There is one correct and one broken pattern for reading from it:

### ✅ CORRECT — `getQuestionsForFilter()`
Reads directly from the cascade dropdown DOM. Use this in `rebuildPool()` and anywhere you need the currently-selected questions.

### ❌ BROKEN — `questionsForUnit()` (legacy pattern)
Depends on a `selectedUnit` variable that is set only by old button UI that no longer exists. Returns `[]` always. **Do not use `questionsForUnit()` in `rebuildPool()`.**

### Affected files fixed (April 2026)
| File | Fix |
|------|-----|
| `battleships/index.html` | `rebuildPool()` now uses `getQuestionsForFilter()` |
| `blockbusters/index.html` | same |
| `noughts-crosses/index.html` | same |

### `updateQFSummary()` fix (same three files)
The unit label was reading from `selectedUnit` (always null). Fixed to read from DOM:
```js
const level = document.querySelector('.qf-cascade-level')?.value;
const unit  = document.querySelector('.qf-cascade-unit')?.value;
const unitStr = (level && unit) ? 'L'+level+'/U'+unit+' · ' : '';
```

## CRITICAL ARCHITECTURE: Topic visibility (no level required)
Topics must be visible from page load — users should be able to search by topic without first selecting a level or unit. Three things must all be true:

1. **`questionsForUnit()`** must NOT have `if (!level) return []` — filter by level/unit only if values are present.
2. **`buildTopicsAndLessons()`** must NOT have an early-return guard like `if (!level) { show 'Select a unit first'; return; }`.
3. **`buildUnitButtons()`** (or equivalent init function) must call `buildTopicsAndLessons()` at the end so topics populate on load.

### Files fixed (April 2026)
| File | What was broken | Fix |
|------|----------------|-----|
| `battle-teams/index.html` | All three issues above | Removed guards, added `buildTopicsAndLessons()` call in `buildUnitButtons()` |

Battleships, Blockbusters, Noughts-Crosses did **not** have this bug — they already showed topics without a level.

## Picture Games — TTS (Text-to-Speech)
Added Web Speech API TTS to the flashcard screen in `picture-games/index.html`. Words are spoken automatically when a card is flipped; a 🔊 button allows replay.

- **API**: `window.speechSynthesis` / `SpeechSynthesisUtterance` — browser-native, no key, works offline.
- **Settings**: `lang='en-US'`, `rate=0.82`, `pitch=1.1`
- The 🔊 button gets class `speaking` while audio plays (pulse animation).
- `fcMove()` cancels any in-progress speech so there's no overlap between cards.

## Battle Teams — Topic Search
Added 🔍 topic search input to `battle-teams/index.html` (was already present in Battleships, Blockbusters, Noughts-Crosses). Input calls `qFilterTopics()` which shows/hides `.qf-check-label` elements based on text match.
