---
magiccomment: "-*- engine: liquid -*-"
layout: mylayout
lang: ja
title: test ページたち
ref: list-of-tests
backref: others
---

<ul>
  {% for test_page in site.tests %}
    <li>
      {{ test_page | refer_link }}
    </li>
  {% endfor %}
</ul>
