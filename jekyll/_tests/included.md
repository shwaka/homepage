---
title: てすと(included)
lang: ja
ref: test-included
---

## hoge
- タイトル: {{ page.title }}
- ref: {{ page.ref }}

{% if page.lang == "ja" %}
  ほげ
{% else %}
  hoge
{% endif %}
