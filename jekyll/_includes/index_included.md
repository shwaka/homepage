{% comment %}
-*- engine: liquid -*-
{% endcomment %}

{% assign current_position = site.data.cv.current_position[page.lang] %}

## Shun Wakatsuki
- [{{ current_position.name }}]({{ current_position.url }})
- **email**: {{ current_position.email }}
- **address**: {{ current_position.address }}

## Research field
- Rational homotopy theory
- String topology, Brane topology
