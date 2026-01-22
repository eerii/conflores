/// <reference lib="dom" />

// Document

const cols = 40;
const rows = 30;
const MATHML_NS = "http://www.w3.org/1998/Math/MathML";

const root = document.documentElement;
root.style.setProperty("--columns", `${cols}`);
root.style.setProperty("--ratio", `${cols} / ${rows}`);

const container = document.getElementById("container");
if (!container) {
  throw new Error("There should be a container");
}

// Formula list

const formulas = [
  [ // 1
    `<mi>𝐠</mi>`,
    `<mi mathvariant="normal">Δ</mi> </mpadded> <mi>U</mi>`,
    `<msub> <mi>𝚽</mi> <mi>G</mi> </msub>`,
    `<msub> <mi>E</mi> <mi>p</mi> </msub>`,
  ],
  [ // 2
    `<mi>𝐠</mi> <mo>=</mo> <mfrac> <mi>𝐅</mi> <mi>m</mi> </mfrac>`,
    `<mi mathvariant="normal">𝛀</mi> </mpadded> <mo>=</mo> <mn>2</mn> <mi>𝝃</mi>`,
    `<mi>ξ</mi> <mo>=</mo> <mo form="prefix" stretchy="false">∇</mo> <mo form="prefix" stretchy="false">×</mo> <mi>𝐡</mi>`,
    `<mi>𝐠</mi> <mo>=</mo> <mo form="prefix" stretchy="false">−</mo> <mo form="prefix" stretchy="false">∇</mo> <mi>U</mi>`,
    `<mi>𝐠</mi> <mo>=</mo> <mfrac> <mrow> <mi>G</mi> <mi>m</mi> </mrow> <mrow> <mi>|</mi> <mi>𝐫</mi> <msup> <mi>|</mi> <mn>2</mn> </msup> </mrow> </mfrac> <mover> <mi>𝐫</mi> <mo stretchy="false" class="wbk-acc" style="math-depth:0;">^</mo> </mover>`,
    `<mi>E</mi> <mo>=</mo> <mi>T</mi> <mo>+</mo> <mi>U</mi>`,
  ],
  [ // 3
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
  [ // 4
    `<mi mathvariant="normal">Δ</mi> </mpadded> <mi>U</mi> <mo>=</mo> <mo form="prefix" stretchy="false">−</mo> <mfrac> <mn>1</mn> <mi>m</mi> </mfrac> <msubsup> <mo movablelimits="false">∫</mo> <msub> <mi>r</mi> <mn>1</mn> </msub> <msub> <mi>r</mi> <mn>2</mn> </msub> </msubsup> <mi>𝐅</mi> <mo>⋅</mo> <mrow> <mtext> </mtext> <mpadded lspace="0"> <mi mathvariant="normal">d</mi> </mpadded> </mrow> <mi>𝐫</mi>`,
    `<mi mathvariant="normal">Δ</mi> </mpadded> <mi>U</mi> <mo>=</mo> <mo form="prefix" stretchy="false">−</mo> <msubsup> <mo movablelimits="false">∫</mo> <msub> <mi>r</mi> <mn>1</mn> </msub> <msub> <mi>r</mi> <mn>2</mn> </msub> </msubsup> <mi>𝐠</mi> <mo>⋅</mo> <mrow> <mtext> </mtext> <mpadded lspace="0"> <mi mathvariant="normal">d</mi> </mpadded> </mrow> <mi>𝐫</mi>`,
    `<mi>𝐠</mi> <mo>=</mo> <mi>G</mi> <msub> <mo movablelimits="false">∑</mo> <mi>i</mi> </msub> <mfrac> <msub> <mi>m</mi> <mi>i</mi> </msub> <msup> <mrow> <mo fence="true" form="prefix">|</mo> <msub> <mi>𝐫</mi> <mi>i</mi> </msub> <mo>−</mo> <mi>𝐫</mi> <mo fence="true" form="postfix">|</mo> </mrow> <mn>2</mn> </msup> </mfrac> <msub> <mover> <mi>𝐫</mi> <mo stretchy="false" class="wbk-acc" style="math-depth:0;">^</mo> </mover> <mi>i</mi> </msub>`,
    `<mi>𝛏</mi> <mo>=</mo> <mfrac> <mi>G</mi> <mrow> <mn>2</mn> <msup> <mi>c</mi> <mn class="tml-sml-pad">2</mn> </msup> </mrow> </mfrac> <mfrac> <mrow> <mrow> <mtext> </mtext> <mi>𝐋</mi> </mrow> <mn>3</mn> <mo form="prefix" stretchy="false">(</mo> <mrow> <mtext> </mtext> <mi>𝐋</mi> </mrow> <mo>⋅</mo> <mover> <mi>𝐫</mi> <mo stretchy="false" class="wbk-acc" style="math-depth:0;">^</mo> </mover> <mo form="postfix" stretchy="false">)</mo> <mover> <mi>𝐫</mi> <mo stretchy="false" class="wbk-acc" style="math-depth:0;">^</mo> </mover> </mrow> <mrow> <mi>|</mi> <mi>𝐫</mi> <msup> <mi>|</mi> <mn>3</mn> </msup> </mrow> </mfrac>`,
  ],
  [ // 5
    `<mi>E</mi> <mo>=</mo> <mo form="prefix" stretchy="false">−</mo> <mfrac> <mrow> <mi>G</mi> <mi>m</mi> <mi>M</mi> </mrow> <mrow> <mi>|</mi> <mi>𝐫</mi> <mi>|</mi> </mrow> </mfrac> <mo>+</mo> <mfrac> <mn>1</mn> <mn>2</mn> </mfrac> <mi>m</mi> <mi>|</mi> <mi>𝐯</mi> <msup> <mi>|</mi> <mn>2</mn> </msup>`,
  ],
  [ // 6
    `<mi>𝐠</mi> <mo>=</mo> <mo form="prefix" stretchy="false">−</mo> <mfrac> <mrow> <mi>G</mi> <mi>M</mi> </mrow> <mrow> <mi>|</mi> <mi>𝐫</mi> <msup> <mi>|</mi> <mn>2</mn> </msup> </mrow> </mfrac> <mover> <mi>𝐫</mi> <mo stretchy="false" class="wbk-acc" style="math-depth:0;">^</mo> </mover> <mo>−</mo> <mrow> <mo fence="true" form="prefix">(</mo> <mi>|</mi> <mi>𝛚</mi> <msup> <mi>|</mi> <mn>2</mn> </msup> <mi>|</mi> <mi>𝐫</mi> <mi>|</mi> <mrow> <mspace width="0.1667em"></mspace> <mi>sin</mi> <mo>⁡</mo> <mspace width="0.1667em"></mspace> </mrow> <mi>ϕ</mi> <mo fence="true" form="postfix">)</mo> </mrow> <mover> <mi>𝐚</mi> <mo stretchy="false" class="wbk-acc" style="math-depth:0;">^</mo> </mover>`,
    `<mi>E</mi> <mo>=</mo> <mi>m</mi> <mrow> <mo fence="true" form="prefix">(</mo> <mo>−</mo> <mfrac> <mrow> <mi>G</mi> <mi>M</mi> </mrow> <mrow> <mi>|</mi> <mi>𝐫</mi> <mi>|</mi> </mrow> </mfrac> <mo>+</mo> <mfrac> <mrow> <mi>|</mi> <mi>ω</mi> <mo>×</mo> <mi>𝐫</mi> <msup> <mi>|</mi> <mn>2</mn> </msup> </mrow> <mn>2</mn> </mfrac> <mo fence="true" form="postfix">)</mo> </mrow>`,
  ],
];

const weights = [
  1,
  3,
  5,
  4,
  2,
  3,
];

/**
 * @param {number} max_width
 * @returns {{width: number, formula: string}}
 */
function get_formula(max_width) {
  const total = weights.slice(0, max_width).reduce((a, v) => a + v);
  const rand = Math.floor(Math.random() * total);
  let acc = 0;
  let width = 0;
  for (width = 0; width < weights.length; width++) {
    acc += weights[width];
    if (rand < acc) {
      break;
    }
  }

  const possible = formulas[width];
  return {
    width: width + 1,
    formula: possible[Math.floor(Math.random() * possible.length)],
  };
}

// Grid

/** @type {Array<Array<Element | number | null>>} */ const matrix = [];
for (let i = 0; i < rows; i++) {
  matrix.push([]);
  for (let j = 0; j < cols; j++) {
    matrix[i].push(null);
  }
}

/**
 * @param {number} width
 * @param {string | null} formula
 */
function create_cell(width, formula) {
  const cell = document.createElement("div");
  if (width > 1) {
    cell.style.gridColumn = `span ${width}`;
  }
  if (formula) {
    const math = document.createElementNS(MATHML_NS, "math");
    math.setAttribute("display", "block");
    math.innerHTML = formula;
    cell.appendChild(math);
  }
  return cell;
}

/**
 * @param {Array<Element | number | null>} row
 */
function fill_row(row) {
  for (let i = 0; i < cols;) {
    if (row[i] != null) {
      i++;
      continue;
    }

    // Find empty space
    let j;
    for (j = i + 1; j < cols; j++) {
      if (row[j] != null) {
        break;
      }
    }

    // Get formula that fits
    const { width, formula } = get_formula(j - i);

    // Create the HTML
    const start = i;
    row[i++] = create_cell(width, formula);

    // Make the rest of the occupied space point to the formula cell
    for (i; i < start + width; i++) {
      row[i] = start;
    }
  }
}

/**
 * @param {Element | number | null} pixel
 */
function is_white(pixel) {
  return pixel instanceof Element && pixel.childElementCount == 0;
}

/**
 * @param {boolean} to_white
 * @param {number} row
 * @param {number} column
 */
function set_pixel(to_white, row, column) {
  const pixel = matrix[row][column];
  const white = is_white(pixel);

  // Schedule to set to black
  if (white && !to_white) {
    matrix[row][column] = null;
    return;
  }

  // Set to white
  if (!white && to_white) {
    // If it isn't null, remove previous entry
    if (pixel != null) {
      const start = typeof pixel == "number" ? pixel : column;
      // Invalidate rest of the row
      for (let i = start; i < cols; i++) {
        matrix[row][i] = null;
      }
    }
    matrix[row][column] = create_cell(1, null);
    return;
  }
}

// Canvas

const canvas = document.createElement("canvas");
canvas.width = cols;
canvas.height = rows;
const ctx = canvas.getContext("2d", { willReadFrequently: true });

// Video

const video =
  /** @type {HTMLVideoElement} */ (document.getElementById("video"));
if (!video) {
  throw new Error("There should be a video");
}

const start = document.getElementById("start");
if (!start) {
  throw new Error("There should be a text");
}

function toggle() {
  if (video.paused) {
    video.play();
    start.hidden = true;
    render();
  } else {
    video.pause();
    start.hidden = false;
  }
}

function update() {
  if (!container) return;
  matrix.forEach(fill_row);
  const new_children = matrix.flat().filter((e) => e instanceof Element);
  container.replaceChildren(...new_children);
}

function render() {
  if (!ctx || video?.paused || video?.ended) return;

  ctx.drawImage(video, 0, 0, cols, rows);
  const image_data = ctx.getImageData(0, 0, cols, rows).data;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const brightness = image_data[(i * cols + j) * 4]; // red channel
      set_pixel(brightness > 128, i, j);
    }
  }

  update();
  requestAnimationFrame(render);
}

update();

globalThis.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    toggle();
  }
});

start.addEventListener("click", (_) => {
  toggle();
});
