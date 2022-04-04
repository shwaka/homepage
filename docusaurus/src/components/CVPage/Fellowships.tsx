import { cv, Fellowship } from "@data/cv"
import { useLocale } from "@data/locale"
import { translate } from "@docusaurus/Translate"
import React from "react"
import { HtmlFromMarkdown } from "../HtmlFromMarkdown"
import { formatDate } from "../util"

export function Fellowships(): JSX.Element {
  const locale = useLocale()
  const nowString = translate({
    message: "now",
    description: "The text for the 'to' property of the current position",
    id: "cv.fellowship.now",
  })
  return (
    <ul>
      {cv.fellowships.map((fellowship: Fellowship) => {
        const from: string = formatDate(fellowship.from, locale)
        const to: string = (typeof fellowship.to === "string")
          ? nowString
          : formatDate(fellowship.to, locale)
        return (<li key={fellowship.title.ja.text}>
          {`${from}--${to}: `}
          <HtmlFromMarkdown markdown={fellowship.title[locale]}/>
        </li>)
      })}
    </ul>
  )
}
