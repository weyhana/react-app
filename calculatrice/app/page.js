'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/* ==========================================================
   1. STYLES (le CSS est inclus ici, injecté par <style>)
   ========================================================== */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700&family=Share+Tech+Mono&display=swap');

:root {
  --bg: #e3e6e1;
  --ink: #1b1f1d;
  --muted: #5b655e;

  --body: #2e3330;
  --body-edge: #181b19;
  --solar: #1d2a2c;

  --lcd: #c4d0ae;
  --lcd-ink: #1b2619;
  --lcd-dim: #6d7b63;

  --num: #eceee8;
  --num-edge: #a4aaa1;
  --num-ink: #1c201e;

  --op: #8d978f;
  --op-edge: #565e58;
  --op-ink: #121614;

  --fn: #4b524e;
  --fn-edge: #262b28;
  --fn-ink: #e9ece6;

  --clear: #d8472a;
  --clear-edge: #8c2915;
  --clear-ink: #ffffff;

  --eq: #f08a24;
  --eq-edge: #a35410;
  --eq-ink: #1c1206;

  --drop: rgba(0, 0, 0, 0.28);

  --panel: #f1f3ee;
  --panel-line: #cdd2c9;
  --panel-hover: #e6eae1;

  --font-ui: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-lcd: 'Share Tech Mono', 'Courier New', ui-monospace, monospace;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
    --bg: #101311;
    --ink: #e6eae5;
    --muted: #8d978f;
    --body: #1c201e;
    --body-edge: #090b0a;
    --solar: #121b1d;
    --lcd: #8da077;
    --lcd-ink: #0f1a0d;
    --lcd-dim: #44533b;
    --num: #3a413d;
    --num-edge: #1a1e1c;
    --num-ink: #eaede8;
    --op: #5a645d;
    --op-edge: #262b28;
    --op-ink: #f1f4ef;
    --fn: #2a302d;
    --fn-edge: #121513;
    --drop: rgba(0, 0, 0, 0.5);
    --panel: #171b19;
    --panel-line: #2a302c;
    --panel-hover: #202522;
    color-scheme: dark;
  }
}

:root[data-theme='dark'] {
  --bg: #101311;
  --ink: #e6eae5;
  --muted: #8d978f;
  --body: #1c201e;
  --body-edge: #090b0a;
  --solar: #121b1d;
  --lcd: #8da077;
  --lcd-ink: #0f1a0d;
  --lcd-dim: #44533b;
  --num: #3a413d;
  --num-edge: #1a1e1c;
  --num-ink: #eaede8;
  --op: #5a645d;
  --op-edge: #262b28;
  --op-ink: #f1f4ef;
  --fn: #2a302d;
  --fn-edge: #121513;
  --drop: rgba(0, 0, 0, 0.5);
  --panel: #171b19;
  --panel-line: #2a302c;
  --panel-hover: #202522;
  color-scheme: dark;
}

* { box-sizing: border-box; }

html, body { margin: 0; }

body {
  display: block;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-ui);
  min-height: 100vh;
  padding-block: 28px;
  padding-left: max(16px, env(safe-area-inset-left, 0px));
  padding-right: max(16px, env(safe-area-inset-right, 0px));
  -webkit-font-smoothing: antialiased;
}

.app {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 28px;
  max-width: 860px;
  margin: 0 auto;
}

/* ---------- Boîtier ---------- */
.calc {
  flex: 0 1 360px;
  min-width: 0;
  background: var(--body);
  border-radius: 26px;
  padding: 18px 18px 26px;
  box-shadow:
    0 2px 0 rgba(255, 255, 255, 0.07) inset,
    0 -6px 0 var(--body-edge) inset,
    0 24px 40px -14px var(--drop);
}

.brand {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 2px 4px 14px;
}

.model {
  font-weight: 700;
  font-size: 0.78rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--fn-ink);
  opacity: 0.8;
}

