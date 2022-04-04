import { Locale } from "@data/locale"
import dayjs, { Dayjs } from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import React from "react"
import "dayjs/locale/ja"
import "dayjs/locale/en"

export interface ExtLinkProps {
  href: string
  text: string
}
export function ExtLink({href, text}: ExtLinkProps): JSX.Element {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {text}
    </a>
  )
}

export function formatDate(date: Dayjs, locale: Locale): string {
  dayjs.extend(localizedFormat)
  return date.locale(locale).format("LL")
}
