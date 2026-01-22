/// <reference lib="dom" />
// @ts-nocheck: Testing

const COLUMNS = 40, ROWS = 30;
const MATHML_NS = "http://www.w3.org/1998/Math/MathML";
const WEIGHTS = [1, 3, 5, 4, 2, 3];

const root = document.documentElement;
const container = document.getElementById("container");
const video = document.getElementById("video");
const start = document.getElementById("start");

// Setup CSS
root.style.setProperty("--columns", `${COLUMNS}`);
root.style.setProperty("--ratio", `${COLUMNS} / ${ROWS}`);

// Gravity formulas
const formulas = [
  [
    `<mi>𝐠</mi>`,
    `<mi mathvariant="normal">Δ</mi> </mpadded> <mi>U</mi>`,
    `<msub> <mi>𝚽</mi> <mi>G</mi> </msub>`,
    `<msub> <mi>E</mi> <mi>p</mi> </msub>`,
  ],
  [
    `<mi>𝐠</mi> <mo>=</mo> <mfrac> <mi>𝐅</mi> <mi>m</mi> </mfrac>`,
    `<mi mathvariant="normal">𝛀</mi> </mpadded> <mo>=</mo> <mn>2</mn> <mi>𝝃</mi>`,
    `<mi>ξ</mi> <mo>=</mo> <mo form="prefix" stretchy="false">∇</mo> <mo form="prefix" stretchy="false">×</mo> <mi>𝐡</mi>`,
    `<mi>𝐠</mi> <mo>=</mo> <mo form="prefix" stretchy="false">−</mo> <mo form="prefix" stretchy="false">∇</mo> <mi>U</mi>`,
    `<mi>𝐠</mi> <mo>=</mo> <mfrac> <mrow> <mi>G</mi> <mi>m</mi> </mrow> <mrow> <mi>|</mi> <mi>𝐫</mi> <msup> <mi>|</mi> <mn>2</mn> </msup> </mrow> </mfrac> <mover> <mi>𝐫</mi> <mo stretchy="false" class="wbk-acc" style="math-depth:0;">^</mo> </mover>`,
    `<mi>E</mi> <mo>=</mo> <mi>T</mi> <mo>+</mo> <mi>U</mi>`,
  ],
  [
    `<msub> <mi>E</mi> <mi>p</mi> </msub> <mo>=</mo> <mo form="prefix" stretchy="false">−</mo> <msub> <mi>W</mi> <mrow> <mi>∞</mi> <mi>r</mi> </mrow> </msub>`,
    `<mi mathvariant="normal">Δ</mi> </mpadded> <mi>U</mi> <mo>=</mo> <mo form="prefix" stretchy="false">−</mo> <mfrac> <mi>W</mi> <mi>m</mi> </mfrac>`,
    `<msub> <mi>𝚽</mi> <mpadded lspace="0"> <mi mathvariant="normal">n</mi> </mpadded> </msub> <mo>=</mo> <msub> <mo movablelimits="false">∫</mo> <mi>S</mi> </msub> <mi>𝛀</mi> <mo>⋅</mo> <mrow> <mtext> </mtext> <mpadded lspace="0"> <mi mathvariant="normal">d</mi> </mpadded> </mrow> <mi>𝐀</mi>`,
    `<mi>𝐅</mi> <mo>=</mo> <mi>m</mi> <mo form="prefix" stretchy="false">(</mo> <mi>𝐯</mi> <mo>×</mo> <mn>2</mn> <mi>𝝃</mi> <mo form="postfix" stretchy="false">)</mo>`,
    `<msub> <mi>𝚽</mi> <mi>ξ</mi> </msub> <mo>=</mo> <msub> <mo movablelimits="false">∫</mo> <mi>S</mi> </msub> <mi>𝝃</mi> <mo>⋅</mo> <mrow> <mtext> </mtext> <mpadded lspace="0"> <mi mathvariant="normal">d</mi> </mpadded> </mrow> <mi>𝐀</mi>`,
    `<msub> <mi>𝚽</mi> <mi>G</mi> </msub> <mo>=</mo> <msub> <mo movablelimits="false">∫</mo> <mi>S</mi> </msub> <mi>𝐠</mi> <mo>⋅</mo> <mrow> <mtext> </mtext> <mpadded lspace="0"> <mi mathvariant="normal">d</mi> </mpadded> </mrow> <mi>𝐀</mi>`,
    `<mi>𝛕</mi> <mo>=</mo> <msub> <mo movablelimits="false">∫</mo> <msub> <mi>V</mi> <mi>n</mi> </msub> </msub> <mpadded lspace="0"> <mi mathvariant="normal">d</mi> </mpadded> <mi>𝐦</mi> <mo>×</mo> <mi>𝐠</mi>`,
    `<mi>U</mi> <mo>=</mo> <mo form="prefix" stretchy="false">−</mo> <mfrac> <mrow> <mi>G</mi> <msub> <mi>m</mi> <mn>1</mn> </msub> <msub> <mi>m</mi> <mn>2</mn> </msub> </mrow> <mrow> <mi>|</mi> <mi>𝐫</mi> <mi>|</mi> </mrow> </mfrac>`,
    `<mi>v</mi> <mo>=</mo> <msqrt> <mfrac> <mrow> <mn>2</mn> <mi>G</mi> <mi>M</mi> </mrow> <mi>r</mi> </mfrac> </msqrt>`,
  ],
  [
    `<mi mathvariant="normal">Δ</mi> </mpadded> <mi>U</mi> <mo>=</mo> <mo form="prefix" stretchy="false">−</mo> <mfrac> <mn>1</mn> <mi>m</mi> </mfrac> <msubsup> <mo movablelimits="false">∫</mo> <msub> <mi>r</mi> <mn>1</mn> </msub> <msub> <mi>r</mi> <mn>2</mn> </msub> </msubsup> <mi>𝐅</mi> <mo>⋅</mo> <mrow> <mtext> </mtext> <mpadded lspace="0"> <mi mathvariant="normal">d</mi> </mpadded> </mrow> <mi>𝐫</mi>`,
    `<mi mathvariant="normal">Δ</mi> </mpadded> <mi>U</mi> <mo>=</mo> <mo form="prefix" stretchy="false">−</mo> <msubsup> <mo movablelimits="false">∫</mo> <msub> <mi>r</mi> <mn>1</mn> </msub> <msub> <mi>r</mi> <mn>2</mn> </msub> </msubsup> <mi>𝐠</mi> <mo>⋅</mo> <mrow> <mtext> </mtext> <mpadded lspace="0"> <mi mathvariant="normal">d</mi> </mpadded> </mrow> <mi>𝐫</mi>`,
    `<mi>𝐠</mi> <mo>=</mo> <mi>G</mi> <msub> <mo movablelimits="false">∑</mo> <mi>i</mi> </msub> <mfrac> <msub> <mi>m</mi> <mi>i</mi> </msub> <msup> <mrow> <mo fence="true" form="prefix">|</mo> <msub> <mi>𝐫</mi> <mi>i</mi> </msub> <mo>−</mo> <mi>𝐫</mi> <mo fence="true" form="postfix">|</mo> </mrow> <mn>2</mn> </msup> </mfrac> <msub> <mover> <mi>𝐫</mi> <mo stretchy="false" class="wbk-acc" style="math-depth:0;">^</mo> </mover> <mi>i</mi> </msub>`,
    `<mi>𝛏</mi> <mo>=</mo> <mfrac> <mi>G</mi> <mrow> <mn>2</mn> <msup> <mi>c</mi> <mn class="tml-sml-pad">2</mn> </msup> </mrow> </mfrac> <mfrac> <mrow> <mrow> <mtext> </mtext> <mi>𝐋</mi> </mrow> <mn>3</mn> <mo form="prefix" stretchy="false">(</mo> <mrow> <mtext> </mtext> <mi>𝐋</mi> </mrow> <mo>⋅</mo> <mover> <mi>𝐫</mi> <mo stretchy="false" class="wbk-acc" style="math-depth:0;">^</mo> </mover> <mo form="postfix" stretchy="false">)</mo> <mover> <mi>𝐫</mi> <mo stretchy="false" class="wbk-acc" style="math-depth:0;">^</mo> </mover> </mrow> <mrow> <mi>|</mi> <mi>𝐫</mi> <msup> <mi>|</mi> <mn>3</mn> </msup> </mrow> </mfrac>`,
  ],
  [
    `<mi>E</mi> <mo>=</mo> <mo form="prefix" stretchy="false">−</mo> <mfrac> <mrow> <mi>G</mi> <mi>m</mi> <mi>M</mi> </mrow> <mrow> <mi>|</mi> <mi>𝐫</mi> <mi>|</mi> </mrow> </mfrac> <mo>+</mo> <mfrac> <mn>1</mn> <mn>2</mn> </mfrac> <mi>m</mi> <mi>|</mi> <mi>𝐯</mi> <msup> <mi>|</mi> <mn>2</mn> </msup>`,
  ],
  [
    `<mi>𝐠</mi> <mo>=</mo> <mo form="prefix" stretchy="false">−</mo> <mfrac> <mrow> <mi>G</mi> <mi>M</mi> </mrow> <mrow> <mi>|</mi> <mi>𝐫</mi> <msup> <mi>|</mi> <mn>2</mn> </msup> </mrow> </mfrac> <mover> <mi>𝐫</mi> <mo stretchy="false" class="wbk-acc" style="math-depth:0;">^</mo> </mover> <mo>−</mo> <mrow> <mo fence="true" form="prefix">(</mo> <mi>|</mi> <mi>𝛚</mi> <msup> <mi>|</mi> <mn>2</mn> </msup> <mi>|</mi> <mi>𝐫</mi> <mi>|</mi> <mrow> <mspace width="0.1667em"></mspace> <mi>sin</mi> <mo>⁡</mo> <mspace width="0.1667em"></mspace> </mrow> <mi>ϕ</mi> <mo fence="true" form="postfix">)</mo> </mrow> <mover> <mi>𝐚</mi> <mo stretchy="false" class="wbk-acc" style="math-depth:0;">^</mo> </mover>`,
    `<mi>E</mi> <mo>=</mo> <mi>m</mi> <mrow> <mo fence="true" form="prefix">(</mo> <mo>−</mo> <mfrac> <mrow> <mi>G</mi> <mi>M</mi> </mrow> <mrow> <mi>|</mi> <mi>𝐫</mi> <mi>|</mi> </mrow> </mfrac> <mo>+</mo> <mfrac> <mrow> <mi>|</mi> <mi>ω</mi> <mo>×</mo> <mi>𝐫</mi> <msup> <mi>|</mi> <mn>2</mn> </msup> </mrow> <mn>2</mn> </mfrac> <mo fence="true" form="postfix">)</mo> </mrow>`,
  ],
];