.solar {
  width: 92px;
  height: 22px;
  border-radius: 4px;
  background:
    repeating-linear-gradient(90deg, transparent 0 22px, rgba(255, 255, 255, 0.12) 22px 23px),
    linear-gradient(180deg, var(--solar), #0c1213);
  box-shadow: 0 0 0 2px var(--body-edge) inset;
}

/* ---------- Écran LCD ---------- */
.lcd {
  background: var(--lcd);
  color: var(--lcd-ink);
  border-radius: 10px;
  padding: 10px 14px 12px;
  margin-bottom: 20px;
  box-shadow:
    0 3px 8px rgba(0, 0, 0, 0.35) inset,
    0 0 0 3px var(--body-edge);
  overflow: hidden;
}

.lcd-top {
  display: flex;
  align-items: baseline;
  gap: 10px;
  min-height: 1.4rem;
  font-family: var(--font-lcd);
  font-size: 1rem;
}

.lcd-flag { flex: 0 0 1.2em; font-weight: 700; }

.lcd-expr {
  flex: 1;
  min-width: 0;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--lcd-dim);
  color: color-mix(in srgb, var(--lcd-ink) 62%, transparent);
}

.lcd-main {
  font-family: var(--font-lcd);
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  line-height: 1.15;
  font-variant-numeric: tabular-nums;
  font-size: 3.1rem;
  min-height: 3.6rem;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}
.lcd-main.s2 { font-size: 2.55rem; }
.lcd-main.s3 { font-size: 2.05rem; }
.lcd-main.s4 { font-size: 1.7rem; }

/* ---------- Touches ---------- */
.fn-row,
.keys {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.fn-row { gap: 10px 12px; margin-bottom: 20px; }
.keys { gap: 16px 12px; }

.key {
  --face: var(--num);
  --edge: var(--num-edge);
  --ink-k: var(--num-ink);

  appearance: none;
  border: 0;
  border-radius: 12px;
  height: 62px;
  min-width: 0;
  padding: 0;
  font: 600 1.4rem/1 var(--font-ui);
  color: var(--ink-k);
  background-color: var(--face);
  background-image: linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0) 60%);
  box-shadow: 0 5px 0 var(--edge), 0 9px 14px var(--drop);
  transform: translateY(0);
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  transition: transform 0.06s ease-out, box-shadow 0.06s ease-out;
}

.key.num { --face: var(--num); --edge: var(--num-edge); --ink-k: var(--num-ink); }
.key.op { --face: var(--op); --edge: var(--op-edge); --ink-k: var(--op-ink); font-size: 1.6rem; }
.key.fn {
  --face: var(--fn); --edge: var(--fn-edge); --ink-k: var(--fn-ink);
  height: 42px; font-size: 1.05rem; border-radius: 10px;
  box-shadow: 0 4px 0 var(--edge), 0 7px 10px var(--drop);
}
.key.clear { --face: var(--clear); --edge: var(--clear-edge); --ink-k: var(--clear-ink); font-size: 1.2rem; }
.key.eq { --face: var(--eq); --edge: var(--eq-edge); --ink-k: var(--eq-ink); font-size: 1.7rem; }
.key.span2 { grid-column: span 2; }

.key:active {
  transform: translateY(5px);
  box-shadow: 0 0 0 var(--edge), 0 2px 4px var(--drop);
}
.key.fn:active { transform: translateY(4px); }

.key:focus-visible,
.log-item:focus-visible,
.clear-log:focus-visible {
  outline: 3px solid var(--eq);
  outline-offset: 3px;
}

/* Rebond : la touche s'enfonce, remonte trop haut, puis se stabilise.
   Deux animations identiques (A/B) alternent pour se relancer à chaque appui. */
.bounce-a { animation: bounceA 0.34s cubic-bezier(0.25, 0.8, 0.35, 1) both; }
.bounce-b { animation: bounceB 0.34s cubic-bezier(0.25, 0.8, 0.35, 1) both; }

