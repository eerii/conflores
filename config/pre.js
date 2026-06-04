// @ts-nocheck no type definitions

import process from "node:process";
import markdown_it from "markdown-it";
import markdown_it_attrs from "markdown-it-attrs";
import thumb from "./thumb.js";

export function md() {
  return markdown_it({
    html: true,
    linkify: true,
  }).use(markdown_it_attrs);
  // TODO: Add plugins
}

export default function (config) {
  // Markdown processor
  config.setLibrary("md", md());

  // Show drafts only when developing locally
  config.addPreprocessor("drafts", "*", (data, _content) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
      return false;
    }
  });

  // Extract information from the HTML content
  config.addPreprocessor("extract", "*", async (data, content) => {
    // Skip pages that aren't blog posts
    if (!data.page.inputPath.includes("/blog/")) {
      return;
    }

    // Parse document
    const { DOMParser } = await import("@b-fuze/deno-dom");
    const html = md().render(content);
    const doc = new DOMParser().parseFromString(html, "text/html");

    // Excerpts
    const excerptEls = doc.querySelectorAll("p:not(.no-index)");
    if (excerptEls && excerptEls.length > 0) {
      const filtered = Array.from(excerptEls).filter(
        (p) => p.textContent.trim() !== ""
      );
      if (filtered.length > 0) {
        data.excerpts = filtered.map((p) => p.innerHTML);
        data.excerpt = filtered[0].textContent;
      }
    }

    // Media (images + videos)
    const media = [];

    for (const img of doc.querySelectorAll("img:not(.no-index)")) {
      const src = img.getAttribute("src");
      if (src && !src.startsWith("http")) {
        try {
          const filePath = `assets${src}`;
          const slug = src.replace(/^\/images\//, "").replace(/\.[^.]+$/, "").replace(/\//g, "-");
          img.setAttribute("src", await thumb(filePath, slug, "build/_media-thumbs", "/_media-thumbs"));
        } catch { /* keep original src */ }
      }
      media.push(img.outerHTML);
    }

    for (const vid of doc.querySelectorAll("video:not(.no-index)")) {
      media.push(vid.outerHTML);
    }

    if (media.length > 0) {
      data.media = media;
    }
  });
}
