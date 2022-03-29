import { ArticleObject, articles } from "@data/articles"
import { Locale, useLocale } from "@data/locale"
import { talks } from "@data/talks"
import React, { useState } from "react"
import { ArticleOl, ArticleUl } from "./articles"
import { getTalkLi } from "./talks"

const ListFormat = ["ol", "ul", "table", "tex"] as const
type ListFormat = (typeof ListFormat)[number]

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

interface ListFormatLabelProps {
  listFormat: ListFormat
  setListFormat: (listFormat: ListFormat) => void
  currentListFormat: ListFormat
}
function ListFormatLabel({listFormat, setListFormat, currentListFormat}: ListFormatLabelProps): JSX.Element {
  return (
    <label>
      <input type="radio" name="listFormat" value={listFormat}
             onChange={() => setListFormat(listFormat)}
             checked={listFormat === currentListFormat}/>
      <span>{listFormat}</span>
    </label>
  )
}

export function ResearchPage(): JSX.Element {
  const locale: Locale = useLocale()
  const [currentListFormat, setListFormat] = useState<ListFormat>("ol")
  return (
    <>
      <div>
        {ListFormat.map(listFormat => <ListFormatLabel listFormat={listFormat} setListFormat={setListFormat} currentListFormat={currentListFormat} key={listFormat}/>)}
      </div>
      <h2>Articles</h2>
      <ArticleList listFormat={currentListFormat} articles={articles}/>
      <h2>Talks</h2>
      <ul>
        {talks.map((talk, index) => getTalkLi(talk, index, locale))}
      </ul>
    </>
  )
}
