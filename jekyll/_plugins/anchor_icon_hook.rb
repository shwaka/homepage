# coding: utf-8
require "nokogiri"

def insert_anchor_icon(page)
  if not [".md", ".html"].include?(page.extname)
    return
  end
  html_str = page.output
  doc = Nokogiri::HTML.parse(html_str, nil, "utf-8")
  doc.css('a[href^="http"], a[target="_blank"]').each do |a|
    # add target="_blank" to external links (whose href starts from "http")
    a.set_attribute('target', "_blank")
    # create <use> tag
    use = Nokogiri::XML::Node.new("use", a)
    baseurl = page.site.config["baseurl"]
    use["xlink:href"] = "#{baseurl}/assets/img/icons.svg#target_blank"
    # create <svg> tag
    svg = Nokogiri::XML::Node.new("svg",a)
    svg["class"] = "target-blank-icon"
    # svg["width"] = "13px"
    # svg["height"] = "13px"
    svg << use
    # edit <a> tag
    a << svg
  end
  page.output = doc.to_html
end

Jekyll::Hooks.register :pages, :post_render do |page|
  insert_anchor_icon(page)
end

# :documents に含まれる
# Jekyll::Hooks.register :posts, :post_render do |page|
#   insert_anchor_icon(page)
# end

Jekyll::Hooks.register :documents, :post_render do |doc|
  insert_anchor_icon(doc)
end
