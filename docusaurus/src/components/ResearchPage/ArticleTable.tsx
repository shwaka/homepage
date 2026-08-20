import React, { type ReactElement } from "react"

import { type ArticleObject, Wakatsuki, type Author } from "@data/articles"
import { type Locale, useLocale } from "@data/locale"
import Link from "@docusaurus/Link"
import { translate } from "@docusaurus/Translate"

import styles from "./styles.module.scss"

interface JournalProps {
  article: ArticleObject
}

function Journal({ article }: JournalProps): ReactElement {
  switch (article.type) {
    case "preprint":
      return (<span>-</span>)
    case "toappear":
      return (
        <span>
          {"to appear in "}
          <Link to={article.journal.url}>
            {article.journal.abbrevName}
          </Link>
        </span>
      )
    case "published":
      return (<Link to={article.articleUrl}>{article.journal.abbrevName}</Link>)
    case "proceedings":
      return (<Link to={article.articleUrl}>{article.journal.abbrevName}</Link>)
  }
}

function formatAuthorName(author: Author, locale: Locale): string {
  switch (locale) {
    case "en":
      return author.shortName
    case "ja":
      return author.jaName
        ? author.jaName.family
        : author.shortName
  }
}

function getCoauthorString(article: ArticleObject, locale: Locale): string {
  return article
    .authors
    .filter((author) => author !== Wakatsuki)
    .map((author) => formatAuthorName(author, locale))
    .join(", ")
}

interface ArticleTrProps {
  article: ArticleObject
  showArxiv: boolean
}

function ArticleTr({ article, showArxiv }: ArticleTrProps): JSX.Element {
  const locale: Locale = useLocale()
  const coauthor = getCoauthorString(article, locale)
  // const journal = ("journal" in article)
  //   ? <Link to={article.journalUrl}>{article.journal}</Link>
  //   : ""
  const arxiv = ("arxiv" in article)
    ? <Link to={`https://arxiv.org/abs/${article.arxiv}`}>{article.arxiv}</Link>
    : "-"
  return (
    <tr>
      <td>{coauthor}</td>
      <td>{article.title}</td>
      <td><Journal article={article} /></td>
      {showArxiv ? <td>{arxiv}</td> : null}
    </tr>
  )
}

interface ArticleTableProps {
  articles: ArticleObject[]
  showArxiv: boolean
}
export function ArticleTable({ articles, showArxiv }: ArticleTableProps): JSX.Element {
  const coauthorHeader = translate({
    message: "Coauthor",
    description: "The header for the name of coauthors in the article table",
    id: "research.article.table.header.coauthor",
  })
  const titleHeader = translate({
    message: "Title",
    description: "The header for the article title in the article table",
    id: "research.article.table.header.title",
  })
  const journalHeader = translate({
    message: "Journal",
    description: "The header for the journal in the article table",
    id: "research.article.table.header.journal",
  })
  return (
    <table className={styles.article}>
      <thead>
        <tr>
          <th>{coauthorHeader}</th>
          <th>{titleHeader}</th>
          <th>{journalHeader}</th>
          {showArxiv ? <th>arXiv</th> : null}
        </tr>
      </thead>
      <tbody>
        {articles.map((article) =>
          <ArticleTr article={article} key={article.title} showArxiv={showArxiv} />
        )}
      </tbody>
    </table>
  )
}
