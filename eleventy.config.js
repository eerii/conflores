// @ts-nocheck no type definitions

import plugins from "./config/plugins.js";
import pre from "./config/pre.js";
import post from "./config/post.js";

export default function (config) {
  // Options
  config.ignores.add("README.md");
  config.ignores.add(".*");
  config.setQuietMode(true);

  // Asset folder
  config.addPassthroughCopy({ "assets": "." });

  // Collections
  config.addCollection("posts", (api) => api.getFilteredByGlob("blog/*.md"));
  config.addCollection("notes", (api) => api.getFilteredByGlob("blog/notes/*.md"));
  config.addCollection("all", (api) => api.getFilteredByGlob("blog{/,/notes/}*.md"));

  // Plugins
  plugins(config);

  // Preprocessors
  pre(config);

  // Postprocessors
  post(config);
}

export const config = {
  // Default directories
  dir: {
    includes: "include",
    data: "data",
    output: "build",
  },
  // Use vento as a templating engine
  htmlTemplateEngine: "vto",
  markdownTemplateEngine: "vto",
};
