---
layout: post
lang: ja
title: コードブロックにファイル名を指定する (plugin)
ref: post:named-codeblock-plugin
toc: true
tags:
  - jekyll
  - plugin
  - documentation
---

`Jekyll` + `kramdown` の環境で，コードブロックにファイル名を表示する．

- [GitHub Pagesでコードブロックにファイル名を表示する](https://hachy.github.io/2018/11/14/add-file-name-to-code-block-in-jekyll-on-github-pages.html){:target="_blank"}
  をベースとして，色々と自分好みに変更した．
- 元々は javascript を利用していた ({{ "post:named-codeblock" | refer | refer_link}}) ものを，
  Jekyll の plugin を用いてビルド時に解決するようにした．


## 使用方法
1. プラグインを読み込む
2. CSS を適当に書く．
3. markdown 内のコードブロックでファイル名を指定する．

## 1. プラグインを読み込む
[named_codeblock_hook.rb](https://github.com/shwaka/homepage/blob/master/jekyll/_plugins/named_codeblock_hook.rb) を `_plugins/` ディレクトリに配置する．

## 2. CSS を書く
```css
.named-block-filename{
  background-color: hsl(0, 0%, 85%);
  display: inline-block;
  padding-left: 5px;
  padding-right: 5px;
  margin-left: 10px;
}
```
{:filename="style.css"}

これはもちろんお好みで．

## 3. markdown 内でファイル名を指定する
### バッククォート3つ (fenced code block) を使うとき
````markdown
```python
def add(a, b):
    return a + b
```
{:filename="hoge.py"}
````

### `highlight` タグを使うとき
```liquid
{%- raw %}
{% highlight python %}
def add(a, b):
    retrun a + b
{% endhighlight -%}
{:filename="hoge.py"}{% endraw %}
```

`{% raw %}{% endhighlight -%}{% endraw %}` の最後に `-` (ハイフン) が必要なことに注意

## 参考: named_codeblock_hook.rb のソースコード
```ruby
# coding: utf-8
require "nokogiri"

def insert_filename(to_insert, filename)
  div = Nokogiri::XML::Node.new("div", to_insert)
  div.content = filename
  div["class"] = "named-block-filename"
  to_insert.prepend_child(div)
end

def named_codeblock_hook(page)
  if page.extname != ".md"
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

Jekyll::Hooks.register :documents, :post_render do |doc|
  named_codeblock_hook(doc)
end
```
{:filename="named_codeblock_hook.rb"}
