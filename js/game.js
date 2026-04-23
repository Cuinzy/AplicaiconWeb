// ============================================================
// WEBCRAFT: DOMINA EL DOM — Motor del juego
// ============================================================

// ---------- ESTADO ----------
const state = {
  playerName: '',
  points: 0,
  completedChallenges: [],
  usedHints: {},          // { 'challengeId': hintCount }
  unlockedAchievements: [],
  currentLevel: null,
  currentChallenge: null,
  hintIndex: 0,
  activeTab: 'js',
  editorContents: { js: '', html: '', css: '' },
};

// ---------- SAVE / LOAD ----------
function saveProgress() {
  localStorage.setItem('webcraft_save', JSON.stringify({
    playerName: state.playerName,
    points: state.points,
    completedChallenges: state.completedChallenges,
    usedHints: state.usedHints,
    unlockedAchievements: state.unlockedAchievements,
  }));
}

function loadProgress() {
  try {
    const raw = localStorage.getItem('webcraft_save');
    if (!raw) return;
    const saved = JSON.parse(raw);
    Object.assign(state, saved);
  } catch(e) { /* ignore corrupt save */ }
}

// ---------- SCREEN NAVIGATION ----------
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ---------- WELCOME SCREEN ----------
function initWelcome() {
  loadProgress();

  const btn   = document.getElementById('btn-start');
  const input = document.getElementById('player-name-input');

  if (state.playerName) input.value = state.playerName;

  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') btn.click(); });

  btn.addEventListener('click', () => {
    const name = input.value.trim();
    if (!name) { input.style.borderColor = '#e74c3c'; input.focus(); return; }
    state.playerName = name;
    saveProgress();
    initMap();
    showScreen('screen-map');
  });
}

// ---------- MAP SCREEN ----------
function initMap() {
  document.getElementById('player-display').textContent = '👤 ' + state.playerName;
  document.getElementById('total-points').textContent   = state.points;

  const btnMapTut = document.getElementById('btn-map-tutorial');
  if (btnMapTut && !btnMapTut._bound) {
    btnMapTut._bound = true;
    btnMapTut.addEventListener('click', () => {
      showScreen('screen-tutorial');
      if (typeof buildTutorialSidebar === 'function') buildTutorialSidebar();
    });
  }

  const container = document.getElementById('level-map');
  container.innerHTML = '';

  let prevLevelDone = true;

  LEVELS.forEach((level, li) => {
    const levelDone = level.challenges.every(c => state.completedChallenges.includes(c.id));
    const levelUnlocked = prevLevelDone || li === 0;

    const row = document.createElement('div');
    row.className = 'level-row';

    // Level header
    const hdr = document.createElement('div');
    hdr.className = 'level-header';
    hdr.innerHTML = `
      <div class="level-icon" style="background:${levelUnlocked ? level.color : '#333'}22; color:${levelUnlocked ? level.color : '#555'}; border: 2px solid ${levelUnlocked ? level.color : '#333'};">
        ${levelUnlocked ? level.icon : '🔒'}
      </div>
      <div class="level-info">
        <h3 style="color:${levelUnlocked ? level.color : '#555'}">Nivel ${level.id}: ${level.name}</h3>
        <p>${level.subtitle}</p>
      </div>
    `;
    row.appendChild(hdr);

    // Challenge cards
    const cards = document.createElement('div');
    cards.className = 'challenge-cards';

    let prevChallengeDone = levelUnlocked;

    level.challenges.forEach((ch, ci) => {
      const done     = state.completedChallenges.includes(ch.id);
      const unlocked = prevChallengeDone;

      const card = document.createElement('div');
      card.className = 'challenge-card' + (done ? ' completed' : '') + (!unlocked ? ' locked' : '');
      card.style.color = level.color;

      const hints = state.usedHints[ch.id] || 0;
      card.innerHTML = `
        <div class="card-title">${ch.title}</div>
        <div class="card-meta">Reto ${ci + 1} de ${level.challenges.length}</div>
        <div class="card-badge">${done ? '✅' : (unlocked ? '▶' : '🔒')}</div>
      `;

      if (unlocked) {
        card.addEventListener('click', () => startChallenge(level, ch));
      }

      cards.appendChild(card);
      prevChallengeDone = done;
    });

    row.appendChild(cards);
    container.appendChild(row);
    prevLevelDone = levelDone;
  });
}

