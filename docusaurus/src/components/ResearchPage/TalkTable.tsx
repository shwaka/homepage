import { useLocale } from "@data/locale"
import { TalkObject } from "@data/talks"
import { translate } from "@docusaurus/Translate"
import "dayjs/locale/ja"
import "dayjs/locale/en"
import React from "react"
import { formatDate } from "../util"
import styles from "./styles.module.scss"
import { ConferenceLink, getTalkInfo } from "./talkUtil"

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
    <table className={styles.talk}>
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
