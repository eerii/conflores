---
title: interop and mathml core
tags: [ "web-platform", "mathml" ]
mastodon: https://todon.eu/@koala/115622368172883843
---

<link rel="stylesheet" href="https://fred-wang.github.io/MathFonts/XITS/mathfonts.css"/>

<style>
  math {
    font-size: 2em;
  }
  .math-example {
    display: flex;
    justify-content: center;
    align-items: center;
    & > div {
      display: inline-grid;
      grid-template-columns: 1fr 2px 1fr;
      grid-template-rows: fit-content(0);
      grid-gap: var(--spacing);
      & > img {
        height: 100%;
        width: auto;
        border: none;
        padding: 0.25rem;
      }
      @media (width < 768px) {
        grid-template-columns: 1fr;
        text-align: center;
        justify-items: center;
        & > hr {
          width: 100%;
        }
      }
    }
  }
</style>

Interoperability makes the web better for everyone, allowing users to have a great experience regardless of their choice of browser.
We have been working on MathML Core making across browser engines as part of an agreement with the Sovereign Tech Fund.
There are some exciting developments and new features!
{.p-summary hidden}

**Interoperability** makes the web better for everyone, allowing users to have a great experience regardless of their choice of browser.
We have many standards that shape how the internet should work, drafted from **consensus** between different engine makers and third parties.
While having specs on how everything should function is great, we still need to **align the different browser implementations**.
This can be tricky as all of them have their peculiarities, and not all browsers agree on what is a priority for them.
The goal of the [Interop](https://wpt.fyi/interop-2025) program is to select a few important features that all engines will prioritize, so users and editors can finally benefit from them.

A few months ago I joined [Igalia](https://www.igalia.com)'s web platform team (and I'm really happy about it!).
Thanks to [an agreement](https://www.igalia.com/2025/07/14/Igalia,-Interop-and-the-Sovereign-Tech-Fund.html) with the [Sovereign Tech Fund](https://www.sovereign.tech/programs/fund), this year we will be working on MathML and other important Interop areas.

> This post contains MathML examples. Each formula is represented twice.
> Your browser renders the left one from the HTML code, while on the right there is a pre-printed SVG as a reference of how it should look.
> Keep in mind that most of these features are either experimental or have just landed, so **you may need the latest version of a browser to view them correctly**.

## A bit of history

**[MathML](https://en.wikipedia.org/wiki/MathML)** was first published in 1998, and it grew to be a gigantic project that sought to define how mathematical notation should be rendered.
However, due to its complexity, the implementations of the browser engines were wildly different and incomplete.
This meant that editors could not rely on it, since users would see very different content depending on what they were browsing with.

```html
<math>
  <msubsup>
    <mo>∫</mo>
    <mn>0</mn>
    <mn>1</mn>
  </msubsup>
  <mrow>
    <msup>
      <mi>x</mi>
      <mn>2</mn>
    </msup>
    <mo>+</mo>
    <mn>1</mn>
  </mrow>
</math>
```

<div class="math-example">
  <div>
    <math display="block">
      <msubsup>
        <mo>∫</mo>
        <mn>0</mn>
        <mn>1</mn>
      </msubsup>
      <mrow>
        <msup>
          <mi>x</mi>
          <mn>2</mn>
        </msup>
        <mo>+</mo>
        <mn>1</mn>
      </mrow>
    </math>
    <hr/>
    <img class="no-index" alt="An integral from 0 to 1 of x squared plus one" src="/images/2025/mathml-integral.svg">
  </div>
</div>

This is why **[MathML Core](https://w3c.github.io/mathml-core)** was born.
It is a small subset of [MathML 3](https://www.w3.org/TR/MathML3) that is feasible to implement in browsers.
It is based on the parts of the specification that are **used in practice**, adding important implementation details and testing.

To illustrate why this is important, Chromium had support for some parts of MathML when it was forked from WebKit.
However, it proved to be very difficult to maintain and complete, so it was removed in 2013.
My colleague Frédéric Wang led the effort to create a new implementation based on MathML Core, which was [shipped in 2023](https://www.igalia.com/2023/01/10/Igalia-Brings-MathML-Back-to-Chromium.html), a huge milestone for the standard.

We are in a very exciting moment in the MathML history, since **all three major browser engines have overlapping support**.
However, there is still work to be done to align the different implementations so they follow the MathML Core specification.
The goal is that one could write formulas on a website and have it look the same everywhere (like Wikipedia, which is now [transitioning to native MathML](https://phabricator.wikimedia.org/T271001) instead of prerendered SVGs).

So, what have we been working on?

## RTL mirroring

Some scripts are written from **right to left**, including [Arabic](https://en.wikipedia.org/wiki/Arabic_alphabet).
Browsers should be able to correctly render text and math in either direction, making use of the [Unicode BiDi](https://www.unicode.org/reports/tr9/) specification and the [`rtlm`](https://learn.microsoft.com/en-us/typography/opentype/spec/features_pt#tag-rtlm) font feature.
However, the existing implementations either didn't support mirroring or had hacky behaviour that didn't work correctly for all cases. Read [this explainer](https://people.igalia.com/fwang/mathml-operator-mirroring-explainer.html) that Frédéric made for a great visualization of the differences.

```html
<link rel="stylesheet" href="https://fred-wang.github.io/MathFonts/XITS/mathfonts.css"/>

<math>
  <mrow>
    <mo>{</mo>
    <mfrac>
      <mn>5</mn>
      <mn>6</mn>
    </mfrac>
    <mo>)</mo>
  </mrow>
  <msqrt>
    <mfrac>
      <mn>3</mn>
      <mn>4</mn>
    </mfrac>
  </msqrt>
  <msub displaystyle="true">
    <mo>∲</mo>
    <mi>C</mi>
  </msub>
</math>

<math dir="rtl">
  <mrow>
    <mo>{</mo>
    <mfrac>
      <mn>٥</mn>
      <mn>٦</mn>
    </mfrac>
    <mo>)</mo>
  </mrow>
  <msqrt>
    <mfrac>
      <mn>٣</mn>
      <mn>٤</mn>
    </mfrac>
  </msqrt>
  <msub displaystyle="true">
    <mo>∲</mo>
    <mi>ج</mi>
  </msub>
</math>
```

<div class="math-example">
  <div>
    <span>
      <math style="font-size: 1.7rem">
        <mrow>
          <mo>{</mo>
          <mfrac>
            <mn>5</mn>
            <mn>6</mn>
          </mfrac>
          <mo>)</mo>
        </mrow>
        <msqrt>
          <mfrac>
            <mn>3</mn>
            <mn>4</mn>
          </mfrac>
        </msqrt>
        <msub displaystyle="true">
          <mo>∲</mo>
          <mi>C</mi>
        </msub>
      </math>
      <math dir="rtl" style="font-size: 1.7rem">
        <mrow>
          <mo>{</mo>
          <mfrac>
            <mn>٥</mn>
            <mn>٦</mn>
          </mfrac>
          <mo>)</mo>
        </mrow>
        <msqrt>
          <mfrac>
            <mn>٣</mn>
            <mn>٤</mn>
          </mfrac>
        </msqrt>
        <msub displaystyle="true">
          <mo>∲</mo>
          <mi>ج</mi>
        </msub>
      </math>
    </span>
    <hr/>
    <img class="no-index" alt="A series of math formulas, first from left to right, then from right to left" src="/images/2025/mathml-rtl.svg">
  </div>
</div>

There are two cases when it comes to mirroring. If there is a corresponding mirrored character (e.g. opening parenthesis to closing parenthesis), it is called **character-level mirroring** or Unicode BiDi, and the browser just needs to swap one character for the other.
Sadly, this doesn't apply to every operator.

Take the _contour clockwise integral_.
If we just mirror the symbol by applying a reflection symmetry about a vertical line, the arrow is suddenly pointing in the other direction, making it _counterclockwise_.
This changes the meaning of the formula!

![Three clockwise integrals: left to right, incorrectly mirrored (arrow pointing to the other side), and right to left](/images/2025/mathml-integral-comparison.svg){.no-index style="padding: 2rem; background: white"}

To avoid this, the `rtlm` font feature can use **glyph-level mirroring** to provide a different set of correctly mirrored glyphs.
_Glyphs_ plural since a math symbol can have different size variants to accommodate multiple contents.
Not only that, when the variants are not enough, there are glyphs for assembling arbitrarily long operators.

```html
<link rel="stylesheet" href="https://fred-wang.github.io/MathFonts/XITS/mathfonts.css"/>

<math>
  <msqrt>
    <mspace height="0.8em" width="0.8em" style="background: tomato"></mspace>
  </msqrt>
  <msqrt>
     <mspace height="1.5em" width="0.8em" style="background: gold"></mspace>
  </msqrt>
  <msqrt>
    <mspace height="2.5em" width="0.8em" style="background: mediumseagreen"></mspace>
  </msqrt>
  <msqrt>
    <mspace height="4.5em" width="0.8em" style="background: cornflowerblue"></mspace>
  </msqrt>
</math>

<math dir="rtl">
  <msqrt>
    <mspace height="0.8em" width="0.8em" style="background: tomato"></mspace>
  </msqrt>
  <msqrt>
     <mspace height="1.5em" width="0.8em" style="background: gold"></mspace>
  </msqrt>
  <msqrt>
    <mspace height="2.5em" width="0.8em" style="background: mediumseagreen"></mspace>
  </msqrt>
  <msqrt>
    <mspace height="4.5em" width="0.8em" style="background: cornflowerblue"></mspace>
  </msqrt>
</math>
```

<div class="math-example">
  <div>
    <div>
      <math style="font-size: 1.3em">
        <msqrt>
          <mspace height="0.8em" width="0.8em" style="background: tomato"></mspace>
        </msqrt>
        <msqrt>
           <mspace height="1.5em" width="0.8em" style="background: gold"></mspace>
        </msqrt>
        <msqrt>
          <mspace height="2.5em" width="0.8em" style="background: mediumseagreen"></mspace>
        </msqrt>
        <msqrt>
          <mspace height="4.5em" width="0.8em" style="background: cornflowerblue"></mspace>
        </msqrt>
      </math>
      <math dir="rtl" style="font-size: 1.3em">
        <msqrt>
          <mspace height="0.8em" width="0.8em" style="background: tomato"></mspace>
        </msqrt>
        <msqrt>
           <mspace height="1.5em" width="0.8em" style="background: gold"></mspace>
        </msqrt>
        <msqrt>
          <mspace height="2.5em" width="0.8em" style="background: mediumseagreen"></mspace>
        </msqrt>
        <msqrt>
          <mspace height="4.5em" width="0.8em" style="background: cornflowerblue"></mspace>
        </msqrt>
      </math>
    </div>
    <hr/>
    <img class="no-index" alt="A series square roots, each taller than the last. First from left to right, then from right to left" src="/images/2025/mathml-roots.svg">
  </div>
</div>

No browser engine supported glyph-level mirroring for MathML operators, so we had to implement it in all of them.
Thankfully [harfbuzz](https://github.com/harfbuzz/harfbuzz), the underlying font rendering library used by Chromium and Firefox, already supported it.
WebKit is a work in progress, since there is more complexity because of different ports using different backends.
As for character-level mirroring, Chromium and WebKit did it right, but Firefox applied reflection symmetry instead of replacing the correct pair.
The changes in Firefox and Chromium are now stable and ready to be used!

<div class="table-wrapper">

| Feature | Firefox | WebKit | Chromium |
| -- | -- | -- | -- |
| Character level mirroring (BiDi) | ✅✨ | ✅ | ✅ |
| Glyph level mirroring (rtlm) | ✅✨ | 🚧 | ✅✨ |
</div>

## `math-shift` and `math-depth`

Details are important, especially when rendering complex and layered formulas.
One may think that a few pixels do not make that much of a difference.
However, when you have multiple levels of nesting, offsets, and multiple elements, a slight change can make everything look ugly at best, wrong at worst.

Enter `math-shift: compact`. Look at this example from the [MathML Core spec](https://w3c.github.io/mathml-core/#the-math-shift):

```html
<math display="block">
  <msqrt>
    <msup>
      <mi>x</mi>
      <mn style="color: mediumseagreen">2</mn>
    </msup>
  </msqrt>
  <mo>≠</mo>
  <msup>
    <mi>x</mi>
    <mn style="color: cornflowerblue">2</mn>
  </msup>
</math>
```

<div class="math-example">
  <div>
    <math display="block">
      <msqrt>
        <msup>
          <mi>x</mi>
          <mn style="color: mediumseagreen">2</mn>
        </msup>
      </msqrt>
      <mo>≠</mo>
      <msup>
        <mi>x</mi>
        <mn style="color: cornflowerblue">2</mn>
      </msup>
    </math>
    <hr/>
    <img class="no-index" alt="Square root of x squared does not equal x squared. The exponent under the root is lower than the exponent on the right" src="/images/2025/mathml-math-shift.svg">
  </div>
</div>

At first glance, you may not see anything too different.
But looking closely, the green "2" on the left is a bit lower than then blue one on the right.
It is trying to _fit_ under the square root bar. This is what LaTeX calls **cramped mode**.

Chromium already supported the definition given by MathML Core, so that left Firefox and WebKit, both of which used hardcoded rules for specific cases in C++ objects.
MathML Core takes another approach, and **incentivizes using CSS styling rules** instead.

Another interesting property is [`math-depth`](https://w3c.github.io/mathml-core/#the-math-script-level-property).
It is used to make nested elements, such as those inside fractions, scripts or radicals a bit smaller.
That way, if you have an exponent of an exponent of an exponent (of an exponent...), each one is displayed a bit tinier than the last.

```html
<math display="block">
  <msup>
    <mi>A</mi>
    <msup>
      <mi style="color: cornflowerblue">A</mi>
      <msup>
        <mi style="color: mediumseagreen">A</mi>
        <mi style="color: tomato">A</mi>
      </msup>
    </msup>
  </msup>
  <mo>+</mo>
  <mroot>
    <mi>A</mi>
    <mi style="color: mediumseagreen">A</mi>
  </mroot>
  <mo>+</mo>
  <mfrac>
    <mrow>
      <mi>A</mi>
      <mo>+</mo>
      <mfrac>
        <mi style="color: cornflowerblue">A</mi>
        <mi style="color: cornflowerblue">A</mi>
      </mfrac>
    </mrow>
    <mi>A</mi>
  </mfrac>
</math>
```

<div class="math-example">
  <div>
    <math display="block">
      <msup>
        <mi>A</mi>
        <msup>
          <mi style="color: cornflowerblue">A</mi>
          <msup>
            <mi style="color: mediumseagreen">A</mi>
            <mi style="color: tomato">A</mi>
          </msup>
        </msup>
      </msup>
      <mo>+</mo>
      <mroot>
        <mi>A</mi>
        <mi style="color: mediumseagreen">A</mi>
      </mroot>
      <mo>+</mo>
      <mfrac>
        <mrow>
          <mi>A</mi>
          <mo>+</mo>
          <mfrac>
            <mi style="color: cornflowerblue">A</mi>
            <mi style="color: cornflowerblue">A</mi>
          </mfrac>
        </mrow>
        <mi>A</mi>
      </mfrac>
    </math>
    <hr/>
    <img class="no-index" alt="A variable with nested exponents, each smaller than the last. A radical with index A, smaller than the value inside the root. A nested fraction, whose variables are also displayed smaller." src="/images/2025/mathml-math-depth.svg">
  </div>
</div>

In this case, Firefox and Chromium already had compliant implementations, so only WebKit needed to catch up.
Support for `math-depth` and the [`scriptlevel`](https://w3c.github.io/mathml-core/#dfn-scriptlevel) attribute (which allows to modify this depth) has now landed,
while a patch for [`font-size: math`](https://www.w3.org/TR/css-fonts-4/#valdef-font-size-math) (which sets the size of the element based on its depth) is on the way.

<div class="table-wrapper">

| Feature | Firefox | WebKit | Chromium |
| -- | -- | -- | -- |
| `math-shift: compact` | ✅✨ | ✅✨ | ✅ |
| `math-depth` | ✅ | ✅✨ | ✅ |
| `font-size: math` | ✅ | 🚧 | ✅ |
| `scriptlevel` | ✅ | ✅✨ | ✅ |
</div>

## Other work{style="margin: var(--spacing) 0"}

### Rendering unknown elements as mrow

MathML 3 defined 195 elements.
MathML Core focuses on about **30**, leaving the rest to styling or polyfills.
This means deprecating some features that were previously implemented in some browsers, like `mfenced`, `semantics`, and `maction`, as it would be too difficult to make them interoperable right now.
To prevent breaking existing content too much, they are rendered like an `mrow`.

### `font-family: math`

Selecting a **good math font** is essential for rendering.
Stretchy operators, math symbols, and italics are not available with every font, so without one they are presented very poorly.
[`font-family: math`](https://drafts.csswg.org/css-fonts/#math-def) is a CSS property that specifies that the content should use a suitable font for mathematics.
Previously browsers had a hardcoded list of CSS fallbacks, but now this has been standardized and implemented.

Android doesn't come with a math font installed, so it mixes symbols from different fonts, producing a rather unappealing result:

![A math formula containing different symbols, all of them with varying font styling and weights as the result of not having an unified math font family](/images/2025/mathml-poor-rendering.webp){.no-index}

### `mathvariant` and `text-transform: math-auto`

Single letter identifiers inside a `<mi>` tag are treated as variables, and so they should be rendered with **_fancy italics_**.
This is still supported by MathML Core.
However, MathML 3 allows a plethora of transformations using `mathvariant`, from bold to gothic text.
The new spec says that while italic transformation should still happen by default, other text should **use the specific Unicode codepoint directly**, as it just adds too much complexity for the browser implementation.

`text-transform: math-auto` is a CSS property applied by default to `<mi>` elements that enables the italic transformation for them.
Setting the new `mathvariant` attribute to `normal` will make the `text-transform` of the element be `none`, removing the italic styling.

![Different stylings of the letter A. Italic, regular, bold italic, bold regular, double struck, script, fraktur, sans serif and monospace](/images/2025/mathml-mathvariant.svg){.no-index style="padding: 2rem; background: white"}

### `DisplayOperatorMinHeight` and Cambria Math

Microsoft [made a mistake](https://github.com/MicrosoftDocs/typography-issues/issues/1136) in Cambria Math, one of the math fonts used in Windows.
They switched the `DisplayOperatorMinHeight` and `DelimitedSubFormulaMinHeight`, so operators [weren't being displayed correctly](https://github.com/w3c/mathml-core/issues/126).
Some browsers had a workaround for this, but a more general fix was implemented in harfbuzz, so we removed the workarounds in favour of relying on the upstream library instead.

### Animation for `math-*` properties

When implementing `math-shift` in Firefox, we noticed that the spec said the new properties are not supposed to be animatable.
In the new CSS spec, most properties are defined as animatable (_fun!_).
After some discussion with the MathML Working Group, we decided to change the spec, and we are adding this feature to the browser engines.

<style>
  @keyframes math-anim {
    0% { color: royalblue; math-depth: 1; }
    20% { color: mediumseagreen; }
    40% { color: gold; }
    60% { color: tomato; math-depth: 3; }
    80% { color: mediumpurple; }
    100% { color: royalblue; math-depth: 1; }
  }
  #anim-target {
    animation: math-anim 5s infinite;
  }
  #anim-container {
    height: 4.5rem;
    & > math {
      font-size: 4rem;
    }
  }
</style>
<p id="anim-container">
  <math display="block">
    <msup>
      <mi>x</mi>
      <mo id="anim-target">2</mo>
    </msup>
  </math>
</p>

<div class="table-wrapper">

| Feature | Firefox | WebKit | Chromium |
| -- | -- | -- | -- |
| Render unknown elements as `mrow` | ✅✨ | ✅✨ | ✅ |
| `font-family: math` | ✅✨ | ✅✨ | ✅ |
| `text-transform: math-auto` | ✅ | ✅✨ | ✅ |
| New `mathvariant` behaviour | ✅ | 🚧 | ✅ |
| `DisplayOperatorMinHeight` fix | ✅✨ | ✅✨ | ✅✨ |
| Animation for `math-*` properties | ✅✨ | 🚧 | 🚧 |
</div>

## What's next?

Many of these improvements have already shipped, but our work continues on making mathematics more interoperable in browsers.
This includes some _exciting_ new features ahead:

- **Updates to the operator dictionary:**
  MathML Core revamped the existing list of operators and their default layouts.
  Additionally, there is a new compact form that removes redundancies.
- **More improvements to operator stretching and spacing:**
  There are still some inconsistencies between browsers and some long standing bugs that we would love to tackle.
- **Handling positioned elements and forbidding floats in MathML:**
  Like flex or grid, MathML doesn't create floating children for elements with a `math` display type.
  However, they can still have out of flow positioned children.
  At the moment this isn't consistent across browsers and it is something we want to improve.

Working on MathML is very rewarding, specially because of the people that have helped along the way.
I'd like to specially thank my colleague [@fredw](https://github.com/fred-wang), reviewers from Mozilla, Apple and Google, and the [W3C Math Working Group](https://www.w3.org/groups/wg/math/).
Also [@delan](https://github.com/delan) for reviewing the first draft of this post.

We are very grateful to the Sovereign Tech Fund for supporting this work!
