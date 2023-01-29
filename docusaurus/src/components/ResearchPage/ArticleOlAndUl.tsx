import { ArticleObject, Author, Wakatsuki } from "@data/articles"
import Link from "@docusaurus/Link"
import React from "react"

function getArxivUrl(arxivId: string): string {
  return `https://arxiv.org/abs/${arxivId}`
}

function getCoauthor(authors: Author[]): string {
  const filteredAuthors = authors.filter(author => author !== Wakatsuki)
  if (filteredAuthors.length === 0) {
    return ""
  } else {
    const authorsString = filteredAuthors.map(author => author.shortName).join(", ")
    return `(with ${authorsString}) `
  }
}

interface ArticleLiProps {
  article: ArticleObject
}
function ArticleLi({article}: ArticleLiProps): JSX.Element {
  const comma = ", " // 空白を残すために文字列に含めた
  switch (article.type) {
    case "preprint": return (
      <li>
        {getCoauthor(article.authors)}
        {`${article.title}`}{comma}
        <Link to={getArxivUrl(article.arxiv)}>{article.arxiv}</Link>{comma}
        {article.yearPreprint}
      </li>
    )
    case "toappear": return (
      <li>
        {getCoauthor(article.authors)}
        {`${article.title}`}{comma}
        {"to appear in "}
        <Link to={article.journalUrl}>{article.journal}</Link>{comma}
        <Link to={getArxivUrl(article.arxiv)}>{article.arxiv}</Link>
      </li>
    )
    case "published": return (
      <li>
        {getCoauthor(article.authors)}
        {`${article.title}`}{comma}
        <Link to={article.articleUrl}>
          {`${article.journal}, ${article.journalPage}`}
        </Link>{comma}
        {`${article.yearPublished} (arXiv: `}
        <Link to={getArxivUrl(article.arxiv)}>{article.arxiv}</Link>
        {")"}
      </li>
    )
    case "proceedings": return (
      <li>
        {getCoauthor(article.authors)}
        {`${article.title}`}{comma}
        <Link to={article.journalUrl}>
          {`${article.journal}, ${article.journalPage}`}
        </Link>{comma}
      </li>
    )
  }
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
