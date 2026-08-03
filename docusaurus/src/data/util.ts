import { Temporal } from "@js-temporal/polyfill"

export interface Markdown {
  markdown: "markdown"
  text: string
}

export function md(markdownText: string): Markdown {
  return {
    markdown: "markdown",
    text: markdownText,
  }
}

export function parseDate(dateString: string): Temporal.PlainDate {
  return Temporal.PlainDate.from(dateString)
}
