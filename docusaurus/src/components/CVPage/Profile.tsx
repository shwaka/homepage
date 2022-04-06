import { cv } from "@data/cv"
import { useLocale } from "@data/locale"
import { HtmlFromMarkdown } from "@site/src/components/HtmlFromMarkdown"
import React from "react"
import styles from "./styles.module.scss"

function useProfile(): [string, string | JSX.Element][] {
  const locale = useLocale()
  switch (locale) {
    case "en": {
      return [
        ["Given Name", "Shun"],
        ["Family Name", "Wakatsuki"],
        ["Name in Japanese", "若月駿"],
        ["Email", cv.currentPosition.en.email],
        ["Birthplace", "Kanagawa, Japan"],
        ["Nationality", "Japan"],
        ["Current Position", <HtmlFromMarkdown markdown={cv.currentPosition.en.name} key="current pos"/>],
      ]
    }
    case "ja": {
      return [
        ["名前", "若月 駿"],
        ["Name", "Shun Wakatsuki"],
        ["Email", cv.currentPosition.ja.email],
        ["出身地", "神奈川県"],
        ["国籍", "日本"],
        ["所属", <HtmlFromMarkdown markdown={cv.currentPosition.ja.name} key="current pos"/>],
      ]
    }
  }
}

export function Profile(): JSX.Element {
  const profile = useProfile()
  return (
    <dl className={styles.cvdl}>
      {profile.map(([key, value]) =>
        <React.Fragment key={key}>
          <dt>{key}</dt>
          <dd>{value}</dd>
        </React.Fragment>
      )}
    </dl>
  )
}
