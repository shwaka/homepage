---
layout: mylayout
title: Research
lang: en
ref: research
---

## Publications
### Papers and Preprints
- Description and triviality of the loop products and coproducts for rational Gorenstein spaces,
  <a target="_blank" href="https://arxiv.org/abs/1612.03563">arXiv:1612.03563</a>
- Coproducts in brane topology,
  to appear in
  <a target="_blank" href="https://msp.org/agt/about/journal/about.html">
    Algebraic and Geometric Topology
  </a>,
  also available at <a href="https://arxiv.org/abs/1802.04973" target="_blank">arXiv:1802.04973</a>
- Nontrivial example of the composition of the brane product and coproduct on Gorenstein spaces,
  <a target="_blank" href="https://arxiv.org/abs/1902.10936">arXiv:1902.10936</a>

### Non refereed articles
- String topology on rational Gorenstein spaces,
          京都大学数理解析研究所講究録 No.~2060 「変換群を核とする代数的位相幾何学」, 2017

## Talks
### Talks in English

<ul>
{% assign talks = site.data.talks | where: "base.lang", "en" | reverse %}
{% for talk in talks %}
  {% include assign_lang.html from=talk %}
  {% if ldata %}
    <li>
      {% include talk.html ldata=ldata bdata=bdata %}
    </li>
  {% endif %}
{% endfor %}
</ul>

### Talks in Japanese

<ul>
{% assign talks = site.data.talks | where: "base.lang", "ja" | reverse %}
{% for talk in talks %}
  {% include assign_lang.html from=talk %}
  {% if ldata %}
    <li>
      {% include talk.html ldata=ldata bdata=bdata %}
    </li>
  {% endif %}
{% endfor %}
</ul>
