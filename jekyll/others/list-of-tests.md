---
magiccomment: "-*- engine: liquid -*-"
lang: ja
title: test ページたち
ref: list-of-tests
backref: others
layout: mylayout
---

<ul>
  {% for test_page in site.tests %}
    <li>
      {{ test_page | refer_link }}
    </li>
  {% endfor %}
</ul>
