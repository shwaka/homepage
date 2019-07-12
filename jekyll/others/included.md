---
layout: mylayout
title: てすと(included)
lang: ja
ref: included
backref: others
---

## hoge
{{ page.ref }}

{% if page.lang == "ja" %}
  ほげ
{% else %}
  hoge
{% endif %}
