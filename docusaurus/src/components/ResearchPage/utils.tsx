import { ArticleObject } from "@data/articles"
import React from "react"

function getArxivUrl(arxivId: string): string {
  return `https://arxiv.org/abs/${arxivId}`
}

export function getLi(article: ArticleObject, index: number): JSX.Element {
  switch (article.type) {
    case "preprint":
      return (
        <li key={index}>
          {article.title},&ensp;
          <a href={getArxivUrl(article.arxiv)} target="_blank" rel="noreferrer">
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
          <a href={article.journalUrl}>
            {article.journal},&ensp;{article.journalPage}
          </a>,&ensp;
          <a href={getArxivUrl(article.arxiv)} target="_blank" rel="noreferrer">
            {article.arxiv}
          </a>
        </li>
      )
    case "proceedings":
      throw new Error("Not implemented")
  }
}