const formula_nodes = formulas.map((group) =>
  group.map((markup) => {
    const math = document.createElementNS(MATHML_NS, "math");
    math.setAttribute("display", "block");
    math.innerHTML = markup;
    return math;
  })
);

function get_formula(max_width) {
  const weights = WEIGHTS.slice(0, max_width);
  const total = weights.reduce((a, b) => a + b, 0);
  const rand = Math.random() * total;
  let width = 0, acc = 0;
  for (; width < weights.length; width++) {
    acc += weights[width];
    if (rand < acc) break;
  }
  const group = formula_nodes[width];
  return {
    width: width + 1,
    node: group[Math.floor(Math.random() * group.length)],
  };
}

// Element pools
const blank_pool = Array.from({ length: COLUMNS * ROWS }, () => {
  const cell = document.createElement("div");
  cell._span = 1;
  return cell;
});

// Track grid state
const matrix = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(null));
const canvas = Object.assign(document.createElement("canvas"), {
  width: COLUMNS,
  height: ROWS,
});
const ctx = canvas.getContext("2d", { willReadFrequently: true });

function create_cell(width, formula) {
  const cell = document.createElement("div");
  cell._span = width;
  if (width > 1) cell.style.gridColumn = `span ${width}`;
  if (formula) cell.appendChild(formula.cloneNode(true));
  return cell;
}

