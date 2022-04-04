import { useLocale } from "@data/locale"
import { TalkObject, TalkInfo } from "@data/talks"
import React from "react"
import { ConferenceLink, formatDate, getTalkInfo } from "./talkUtil"

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
