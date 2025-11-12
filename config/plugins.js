// @ts-nocheck no type definitions

// import inclusive_lang from "@11ty/eleventy-plugin-inclusive-language";
import { RenderPlugin } from "@11ty/eleventy";
import RssPlugin from "@11ty/eleventy-plugin-rss";
import HighlightPlugin from "@11ty/eleventy-plugin-syntaxhighlight";
import { VentoPlugin } from "eleventy-plugin-vento";

export default function (config) {
  // Render templates inside templates
  config.addPlugin(RenderPlugin, {
    accessGlobalData: true,
    immediate: true,
  });

  // Templates .vto
  config.addPlugin(VentoPlugin, { autotrim: true });

  // Render with Vento
  config.addPairedShortcode(
    "vto",
    async function (content, context = {}) {
      if (!content) {
        return;
      }
      const renderer = config.javascript.functions.renderContent.bind(this);
      const rendered = await renderer(content, "vto", {
        ...(this.ctx || {}),
        ...context,
      });
      return rendered;
    },
  );

  // Highlight code blocks
  config.addPlugin(HighlightPlugin);

  // Atom Feeds, see atom.njk for an example
  config.addPlugin(RssPlugin);

  // config.addPlugin(inclusive_lang);
}
