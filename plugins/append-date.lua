-- Get the time from the file name and add it to the post header

selector = config["selector"]

if not selector then
	Log.warning('Missing option "selector", using default (h1)')
	selector = "h1"
end

function append_date(date)
	date_element = HTML.create_element("time", date)
	HTML.add_class(date_element, "post-date")
	HTML.insert_after(title_element, date_element)
end

print(page_file)
if String.starts_with(page_file, "site/blog") then
	title_element = HTML.select_one(page, selector)
	date = Regex.find_all(page_file, "(\\d{4}-\\d{2}-\\d{2})")
	Table.iter_values(append_date, date)
end