// ---------- CHALLENGE SCREEN ----------
function startChallenge(level, challenge) {
  state.currentLevel     = level;
  state.currentChallenge = challenge;
  state.hintIndex        = state.usedHints[challenge.id] || 0;

  // Reset editor contents
  state.editorContents = {
    js:   challenge.initialJS,
    html: challenge.initialHTML,
    css:  challenge.initialCSS,
  };
  state.activeTab = 'js';

  // Header
  document.getElementById('challenge-badge').textContent = `Nivel ${level.id}`;
  document.getElementById('challenge-badge').style.cssText = `color:${level.color}; border-color:${level.color};`;
  document.getElementById('challenge-title').textContent   = challenge.title;
  document.getElementById('challenge-pts').textContent     = state.points;

  // Progress
  const ci = level.challenges.indexOf(challenge);
  document.getElementById('challenge-progress').textContent = `${ci + 1}/${level.challenges.length}`;

  // Mission
  document.getElementById('mission-text').textContent    = challenge.mission;
  document.getElementById('objective-text').textContent  = challenge.objective;

  // Hints: show already-unlocked hints
  renderHints();

  // Editor
  setActiveTab('js');
  updateLineNumbers();

  // Preview: load initial state
  buildPreview();

  showScreen('screen-challenge');
}

function renderHints() {
  const ch      = state.currentChallenge;
  const section = document.getElementById('hints-section');
  const list    = document.getElementById('hints-list');
  list.innerHTML = '';

  if (state.hintIndex === 0) { section.classList.add('hidden'); return; }

  section.classList.remove('hidden');
  for (let i = 0; i < state.hintIndex; i++) {
    const div = document.createElement('div');
    div.className = 'hint-item';
    div.innerHTML = `💡 ${ch.hints[i]}`;
    list.appendChild(div);
  }
}

// ---------- EDITOR TABS ----------
function setActiveTab(tab) {
  state.activeTab = tab;
  const editor = document.getElementById('code-editor');
  editor.value = state.editorContents[tab];

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });

  updateLineNumbers();
  updateHighlight();
  clearEditorMsg();
}

function getEditorValue() {
  return document.getElementById('code-editor').value;
}

function saveCurrentTab() {
  state.editorContents[state.activeTab] = getEditorValue();
}

// ---------- LINE NUMBERS ----------
function updateLineNumbers() {
  const editor = document.getElementById('code-editor');
  const lnEl   = document.getElementById('line-numbers');
  const lines  = editor.value.split('\n').length;
  lnEl.textContent = Array.from({ length: lines }, (_, i) => i + 1).join('\n');
}

