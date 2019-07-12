---
layout: mylayout
title: てすと
lang: ja
ref: include-test
backref: others
---

他のページから読み込んでみるテスト

# てすと

{% include_relative included.md %}

# test

{% assign ref="included" %}
{%- assign pages_filtered = site.pages | where: "ref", ref | where: "lang", page.lang -%}
{%- for pg in pages_filtered -%}
  {{-  pg.content -}}
{%- endfor -%}
