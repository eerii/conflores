import Image from "@11ty/eleventy-img";

export default async function thumb(filePath, slug, outputDir, urlPath) {
  const metadata = await Image(filePath, {
    widths: [400],
    formats: ["webp"],
    outputDir,
    urlPath,
    filenameFormat: (_id, _src, width, format) =>
      `${slug}-${width}w.${format}`,
  });
  return metadata.webp[0].url;
}
