-- Add u-photo to images

if not String.starts_with(page_file, "site/blog") then
	return
end

images = HTML.select(page, "img:not(no-index)")
function add_class(img)
  HTML.add_class(img, "u-photo")
end

Table.iter_values(add_class, images)
