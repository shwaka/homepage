---
title: Curriculum Vitae
title_short: CV
lang: en
ref: cv
layout: mylayout
---

{% assign current_position = site.data.cv.current_position[page.lang] %}

{:#cv}
| Given Name:  | Shun                         |
| Family Name: | Wakatsuki                    |
| Japanese:    | 若月 駿                      |
| Email:       | {{ current_position.email }} |
| Birthplace:  | Kanagawa, Japan              |
| Nationality: | Japan                        |

{:.list-header}
### Current position:
- [{{ current_position.name }}]({{ current_position.url }}){:target="_blank"}
{:#current-position}

## Education
- Mar. 2010: Kaisei Senior High School, Tokyo, Japan
- Mar. 2014: B.S. in Mathematics, the University of Tokyo
- Mar. 2016: M.S. in Mathematical Sciences, the University of Tokyo
- Sep. 2019: Ph.D. in Mathematical Sciences, the University of Tokyo

{% include cv_included.md %}
