-- Get the time from the file name and add it to the post header

selector = config["selector"]
options = soupault_config["custom_options"]
site_url = options["site_url"]
site_author = options["site_author"]

if not selector then
	Log.warning('Missing option "selector", using default (h1)')
	selector = "h1"
end

if not String.starts_with(page_file, "site/blog") then
	return
end

-- Content
content_element = HTML.select_one(page, "main")
HTML.set_tag_name(content_element, "section")
HTML.add_class(content_element, "e-content")

entry_element = HTML.create_element("main", "")
HTML.add_class(entry_element, "h-entry")
HTML.wrap(content_element, entry_element)

-- Title
title_element = HTML.select_one(page, selector)
if title_element then
	HTML.add_class(title_element, "p-name")
	HTML.insert_before(content_element, title_element)
end

-- Date
date = Regex.find_all(page_file, "(\\d{4}-\\d{2}-\\d{2})")
function set_date(date)
	date_element = HTML.create_element("time", date)
	HTML.add_class(date_element, "dt-published")
	HTML.insert_before(content_element, date_element)
end
Table.iter_values(set_date, date)

-- Summary
summary_element = HTML.select_one(page, ".p-summary")
if not summary_element then
	summary_element = HTML.select_one(page, "p")
	HTML.add_class(summary_element, "p-summary")
end

-- Tags
tags = HTML.select(page, "tag")
function set_category(tag)
	HTML.add_class(tag, "p-category")
end
Table.iter_values(set_category, tags)

-- Other information
info_element = HTML.create_element("div", "")
HTML.append_attribute(info_element, "hidden", "")

url_element = HTML.create_element("a", page_url)
HTML.append_attribute(url_element, "href", page_url)
HTML.add_class(url_element, "u-url")
HTML.append_child(info_element, url_element)

author_element = HTML.create_element("a", site_author)
HTML.append_attribute(author_element, "href", site_url)
HTML.append_attribute(author_element, "rel", "author")
HTML.add_class(author_element, "p-author")
HTML.append_child(info_element, author_element)

HTML.append_child(entry_element, info_element)