function get_span(el) {
  return el?._span || 1;
}

function invalidate_cell(row, column) {
  const current = matrix[row][column];
  if (current === null) return;
  const start = typeof current === "number" ? current : column;
  const span = get_span(matrix[row][start]);
  for (let column = start; column < start + span; column++) {
    matrix[row][column] = null;
  }
}

function update_grid() {
  const cells = container.children;
  let i = 0;

  for (let row = 0; row < ROWS; row++) {
    for (let column = 0; column < COLUMNS; i++) {
      const entry = matrix[row][column];
      let target;

      if (entry instanceof Element) {
        target = entry;
        column += get_span(entry);
      } else if (typeof entry === "number") {
        column++;
      } else {
        let gap = 0;
        while (column + gap < COLUMNS && matrix[row][column + gap] === null) {
          gap++;
        }
        const { width, node } = get_formula(gap);
        target = create_cell(width, node);
        matrix[row][column] = target;
        for (let k = 1; k < width; k++) matrix[row][column + k] = column;
        column += width;
      }

      if (cells[i] !== target) {
        if (cells[i]) {
          container.insertBefore(target, cells[i]);
        } else {
          container.appendChild(target);
        }
      }
    }
  }
  while (container.children.length > i) {
    container.removeChild(container.lastChild);
  }
}

// Video loop
function render() {
  if (video.paused || video.ended) return;
  ctx.drawImage(video, 0, 0, COLUMNS, ROWS);
  const data = ctx.getImageData(0, 0, COLUMNS, ROWS).data;

  // First pass to update the grid state
  for (let row = 0; row < ROWS; row++) {
    for (let column = 0; column < COLUMNS; column++) {
      const to_white = data[(row * COLUMNS + column) * 4] > 128;
      const current = matrix[row][column];
      const is_blank = current instanceof Element && !current.firstChild;

      if (is_blank && !to_white) {
        matrix[row][column] = null;
      } else if (!is_blank && to_white) {
        invalidate_cell(row, column);
        matrix[row][column] = blank_pool[row * COLUMNS + column];
      }
    }
  }

  // Second pass to filter clusters of small formulas
  for (let row = 0; row < ROWS; row++) {
    let seq = 0;
    for (let column = 0; column <= COLUMNS; column++) {
      const cell = matrix[row][column];
      if (cell instanceof Element && cell.firstChild && get_span(cell) === 1) {
        seq++;
      } else {
        if (seq >= 3) {
          for (let i = 1; i <= seq; i++) matrix[row][column - i] = null;
        }
        seq = 0;
      }
    }
  }

  update_grid();
  video.requestVideoFrameCallback(render);
}

// Event listeners
const toggle = () => {
  video.paused
    ? (video.play(), start.hidden = true, render())
    : (video.pause(), start.hidden = false);
};

start.onclick = toggle;
globalThis.onkeydown = (e) =>
  e.code === "Space" && (e.preventDefault(), toggle());

// Initial draw
update_grid();