// ---------- SYNTAX HIGHLIGHTING ----------
function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function highlightJS(code) {
  const KEYWORDS = new Set([
    'const','let','var','function','return','if','else','for','while','do',
    'switch','case','break','continue','new','this','class','extends',
    'import','export','default','typeof','instanceof','in','of',
    'try','catch','finally','throw','async','await','void','delete',
    'yield','static','get','set','from','null','undefined','true','false',
  ]);
  const BUILTINS = new Set([
    'document','window','console','Math','Array','Object','String','Number',
    'Boolean','Date','JSON','Promise','localStorage','sessionStorage',
    'addEventListener','removeEventListener','querySelector','querySelectorAll',
    'getElementById','getElementsByClassName','getElementsByTagName',
    'createElement','appendChild','removeChild','setAttribute','getAttribute',
    'classList','style','textContent','innerHTML','innerText','value',
    'setTimeout','setInterval','clearTimeout','clearInterval','alert',
    'confirm','prompt','fetch','parseInt','parseFloat','isNaN','isFinite',
  ]);

  let out = '';
  let i = 0;

  while (i < code.length) {
    // Single-line comment
    if (code[i] === '/' && code[i+1] === '/') {
      const end = code.indexOf('\n', i);
      const chunk = end === -1 ? code.slice(i) : code.slice(i, end);
      out += `<span class="hl-comment">${escHtml(chunk)}</span>`;
      i = end === -1 ? code.length : end;
      continue;
    }
    // Multi-line comment
    if (code[i] === '/' && code[i+1] === '*') {
      const end = code.indexOf('*/', i + 2);
      const chunk = end === -1 ? code.slice(i) : code.slice(i, end + 2);
      out += `<span class="hl-comment">${escHtml(chunk)}</span>`;
      i = end === -1 ? code.length : end + 2;
      continue;
    }
    // Template literal
    if (code[i] === '`') {
      let j = i + 1;
      while (j < code.length) {
        if (code[j] === '\\') { j += 2; continue; }
        if (code[j] === '`') { j++; break; }
        j++;
      }
      out += `<span class="hl-template">${escHtml(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }
    // Single-quoted string
    if (code[i] === "'") {
      let j = i + 1;
      while (j < code.length) {
        if (code[j] === '\\') { j += 2; continue; }
        if (code[j] === "'") { j++; break; }
        j++;
      }
      out += `<span class="hl-string">${escHtml(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }
    // Double-quoted string
    if (code[i] === '"') {
      let j = i + 1;
      while (j < code.length) {
        if (code[j] === '\\') { j += 2; continue; }
        if (code[j] === '"') { j++; break; }
        j++;
      }
      out += `<span class="hl-string">${escHtml(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }
    // Number
    if (/[0-9]/.test(code[i]) && (i === 0 || /\W/.test(code[i - 1]))) {
      let j = i;
      while (j < code.length && /[0-9.xXa-fA-F]/.test(code[j])) j++;
      out += `<span class="hl-number">${escHtml(code.slice(i, j))}</span>`;
      i = j;
      continue;
    }
    // Identifier / keyword / builtin / function call
    if (/[a-zA-Z_$]/.test(code[i])) {
      let j = i;
      while (j < code.length && /[a-zA-Z0-9_$]/.test(code[j])) j++;
      const word = code.slice(i, j);
      const afterWord = code[j];
      if (KEYWORDS.has(word)) {
        out += `<span class="hl-keyword">${escHtml(word)}</span>`;
      } else if (BUILTINS.has(word)) {
        out += `<span class="hl-builtin">${escHtml(word)}</span>`;
      } else if (afterWord === '(') {
        out += `<span class="hl-function">${escHtml(word)}</span>`;
      } else {
        out += escHtml(word);
      }
      i = j;
      continue;
    }
    // Dot-property access: color the property name
    if (code[i] === '.' && /[a-zA-Z_$]/.test(code[i + 1])) {
      let j = i + 1;
      while (j < code.length && /[a-zA-Z0-9_$]/.test(code[j])) j++;
      const prop = code.slice(i + 1, j);
      const after = code[j];
      const cls = after === '(' ? 'hl-function' : 'hl-property';
      out += `.<span class="${cls}">${escHtml(prop)}</span>`;
      i = j;
      continue;
    }
    out += escHtml(code[i]);
    i++;
  }
  return out;
}

function highlightCSS(code) {
  let out = '';
  let i = 0;
  let inBlock = false;

  while (i < code.length) {
    // Comment /* ... */
    if (code[i] === '/' && code[i + 1] === '*') {
      const end = code.indexOf('*/', i + 2);
      const chunk = end === -1 ? code.slice(i) : code.slice(i, end + 2);
      out += `<span class="hl-comment">${escHtml(chunk)}</span>`;
      i = end === -1 ? code.length : end + 2;
      continue;
    }
    // Open brace
    if (code[i] === '{') {
      out += '<span class="hl-punct">{</span>';
      inBlock = true; i++; continue;
    }
    // Close brace
    if (code[i] === '}') {
      out += '<span class="hl-punct">}</span>';
      inBlock = false; i++; continue;
    }
    // Whitespace / newline
    if (/\s/.test(code[i])) { out += escHtml(code[i]); i++; continue; }

    if (inBlock) {
      // Property name → up to ':'
      if (/[a-zA-Z-]/.test(code[i])) {
        let j = i;
        while (j < code.length && code[j] !== ':' && code[j] !== '}' && code[j] !== '\n') j++;
        if (code[j] === ':') {
          out += `<span class="hl-prop">${escHtml(code.slice(i, j).trimEnd())}</span>`;
          out += '<span class="hl-punct">:</span>';
          i = j + 1;
          // Value → up to ';' or '}'
          let vEnd = i;
          while (vEnd < code.length && code[vEnd] !== ';' && code[vEnd] !== '}') vEnd++;
          out += highlightCSSValue(code.slice(i, vEnd));
          if (code[vEnd] === ';') { out += '<span class="hl-punct">;</span>'; vEnd++; }
          i = vEnd;
          continue;
        }
      }
    } else {
      // Selector → up to '{'
      let j = i;
      while (j < code.length && code[j] !== '{' && code[j] !== '\n') j++;
      if (j > i) {
        out += `<span class="hl-selector">${escHtml(code.slice(i, j).trimEnd())}</span>`;
        // trailing spaces before {
        while (j < code.length && code[j] === ' ') { out += ' '; j++; }
        i = j;
        continue;
      }
    }
    out += escHtml(code[i]); i++;
  }
  return out;
}

function highlightCSSValue(raw) {
  // Highlight numbers+units, hex colors, strings, keywords
  return escHtml(raw)
    .replace(/(#[0-9a-fA-F]{3,8})\b/g, '<span class="hl-number">$1</span>')
    .replace(/\b(\d+(?:\.\d+)?)(px|em|rem|vh|vw|%|s|ms|deg|fr|ch|vmin|vmax|pt|pc)?\b/g,
      '<span class="hl-number">$1$2</span>')
    .replace(/\b(red|blue|green|white|black|gray|grey|orange|purple|pink|yellow|cyan|magenta|transparent|none|auto|inherit|initial|unset|solid|dashed|dotted|double|groove|ridge|inset|outset|flex|grid|block|inline-block|inline|relative|absolute|fixed|sticky|center|left|right|top|bottom|space-between|space-around|space-evenly|stretch|wrap|nowrap|bold|normal|italic|underline|uppercase|lowercase|capitalize|pointer|default|move|crosshair|serif|sans-serif|monospace)\b/g,
      '<span class="hl-cssval">$1</span>');
}

function highlightHTML(code) {
  let out = '';
  let i = 0;
  while (i < code.length) {
    // HTML comment
    if (code.startsWith('<!--', i)) {
      const end = code.indexOf('-->', i + 4);
      const chunk = end === -1 ? code.slice(i) : code.slice(i, end + 3);
      out += `<span class="hl-comment">${escHtml(chunk)}</span>`;
      i = end === -1 ? code.length : end + 3;
      continue;
    }
    // Tag
    if (code[i] === '<') {
      let j = i + 1;
      let inStr = false, sq = '';
      while (j < code.length) {
        if (inStr) { if (code[j] === sq) inStr = false; }
        else {
          if (code[j] === '"' || code[j] === "'") { inStr = true; sq = code[j]; }
          else if (code[j] === '>') { j++; break; }
        }
        j++;
      }
      out += highlightHTMLTag(code.slice(i, j));
      i = j;
      continue;
    }
    out += escHtml(code[i]); i++;
  }
  return out;
}

function highlightHTMLTag(tag) {
  // Identify closing vs self-closing vs opening
  const isSelfClose = tag.endsWith('/>');
  const isClose     = tag.startsWith('</');
  let inner = tag.slice(isClose ? 2 : 1, isSelfClose ? -2 : -1);

  let out = isClose
    ? '<span class="hl-punct">&lt;/</span>'
    : '<span class="hl-punct">&lt;</span>';

  // Tag name
  const tnMatch = inner.match(/^[\w:-]+/);
  if (tnMatch) {
    out += `<span class="hl-tag">${escHtml(tnMatch[0])}</span>`;
    inner = inner.slice(tnMatch[0].length);
  }

  // Attributes
  let k = 0;
  while (k < inner.length) {
    if (/\s/.test(inner[k])) { out += inner[k]; k++; continue; }
    // attr name
    const am = inner.slice(k).match(/^[\w:-]+/);
    if (am) {
      out += `<span class="hl-attr">${escHtml(am[0])}</span>`;
      k += am[0].length;
      if (inner[k] === '=') {
        out += '<span class="hl-punct">=</span>'; k++;
        const q = inner[k];
        if (q === '"' || q === "'") {
          let end = k + 1;
          while (end < inner.length && inner[end] !== q) end++;
          out += `<span class="hl-value">${escHtml(inner.slice(k, end + 1))}</span>`;
          k = end + 1;
        }
      }
      continue;
    }
    out += escHtml(inner[k]); k++;
  }

  out += isSelfClose
    ? '<span class="hl-punct">/&gt;</span>'
    : '<span class="hl-punct">&gt;</span>';
  return out;
}

function updateHighlight() {
  const hl   = document.getElementById('code-highlight');
  const code = document.getElementById('code-editor').value;
  if (!hl) return;
  if (state.activeTab === 'js')   hl.innerHTML = highlightJS(code)  + '\n';
  if (state.activeTab === 'css')  hl.innerHTML = highlightCSS(code) + '\n';
  if (state.activeTab === 'html') hl.innerHTML = highlightHTML(code) + '\n';
}

// ---------- LINTER ----------
function lintCurrentTab() {
  if (state.activeTab !== 'js') return;
  const code = document.getElementById('code-editor').value.trim();
  if (!code) { clearEditorMsg(); return; }
  try {
    // eslint-disable-next-line no-new-func
    new Function(code);
    // If it parsed fine, clear any previous syntax error
    const msg = document.getElementById('editor-msg');
    if (msg.dataset.isLintError) clearEditorMsg();
  } catch(e) {
    const msg = document.getElementById('editor-msg');
    msg.textContent = '⚠ ' + e.message;
    msg.className   = 'editor-msg error';
    msg.dataset.isLintError = 'true';
  }
}

// ---------- BUILD PREVIEW ----------
function buildPreview() {
  const frame = document.getElementById('preview-frame');
  const html  = state.editorContents.html;
  const css   = state.editorContents.css;
  const js    = state.editorContents.js;

  const doc = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<style>
* { box-sizing: border-box; }
body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
${css}
</style>
</head>
<body>
${html}
<script>
(function() {
  try {
${js}
  } catch(e) {
    const errDiv = document.createElement('div');
    errDiv.style.cssText = 'position:fixed;bottom:0;left:0;right:0;background:#ffebee;color:#c62828;padding:10px 14px;font-family:monospace;font-size:13px;border-top:2px solid #e53935;z-index:9999;';
    errDiv.textContent = '❌ Error JS: ' + e.message;
    document.body.appendChild(errDiv);
  }
})();
<\/script>
</body>
</html>`;

  frame.srcdoc = doc;
}

function clearEditorMsg() {
  const msg = document.getElementById('editor-msg');
  msg.textContent = '';
  msg.className = 'editor-msg';
}

function setEditorMsg(text, type) {
  const msg = document.getElementById('editor-msg');
  msg.textContent = text;
  msg.className   = 'editor-msg ' + (type || '');
}

// ---------- VALIDATE ----------
function validateChallenge() {
  const frame = document.getElementById('preview-frame');

  // Give iframe time to load before validating
  setTimeout(() => {
    try {
      const iframeDoc = frame.contentDocument || frame.contentWindow.document;
      const result    = state.currentChallenge.validate(iframeDoc);

      if (result.pass) {
        onChallengeSuccess(result.msg);
      } else {
        showErrorModal(result.msg);
      }
    } catch(e) {
      showErrorModal('No se pudo validar el reto. Asegúrate de haber ejecutado el código primero.');
    }
  }, 300);
}

// ---------- SUCCESS ----------
function onChallengeSuccess(msg) {
  const ch       = state.currentChallenge;
  const hintsUsed = state.hintIndex;
  const basePoints = 10;
  const bonusPoints = hintsUsed === 0 ? 5 : 0;
  const earned   = basePoints + bonusPoints;

  if (!state.completedChallenges.includes(ch.id)) {
    state.completedChallenges.push(ch.id);
    state.points += earned;
    if (!state.usedHints[ch.id]) state.usedHints[ch.id] = hintsUsed;
    saveProgress();
  }

  document.getElementById('challenge-pts').textContent = state.points;
  document.getElementById('victory-msg').textContent   = msg;
  document.getElementById('victory-pts').textContent   = `+${basePoints} pts`;

  const bonusEl = document.getElementById('victory-bonus');
  if (bonusPoints > 0 && !state.completedChallenges.includes(ch.id + '_bonus')) {
    bonusEl.classList.remove('hidden');
  } else {
    bonusEl.classList.add('hidden');
  }

  document.getElementById('achievement-pop').classList.add('hidden');
  checkAchievements();

  document.getElementById('modal-victory').classList.remove('hidden');
}

// ---------- NEXT CHALLENGE ----------
function goNext() {
  document.getElementById('modal-victory').classList.add('hidden');
  const level = state.currentLevel;
  const ci    = level.challenges.indexOf(state.currentChallenge);

  if (ci + 1 < level.challenges.length) {
    // Next challenge in same level
    startChallenge(level, level.challenges[ci + 1]);
  } else {
    // Level complete
    showLevelDoneModal(level);
  }
}

function showLevelDoneModal(level) {
  const li = LEVELS.indexOf(level);
  document.getElementById('level-done-title').textContent = `¡Nivel ${level.id} Completado!`;
  document.getElementById('level-done-msg').textContent   = `Has dominado "${level.name}". ¡Excelente trabajo, ${state.playerName}!`;

  const nextBtn = document.getElementById('btn-next-level');
  if (li + 1 < LEVELS.length) {
    nextBtn.style.display = '';
    nextBtn.onclick = () => {
      document.getElementById('modal-level-done').classList.add('hidden');
      const nextLevel = LEVELS[li + 1];
      startChallenge(nextLevel, nextLevel.challenges[0]);
    };
  } else {
    nextBtn.style.display = 'none';
  }

  document.getElementById('modal-level-done').classList.remove('hidden');
}

// ---------- ACHIEVEMENTS ----------
function checkAchievements() {
  ACHIEVEMENTS.forEach(ach => {
    if (!state.unlockedAchievements.includes(ach.id) && ach.condition(state)) {
      state.unlockedAchievements.push(ach.id);
      saveProgress();
      showAchievementToast(ach);
    }
  });
}

function showAchievementToast(ach) {
  const toast = document.getElementById('toast-achievement');
  document.getElementById('toast-ach-name').textContent = `${ach.icon} ${ach.name}`;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 3500);
}

// ---------- HINT ----------
function showHint() {
  const ch = state.currentChallenge;
  if (state.hintIndex >= ch.hints.length) {
    setEditorMsg('No hay más pistas disponibles.', '');
    return;
  }

  if (state.points >= 5) {
    state.points -= 5;
    document.getElementById('challenge-pts').textContent = state.points;
    saveProgress();
  }

  state.hintIndex++;
  if (!state.usedHints[ch.id] || state.usedHints[ch.id] < state.hintIndex) {
    state.usedHints[ch.id] = state.hintIndex;
  }

  renderHints();

  if (state.hintIndex >= ch.hints.length) {
    document.getElementById('btn-hint').disabled = true;
    document.getElementById('btn-hint').style.opacity = '0.5';
  }
}

// ---------- ERROR MODAL ----------
function showErrorModal(msg) {
  document.getElementById('error-msg').textContent = msg;
  document.getElementById('modal-error').classList.remove('hidden');
}

// ---------- EDITOR ENHANCEMENTS ----------
function setupEditor() {
  const editor = document.getElementById('code-editor');
  const hlPre  = document.getElementById('code-highlight');

  // Tab key → 2 spaces
  editor.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = editor.selectionStart;
      const end   = editor.selectionEnd;
      editor.value = editor.value.substring(0, start) + '  ' + editor.value.substring(end);
      editor.selectionStart = editor.selectionEnd = start + 2;
      saveCurrentTab();
      updateLineNumbers();
      updateHighlight();
    }
  });

  editor.addEventListener('input', () => {
    saveCurrentTab();
    updateLineNumbers();
    updateHighlight();
    lintCurrentTab();
  });

  // Sync scroll between textarea and highlight overlay
  editor.addEventListener('scroll', () => {
    document.getElementById('line-numbers').scrollTop = editor.scrollTop;
    if (hlPre) {
      hlPre.scrollTop  = editor.scrollTop;
      hlPre.scrollLeft = editor.scrollLeft;
    }
  });

  // Tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      saveCurrentTab();
      setActiveTab(btn.dataset.tab);
    });
  });

  // Run button
  document.getElementById('btn-run').addEventListener('click', () => {
    saveCurrentTab();
    buildPreview();
    setEditorMsg('▶ Código ejecutado en la vista previa.', 'success');
  });

  // Reset code
  document.getElementById('btn-reset-code').addEventListener('click', () => {
    const ch = state.currentChallenge;
    state.editorContents = {
      js:   ch.initialJS,
      html: ch.initialHTML,
      css:  ch.initialCSS,
    };
    setActiveTab(state.activeTab);
    buildPreview();
    setEditorMsg('Código reseteado.', '');
  });
}

// ---------- INIT ----------
function init() {
  // Welcome
  initWelcome();

  // Back to map
  document.getElementById('btn-back-map').addEventListener('click', () => {
    initMap();
    showScreen('screen-map');
  });

  // Hint
  document.getElementById('btn-hint').addEventListener('click', showHint);

  // Verify
  document.getElementById('btn-verify').addEventListener('click', () => {
    saveCurrentTab();
    buildPreview();
    setTimeout(validateChallenge, 400);
  });

  // Victory: next
  document.getElementById('btn-next').addEventListener('click', goNext);

  // Error: close
  document.getElementById('btn-error-close').addEventListener('click', () => {
    document.getElementById('modal-error').classList.add('hidden');
  });

  // Level done: to map
  document.getElementById('btn-to-map').addEventListener('click', () => {
    document.getElementById('modal-level-done').classList.add('hidden');
    initMap();
    showScreen('screen-map');
  });

  // Close modals clicking overlay
  ['modal-victory', 'modal-error', 'modal-level-done'].forEach(id => {
    document.getElementById(id).addEventListener('click', function(e) {
      if (e.target === this) this.classList.add('hidden');
    });
  });

  // Editor setup
  setupEditor();
}

document.addEventListener('DOMContentLoaded', init);
