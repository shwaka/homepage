import { Locale, locales } from "@data/locale"
import { TalkObject, TalkInfo } from "@data/talks"
import dayjs, { Dayjs } from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import React from "react"
import { ExtLink } from "../util"
import "dayjs/locale/ja"
import "dayjs/locale/en"

export function getTalkInfo(talk: TalkObject, locale: Locale): TalkInfo {
  const localeList: Locale[] = [locale].concat(locales) // 現在の locale を優先的に表示する
  for (const l of localeList) {
    const talkInfo: TalkInfo | undefined = talk[l]
    if (talkInfo !== undefined) {
      return talkInfo
    }
  }
  throw new Error("Invalid data!")
}

export function formatDate(date: Dayjs, locale: Locale): string {
  dayjs.extend(localizedFormat)
  return date.locale(locale).format("LL")
}

export function ConferenceLink({talkInfo}: {talkInfo: TalkInfo}): JSX.Element {
  if (talkInfo.url !== undefined) {
    return <ExtLink href={talkInfo.url} text={talkInfo.conference}/>
  } else {
    return <span>{talkInfo.conference}</span>
  }
}
