{% comment %}
-*- engine: liquid -*-
{% endcomment %}

{%- capture jsps_link -%}
  {%- if page.lang == "en" -%}
    [Research Fellow of Japan Society for the Promotion of Science](https://www.jsps.go.jp/english/e-pd/index.html){:target="_blank"}
  {%- elsif page.lang == "ja" -%}
    [日本学術振興会 特別研究員 PD](https://www.jsps.go.jp/j-pd/){:target="_blank"}
  {%- endif -%}
{%- endcapture %}
{%- capture address -%}
  {%- if page.lang == "en" -%}
    Faculty of Science, Shinshu University,
    3-1-1 Asahi, Matsumoto, Nagano, 390-8621, Japan
  {%- elsif page.lang == "ja" -%}
    〒390-8621 長野県松本市旭3-1-1 信州大学理学部
  {%- endif -%}
{%- endcapture -%}

## Shun Wakatsuki
- {{ jsps_link }}
- **email**: swaka[AT]shinshu-u.ac.jp
- **address**: {{ address }}

## Research field
- Rational homotopy theory
- String topology, Brane topology