@keyframes bounceA {
  0%   { transform: translateY(0);    box-shadow: 0 5px 0 var(--edge), 0 9px 14px var(--drop); }
  20%  { transform: translateY(5px);  box-shadow: 0 0 0 var(--edge), 0 2px 4px var(--drop); }
  52%  { transform: translateY(-3px); box-shadow: 0 8px 0 var(--edge), 0 12px 16px var(--drop); }
  76%  { transform: translateY(1px);  box-shadow: 0 4px 0 var(--edge), 0 8px 12px var(--drop); }
  100% { transform: translateY(0);    box-shadow: 0 5px 0 var(--edge), 0 9px 14px var(--drop); }
}
@keyframes bounceB {
  0%   { transform: translateY(0);    box-shadow: 0 5px 0 var(--edge), 0 9px 14px var(--drop); }
  20%  { transform: translateY(5px);  box-shadow: 0 0 0 var(--edge), 0 2px 4px var(--drop); }
  52%  { transform: translateY(-3px); box-shadow: 0 8px 0 var(--edge), 0 12px 16px var(--drop); }
  76%  { transform: translateY(1px);  box-shadow: 0 4px 0 var(--edge), 0 8px 12px var(--drop); }
  100% { transform: translateY(0);    box-shadow: 0 5px 0 var(--edge), 0 9px 14px var(--drop); }
}

/* ---------- Historique ---------- */
.history {
  flex: 1 1 280px;
  min-width: 0;
  max-width: 420px;
  background: var(--panel);
  border: 1px solid var(--panel-line);
  border-radius: 16px;
  padding: 16px;
}

.history-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.history h2 {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.01em;
}

.history .count {
  font-size: 0.82rem;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}

.log {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 440px;
  overflow-y: auto;
  border-top: 1px solid var(--panel-line);
}

.log li { border-bottom: 1px solid var(--panel-line); }

.log-item {
  appearance: none;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas: 'text time' 'res res';
  gap: 2px 10px;
  text-align: left;
  background: transparent;
  color: inherit;
  border: 0;
  padding: 10px 6px;
  cursor: pointer;
  font: inherit;
  border-radius: 6px;
}
.log-item:hover { background: var(--panel-hover); }

.log-text {
  grid-area: text;
  min-width: 0;
  overflow-wrap: anywhere;
  font-size: 0.85rem;
  color: var(--muted);
}
.log-time {
  grid-area: time;
  font-size: 0.75rem;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}
.log-res {
  grid-area: res;
  min-width: 0;
  overflow-wrap: anywhere;
  font-family: var(--font-lcd);
  font-size: 1.45rem;
  font-variant-numeric: tabular-nums;
}

.empty {
  margin: 0;
  padding: 18px 2px 8px;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--muted);
  border-top: 1px solid var(--panel-line);
}

.clear-log {
  appearance: none;
  margin-top: 14px;
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid var(--panel-line);
  background: transparent;
  color: var(--ink);
  font: 600 0.9rem var(--font-ui);
  cursor: pointer;
}
.clear-log:hover:not(:disabled) { background: var(--panel-hover); }
.clear-log:disabled { opacity: 0.45; cursor: default; }
.clear-log.confirm { background: var(--clear); border-color: var(--clear); color: var(--clear-ink); }

@media (max-width: 480px) {
  .calc { padding: 14px 14px 22px; }
  .key { height: 58px; }
  .lcd-main { font-size: 2.7rem; }
  .lcd-main.s2 { font-size: 2.25rem; }
  .lcd-main.s3 { font-size: 1.85rem; }
  .lcd-main.s4 { font-size: 1.5rem; }
  .log { max-height: 320px; }
}

