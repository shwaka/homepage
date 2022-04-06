import { useLocale } from "@data/locale"
import React from "react"

export function Education(): JSX.Element {
  const locale = useLocale()
  switch (locale) {
    case "en": return (
      <ul>
        <li>Mar. 2010: Kaisei Senior High School, Tokyo, Japan</li>
        <li>Mar. 2014: B.S. in Mathematics, the University of Tokyo</li>
        <li>Mar. 2016: M.S. in Mathematical Sciences, the University of Tokyo</li>
        <li>Sep. 2019: Ph.D. in Mathematical Sciences, the University of Tokyo</li>
      </ul>
    )
    case "ja": return (
      <ul>
        <li>2010年3月 開成高等学校卒</li>
        <li>2014年3月 東京大学理学部数学科卒</li>
        <li>2016年3月 東京大学大学院数理科学研究科 修士課程修了</li>
        <li>
          2019年9月 東京大学大学院数理科学研究科 博士課程修了
          <ul>
            <li>博士(数理科学) 2019年9月13日 授与</li>
          </ul>
        </li>
      </ul>
    )
  }
}
