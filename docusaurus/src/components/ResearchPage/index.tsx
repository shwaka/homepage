import { articles } from "@data/articles"
import { Locale, useLocale } from "@data/locale"
import { talks } from "@data/talks"
import React from "react"
import { getArticleLi } from "./articles"
import { getTalkLi } from "./talks"

export function ResearchPage(): JSX.Element {
  const locale: Locale = useLocale()
  return (
    <>
      <h2>Articles</h2>
      <ul>
        {articles.map(getArticleLi)}
      </ul>
      <h2>Talks</h2>
      <ul>
        {talks.map((talk, index) => getTalkLi(talk, index, locale))}
      </ul>
    </>
  )
}
