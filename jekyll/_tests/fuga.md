---
magiccomment: "-*- engine: liquid -*-"
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
