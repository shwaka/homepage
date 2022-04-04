import { ArticleObject, Wakatsuki } from "@data/articles"
import { translate } from "@docusaurus/Translate"
import React from "react"
import { ExtLink } from "../util"
import styles from "./styles.module.scss"


interface ArticleTrProps {
  article: ArticleObject
  showArxiv: boolean
}
function ArticleTr({article, showArxiv}: ArticleTrProps): JSX.Element {
  const coauthor = article
    .authors.filter(author => author !== Wakatsuki)
    .map(author => author.shortName)
    .join(", ")
  const journal = ("journal" in article)
    ? <ExtLink href={article.journalUrl} text={article.journal}/>
    : ""
  const arxiv = ("arxiv" in article)
    ? <ExtLink href={`https://arxiv.org/abs/${article.arxiv}`} text={article.arxiv}/>
    : "-"
  return (
    <tr>
      <td>{coauthor}</td>
      <td>{article.title}</td>
      <td>{journal}</td>
      {showArxiv ? <td>{arxiv}</td> : null}
    </tr>
  )
}

interface ArticleTableProps {
  articles: ArticleObject[]
  showArxiv: boolean
}
export function ArticleTable({articles, showArxiv}: ArticleTableProps): JSX.Element {
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
        {articles.map(article =>
          <ArticleTr article={article} key={article.title} showArxiv={showArxiv}/>
        )}
      </tbody>
    </table>
  )
}
