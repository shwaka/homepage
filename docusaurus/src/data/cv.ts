import dayjs, { Dayjs } from "dayjs"
import { Locale } from "./locale"
import { md, Markdown } from "./util"

const email = "shun.wakatsuki[AT]math.nagoya-u.ac.jp"

export type CurrentPosition = {
  email: string
  name: Markdown
  url: string
  address: string
}

export type Award = {
  date: Dayjs
  title: { [K in Locale]: string }
}

export type Fellowship = {
  from: Dayjs
  to: Dayjs | string
  title: { [K in Locale]: Markdown}
}

export type CV = {
  currentPosition: { [K in Locale]: CurrentPosition }
  awards: Award[]
  fellowships: Fellowship[]
}

export const cv: CV = {
  currentPosition: {
    en: {
      email: email,
      name: md("Designated Assistant Professor at [Graduate School of Mathematics, Nagoya University](https://www.math.nagoya-u.ac.jp/en/index.html)"),
      url: "https://www.math.nagoya-u.ac.jp/en/index.html",
      address: "A-349, Graduate School of Science, Nagoya University, Furo-cho, Chikusa-ku, Nagoya, 464-8601, Japan",
    },
    ja: {
      email: email,
      name: md("[名古屋大学大学院 多元数理科学研究科](https://www.math.nagoya-u.ac.jp/) 特任助教"),
      url: "https://www.math.nagoya-u.ac.jp/",
      address: "〒464-8602 愛知県名古屋市千種区不老町 名古屋大学 理学部A館349号室"
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
  ],
  fellowships: [
    {
      from: dayjs("2014-10-01"),
      to: dayjs("2019-09-13"),
      "title": {
        en: md("FMSP course student, [Leading Graduate Course for Frontiers of Mathematical Sciences and Physics](http://fmsp.ms.u-tokyo.ac.jp/index_e.html)"),
        ja: md("[FMSP](http://fmsp.ms.u-tokyo.ac.jp/index.html) コース生")
      }
    },
    {
      from: dayjs("2016-04-01"),
      to: dayjs("2019-03-31"),
      "title": {
        en: md("JSPS Research Fellow (DC1), [Japan Society for the Promotion of Science](https://www.jsps.go.jp/english/index.html)"),
        ja: md("[日本学術振興会](https://www.jsps.go.jp/index.html) 特別研究員 (DC1)")
      }
    },
    {
      from: dayjs("2019-10-02"),
      to: dayjs("2020-01-10"),
      "title": {
        en: md("JSPS Overseas Challenge Program for Young Researchers, [Japan Society for the Promotion of Science](https://www.jsps.go.jp/english/index.html), guest researcher at Stockholm University"),
        ja: md("[日本学術振興会](https://www.jsps.go.jp/index.html) 若手研究者海外挑戦プログラムにて，Stockholm 大学に滞在")
      }
    },
    {
      from: dayjs("2020-01-16"),
      to: dayjs("2020-03-31"),
      "title": {
        en: md("Project researcher at [Graduate School of Mathematical Sciences, The University of Tokyo](https://www.ms.u-tokyo.ac.jp/index.html)"),
        ja: md("[東京大学大学院 数理科学研究科](http://www.ms.u-tokyo.ac.jp/index-j.html) 特任研究員")
      }
    },
    {
      from: dayjs("2020-04-01"),
      to: dayjs("2022-10-15"),
      "title": {
        en: md("[Research Fellow of Japan Society for the Promotion of Science](https://www.jsps.go.jp/english/e-pd/index.html)"),
        ja: md("[日本学術振興会 特別研究員 PD](https://www.jsps.go.jp/j-pd/)")
      }
    },
    {
      from: dayjs("2022-10-16"),
      to: "now",
      "title": {
        en: md("Designated Assistant Professor at [Graduate School of Mathematics, Nagoya University](https://www.math.nagoya-u.ac.jp/en/index.html)"),
        ja: md("[名古屋大学大学院 多元数理科学研究科](https://www.math.nagoya-u.ac.jp/) 特任助教"),
      }
    },
  ]
}
