import dayjs, { Dayjs } from "dayjs"
import { Locale } from "./locale"

const email = "swaka[AT]shinshu-u.ac.jp"

export interface Markdown {
  markdown: "markdown"
  text: string
}

export function md(markdownText: string): Markdown {
  return {
    markdown: "markdown",
    text: markdownText,
  }
}

export type CurrentPosition = {
  email: string,
  name: Markdown,
  url: string,
  address: string,
}

export type Award = {
  date: Dayjs,
  title: { [K in Locale]: string }
}

export type CV = {
  currentPosition: { [K in Locale]: CurrentPosition },
  awards: Award[],
}

export const cv: CV = {
  currentPosition: {
    en: {
      email: email,
      name: md("[Research Fellow of Japan Society for the Promotion of Science](https://www.jsps.go.jp/english/e-pd/index.html)"),
      url: "https://www.jsps.go.jp/english/e-pd/index.html",
      address: "Faculty of Science, Shinshu University, 3-1-1 Asahi, Matsumoto, Nagano, 390-8621, Japan",
    },
    ja: {
      email: email,
      name: md("てすと [日本学術振興会 特別研究員 PD](https://www.jsps.go.jp/j-pd/) ほげ"),
      url: "https://www.jsps.go.jp/j-pd/",
      address: "〒390-8621 長野県松本市旭3-1-1 信州大学理学部"
    }
  },
  awards: [
    {
      date: dayjs("2020-03-23"),
      title: {
        en: "Dean's Award (Doctor Course), Graduate School of Mathematical Sciences, the University of Tokyo",
        ja: "東京大学大学院数理科学研究科 博士課程 研究科長賞",
      }
    }
  ]
}
