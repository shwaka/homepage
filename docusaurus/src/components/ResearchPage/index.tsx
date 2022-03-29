import { ArticleObject, articles } from "@data/articles"
import { Locale, useLocale } from "@data/locale"
import { talks } from "@data/talks"
import React from "react"
import { ArticleOl, ArticleUl } from "./articles"
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

interface ArticleListProps {
  listFormat: ListFormat
  articles: ArticleObject[]
}
function ArticleList({listFormat, articles}: ArticleListProps): JSX.Element {
  switch (listFormat) {
    case "ol": return <ArticleOl articles={articles}/>
    case "ul": return <ArticleUl articles={articles}/>
    case "table": throw new Error("Not implemented")
    case "tex": throw new Error("Not implemented")
  }
}

export function ResearchPage(): JSX.Element {
  const locale: Locale = useLocale()
  // const [currentListFormat, setListFormat] = useState<ListFormat>("ol")
  const [listFormat, listFormatSelector] = useSelector<ListFormat>(ListFormat, "ol", listFormatToString)
  return (
    <>
      {listFormatSelector}
      <h2>Articles</h2>
      <ArticleList listFormat={listFormat} articles={articles}/>
      <h2>Talks</h2>
      <ul>
        {talks.map((talk, index) => getTalkLi(talk, index, locale))}
      </ul>
    </>
  )
}
