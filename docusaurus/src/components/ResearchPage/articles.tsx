import { ArticleObject, ArticlePreprintObject, ArticleProceedingsObject, ArticlePublishedObject, ArticleToappearObject } from "@data/articles"
import { Markdown, md } from "@data/util"
import React from "react"
import { HtmlFromMarkdown } from "../HtmlFromMarkdown"

function getArxivUrl(arxivId: string): string {
  return `https://arxiv.org/abs/${arxivId}`
}

function getArxivLink(article: ArticlePreprintObject | ArticleToappearObject | ArticlePublishedObject): string {
  const arxivUrl = getArxivUrl(article.arxiv)
  return `[${article.arxiv}](${arxivUrl})`
}

function getJournalLink(article: ArticleToappearObject | ArticlePublishedObject | ArticleProceedingsObject): string {
  switch (article.type) {
    case "toappear":
      return `to appear in [${article.journal}](${article.journalUrl})`
    case "published":
      return `[${article.journal}, ${article.journalPage}](${article.articleUrl})`
    case "proceedings":
      return `[${article.journal}, ${article.journalPage}](${article.journalUrl})`
  }
}

function getMarkdown(article: ArticleObject): Markdown {
  switch (article.type) {
    case "preprint": {
      return md(`${article.title}, ${getArxivLink(article)}, ${article.yearPreprint}`)
    }
    case "toappear": {
      return md(`${article.title}, ${getJournalLink(article)}, ${getArxivLink(article)}`)
    }
    case "published": {
      return md(`${article.title}, ${getJournalLink(article)}, ${article.yearPublished} (arXiv: ${getArxivLink(article)})`)
    }
    case "proceedings":
      return md(`${article.title}, ${getJournalLink(article)}, ${article.year}`)
  }
}


interface ArticleLiProps {
  article: ArticleObject
}
function ArticleLi({article}: ArticleLiProps): JSX.Element {
  return (
    <li>
      <HtmlFromMarkdown markdown={getMarkdown(article)}/>
    </li>
  )
}

interface ArticleUlProps {
  articles: ArticleObject[]
}
export function ArticleUl({articles}: ArticleUlProps): JSX.Element {
  return (
    <ul>
      {articles.map((article, index) => <ArticleLi article={article} key={index}/>)}
    </ul>
  )
}

interface ArticleOlProps {
  articles: ArticleObject[]
  reversed: boolean
}
export function ArticleOl({articles, reversed}: ArticleOlProps): JSX.Element {
  return (
    <ol reversed={reversed}>
      {articles.map((article, index) => <ArticleLi article={article} key={index}/>)}
    </ol>
  )
}
