/* ================================================================
   SHEET LOADER — gamepack.win
   Fetches vocabulary, sentences and questions from Google Sheets
   published CSVs. Falls back to content.js / questions.js silently
   if the fetch fails or times out.

   SETUP:
   1. Set SHEET_ID to your Google Sheet ID (from the URL)
   2. Set the GID for each tab (see Setup Guide for how to find these)
   3. Add this script to index.html AFTER content.js and questions.js
      but BEFORE any game scripts that read CUSTOM_CONTENT / QUESTIONS

   <script src="content.js"></script>
   <script src="questions.js"></script>
   <script src="sheet-loader.js"></script>
   ================================================================ */

(function () {

  // ── CONFIGURE THESE ─────────────────────────────────────────────
  const SHEET_ID   = '16Aj_unDyBTEsWbvR3bkT7UEh63jOQdK9aKGjJB3z-F4';   // from Sheet URL
  const GID_VOCAB  = '0';                     // tab GID for vocab
  const GID_SENT   = '961056298';                     // tab GID for sentences
  const GID_QUEST  = '956881281';                     // tab GID for questions
  const TIMEOUT_MS = 5000;                    // give up after 5 seconds
  // ────────────────────────────────────────────────────────────────

  function csvUrl(gid) {
    return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}`;
  }

  function fetchWithTimeout(url) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('timeout')), TIMEOUT_MS);
      fetch(url)
        .then(r => { clearTimeout(timer); resolve(r); })
        .catch(e => { clearTimeout(timer); reject(e); });
    });
  }

  // Parse a CSV string into array of objects using first row as headers
  function parseCsv(text) {
    const lines = text.split('\n').filter(l => l.trim());
    if (lines.length < 2) return [];
    const headers = parseCsvLine(lines[0]);
    return lines.slice(1).map(line => {
      const vals = parseCsvLine(line);
      const obj = {};
      headers.forEach((h, i) => { obj[h.trim()] = (vals[i] || '').trim(); });
      return obj;
    }).filter(row => Object.values(row).some(v => v));
  }

  // Handle quoted fields with commas inside
  function parseCsvLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
        else inQuotes = !inQuotes;
      } else if (ch === ',' && !inQuotes) {
        result.push(current); current = '';
      } else {
        current += ch;
      }
    }
    result.push(current);
    return result;
  }

  function toInt(val) {
    const n = parseInt(val);
    return isNaN(n) ? undefined : n;
  }

  function toVocabWords(rows) {
    return rows.map(r => {
      const obj = { word: r.word, topic: r.topic || '' };
      if (r.hint)   obj.hint   = r.hint;
      if (r.level)  obj.level  = toInt(r.level);
      if (r.unit)   obj.unit   = toInt(r.unit);
      if (r.lesson) obj.lesson = toInt(r.lesson);
      return obj;
    }).filter(o => o.word);
  }

  function toSentences(rows) {
    return rows.map(r => {
      const obj = {
        text:    r.text,
        correct: r.correct === 'true' || r.correct === 'TRUE',
        topic:   r.topic || ''
      };
      if (r.level)  obj.level  = toInt(r.level);
      if (r.unit)   obj.unit   = toInt(r.unit);
      if (r.lesson) obj.lesson = toInt(r.lesson);
      return obj;
    }).filter(o => o.text);
  }

  function toQuestions(rows) {
    return rows.map(r => {
      const obj = {
        question:    r.question,
        answer:      r.answer,
        distractors: [r.distractor1 || '', r.distractor2 || '', r.distractor3 || ''],
        topic:       r.topic || ''
      };
      if (r.level)  obj.level  = toInt(r.level);
      if (r.unit)   obj.unit   = toInt(r.unit);
      if (r.lesson) obj.lesson = toInt(r.lesson);
      return obj;
    }).filter(o => o.question && o.answer);
  }

  // Expose a promise so game scripts can await it if needed
  window.SHEET_LOADED = (async function () {

    if (!SHEET_ID || SHEET_ID === 'YOUR_SHEET_ID_HERE') {
      console.warn('[sheet-loader] Sheet ID not configured — using JS fallback files.');
      return false;
    }

    try {
      const [vocabRes, sentRes, questRes] = await Promise.all([
        fetchWithTimeout(csvUrl(GID_VOCAB)),
        fetchWithTimeout(csvUrl(GID_SENT)),
        fetchWithTimeout(csvUrl(GID_QUEST))
      ]);

      const [vocabText, sentText, questText] = await Promise.all([
        vocabRes.text(), sentRes.text(), questRes.text()
      ]);

      const words     = toVocabWords(parseCsv(vocabText));
      const sentences = toSentences(parseCsv(sentText));
      const questions = toQuestions(parseCsv(questText));

      // Replace globals — JS fallback values are overwritten
      window.CUSTOM_CONTENT = { words, sentences };
      window.QUESTIONS = questions;

      console.log(`[sheet-loader] Loaded from Sheet — ${words.length} words, ${sentences.length} sentences, ${questions.length} questions.`);
      return true;

    } catch (err) {
      console.warn('[sheet-loader] Sheet fetch failed — using JS fallback files.', err.message);
      return false;
    }

  })();

})();
