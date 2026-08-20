export interface JapaneseName {
  family: string
  given: string
}

export interface Author {
  longName: string
  shortName: string
  jaName?: JapaneseName
}

export const Wakatsuki: Author = {
  longName: "Shun Wakatsuki",
  shortName: "S. Wakatsuki",
  jaName: { family: "若月", given: "駿" },
}

export const Kuribayashi: Author = {
  longName: "Katsuhiko Kuribayashi",
  shortName: "K. Kuribayashi",
  jaName: { family: "栗林", given: "勝彦" },
}

export const Naito: Author = {
  longName: "Takahito Naito",
  shortName: "T. Naito",
  jaName: { family: "内藤", given: "貴仁" },
}

export const Yamaguchi: Author = {
  longName: "Toshihiro Yamaguchi",
  shortName: "T. Yamaguchi",
  jaName: { family: "山口", given: "俊博" },
}

export const Matsushita: Author = {
  longName: "Takahiro Matsushita",
  shortName: "T. Matsushita",
  jaName: { family: "松下", given: "尚弘" },
}

export const Asao: Author = {
  longName: "Yasuhiko Asao",
  shortName: "Y. Asao",
  jaName: { family: "浅尾", given: "泰彦" },
}

export const Sekizuka: Author = {
  longName: "Kengo Sekizuka",
  shortName: "K. Sekizuka",
  jaName: { family: "関塚", given: "賢悟" },
}
