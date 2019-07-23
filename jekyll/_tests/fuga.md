---
magiccomment: "-*- engine: liquid -*-"
layout: mylayout
lang: ja
title: ふが
backref: list-of-tests
ref: fuga
---

{% assign link = "hoge" | refer | refer_link %}
{% if link %}
  {{ link }}
{% else %}
  not found
{% endif %}
