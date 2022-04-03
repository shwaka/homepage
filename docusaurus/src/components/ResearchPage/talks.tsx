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
import { translate } from "@docusaurus/Translate"

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

function formatDate(date: Dayjs, locale: Locale): string {
  dayjs.extend(localizedFormat)
  return date.locale(locale).format("LL")
}


interface TalkLiProps {
  talk: TalkObject
  locale: Locale
}
function TalkLi({talk, locale}: TalkLiProps): JSX.Element {
  const talkInfo: TalkInfo = getTalkInfo(talk, locale)
  const date: string = formatDate(talk.base.date, locale)
  const comma = ", " // 空白を残すために文字列に含めた
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

interface TalkTrProps {
  talk: TalkObject
  locale: Locale
}
function TalkTr({talk, locale}: TalkTrProps): JSX.Element {
  const talkInfo = getTalkInfo(talk, locale)
  const date: string = formatDate(talk.base.date, locale)
  return (
    <tr>
      <td>{talkInfo.title}</td>
      <td>{talkInfo.conference}</td>
      <td>{talkInfo.venue}</td>
      <td>{date}</td>
    </tr>
  )
}

interface TalkTableProps {
  talks: TalkObject[]
  locale: Locale
}
export function TalkTable({talks, locale}: TalkTableProps): JSX.Element {
  const titleHeader = translate({
    message: "Title",
    description: "The header for the talk title in the talk table",
    id: "research.talk.table.header.title"
  })
  const conferenceNameHeader = translate({
    message: "Conference",
    description: "The header for the conference name in the talk table",
    id: "research.talk.table.header.conferenceName"
  })
  const venueHeader = translate({
    message: "Venue",
    description: "The header for the venue in the talk table",
    id: "research.talk.table.header.venue"
  })
  const dateHeader = translate({
    message: "Date",
    description: "The header for the date in the talk table",
    id: "research.talk.table.header.date"
  })
  return (
    <table>
      <thead>
        <tr>
          <th>{titleHeader}</th>
          <th>{conferenceNameHeader}</th>
          <th>{venueHeader}</th>
          <th>{dateHeader}</th>
        </tr>
      </thead>
      <tbody>
        {talks.map(talk =>
          <TalkTr
            talk={talk} locale={locale}
            key={talk.base.date.toString()}/>
        )}
      </tbody>
    </table>
  )
}
