// @ts-nocheck
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const FOOD_DIR = "assets/food";
const NOTES_DIR = "blog/notes";

function slugToDescription(slug) {
  return slug.split("-").join(" ");
}

function parseFilename(filename) {
  const match = filename.match(
    /^(\d{4}-\d{2}-\d{2})-(.+)\.(webp|jpg|jpeg|png|avif|gif)$/i,
  );
  if (!match) return null;
  const [, dateStr, slug] = match;
  return { date: dateStr, description: slugToDescription(slug), slug };
}

async function scanDir(baseDir, subPath = "") {
  const items = [];
  const fullDir = join(baseDir, subPath);
  let entries;
  try {
    entries = await readdir(fullDir, { withFileTypes: true });
  } catch {
    return items;
  }

  for (const entry of entries) {
    const entrySubPath = subPath ? `${subPath}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      const subItems = await scanDir(baseDir, entrySubPath);
      items.push(...subItems);
    } else {
      const parsed = parseFilename(entry.name);
      if (!parsed) continue;

      items.push({
        src: `/food/${entrySubPath}`,
        description: parsed.description,
        date: parsed.date,
        slug: parsed.slug,
      });
    }
  }
  return items;
}

function parseNoteFrontmatter(content) {
  const parts = content.split("---\n");
  if (parts.length < 3) return { data: {}, body: "" };
  const fm = parts[1];
  const body = parts.slice(2).join("---\n");
  const data = {};
  const tagsMatch = fm.match(/tags:\s*\[(.*?)\]/);
  if (tagsMatch) {
    data.tags = tagsMatch[1]
      .split(",")
      .map((s) => s.trim().replace(/["']/g, ""));
  }
  return { data, body };
}

function extractImages(markdown) {
  const images = [];
  const regex = /!\[.*?\]\((.+?)\)/g;
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    images.push(match[1]);
  }
  return images;
}

export default async function () {
  const photos = await scanDir(FOOD_DIR);

  let noteEntries = [];
  try {
    noteEntries = await readdir(NOTES_DIR);
  } catch { /* no notes directory */ }

  const foodNotes = [];
  const claimedSlugs = new Set();

  for (const entry of noteEntries) {
    if (!entry.endsWith(".md")) continue;
    const content = await readFile(join(NOTES_DIR, entry), "utf-8");
    const { data, body } = parseNoteFrontmatter(content);
    if (!data.tags?.includes("food")) continue;

    const match = entry.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/);
    if (!match) continue;
    const [, dateStr, slug] = match;

    const images = extractImages(body);
    claimedSlugs.add(slug);

    foodNotes.push({
      type: "note",
      slug,
      date: dateStr,
      description: slugToDescription(slug),
      thumbnail: images[0] || null,
      images,
      tags: data.tags.filter((t) => t !== "food"),
      url: `/blog/notes/${dateStr}-${slug}/`,
    });
  }

  let overrides = {};
  try {
    overrides = JSON.parse(await readFile("data/food.json", "utf-8"));
  } catch { /* no overrides file yet */ }

  const photoItems = photos
    .filter((photo) => !claimedSlugs.has(photo.slug))
    .map((photo) => {
      const ov = overrides[photo.slug] || {};
      return {
        ...photo,
        type: "image",
        description: ov.description || photo.description,
        draft: ov.draft || false,
      };
    })
    .filter((item) => !item.draft);

  const allItems = [...photoItems, ...foodNotes].sort(
    (a, b) => b.date.localeCompare(a.date),
  );

  const noteTags = [
    ...new Set(foodNotes.flatMap((n) => n.tags)),
  ].sort();

  const allCategories = [
    { slug: "all", url: "", name: "all", primary: true },
    { slug: "cooking", url: "cooking/", name: "cooking", primary: true },
    { slug: "notes", url: "notes/", name: "notes", primary: false },
    ...noteTags.map((t) => ({ slug: t, url: t + "/", name: t, primary: false })),
  ];

  return { items: allItems, allCategories };
}
