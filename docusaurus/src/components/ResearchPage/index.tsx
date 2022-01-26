import { articles } from "@data/articles"
import { talks } from "@data/talks"
import React from "react"
import { getArticleLi } from "./articles"
import { getTalkLi } from "./talks"

export function ResearchPage(): JSX.Element {
  return (
    <>
      <h2>Articles</h2>
      <ul>
        {articles.map(getArticleLi)}
      </ul>
      <h2>Talks</h2>
      <ul>
        {talks.map(getTalkLi)}
      </ul>
    </>
  )
}
