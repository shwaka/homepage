{% comment %}
-*- engine: liquid -*-
{% endcomment %}

{% if page.lang == "en" %}
  {% capture jsps_link -%}
    [Research Fellow of Japan Society for the Promotion of Science](https://www.jsps.go.jp/english/e-pd/index.html){:target="_blank"}
  {%- endcapture %}

  {% capture address -%}
    Faculty of Science, Shinshu University,
    3-1-1 Asahi, Matsumoto, Nagano, 390-8621, Japan
  {%- endcapture %}

{% elsif page.lang == "ja" %}
  {% capture jsps_link -%}
    [日本学術振興会 特別研究員 PD](https://www.jsps.go.jp/j-pd/){:target="_blank"}
  {%- endcapture %}

  {% capture address -%}
    〒390-8621 長野県松本市旭3-1-1 信州大学理学部
  {%- endcapture %}

{% else %}

  This can't happen!

{% endif %}

## Shun Wakatsuki
- {{ jsps_link }}
- **email**: swaka[AT]shinshu-u.ac.jp
- **address**: {{ address }}

## Research field
- Rational homotopy theory
- String topology, Brane topology
