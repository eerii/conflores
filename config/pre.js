// @ts-nocheck no type definitions

import process from "node:process";
import markdown_it from "markdown-it";
import markdown_it_attrs from "markdown-it-attrs";

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
    // Get the p-summary class or the first paragraph
    const excerpt = doc.querySelector(".p-summary") || doc.querySelector("p");
    if (excerpt) {
      data.excerpt = excerpt.textContent;
    }

    // Images
    const images = doc.querySelectorAll("img:not(.no-index)");
    if (images) {
      data.images = images;
    }
  });
}