@media (prefers-reduced-motion: reduce) {
  .bounce-a, .bounce-b { animation: none; }
  .key { transition: none; }
}
`

/* ==========================================================
   2. MOTEUR DE CALCUL
   Calculatrice « à exécution immédiate » : chaque opérateur calcule
   tout de suite ce qui précède (2 + 3 × affiche 5, puis × 4 = donne 20).
   ========================================================== */
const MAX_DIGITS = 12

const OPERATIONS = {
  '+': (a, b) => a + b,
  '−': (a, b) => a - b,
  '×': (a, b) => a * b,
  '÷': (a, b) => a / b,
}

// Supprime les erreurs d'arrondi de la virgule flottante (0.1 + 0.2 = 0.3)
const clean = (n) => parseFloat(n.toPrecision(MAX_DIGITS))

// Nombre -> texte
const fmt = (n) => {
  const r = clean(n)
  if (r !== 0 && (Math.abs(r) >= 1e12 || Math.abs(r) < 1e-9)) {
    return r.toExponential(5).replace(/\.?0+e/, 'e').replace('e+', 'e')
  }
  return String(r)
}

const compute = (a, op, b) => {
  const r = OPERATIONS[op](a, b)
  return Number.isFinite(r) ? r : null // division par zéro => erreur
}

const initialState = () => ({
  display: '0', // texte affiché
  acc: null, // nombre mémorisé avant l'opérateur
  op: null, // opérateur en attente
  waiting: false, // on vient d'appuyer sur un opérateur
  replace: true, // le prochain chiffre remplace l'affichage
  done: false, // on vient d'appuyer sur =
  expr: '', // petite ligne au-dessus de l'écran
  error: false,
  repeat: null, // dernière opération, pour = = = répété
})

const failed = () => ({ ...initialState(), display: 'Erreur', error: true })
const digitCount = (s) => s.replace(/[^0-9]/g, '').length
const startNew = (s) =>
  s.done ? { ...s, acc: null, op: null, repeat: null, expr: '', done: false } : s

// Retourne { state, entry } : entry = résultat à enregistrer dans l'historique
function reduce(s, a) {
  if (a.type === 'clear') return { state: initialState(), entry: null }
  if (s.error && a.type !== 'digit' && a.type !== 'dot') {
    return { state: s, entry: null }
  }

  const base = s.error ? initialState() : s
  const cur = parseFloat(base.display)

  switch (a.type) {
    case 'digit': {
      const st = startNew(base)
      let display
      if (st.replace || st.display === '0') display = a.value
      else if (st.display === '-0') display = '-' + a.value
      else if (digitCount(st.display) >= MAX_DIGITS) display = st.display
      else display = st.display + a.value
      return { state: { ...st, display, replace: false, waiting: false }, entry: null }
    }

    case 'dot': {
      const st = startNew(base)
      let display
      if (st.replace) display = '0.'
      else if (st.display.includes('.') || digitCount(st.display) >= MAX_DIGITS) display = st.display
      else display = st.display + '.'
      return { state: { ...st, display, replace: false, waiting: false }, entry: null }
    }

    case 'op': {
      // Changement d'avis : 5 + puis × remplace simplement l'opérateur
      if (base.op && base.waiting) {
        return {
          state: { ...base, op: a.value, expr: `${fmt(base.acc)} ${a.value}` },
          entry: null,
        }
      }
      let acc = cur
      let display = base.display
      let entry = null
      if (base.op) {
        const r = compute(base.acc, base.op, cur) // résultat immédiat
        if (r === null) return { state: failed(), entry: null }
        entry = { text: `${fmt(base.acc)} ${base.op} ${fmt(cur)}`, result: fmt(r) }
        acc = clean(r)
        display = fmt(r)
      }
      return {
        state: {
          ...base,
          display,
          acc,
          op: a.value,
          waiting: true,
          replace: true,
          done: false,
          repeat: null,
          expr: `${fmt(acc)} ${a.value}`,
        },
        entry,
      }
    }

    case 'equals': {
      let left, op, right
      if (base.op) {
        left = base.acc; op = base.op; right = cur // 5 + = donne 10
      } else if (base.repeat) {
        left = cur; op = base.repeat.op; right = base.repeat.value // = = = répète
      } else {
        return { state: base, entry: null }
      }

      const r = compute(left, op, right)
      if (r === null) return { state: failed(), entry: null }
      const text = `${fmt(left)} ${op} ${fmt(right)}`
      return {
        state: {
          ...base,
          display: fmt(r),
          acc: null,
          op: null,
          waiting: false,
          replace: true,
          done: true,
          repeat: { op, value: right },
          expr: `${text} =`,
        },
        entry: { text, result: fmt(r) },
      }
    }

    case 'unary': {
      let r, text
      if (a.kind === 'sqrt') {
        if (cur < 0) return { state: failed(), entry: null }
        r = Math.sqrt(cur); text = `√(${fmt(cur)})`
      } else if (a.kind === 'sq') {
        r = cur * cur; text = `(${fmt(cur)})²`
      } else if (a.kind === 'inv') {
        if (cur === 0) return { state: failed(), entry: null }
        r = 1 / cur; text = `1 ÷ ${fmt(cur)}`
      } else if (a.kind === 'pct') {
        // 200 + 10 % => 20 (10 % de 200) ; sinon 10 % => 0,1
        r = base.op === '+' || base.op === '−' ? (base.acc * cur) / 100 : cur / 100
        text = `${fmt(cur)} %`
      } else {
        return { state: base, entry: null }
      }
      if (!Number.isFinite(r)) return { state: failed(), entry: null }
      return {
        state: { ...base, display: fmt(r), waiting: false, replace: true, expr: base.op ? base.expr : text },
        entry: { text, result: fmt(r) },
      }
    }

    case 'neg': {
      if (base.waiting) {
        return { state: { ...base, display: '-0', waiting: false, replace: false }, entry: null }
      }
      if (base.display === '0') return { state: base, entry: null }
      const display = base.display.startsWith('-') ? base.display.slice(1) : '-' + base.display
      return { state: { ...base, display }, entry: null }
    }

    case 'backspace': {
      if (base.replace) return { state: base, entry: null }
      const d = base.display
      const display = d.length <= 1 || (d.length === 2 && d.startsWith('-')) ? '0' : d.slice(0, -1)
      return { state: { ...base, display }, entry: null }
    }

    case 'load': // reprendre un résultat de l'historique
      return { state: { ...base, display: a.value, waiting: false, replace: true }, entry: null }

    default:
      return { state: base, entry: null }
  }
}

/* ==========================================================
   3. AFFICHAGE : 1234.5 -> « 1 234,5 » (format français)
   ========================================================== */
function pretty(str) {
  if (str === 'Erreur') return str
  const neg = str.startsWith('-')
  const s = neg ? str.slice(1) : str
  const sign = neg ? '-' : ''
  if (s.includes('e')) return sign + s.replace('.', ',')
  const [int, dec] = s.split('.')
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, '\u202f')
  return sign + grouped + (dec !== undefined ? ',' + dec : '')
}

const prettyText = (t) => t.replace(/-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/g, pretty)

// Réduit la taille des chiffres quand le nombre est long
const sizeClass = (text) => {
  const n = text.length
  return n <= 9 ? '' : n <= 12 ? 's2' : n <= 15 ? 's3' : 's4'
}

const hhmm = (t) =>
  new Date(t).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })

/* ==========================================================
   4. TOUCHES
   ========================================================== */
const digit = (n) => ({
  id: String(n),
  label: String(n),
  kind: 'num',
  action: { type: 'digit', value: String(n) },
})

const K = {
  sqrt: { id: 'sqrt', label: '√', kind: 'fn', aria: 'Racine carrée', action: { type: 'unary', kind: 'sqrt' } },
  sq: { id: 'sq', label: 'x²', kind: 'fn', aria: 'Carré', action: { type: 'unary', kind: 'sq' } },
  inv: { id: 'inv', label: '1/x', kind: 'fn', aria: 'Inverse', action: { type: 'unary', kind: 'inv' } },
  neg: { id: 'neg', label: '±', kind: 'fn', aria: 'Changer le signe', action: { type: 'neg' } },
  ac: { id: 'ac', label: 'AC', kind: 'clear', aria: 'Tout effacer', action: { type: 'clear' } },
  bs: { id: 'bs', label: '⌫', kind: 'op', aria: 'Effacer le dernier chiffre', action: { type: 'backspace' } },
  pct: { id: 'pct', label: '%', kind: 'op', aria: 'Pourcentage', action: { type: 'unary', kind: 'pct' } },
  div: { id: 'div', label: '÷', kind: 'op', aria: 'Diviser', action: { type: 'op', value: '÷' } },
  mul: { id: 'mul', label: '×', kind: 'op', aria: 'Multiplier', action: { type: 'op', value: '×' } },
  sub: { id: 'sub', label: '−', kind: 'op', aria: 'Soustraire', action: { type: 'op', value: '−' } },
  add: { id: 'add', label: '+', kind: 'op', aria: 'Additionner', action: { type: 'op', value: '+' } },
  dot: { id: 'dot', label: ',', kind: 'num', aria: 'Virgule', action: { type: 'dot' } },
  eq: { id: 'eq', label: '=', kind: 'eq', aria: 'Égal', action: { type: 'equals' } },
}
for (let i = 0; i <= 9; i++) K[String(i)] = digit(i)
K['0'].span = true

const FN_ROW = [K.sqrt, K.sq, K.inv, K.neg]

const GRID = [
  K.ac, K.bs, K.pct, K.div,
  K['7'], K['8'], K['9'], K.mul,
  K['4'], K['5'], K['6'], K.sub,
  K['1'], K['2'], K['3'], K.add,
  K['0'], K.dot, K.eq,
]

// Touche du clavier -> id de touche de la calculatrice
function keyToId(k) {
  if (/^[0-9]$/.test(k)) return k
  if (k === '.' || k === ',') return 'dot'
  if (k === '+') return 'add'
  if (k === '-') return 'sub'
  if (k === '*' || k === 'x' || k === 'X') return 'mul'
  if (k === '/') return 'div'
  if (k === 'Enter' || k === '=') return 'eq'
  if (k === 'Backspace') return 'bs'
  if (k === 'Escape' || k === 'Delete') return 'ac'
  if (k === '%') return 'pct'
  return null
}

/* ==========================================================
   5. COMPOSANT TOUCHE (avec rebond)
   `pulse` augmente à chaque appui : pair/impair alterne entre deux
   animations identiques pour relancer le rebond sur la même touche.
   ========================================================== */
function Key({ def, pulse, onDown, onPress }) {
  const anim = pulse ? (pulse % 2 ? ' bounce-a' : ' bounce-b') : ''

  return (
    <button
      type="button"
      className={`key ${def.kind}${def.span ? ' span2' : ''}${anim}`}
      aria-label={def.aria}
      onMouseDown={(e) => e.preventDefault()}
      onPointerDown={() => onDown(def.id)}
      onClick={() => onPress(def.action)}
    >
      {def.label}
    </button>
  )
}

/* ==========================================================
   6. HISTORIQUE (stocké dans le localStorage)
   ========================================================== */
const STORAGE_KEY = 'calculatrice.historique.v1'
const MAX_HISTORY = 200

function loadHistory() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    if (!Array.isArray(data)) return []
    return data
      .filter((e) => e && typeof e.text === 'string' && typeof e.result === 'string')
      .slice(0, MAX_HISTORY)
  } catch {
    return []
  }
}

function History({ history, onPick, onClear }) {
  const [confirming, setConfirming] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  // Premier clic : demande confirmation (3 s). Deuxième clic : efface.
  const handleClear = () => {
    if (!confirming) {
      setConfirming(true)
      timerRef.current = setTimeout(() => setConfirming(false), 3000)
    } else {
      clearTimeout(timerRef.current)
      onClear()
      setConfirming(false)
    }
  }

  return (
    <aside className="history" aria-label="Historique des résultats">
      <div className="history-head">
        <h2>Historique</h2>
        <span className="count">
          {history.length} résultat{history.length > 1 ? 's' : ''}
        </span>
      </div>

      {history.length === 0 ? (
        <p className="empty">
          Chaque résultat sera affiché ici et reste enregistré dans ce navigateur, même après
          fermeture de la page. Touchez un résultat pour le reprendre dans la calculatrice.
        </p>
      ) : (
        <ol className="log">
          {history.map((e) => (
            <li key={e.id}>
              <button type="button" className="log-item" onClick={() => onPick(e.result)}>
                <span className="log-text">{prettyText(e.text)}</span>
                <span className="log-time">{e.time ? hhmm(e.time) : ''}</span>
                <span className="log-res">= {pretty(e.result)}</span>
              </button>
            </li>
          ))}
        </ol>
      )}

      <button
        type="button"
        className={`clear-log${confirming ? ' confirm' : ''}`}
        disabled={history.length === 0}
        onClick={handleClear}
      >
        {confirming ? 'Confirmer l’effacement' : 'Effacer l’historique'}
      </button>
    </aside>
  )
}

/* ==========================================================
   7. PAGE
   ========================================================== */
export default function Page() {
  const [calc, setCalc] = useState(initialState)
  const [history, setHistory] = useState([]) // vide au départ : identique côté serveur et navigateur
  const [loaded, setLoaded] = useState(false)
  const [pulses, setPulses] = useState({})
  const calcRef = useRef(calc)

  // Appui sur une touche : calcul immédiat + enregistrement du résultat
  const press = useCallback((action) => {
    const { state, entry } = reduce(calcRef.current, action)
    calcRef.current = state
    setCalc(state)
    if (entry) {
      setHistory((h) =>
        [{ id: Date.now() + Math.random(), time: Date.now(), ...entry }, ...h].slice(0, MAX_HISTORY)
      )
    }
  }, [])

  // Relance l'animation de rebond de la touche
  const bump = useCallback((id) => {
    setPulses((p) => ({ ...p, [id]: (p[id] || 0) + 1 }))
  }, [])

  // 1) Au chargement : lire l'historique enregistré dans le navigateur
  useEffect(() => {
    setHistory(loadHistory())
    setLoaded(true)
  }, [])

  // 2) Ensuite : sauvegarder à chaque nouveau résultat
  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
    } catch {
      /* stockage indisponible : la calculatrice continue de fonctionner */
    }
  }, [history, loaded])

  // Clavier physique : même chemin qu'un clic
  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.repeat) return
      if (e.target instanceof Element && e.target.closest('.history')) return
      const id = keyToId(e.key)
      if (!id) return
      e.preventDefault()
      bump(id)
      press(K[id].action)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [press, bump])

  const shown = pretty(calc.display)

  return (
    <>
      <style>{css}</style>

      <main className="app">
        <section className="calc" aria-label="Calculatrice">
          <div className="brand">
            <span className="model">Calc 12</span>
            <span className="solar" aria-hidden="true" />
          </div>

          <div className="lcd">
            <div className="lcd-top">
              <span className="lcd-flag" aria-hidden="true">
                {calc.error ? 'E' : calc.op || ''}
              </span>
              <span className="lcd-expr">{prettyText(calc.expr)}</span>
            </div>
            <div className={`lcd-main ${sizeClass(shown)}`} role="status" aria-live="polite">
              {shown}
            </div>
          </div>

          <div className="fn-row">
            {FN_ROW.map((k) => (
              <Key key={k.id} def={k} pulse={pulses[k.id]} onDown={bump} onPress={press} />
            ))}
          </div>

          <div className="keys">
            {GRID.map((k) => (
              <Key key={k.id} def={k} pulse={pulses[k.id]} onDown={bump} onPress={press} />
            ))}
          </div>
        </section>

        <History
          history={history}
          onPick={(value) => press({ type: 'load', value })}
          onClear={() => setHistory([])}
        />
      </main>
    </>
  )
} 