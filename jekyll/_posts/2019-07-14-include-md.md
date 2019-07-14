---
magiccomment: "-*- engine: liquid -*-"
layout: post
lang: ja
title: markdown を include する
syntax-highlighting: true
ref-list:
  - "post:highlight-and-image"
  - "post:cleveref"
  - "index"
  - "research"
---

<style>
 .included{
   border: 1px solid black;
   padding-left: 8px;
   padding-right: 8px;
   margin: 10px;
   display: block;
 }
 .title{
   background-color: hsl(0, 0%, 85%);
   display: inline-block;
   padding-left: 5px;
   padding-right: 5px;
 }
</style>

{% for ref in page.ref-list %}
  <div class="included">
    <div class="title">
      {{ ref }}
    </div>
    {% include_md {{ ref }} %}
  </div>
{% endfor %}
