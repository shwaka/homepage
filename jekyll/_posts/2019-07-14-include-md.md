---
magiccomment: "-*- engine: liquid -*-"
layout: post
lang: ja
title: markdown を include する
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
  {% capture acc_content %}
    <div class="included">
      <div class="title">
        {{ ref }}
      </div>
      {% include_md {{ ref }} %}
    </div>
  {% endcapture %}
  {% assign page_to_include = ref | refer %}
  {% assign acc_title = page_to_include.title %}
  {% include accordion.html id=ref title=acc_title content=acc_content %}
{% endfor %}
