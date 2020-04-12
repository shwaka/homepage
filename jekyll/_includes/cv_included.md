{% comment %}
-*- engine: liquid -*-
{% endcomment %}

{% if page.lang == "en" %}
  {% assign fellowships_section = "Fellowships" %}
  {% assign awards_section = "Awards" %}
  {% assign date_format = "%b. %Y" %}
{% elsif page.lang == "ja" %}
  {% assign fellowships_section = "職歴" %}
  {% assign awards_section = "受賞歴" %}
  {% assign date_format = "%Y年%-m月" %}
{% endif %}


## {{ fellowships_section }}
{% for fellowship in site.data.cv.fellowships %}
  - {{ fellowship.from | date: date_format -}}
  --
  {%- if fellowship.to == "now" -%}
    {%- if page.lang == "en" -%}
      Now
    {%- elsif page.lang == "ja" -%}
      現在
    {%- endif -%}
  {%- else -%}
    {{- fellowship.to | date: date_format -}}
  {%- endif -%}:
  {{ fellowship.title[page.lang] -}}
{% endfor %}

## {{ awards_section }}
<ul>
  {% for award in site.data.cv.awards %}
    <li>
      {{ award.date | date: date_format -}}:
      {{ award.title[page.lang] }}
    </li>
  {% endfor %}
</ul>
