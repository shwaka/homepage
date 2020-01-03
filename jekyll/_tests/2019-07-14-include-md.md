---
magiccomment: "-*- engine: liquid -*-"
lang: ja
title: markdown を include する
ref-list:
  - "post:highlight-and-image"
  - "post:cleveref"
  - "index"
  - "research"
  - "others"
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
  {% assign page_to_include = ref | refer %}
  {% capture acc_content %}
    <div class="included">
      <div class="title">
        {{ ref }}
      </div>
      {{ page_to_include | include_content }}
    </div>
  {% endcapture %}
  {% assign acc_title = page_to_include.title %}
  {% include accordion.html id=ref title=acc_title content=acc_content %}
{% endfor %}
