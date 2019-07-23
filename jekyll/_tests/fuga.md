---
magiccomment: "-*- engine: liquid -*-"
layout: mylayout
lang: ja
title: ふが
ref: fuga
---

{% assign link = "hoge" | refer | refer_link %}
{% if link %}
  {{ link }}
{% else %}
  not found
{% endif %}
