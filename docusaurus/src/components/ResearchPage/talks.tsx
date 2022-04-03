import { Locale, locales } from "@data/locale"
import { TalkObject, TalkInfo } from "@data/talks"
import { md, Markdown } from "@data/util"
import dayjs, { Dayjs } from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import "dayjs/locale/ja"
import "dayjs/locale/en"
import React from "react"
import { HtmlFromMarkdown } from "../HtmlFromMarkdown"
import { ExtLink } from "../util"

function getTalkInfo(talk: TalkObject, locale: Locale): TalkInfo {
  const localeList: Locale[] = [locale].concat(locales) // 現在の locale を優先的に表示する
  for (const l of localeList) {
    const talkInfo: TalkInfo | undefined = talk[l]
    if (talkInfo !== undefined) {
      return talkInfo
    }
  }
  throw new Error("Invalid data!")
}

function getConferenceLink(talkInfo: TalkInfo): string {
  if (talkInfo.url !== undefined) {
    return `[${talkInfo.conference}](${talkInfo.url})`
  } else {
    return talkInfo.conference
  }
}

function formatDate(date: Dayjs, locale: Locale): string {
  dayjs.extend(localizedFormat)
  return date.locale(locale).format("LL")
}

function getMarkdown(talk: TalkObject, locale: Locale): Markdown {
  const talkInfo: TalkInfo = getTalkInfo(talk, locale)
  const date: string = formatDate(talk.base.date, locale)
  return md(`${talkInfo.title}, ${getConferenceLink(talkInfo)}, ${talkInfo.venue}, ${date}`)
}

interface TalkLiProps {
  talk: TalkObject
  locale: Locale
}
function TalkLi({talk, locale}: TalkLiProps): JSX.Element {
  const talkInfo: TalkInfo = getTalkInfo(talk, locale)
  const date: string = formatDate(talk.base.date, locale)
  const comma = ", " // 空白を残すために文字列に含めた
  // <HtmlFromMarkdown markdown={getMarkdown(talk, locale)}/>
  return (
    <li>
      {talkInfo.title} {comma}
      {talkInfo.url !== undefined
        ? <ExtLink href={talkInfo.url} text={talkInfo.conference}/>
        : talkInfo.conference} {comma}
      {talkInfo.venue} {comma}
      {date}
    </li>
  )
}

interface TalkUlProps {
  talks: TalkObject[]
  locale: Locale
}
export function TalkUl({talks, locale}: TalkUlProps): JSX.Element {
  return (
    <ul>
      {talks.map((talk, index) => <TalkLi talk={talk} locale={locale} key={index}/>)}
    </ul>
  )
}

interface TalkOlProps {
  talks: TalkObject[]
  locale: Locale
  reversed: boolean
}
export function TalkOl({talks, locale, reversed}: TalkOlProps): JSX.Element {
  return (
    <ol reversed={reversed}>
      {talks.map((talk, index) => <TalkLi talk={talk} locale={locale} key={index}/>)}
    </ol>
  )
}
