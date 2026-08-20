import React from "react"

import { type ArticleObject } from "@data/articles"

function getItem(article: ArticleObject): string {
  let latexCode = `  \\item ${article.title}`
  // journal
  if (article.type == "toappear") {
    latexCode += `, to appear in ${article.journal.abbrevName}`
  } else if (article.type == "published") {
    latexCode += `, ${article.journal.abbrevName}, ${article.journalPage}`
  } else if (article.type == "proceedings") {
    latexCode += `, ${article.journal.abbrevName}`
  }
  // arxiv
  if (article.type == "toappear") {
    latexCode += `, also available at arXiv:${article.arxiv}`
  } else if (article.type == "preprint") {
    latexCode += `, arXiv:${article.arxiv}`
  }
  // year
  if (article.type === "preprint" || article.type === "toappear") {
    latexCode += `, ${article.yearPreprint}`
  } else if (article.type === "published") {
    latexCode += `, ${article.yearPublished}`
  } else {
    latexCode += `, ${article.year}`
  }
  return latexCode
}

interface ArticleItemizeProps {
  articles: ArticleObject[]
}
export function ArticleItemize({ articles }: ArticleItemizeProps): JSX.Element {
  const items = articles.map(getItem)
  return (
    <pre>
      {"\\begin{itemize}\n" + items.join("\n") + "\n\\end{itemize}"}
    </pre>
  )
}
