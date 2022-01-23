import React from "react"
import { ArticleObject } from "@data/articles"

function getArxivUrl(arxivId: string): string {
  return `https://arxiv.org/abs/${arxivId}`
}

export function getLi(article: ArticleObject, index: number): JSX.Element {
  switch (article.type) {
    case "preprint":
      return (
        <li key={index}>
          {article.title},&ensp;
          <a href={getArxivUrl(article.arxiv)} target="_blank">
            {article.arxiv}
          </a>
        </li>
      )
    case "toappear":
      throw new Error("Not implemented")
    case "published":
      return (
        <li key={index}>
          {article.title},&ensp;
          <a href={article["journal-url"]}>
            {article.journal},&ensp;{article["journal-page"]}
          </a>,&ensp;
          <a href={getArxivUrl(article.arxiv)} target="_blank">
            {article.arxiv}
          </a>
        </li>
      )
    case "proceedings":
      throw new Error("Not implemented")
  }
}
