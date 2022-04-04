import { Locale, locales } from "@data/locale"
import { TalkObject, TalkInfo } from "@data/talks"
import Link from "@docusaurus/Link"
import React from "react"

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

export function ConferenceLink({talkInfo}: {talkInfo: TalkInfo}): JSX.Element {
  if (talkInfo.url !== undefined) {
    return <Link to={talkInfo.url}>{talkInfo.conference}</Link>
  } else {
    return <span>{talkInfo.conference}</span>
  }
}
