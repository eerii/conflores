function masonry(container) {
  container.classList.add("masonry-ready");
  const cards = [...container.children];
  if (!cards.length) return;

  let cols = 3;
  if (window.matchMedia("(max-width: 768px)").matches) cols = 2;
  if (window.matchMedia("(max-width: 480px)").matches) cols = 1;

  const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const gap = isNaN(fontSize) ? 8 : fontSize * 0.5;
  const w = (container.clientWidth - gap * (cols - 1)) / cols;
  const heights = new Array(cols).fill(0);

  for (const card of cards) {
    const col = heights.indexOf(Math.min(...heights));
    card.style.position = "absolute";
    card.style.width = `${w}px`;
    card.style.left = `${col * (w + gap)}px`;
    card.style.top = `${heights[col]}px`;
    heights[col] += card.offsetHeight + gap;
  }

  container.style.height = `${Math.max(...heights)}px`;
}

const gallery = document.querySelector(".food-gallery");
if (gallery) {
  let timer;
  const ro = new ResizeObserver(() => {
    clearTimeout(timer);
    timer = setTimeout(() => masonry(gallery), 50);
  });
  ro.observe(gallery);
  [...gallery.children].forEach((card) => ro.observe(card));
}

document.querySelectorAll(".food-stack").forEach((stack) => {
  const imgs = stack.querySelectorAll(".stack-img");
  const prevBtn = stack.querySelector(".stack-prev");
  const nextBtn = stack.querySelector(".stack-next");
  const srcs = Array.from(imgs, (img) => img.src);
  let idx = 0;

  const preload = (i) => {
    if (i >= 0 && i < srcs.length) new Image().src = srcs[i];
  };

  const show = (i) => {
    imgs[idx].classList.add("stack-img-hidden");
    idx = (i + imgs.length) % imgs.length;
    imgs[idx].classList.remove("stack-img-hidden");
    preload(idx + 1);
    preload(idx - 1);
  };

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      show(idx - 1);
    });
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      show(idx + 1);
    });
  }
});
