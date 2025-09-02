-- Get the time from the file name and add it to the post header

selector = config["selector"]

if not selector then
	Log.warning('Missing option "selector", using default (h1)')
	selector = "h1"
end

function wrap_title(d)
	wrapper = HTML.create_element("div")
	HTML.add_class(wrapper, "post-title")
	wrap = HTML.wrap(title, wrapper)

	time = HTML.create_element("time", d)
	HTML.append_child(wrapper, time)

	-- modify = get_file_modification_date(page_file)
end

print(page_file)
if String.starts_with(page_file, "site/blog") then
	title = HTML.select_one(page, selector)
	date = Regex.find_all(page_file, "(\\d{4}-\\d{2}-\\d{2})")
	Table.iter_values(wrap_title, date)
end
