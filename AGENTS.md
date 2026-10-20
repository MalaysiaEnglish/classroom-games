# STRoberts Games: how the pieces fit together

Context file for Cursor / any AI assistant working on these repos.

## What this is
STRoberts Games sells interactive browser-based classroom games (ESL / English) on Teachers Pay Teachers (TPT). Sales happen on TPT only.

## The two locations

### 1. stroberts.uk (website)
- Domain I own. Hosts **playable test and demo versions** of the games.
- Contains a **hidden files** folder: finished game HTML is written here for **private testing** before release. Not linked publicly.
- Planned: a separate **public demo** folder with cut-down, hard-capped versions (about 2-3 questions per topic), each with a "Buy full version on TPT" link. Pinterest pins will point here.
- The site links through to TPT listings. It never sells anything itself.

### 2. The `-tpt` repo / folder (zip storage)
- Holds the **zip files** for TPT upload (one standalone HTML game per zip).
- This is the source of truth for what gets uploaded to TPT.
- TPT listings use standalone HTML files and must **not** mention gamepack.win.

## Build flow
1. Build the game (single standalone HTML file).
2. Write the HTML to the hidden-files folder on stroberts.uk and test it privately.
3. Zip the final game and save the zip in the `-tpt` repo.
4. Upload the zip to TPT.
5. (Planned) Generate the demo version plus the TPT link for the public demo folder.

## Related
- gamepack.win deploys through Cloudflare Pages from the `MalaysiaEnglish/classroom-games` GitHub repo. This is separate from the TPT flow.
- Local clone of classroom-games: `C:\Users\User\Projects\classroom-games` (Windows).

## Rules for the assistant
- Never put the hidden-files content into the public demo folder.
- Never reference gamepack.win in anything destined for TPT.
- Don't commit zips into the website repo, or website files into `-tpt`.

## To fill in (not known to the author of this doc)
- Exact repo names are in MalaysiaEnglish - StrobertsGames StrobertsGames-TPT snd classroom-games there is also a game one battlememes
all are 'run' through cloudflare
- Exact path of the hidden-files folder - it's an html in strobertsGames called hidden-games

## Local development

This repository is a static site. There is no package manager, lockfile, or compile step. Shared data is `questions.js`, `content.js`, `wordlists.json`, and `style.css`. Each game is a folder with `index.html`. The homepage is `index.html`.

Serve the repository root:

```bash
python3 -m http.server 8080 --bind 0.0.0.0
```

Open `http://127.0.0.1:8080/`. Cloud Agents start that server on port 8080 at boot. If the port is already in use, leave the existing server running.
