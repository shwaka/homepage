import { articles } from "@data/articles"
import React from "react"
import { getLi } from "./utils"

export function ResearchPage(): JSX.Element {
  return (
    <ul>
      {articles.map(getLi)}
    </ul>
  )
}
