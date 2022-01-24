import { ArticleObject } from "@data/articles"
import { Markdown, md } from "@data/cv"
import React from "react"
import { HtmlFromMarkdown } from "../HtmlFromMarkdown"

function getArxivUrl(arxivId: string): string {
  return `https://arxiv.org/abs/${arxivId}`
}

function getMarkdown(article: ArticleObject): Markdown {
  switch (article.type) {
    case "preprint": {
      const arxivUrl = getArxivUrl(article.arxiv)
      return md(`${article.title}, [${article.arxiv}](${arxivUrl})`)
    }
    case "toappear":
      throw new Error("Not implemented")
    case "published": {
      const arxivUrl = getArxivUrl(article.arxiv)
      return md(`${article.title}, [${article.journal}, ${article.journalPage}](${article.journalUrl}), [${article.arxiv}](${arxivUrl})`)
    }
    case "proceedings":
      throw new Error("Not implemented")
  }
}

export function getLi(article: ArticleObject, index: number): JSX.Element {
  return (
    <li key={index}>
      <HtmlFromMarkdown markdown={getMarkdown(article)}/>
    </li>
  )
}
