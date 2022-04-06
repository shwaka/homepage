import { cv } from "@data/cv"
import { useLocale } from "@data/locale"
import React from "react"
import { formatMonth } from "../util"

export function Awards(): JSX.Element {
  const locale = useLocale()
  return (
    <ul>
      {cv.awards.map(award => {
        const date: string = formatMonth(award.date, locale)
        const title: string = award.title[locale]
        return <li key={date}>{`${date}: ${title}`}</li>
      })}
    </ul>
  )
}
