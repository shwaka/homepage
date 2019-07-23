# coding: utf-8
require "nokogiri"

def insert_filename(to_insert, filename)
  div = Nokogiri::XML::Node.new("div", to_insert)
  div.content = filename
  div["class"] = "named-block-filename"
  to_insert.prepend_child(div)
end

def named_codeblock_hook(page)
  if page.extname != ".md" then
    return
  end
  html_str = page.output
  doc = Nokogiri::HTML.parse(html_str, nil, "utf-8")
  filename_attr = "filename"
  # highlight tag の場合
  blocks_tag = doc.css("figure.highlight[#{filename_attr}]")
  blocks_tag.each do |block|
    filename = block.attribute(filename_attr)
    insert_filename(block, filename)
  end
  # fenced code block (backquote 3つ) の場合
  blocks_fenced = doc.css("div.highlighter-rouge[#{filename_attr}]")
  blocks_fenced.each do |block|
    filename = block.attribute(filename_attr)
    div_to_insert = block.at_css("div.highlight")
    insert_filename(div_to_insert, filename)
  end
  # 書き出す
  page.output = doc.to_html
end

Jekyll::Hooks.register :pages, :post_render do |page|
  named_codeblock_hook(page)
end

# :documents に含まれる
# Jekyll::Hooks.register :posts, :post_render do |post|
#   named_codeblock_hook(post)
# end

Jekyll::Hooks.register :documents, :post_render do |doc|
  named_codeblock_hook(doc)
end
