---
layout: mylayout
title: てすと(included)
lang: ja
ref: included
---

## hoge
{{ page.ref }}

{% if page.lang == "ja" %}
  ほげ
{% else %}
  hoge
{% endif %}
