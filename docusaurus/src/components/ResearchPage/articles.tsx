import { ArticleObject, ArticlePreprintObject, ArticleProceedingsObject, ArticlePublishedObject, ArticleToappearObject } from "@data/articles"
import { Markdown, md } from "@data/util"
import { translate } from "@docusaurus/Translate"
import React from "react"
import { HtmlFromMarkdown } from "../HtmlFromMarkdown"
import { ExtLink } from "../util"
import styles from "./styles.module.scss"

function getArxivUrl(arxivId: string): string {
  return `https://arxiv.org/abs/${arxivId}`
}

interface ArticleLiProps {
  article: ArticleObject
}
function ArticleLi({article}: ArticleLiProps): JSX.Element {
  const comma = ", " // 空白を残すために文字列に含めた
  switch (article.type) {
    case "preprint": return (
      <li>
        {`${article.title}`} {comma}
        <ExtLink href={getArxivUrl(article.arxiv)} text={article.arxiv}/> {comma}
        {article.yearPreprint}
      </li>
    )
    case "toappear": return (
      <li>
        {`${article.title}`} {comma}
        to appear in
        <ExtLink href={article.journalUrl} text={article.journal}/> {comma}
        <ExtLink href={getArxivUrl(article.arxiv)} text={article.arxiv}/>
      </li>
    )
    case "published": return (
      <li>
        {`${article.title}`} {comma}
        <ExtLink
          href={article.articleUrl}
          text={`${article.journal}, ${article.journalPage}`}/> {comma}
        {`${article.yearPublished} (arXiv: `}
        <ExtLink href={getArxivUrl(article.arxiv)} text={article.arxiv}/>
        {")"}
      </li>
    )
    case "proceedings": return (
      <li>
        {`${article.title}`} {comma}
        <ExtLink
          href={article.journalUrl}
          text={`${article.journal}, ${article.journalPage}`}/> {comma}
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

interface ArticleTrProps {
  article: ArticleObject
  showArxiv: boolean
}
function ArticleTr({article, showArxiv}: ArticleTrProps): JSX.Element {
  const journal = ("journal" in article)
    ? <ExtLink href={article.journalUrl} text={article.journal}/>
    : ""
  const arxiv = ("arxiv" in article)
    ? <ExtLink href={`https://arxiv.org/abs/${article.arxiv}`} text={article.arxiv}/>
    : "-"
  return (
    <tr>
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

function getItem(article: ArticleObject): string {
  let latexCode = `  \\item ${article.title}`
  // journal
  if (article.type == "toappear") {
    latexCode += `, to appear in ${article.journal}`
  } else if (article.type == "published") {
    latexCode += `, ${article.journal}, ${article.journalPage}`
  } else if (article.type == "proceedings") {
    latexCode += `, ${article.journal}`
  }
  // arxiv
  if (article.type == "toappear") {
    latexCode += `, also available at arXiv:${article.arxiv}`
  } else if (article.type == "preprint") {
    latexCode += `, arXiv:${article.arxiv}`
  }
  // year
  if (article.type === "preprint" || article.type === "toappear") {
    latexCode += `, ${article.yearPreprint}`
  } else if (article.type === "published"){
    latexCode += `, ${article.yearPublished}`
  } else {
    latexCode += `, ${article.year}`
  }
  return latexCode
}

interface ArticleItemizeProps {
  articles: ArticleObject[]
}
export function ArticleItemize({articles}: ArticleItemizeProps): JSX.Element {
  const items = articles.map(getItem)
  return (
    <pre>
      {"\\begin{itemize}\n" + items.join("\n") + "\n\\end{itemize}"}
    </pre>
  )
}
