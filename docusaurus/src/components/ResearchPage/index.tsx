import { ArticleObject, articles } from "@data/articles"
import { Locale, useLocale } from "@data/locale"
import { talks } from "@data/talks"
import { translate } from "@docusaurus/Translate"
import React from "react"
import { ArticleOl, ArticleTable, ArticleUl } from "./articles"
import { getTalkLi } from "./talks"
import { useSelector } from "./useSelector"

const ListFormat = ["ol", "ul", "table", "tex"] as const
type ListFormat = (typeof ListFormat)[number]
function listFormatToString(listFormat: ListFormat): string {
  switch (listFormat) {
    case "ol": return "ordered list"
    case "ul": return "unordered list"
    case "table": return "table"
    case "tex": return "TeX (itemize)"
  }
}

const SortOrder = ["newToOld", "oldToNew"] as const
type SortOrder = (typeof SortOrder)[number]
function sortOrderToString(sortOrder: SortOrder): string {
  switch (sortOrder) {
    case "newToOld": return "new→old"
    case "oldToNew": return "old→new"
  }
}

interface ArticleListProps {
  listFormat: ListFormat
  reversed: boolean
  articles: ArticleObject[]
  showArxiv: boolean
}
function ArticleList({listFormat, reversed, articles, showArxiv}: ArticleListProps): JSX.Element {
  switch (listFormat) {
    case "ol": return <ArticleOl articles={articles} reversed={reversed}/>
    case "ul": return <ArticleUl articles={articles}/>
    case "table": return <ArticleTable articles={articles} showArxiv={showArxiv}/>
    case "tex": throw new Error("Not implemented")
  }
}

function sortArticleObjects(articles: ArticleObject[], sortOrder: SortOrder): ArticleObject[] {
  switch (sortOrder) {
    case "newToOld": return articles.slice().reverse()
    case "oldToNew": return articles.slice()
  }
}

export function ResearchPage(): JSX.Element {
  const locale: Locale = useLocale()
  const [listFormat, listFormatSelector] = useSelector(ListFormat, "table", listFormatToString)
  const [sortOrder, sortOrderSelector] = useSelector(SortOrder, "newToOld", sortOrderToString)
  const sortedArticles = sortArticleObjects(articles, sortOrder)
  const articlePreprintHeader = translate({
    message: "Papers and preprints",
    description: "The header for the list of papers and preprints",
    id: "research.article.header.articlePreprint",
  })
  const proceedingsHeader = translate({
    message: "Proceedings",
    description: "The header for the list of proceedings",
    id: "research.article.header.proceedings",
  })
  const reversed = (sortOrder === "newToOld")
  return (
    <>
      {listFormatSelector}
      {sortOrderSelector}
      <h2>Articles</h2>
      <h3>{articlePreprintHeader}</h3>
      <ArticleList
        listFormat={listFormat} reversed={reversed} showArxiv={true}
        articles={sortedArticles.filter(article => article.type !== "proceedings")}/>
      <h3>{proceedingsHeader}</h3>
      <ArticleList
        listFormat={listFormat} reversed={reversed} showArxiv={false}
        articles={sortedArticles.filter(article => article.type === "proceedings")}/>
      <h2>Talks</h2>
      <ul>
        {talks.map((talk, index) => getTalkLi(talk, index, locale))}
      </ul>
    </>
  )
}
