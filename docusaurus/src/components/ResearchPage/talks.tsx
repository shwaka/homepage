import { Locale, locales, useLocale } from "@data/locale"
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

function ConferenceLink({talkInfo}: {talkInfo: TalkInfo}): JSX.Element {
  if (talkInfo.url !== undefined) {
    return <ExtLink href={talkInfo.url} text={talkInfo.conference}/>
  } else {
    return <span>{talkInfo.conference}</span>
  }
}


interface TalkLiProps {
  talk: TalkObject
}
function TalkLi({talk}: TalkLiProps): JSX.Element {
  const locale = useLocale()
  const talkInfo: TalkInfo = getTalkInfo(talk, locale)
  const date: string = formatDate(talk.base.date, locale)
  const comma = ", " // 空白を残すために文字列に含めた
  return (
    <li>
      {talkInfo.title} {comma}
      <ConferenceLink talkInfo={talkInfo}/> {comma}
      {talkInfo.venue} {comma}
      {date}
    </li>
  )
}

interface TalkUlProps {
  talks: TalkObject[]
}
export function TalkUl({talks}: TalkUlProps): JSX.Element {
  return (
    <ul>
      {talks.map((talk, index) => <TalkLi talk={talk} key={index}/>)}
    </ul>
  )
}

interface TalkOlProps {
  talks: TalkObject[]
  reversed: boolean
}
export function TalkOl({talks, reversed}: TalkOlProps): JSX.Element {
  return (
    <ol reversed={reversed}>
      {talks.map((talk, index) => <TalkLi talk={talk} key={index}/>)}
    </ol>
  )
}

interface TalkTrProps {
  talk: TalkObject
}
function TalkTr({talk}: TalkTrProps): JSX.Element {
  const locale = useLocale()
  const talkInfo = getTalkInfo(talk, locale)
  const date: string = formatDate(talk.base.date, locale)
  return (
    <tr>
      <td>{talkInfo.title}</td>
      <td><ConferenceLink talkInfo={talkInfo}/></td>
      <td>{talkInfo.venue}</td>
      <td>{date}</td>
    </tr>
  )
}

interface TalkTableProps {
  talks: TalkObject[]
}
export function TalkTable({talks}: TalkTableProps): JSX.Element {
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
            talk={talk}
            key={talk.base.date.toString()}/>
        )}
      </tbody>
    </table>
  )
}

function getItem(talk: TalkObject, locale: Locale): string {
  const talkInfo = getTalkInfo(talk, locale)
  const title: string = talkInfo.title
  const conference: string = talkInfo.conference
  const venue: string = talkInfo.venue
  const date: string = formatDate(talk.base.date, locale)
  return `  \\item ${title}, ${conference}, ${venue}, ${date}`
}

interface TalkItemizeProps {
  talks: TalkObject[]
}
export function TalkItemize({talks}: TalkItemizeProps): JSX.Element {
  const locale = useLocale()
  const items = talks.map(talk => getItem(talk, locale))
  return (
    <pre>
      {"\\begin{itemize}\n" + items.join("\n") + "\n\\end{itemize}"}
    </pre>
  )
}
