---
magiccomment: "-*- engine: liquid -*-"
layout: post
lang: ja
title: markdown を include する
syntax-highlighting: true
ref: post:include-md
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

------

{% include_md top %}

------

<div class="included">
  <div class="title">
    post:highlight-and-image
  </div>
  {% include_md post:highlight-and-image %}
</div>

------

<div class="included">
  <div class="title">
    post:cleveref
  </div>
  {% include_md post:cleveref %}
</div>

------

<div class="included">
  <div class="title">
    research
  </div>
  {% include_md research %}
</div>

------

<div class="included">
  <div class="title">
    top
  </div>
  {% include_md top %}
</div>
