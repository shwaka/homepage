import { Locale, useLocale } from "@data/locale"
import { TalkObject } from "@data/talks"
import React from "react"
import { formatDate, getTalkInfo } from "./talkUtil"


function getItem(talk: TalkObject, locale: Locale): string {
  const talkInfo = getTalkInfo(talk, locale)
  const title: string = talkInfo.title
  const conference: string = talkInfo.conference
  const venue: string = talkInfo.venue
  const date: string = formatDate(talk.base.date, locale)
  return `  \\item ${title}, ${conference}, ${venue}, ${date}`
}

interface TalkItemizeProps {
  talks: TalkObject[]
}
export function TalkItemize({talks}: TalkItemizeProps): JSX.Element {
  const locale = useLocale()
  const items = talks.map(talk => getItem(talk, locale))
  return (
    <pre>
      {"\\begin{itemize}\n" + items.join("\n") + "\n\\end{itemize}"}
    </pre>
  )
}
