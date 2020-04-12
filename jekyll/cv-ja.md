---
magiccomment: "-*- engine: liquid -*-"
title: 履歴書
lang: ja
ref: cv
layout: mylayout
---

{:#cv}
| 名前:   | 若月 駿                   |
| Name:   | Shun Wakatsuki            |
| Email:  | swaka[AT]ms.u-tokyo.ac.jp |
| 出身地: | 神奈川県                  |
| 国籍:   | 日本                      |

{% assign current_position = site.data.cv.current_position[page.lang] %}
{:.list-header}
### Current position:
- [{{ current_position.name }}]({{ current_position.url }}){:target="_blank"}
{:#current-position}

## 学歴
- 2010年3月 開成高等学校卒
- 2014年3月 東京大学理学部数学科卒
- 2016年3月 東京大学大学院数理科学研究科 修士課程修了
- 2019年9月 東京大学大学院数理科学研究科 博士課程修了
    - 博士(数理科学) 2019年9月13日 授与

{% include cv_included.md %}
