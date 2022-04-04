import { Locale } from "@data/locale"
import dayjs, { Dayjs } from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
// import React from "react"
import "dayjs/locale/ja"
import "dayjs/locale/en"

export function formatDate(date: Dayjs, locale: Locale): string {
  dayjs.extend(localizedFormat)
  return date.locale(locale).format("LL")
}

export function formatMonth(date: Dayjs, locale: Locale): string {
  switch (locale) {
    case "en": return date.format("MMM. YYYY")
    case "ja": return date.format("YYYY年MM月")
  }
}
