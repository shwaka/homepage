import React from "react"
import { ArticleObject, articles } from "@data/articles"

function getLi(article: ArticleObject, index: number): JSX.Element {
  return (
    <li key={index}>
      {`${article.title}, ${article.type}`}
    </li>
  )
}

export function ResearchPage(): JSX.Element {
  return (
    <ul>
      {articles.map(getLi)}
    </ul>
  )
}
