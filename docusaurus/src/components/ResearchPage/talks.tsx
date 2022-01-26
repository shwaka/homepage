import { md, Markdown } from "@data/cv"
import { TalkObject } from "@data/talks"
import React from "react"
import { HtmlFromMarkdown } from "../HtmlFromMarkdown"

function getMarkdown(talk: TalkObject): Markdown {
  return md(`Given in ${talk.base.lang}`)
}

export function getTalkLi(talk: TalkObject, index: number): JSX.Element {
  return (
    <li key={index}>
      <HtmlFromMarkdown markdown={getMarkdown(talk)}/>
    </li>
  )
}
