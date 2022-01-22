import React from "react"
import { micromark } from "micromark"
import { Markdown } from "@data/cv"

function removeP(html: string): string {
  return html.replace(/^<p>/, "")
             .replace(/<\/p>$/, "")
}

export function HtmlFromMarkdown(props: { markdown: Markdown }): JSX.Element {
  const html: string = removeP(micromark(props.markdown.text))
  return <span dangerouslySetInnerHTML={ { __html: html } } />
}
