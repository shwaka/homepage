import { ArticleObject, articles } from "@data/articles"
import { TalkObject, talks } from "@data/talks"
import { translate } from "@docusaurus/Translate"
import React from "react"
import { ArticleItemize, ArticleOl, ArticleTable, ArticleUl } from "./articles"
import { TalkItemize, TalkOl, TalkTable, TalkUl } from "./talks"
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
    case "tex": return <ArticleItemize articles={articles}/>
  }
}

interface TalkListProps {
  listFormat: ListFormat
  reversed: boolean
  talks: TalkObject[]
}
function TalkList({listFormat, reversed, talks}: TalkListProps): JSX.Element {
  switch (listFormat) {
    case "ol": return <TalkOl talks={talks} reversed={reversed}/>
    case "ul": return <TalkUl talks={talks}/>
    case "table": return <TalkTable talks={talks}/>
    case "tex": return <TalkItemize talks={talks}/>
  }
}

function sortArticleObjects(articles: ArticleObject[], sortOrder: SortOrder): ArticleObject[] {
  switch (sortOrder) {
    case "newToOld": return articles.slice().reverse()
    case "oldToNew": return articles.slice()
  }
}

function sortTalkObjects(articles: TalkObject[], sortOrder: SortOrder): TalkObject[] {
  switch (sortOrder) {
    case "newToOld": return articles.slice().reverse()
    case "oldToNew": return articles.slice()
  }
}

export function ResearchPage(): JSX.Element {
  const [listFormat, listFormatSelector] = useSelector(ListFormat, "ul", listFormatToString)
  const [sortOrder, sortOrderSelector] = useSelector(SortOrder, "newToOld", sortOrderToString)
  const sortedArticles = sortArticleObjects(articles, sortOrder)
  const sortedTalks = sortTalkObjects(talks, sortOrder)
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
  const talkEnglishHeader = translate({
    message: "Talks in English",
    description: "The header for the list of talks in English",
    id: "research.talk.header.english"
  })
  const talkJapaneseHeader = translate({
    message: "Talks in Japanese",
    description: "The header for the list of talks in Japanese",
    id: "research.talk.header.japanese"
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
      <h3>{talkEnglishHeader}</h3>
      <TalkList
        listFormat={listFormat} reversed={reversed}
        talks={sortedTalks.filter(talk => talk.base.lang === "en")}/>
      <h3>{talkJapaneseHeader}</h3>
      <TalkList
        listFormat={listFormat} reversed={reversed}
        talks={sortedTalks.filter(talk => talk.base.lang === "ja")}/>
    </>
  )
}
