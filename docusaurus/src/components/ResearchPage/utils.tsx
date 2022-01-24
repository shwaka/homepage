import { ArticleObject, ArticlePreprintObject, ArticlePublishedObject, ArticleToappearObject } from "@data/articles"
import { Markdown, md } from "@data/cv"
import React from "react"
import { HtmlFromMarkdown } from "../HtmlFromMarkdown"

function getArxivUrl(arxivId: string): string {
  return `https://arxiv.org/abs/${arxivId}`
}

function getArxivLink(article: ArticlePreprintObject | ArticleToappearObject | ArticlePublishedObject): string {
  const arxivUrl = getArxivUrl(article.arxiv)
  return `[${article.arxiv}](${arxivUrl})`
}

function getJournalLink(article: ArticleToappearObject | ArticlePublishedObject): string {
  switch (article.type) {
    case "toappear":
      throw new Error("Not implemented")
    case "published":
      return `[${article.journal}, ${article.journalPage}](${article.journalUrl})`
  }
}

function getMarkdown(article: ArticleObject): Markdown {
  switch (article.type) {
    case "preprint": {
      return md(`${article.title}, ${getArxivLink(article)}`)
    }
    case "toappear":
      throw new Error("Not implemented")
    case "published": {
      return md(`${article.title}, ${getJournalLink(article)}, ${getArxivLink(article)}`)
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
