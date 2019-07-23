---
magiccomment: "-*- engine: liquid -*-"
title: てすと
lang: ja
ref: test-include
---

他のページから読み込んでみるテスト

## てすと

{% include_relative included.md %}

## test

{% assign ref="test-included" %}
{% assign pg = ref | refer %}
{{- pg.content -}}

## テスト
{{ pg | include_md }}
