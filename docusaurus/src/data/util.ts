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
