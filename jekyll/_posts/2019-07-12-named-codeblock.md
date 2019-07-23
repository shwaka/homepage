---
layout: post
lang: ja
title: コードブロックにファイル名を指定する
ref: post:named-codeblock
date: 2019-07-12 01:00:00 +09:00
toc: true
---

`Jekyll` + `kramdown` の環境で，コードブロックにファイル名を表示する．
基本的には
[GitHub Pagesでコードブロックにファイル名を表示する](https://hachy.github.io/2018/11/14/add-file-name-to-code-block-in-jekyll-on-github-pages.html){:target="_blank"}
を参考にして，
色々と自分好みに変更した．

## 使用方法
1. layout として使っている html ファイルで [named-codeblock.js]({{ site.baseurl }}/assets/js/named-codeblock.js) を読み込む．
2. CSS を適当に書く．
3. markdown 内のコードブロックでファイル名を指定する．

## 1. js を読み込む
```html
<head>
  (中略)
  <link rel="stylesheet" href="style.css" type="text/css"></link>
  <script src="named-codeblock.js"></script>
</head>
```
{:filename="layout.html"}

もちろん CSS も読み込むので，ついでに載せておいた．

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
````liquid
{%- raw %}
{% highlight python %}
def add(a, b):
    retrun a + b
{% endhighlight -%}
{:filename="hoge.py"}{% endraw %}
````

`{% raw %}{% endhighlight -%}{% endraw %}` の最後に `-` (ハイフン) が必要なことに注意

## 参考: `named-codeblock.js` のソースコード
```js
function insert_filename(to_insert, filename){
  var div = document.createElement("div");
  div.textContent = filename;
  div.classList.add("named-block-filename");
  to_insert.insertBefore(div, to_insert.firstChild);
}

document.addEventListener("DOMContentLoaded", () => {
  const filename_attr = "filename"
  // highlight タグ
  const blocks_tag = document.querySelectorAll(`figure.highlight[${filename_attr}]`);
  Array.from(blocks_tag).forEach(block => {
    const filename = block.getAttribute(filename_attr);
    insert_filename(block, filename);
  });
  // fenced code block (backquote 3つ)
  const blocks_fenced = document.querySelectorAll(`div.highlighter-rouge[${filename_attr}]`);
  Array.from(blocks_fenced).forEach(block => {
    const filename = block.getAttribute(filename_attr);
    const div_to_insert = block.querySelector("div.highlight");
    insert_filename(div_to_insert, filename)
  });
});
```
{:filename="named-codeblock.js"}
