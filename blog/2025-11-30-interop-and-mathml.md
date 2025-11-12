---
title: interop and mathml core
tags: [ "web-platform", "mathml" ]
draft: true
---

<style>
  @font-face {
    font-family: XITS;
    src: local('XITS'), url('https://fred-wang.github.io/MathFonts/XITS/XITS-Regular.woff2'), url('https://fred-wang.github.io/MathFonts/XITS/XITS-Regular.woff');
  }
  pre {
    max-height: 28em;
    overflow: scroll;
  }
  math {
    font-size: 2em;
  }
  .math-example {
    display: inline-grid;
    grid-template-columns: 1fr 2px 1fr;
    grid-template-rows: fit-content(0);
    grid-gap: var(--spacing);
    & > svg {
      height: 100%;
      width: auto;
    }
  }
</style>

**Interoperability** makes the web better for everyone, allowing users to have a great experience regardless of their choice of browser.
We have many standards that shape how the internet should work, drafted from **consensus** between different engine makers and third parties.
While having specs on how everything should function is great, we still need to **align the different browser implementations**.
This can be tricky as all of them have their particularities, and not all browsers agree on what is a priority for them.
The goal of [Interop](https://wpt.fyi/interop-2025) is to select a few important features that all engines will prioritize, so users and editors can finally benefit from them.

// TODO: Make responsive

A few months ago I joined [Igalia](https://www.igalia.com)'s web platform team (and I'm really happy about it!).
Thanks to [an agreement](https://www.igalia.com/2025/07/14/Igalia-Interop-and-the-Sovereign-Tech-Fund.html) with the [Sovereign Tech Fund](https://www.sovereign.tech/programs/fund), this year we will be working on MathML and other important Interop areas.

## A bit of history

**[MathML](https://en.wikipedia.org/wiki/MathML)** was first published in 1998, and it grew to be a gigantic project that wanted to define how mathematical notation should be rendered.
However, due to its complexity, the implementations of the browser engines were wildly different and incomplete.
This meant that editors could not rely on it, since users would see very different content depending on where they were browsing from.

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
  <?xml version="1.0" encoding="UTF-8" standalone="no" ?>
  <svg xmlns="http://www.w3.org/2000/svg" width="149.310px" height="83.850px" viewBox="0 -1559 4399.7 2470.9" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path id="MJX-31-NCM-LO-222B" d="M831 1361C784 1361 742 1318 703 1232C684 1191 664 1129 642 1046C545 688 472 339 395-117C360-328 331-481 308-574C267-745 220-831 168-831C149-831 132-826 117-815C146-810 160-793 160-763C160-734 138-711 109-711C74-711 56-729 56-764C56-822 113-861 170-861C243-861 303-803 350-688C375-627 409-509 451-336C524-39 589 279 646 617C686 854 722 1034 753 1157C782 1273 809 1331 833 1331C853 1331 870 1326 883 1315C854 1310 839 1293 839 1263C839 1234 861 1211 890 1211C925 1211 943 1229 943 1264C943 1319 889 1361 831 1361Z"/><path id="MJX-31-NCM-N-31" d="M269 666C228 624 168 603 89 603L89 564C141 564 184 572 217 588L217 82C217 64 213 52 204 47C195 42 170 39 130 39L95 39L95 0C120 2 174 3 257 3C340 3 394 2 419 0L419 39L384 39C343 39 318 42 310 47C302 52 297 64 297 82L297 636C297 660 295 666 269 666Z"/><path id="MJX-31-NCM-N-30" d="M249-22C390-22 460 92 460 320C460 473 428 575 365 625C330 652 291 666 250 666C109 666 39 551 39 320C39 136 88-22 249-22M361 524C368 489 371 425 371 332C371 240 367 172 360 128C347 48 310 8 249 8C226 8 203 17 182 34C155 57 139 104 132 176C129 201 128 253 128 332C128 419 131 480 136 513C145 568 163 603 191 618C213 630 232 636 249 636C314 636 350 583 361 524Z"/><path id="MJX-31-NCM-I-1D465" d="M527 373C527 419 482 442 432 442C389 442 355 419 329 373C308 419 273 442 222 442C173 442 133 419 101 374C74 335 60 306 60 287C60 278 65 273 75 273C84 273 90 278 92 287C111 345 153 413 220 413C253 413 269 392 269 351C269 330 251 252 216 118C199 51 169 18 126 18C112 18 99 21 88 26C114 36 127 54 127 80C127 106 114 119 87 119C54 119 29 91 29 58C29 12 76-11 125-11C167-11 201 12 228 58C247 12 283-11 335-11C383-11 423 12 455 57C482 96 496 125 496 144C496 153 491 158 481 158C472 158 467 153 464 144C447 87 402 18 337 18C304 18 287 38 287 79C287 92 292 120 303 165L337 300C356 375 387 413 431 413C445 413 458 410 469 405C442 396 429 378 429 351C429 325 443 312 470 312C502 312 527 341 527 373Z"/><path id="MJX-31-NCM-N-32" d="M237 666C186 666 143 648 106 612C69 576 50 534 50 483C50 449 75 424 106 424C136 424 161 450 161 480C161 513 137 536 105 536C102 536 100 536 98 535C117 584 161 627 224 627C306 627 352 556 352 470C352 403 318 331 250 255L62 43C49 28 50 29 50 0L421 0L450 180L417 180C409 129 402 100 396 91C391 86 361 84 306 84L139 84L236 179C304 243 390 312 419 365C439 400 449 435 449 470C449 588 357 666 237 666Z"/><path id="MJX-31-NCM-N-2B" d="M698 274L413 274L413 559C413 575 405 583 389 583C373 583 365 575 365 559L365 274L80 274C64 274 56 266 56 250C56 234 64 226 80 226L365 226L365-59C365-75 373-83 389-83C405-83 413-75 413-59L413 226L698 226C714 226 722 234 722 250C722 263 711 274 698 274Z"/></defs><g stroke="#000000" fill="#000000" stroke-width="0" transform="scale(1,-1)"><g data-mml-node="math" data-latex="\int_0^1 x^2 + 1" data-semantic-type="infixop" data-semantic-role="addition" data-semantic-annotation="depth:1" data-semantic-id="11" data-semantic-children="10,8" data-semantic-content="7" data-semantic-attributes="latex:\int_0^1 x^2 + 1" data-semantic-owns="10 7 8" aria-level="0" data-speech-node="true" data-semantic-structure="(11 (10 (3 0 1 2) (6 4 5) 9) 7 8)"><g data-mml-node="mrow" data-semantic-added="true" data-semantic-type="integral" data-semantic-role="integral" data-semantic-annotation="depth:2" data-semantic-id="10" data-semantic-children="3,6,9" data-semantic-content="0" data-semantic-parent="11" data-semantic-owns="3 6 9" aria-level="1" data-speech-node="true"><g data-mml-node="msubsup" data-latex="\int_0^1" data-semantic-type="limboth" data-semantic-role="integral" data-semantic-annotation="depth:3" data-semantic-id="3" data-semantic-children="0,1,2" data-semantic-parent="10" data-semantic-attributes="latex:\int_0^1" data-semantic-owns="0 1 2" aria-level="2" data-speech-node="true"><g data-mml-node="mo" data-latex="\int" data-semantic-type="largeop" data-semantic-role="integral" data-semantic-annotation="nemeth:number;depth:4" data-semantic-id="0" data-semantic-parent="3" data-semantic-attributes="latex:\int" data-semantic-operator="integral" aria-level="3" data-speech-node="true"><use data-c="222B" xlink:href="#MJX-31-NCM-LO-222B" xmlns:xlink="http://www.w3.org/1999/xlink"/></g><g data-mml-node="mn" transform="translate(1098.5,1088.1) scale(0.707)" data-latex="1" data-semantic-type="number" data-semantic-role="integer" data-semantic-font="normal" data-semantic-annotation="clearspeak:simple;depth:4" data-semantic-id="2" data-semantic-parent="3" data-semantic-attributes="latex:1" aria-level="3" data-speech-node="true"><use data-c="31" xlink:href="#MJX-31-NCM-N-31" xmlns:xlink="http://www.w3.org/1999/xlink"/></g><g data-mml-node="mn" transform="translate(702,-896.4) scale(0.707)" data-latex="0" data-semantic-type="number" data-semantic-role="integer" data-semantic-font="normal" data-semantic-annotation="clearspeak:simple;depth:4" data-semantic-id="1" data-semantic-parent="3" data-semantic-attributes="latex:0" aria-level="3" data-speech-node="true"><use data-c="30" xlink:href="#MJX-31-NCM-N-30" xmlns:xlink="http://www.w3.org/1999/xlink"/></g></g><g data-mml-node="msup" data-latex="x^2" data-semantic-type="superscript" data-semantic-role="latinletter" data-semantic-annotation="depth:3" data-semantic-id="6" data-semantic-children="4,5" data-semantic-parent="10" data-semantic-attributes="latex:x^2" data-semantic-owns="4 5" aria-level="2" data-speech-node="true" transform="translate(1668.7,0)"><g data-mml-node="mi" data-latex="x" data-semantic-type="identifier" data-semantic-role="latinletter" data-semantic-font="italic" data-semantic-annotation="clearspeak:simple;depth:4" data-semantic-id="4" data-semantic-parent="6" data-semantic-attributes="latex:x" aria-level="3" data-speech-node="true"><use data-c="1D465" xlink:href="#MJX-31-NCM-I-1D465" xmlns:xlink="http://www.w3.org/1999/xlink"/></g><g data-mml-node="mn" transform="translate(605,413) scale(0.707)" data-latex="2" data-semantic-type="number" data-semantic-role="integer" data-semantic-font="normal" data-semantic-annotation="clearspeak:simple;depth:4" data-semantic-id="5" data-semantic-parent="6" data-semantic-attributes="latex:2" aria-level="3" data-speech-node="true"><use data-c="32" xlink:href="#MJX-31-NCM-N-32" xmlns:xlink="http://www.w3.org/1999/xlink"/></g></g><g data-mml-node="mrow" data-semantic-added="true" data-semantic-type="empty" data-semantic-role="unknown" data-semantic-annotation="depth:3" data-semantic-id="9" data-semantic-parent="10" aria-level="2" data-speech-node="true" transform="translate(2677.3,0)"/></g><g data-mml-node="mo" data-latex="+" data-semantic-type="operator" data-semantic-role="addition" data-semantic-annotation="depth:2" data-semantic-id="7" data-semantic-parent="11" data-semantic-attributes="latex:+" data-semantic-operator="infixop,+" aria-level="1" data-speech-node="true" transform="translate(2899.5,0)"><use data-c="2B" xlink:href="#MJX-31-NCM-N-2B" xmlns:xlink="http://www.w3.org/1999/xlink"/></g><g data-mml-node="mn" data-latex="1" data-semantic-type="number" data-semantic-role="integer" data-semantic-font="normal" data-semantic-annotation="clearspeak:simple;depth:2" data-semantic-id="8" data-semantic-parent="11" data-semantic-attributes="latex:1" aria-level="1" data-speech-node="true" transform="translate(3899.7,0)"><use data-c="31" xlink:href="#MJX-31-NCM-N-31" xmlns:xlink="http://www.w3.org/1999/xlink"/></g></g></g></svg>
</div>

This is why **[MathML Core](https://w3c.github.io/mathml-core)** was born.
It is a small subset of [MathML 3](https://www.w3.org/TR/MathML3) which is feasible to implement in browsers.
It is based on the parts of the specification that are **used in practice**, adding important implementation details and testing.

To illustrate why this is important, Chromium had support for some parts of MathML when it was forked from WebKit.
However, it proved to be very difficult to maintain and complete, so it was removed in 2013.
My colleague Frédéric Wang led the effort to create a new implementation based on MathML Core, which was [shipped in 2023](https://www.igalia.com/2023/01/10/Igalia-Brings-MathML-Back-to-Chromium.html), a huge milestone for the standard.

We are in a very exciting moment in the MathML history, since **all three mayor browser engines have overlapping support**.
However, there is still work to be done to align the different implementations so they follow the MathML Core specification.
The goal is that one could write a formula in a website and have it look the same everywhere (like Wikipedia, which is now [transitioning to native MathML](https://phabricator.wikimedia.org/T271001) instead of prerendered SVGs).

So, what have we been working on?

## RTL mirroring

Some scripts are written from **right to left**, including [Arabic](https://en.wikipedia.org/wiki/Arabic_alphabet).
Browsers should be able to render text (and math) correctly, making use of font features such as [Unicode BiDi](https://www.unicode.org/reports/tr9/) and [`rltm`](https://learn.microsoft.com/en-us/typography/opentype/spec/features_pt#tag-rtlm).
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
    <mo largeop="true">∲</mo>
    <mi>C</mi>
  </msub>
</math>

<math dir="rtl">
  <msub displaystyle="true">
    <mo largeop="true">∲</mo>
    <mi>ج</mi>
  </msub>
  <msqrt>
    <mfrac>
      <mn>٣</mn>
      <mn>٤</mn>
    </mfrac>
  </msqrt>
  <mrow>
    <mo>{</mo>
    <mfrac>
      <mn>٥</mn>
      <mn>٦</mn>
    </mfrac>
    <mo>)</mo>
  </mrow>
</math>
```

<div class="math-example">
  <span>
    <math style="font-family: XITS">
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
        <mo largeop="true">∲</mo>
        <mi>C</mi>
      </msub>
    </math>
    <math dir="rtl" style="font-family: XITS">
      <msub displaystyle="true">
        <mo largeop="true">∲</mo>
        <mi>ج</mi>
      </msub>
      <msqrt>
        <mfrac>
          <mn>٣</mn>
          <mn>٤</mn>
        </mfrac>
      </msqrt>
      <mrow>
        <mo>{</mo>
        <mfrac>
          <mn>٥</mn>
          <mn>٦</mn>
        </mfrac>
        <mo>)</mo>
      </mrow>
    </math>
  </span>
  <hr/>
  <span>TODO</span>
</div>

There are two cases when it comes to mirroring. If there is a corresponding mirrored charater (i.e. open parenthesis to closed parenthesis), it is called **character-level mirroring** or Unicode BiDi, and the browser just needs to swap one glyph for the other. However, there are more tricky cases.

Take the _contour clockwise integral_.
If we just mirror the symbol vertically, the arrow is suddenly pointing in the other direction, making it _counterclockwise_.
This changes the meaning of the formula!

To avoid this, the `rtlm` font feature can provide a different set of correctly mirrored glyphs, which is called **glyph-level mirroring**.
_Glyphs_ plural since a math symbol can have different size variants to accommodate multiple contents.
Not only that, when the variants are not enough there are glyphs for assembling infinitely long operators.

![](https://notes.igalia.com/uploads/0ff8ee08-d108-4542-8852-4112988c2f31.png)

```html
<link rel="stylesheet" href="https://fred-wang.github.io/MathFonts/XITS/mathfonts.css"/>
<style>
    mspace {
        width: 0.8em;
    }
</style>

<math>
  <msqrt>
    <mspace height="0.8em" style="background: tomato"></mspace>
  </msqrt>
  <msqrt>
     <mspace height="1.5em" style="background: gold"></mspace>
  </msqrt>
  <msqrt>
    <mspace height="2.5em" style="background: mediumseagreen"></mspace>
  </msqrt>
  <msqrt>
    <mspace height="4.5em" style="background: cornflowerblue"></mspace>
  </msqrt>
</math>

<math dir="rtl">
  <msqrt>
    <mspace height="0.8em" style="background: tomato"></mspace>
  </msqrt>
  <msqrt>
     <mspace height="1.5em" style="background: gold"></mspace>
  </msqrt>
  <msqrt>
    <mspace height="2.5em" style="background: mediumseagreen"></mspace>
  </msqrt>
  <msqrt>
    <mspace height="4.5em" style="background: cornflowerblue"></mspace>
  </msqrt>
</math>
```

No browser engine supported glyph-level mirroring, so we had to add support for it to all of them.
Thankfully [harfbuzz](https://github.com/harfbuzz/harfbuzz), the font rendering library Chromium and Firefox use, already had support for it.
WebKit is a work in progress, since there is more complexity because of different ports using different backends.
As for character-level mirroring, Chromium and WebKit did it right, but Firefox used a negative transform along the vertical axis instead of replacing the correct pair.
The changes in Firefox and Chromium are now stable and ready to be used!

| Feature | Firefox | WebKit | Chromium |
| -- | -- | -- | -- |
| Character level mirroring (BiDi) | ✅✨ | ✅ | ✅ |
| Glyph level mirroring (rtlm) | ✅✨ | 🚧 | ✅✨ |

## `math-shift` and `math-depth`

Details are important, specially when rendering complex and layered formulas.
One may think that a few pixels do not make that much of a difference.
However, when you have multiple levels of nesting, offsets, and multiple elements, a slight change can make everything look ugly in the best case, wrong in the worst.

Enter `math-shift: compact`. Look at this example from the [MathML Core spec](https://w3c.github.io/mathml-core/#the-math-shift):

![](https://notes.igalia.com/uploads/f94b7a90-ba61-46af-baef-91a9f06e1fc4.png)

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

At first glance, you may not see anything too different.
But looking closely, the "2" on the left is a bit lower than then one on the right.
It is trying to _fit_ under the square root bar. This is what LaTeX calls **cramped mode**.

Chromium already supported the definition given by MathML Core, so that left Firefox and WebKit.
Both had some hardcoded rules for specific cases in C++ objects.
MathML Core takes another approach, and **incentivizes using CSS styling rules** instead.

Another interesting property is [`math-depth`](https://w3c.github.io/mathml-core/#the-math-script-level-property).
It is used to make nested elements, such as those inside fractions, scripts or radicals a bit smaller.
That way, if you have an exponent of an exponent of an exponent (of an exponent...) each time it is displayed a bit tinier.

In this case, Firefox and Chromium already had compliant implementations, so only WebKit needed to catch up.
Support for `math-depth` has already landed, and patches for [`font-size: math`](https://www.w3.org/TR/css-fonts-4/#valdef-font-size-math) (which sets the size of the element based on its depth) and the [`scriptlevel`](https://w3c.github.io/mathml-core/#dfn-scriptlevel) attribute (which allows to modify this depth) are on the way.

![](https://notes.igalia.com/uploads/da0ba649-fedd-44a2-94d4-5a881e786faa.png)

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

| Feature | Firefox | WebKit | Chromium |
| -- | -- | -- | -- |
| `math-shift: compact` | ✅✨ | ✅✨ | ✅ |
| `math-depth` | ✅ | ✅✨ | ✅ |
| `font-size: math` | ✅ | 🚧 | ✅ |
| `scriptlevel` | ✅ | 🚧 | ✅ |

## Other work

### Rendering unknown elements as mrow

MathML 3 contained 195 elements.
MahtML Core focuses on about **30**, leaving the rest to styling or polyfills.
This means deprecating some features that were previously implemented in some browsers, like `mfenced`, `semantics` and `maction`, as it would be too difficult to have them be interoperable at this time.
To prevent breaking existing content too much they are rendered like an `mrow`.

### `font-family: math`

Selecting a **good math font** is essential for rendering.
Stretchy operators, math symbols and italics are not available with every font, so without one they are presented very poorly.
[`font-family: math`](https://drafts.csswg.org/css-fonts/#math-def) is a CSS property that specifies that the content should use a suitable font for mathematics.
Before browsers had a hardcoded list of CSS fallbacks, but now this has been standardized and implemented.

![Poor rendering when a math font is not available](https://notes.igalia.com/uploads/9f61aa3d-0d01-4e54-91c5-91cbd3c04744.png)

### `mathvariant` and `text-transform: math-auto`

Single letter identifiers inside a `<mi>` tag are treated as variables, and so they should be rendered with **_fancy italics_**.
This is still supported by MathML Core.
However, MathML 3 allows a plethora of transformations using `mathvariant`, from bold to gothic text.
The new spec says that while italic transformation should still happen by default, other text should **use the specific unicode codepoint directly**, as it just adds too much complexity for the browser implementation.

![](https://notes.igalia.com/uploads/3141cd01-4fdb-465a-a30c-90f9aff4b2d4.png)

```html
<math display="block">
  <mi>A</mi>
  <mi mathvariant="normal">A</mi>
  <mi mathvariant="bold-italic">A</mi>
  <mi mathvariant="bold">A</mi>
  <mi mathvariant="double-struck">A</mi>
  <mi mathvariant="script">A</mi>
  <mi mathvariant="fraktur">A</mi>
  <mi mathvariant="sans-serif">A</mi>
  <mi mathvariant="monospace">A</mi>
</math>
```

### `DisplayOperatorMinHeight` and Cambria Math

Microsoft [made a mistake](https://github.com/MicrosoftDocs/typography-issues/issues/1136) in Cambria Math, one of the math fonts used in Windows.
They switched the `DisplayOperatorMinHeight` and `DelimitedSubFormulaMinHeight`, so operators weren't [being displayed correctly](https://github.com/w3c/mathml-core/issues/126).
Some browsers had a workaround for this, but a more general fix was implemented in harfbuzz, so we removed the workarounds to rely on the upstream library instead.

### Animation for `math-*` properties

When implementing `math-shift` in Firefox we noticed that the spec said that the new properties are not supposed to be animatable.
In the new CSS spec most properties are able to be animated (_fun!_).
After some discussion with the MathML Working Group we decided to change the spec, and we are adding this feature to the browser engines.

| Feature | Firefox | WebKit | Chromium |
| -- | -- | -- | -- |
| Render unknown elements as `mrow` | ✅✨ | ✅✨ | ✅ |
| `font-family: math` | ✅✨ | ✅✨ | ✅ |
| `text-transform: math-auto` | ✅ | ✅✨ | ✅ |
| New `mathvariant` behaviour | ✅ | 🚧 | ✅ |

## What's next?

Many things have already shipped, but we keep working on making mathematics more interoperable in browsers.
There are some _exciting_ new features ahead, like:

- Updates to the operator dictionary.
- More improvements to operator stretching and spacing.
- Handling positioned elements and forbidding floats in MathML.

A big thanks to the Sovereign Tech Fund for commisioning this work!
