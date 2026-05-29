const grid = document.querySelector(".food-gallery");
if (grid) {
  const layout = () => {
    const items = grid.querySelectorAll(".food-card");
    const row_height = parseInt(getComputedStyle(grid).gridAutoRows, 10) || 8;
    const row_gap = parseInt(getComputedStyle(grid).gap, 10) || 16;

    for (const item of items) {
      item.style.removeProperty("--row-span");
      const row_span = Math.ceil(
        (item.scrollHeight + row_gap) / (row_height + row_gap),
      );
      item.style.setProperty("--row-span", row_span);
    }
  };

  let layout_pending = false;
  const schedule_layout = () => {
    if (!layout_pending) {
      layout_pending = true;
      requestAnimationFrame(() => {
        layout();
        layout_pending = false;
      });
    }
  };

  layout();

  const images = grid.querySelectorAll("img");
  let loaded = 0;
  images.forEach((img) => {
    if (img.complete) {
      loaded++;
      if (loaded === images.length) layout();
    } else {
      img.addEventListener("load", () => {
        loaded++;
        if (loaded === images.length) layout();
      });
    }
  });

  window.addEventListener("resize", schedule_layout);
}

const dialog = document.querySelector(".food-lightbox");
if (dialog) {
  document.querySelectorAll(".food-card[data-src]").forEach((card) => {
    card.addEventListener("click", () => {
      dialog.innerHTML = "";

      const inner = document.createElement("div");
      inner.className = "lightbox-inner";

      const wrap = document.createElement("div");
      wrap.className = "lightbox-image-wrap";

      const img = document.createElement("img");
      img.src = card.dataset.src;
      img.alt = card.dataset.description;
      wrap.appendChild(img);

      const close = document.createElement("button");
      close.className = "lightbox-close";
      close.textContent = "×";
      close.addEventListener("click", () => dialog.close());
      wrap.appendChild(close);

      const desc = document.createElement("p");
      desc.textContent = card.dataset.description;
      const date = document.createElement("time");
      date.className = "lightbox-date";
      date.textContent = card.dataset.date;

      inner.appendChild(wrap);
      inner.appendChild(desc);
      inner.appendChild(date);
      dialog.appendChild(inner);
      dialog.showModal();
    });
  });
}
