import { type Locale } from "@data/locale"
import { type Temporal } from "@js-temporal/polyfill"

export function formatDate(
  date: Temporal.PlainDate,
  locale: Locale,
): string {
  return date.toLocaleString(locale, {
    calendar: date.calendarId,
    dateStyle: "long",
  })
}

export function formatMonth(
  date: Temporal.PlainYearMonth | Temporal.PlainDate,
  locale: Locale,
): string {
  switch (locale) {
    case "en": {
      const month = date.toLocaleString(locale, {
        calendar: date.calendarId,
        month: "short",
      })
      return `${month} ${date.year}`
    }
    case "ja":
      return `${date.year}年${date.month}月`
  }
}
