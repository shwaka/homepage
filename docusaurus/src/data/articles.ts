export interface Author {
  longName: string
  shortName: string
  jaName?: string
}

export interface ArticlePreprintObject {
  type: "preprint"
  title: string
  arxiv: string
  yearPreprint: number
  authors: Author[]
}

export interface ArticleToappearObject {
  type: "toappear"
  title: string
  arxiv: string
  yearPreprint: number
  journal: string
  journalUrl: string
  authors: Author[]
}

export interface ArticlePublishedObject {
  type: "published"
  title: string
  arxiv: string
  yearPreprint: number
  journal: string
  journalUrl: string
  journalPage: string
  articleUrl: string
  yearPublished: number
  authors: Author[]
}

export interface ArticleProceedingsObject {
  type: "proceedings"
  title: string
  year: number
  journal: string
  journalUrl: string
  journalPage: string
  authors: Author[]
}

export type ArticleObject = ArticlePreprintObject | ArticleToappearObject | ArticlePublishedObject | ArticleProceedingsObject

const Wakatsuki: Author = {
  longName: "Shun Wakatsuki",
  shortName: "S. Wakatsuki",
  jaName: "若月駿",
}
const Kuribayashi: Author = {
  longName: "Katsuhiko Kuribayashi",
  shortName: "K. Kuribayashi",
  jaName: "栗林勝彦"
}
const Naito: Author = {
  longName: "Takahito Naito",
  shortName: "T. Naito",
  jaName: "内藤貴仁",
}
const Yamaguchi: Author = {
  longName: "Toshihiro Yamaguchi",
  shortName: "T. Yamaguchi",
  jaName: "山口俊博",
}
const Matsushita: Author = {
  longName: "Takahiro Matsushita",
  shortName: "T. Matsushita",
  jaName: "松下尚弘",
}

export const articles: ArticleObject[] = [
  {
    type: "preprint",
    title: "Description and triviality of the loop products and coproducts for rational Gorenstein spaces",
    arxiv: "1612.03563",
    yearPreprint: 2016,
    authors: [Wakatsuki],
  },
  {
    type: "proceedings",
    title: "String topology on rational Gorenstein spaces",
    journal: "京都大学数理解析研究所講究録 No.2060 「変換群を核とする代数的位相幾何学」",
    journalPage: "9-14",
    journalUrl: "http://www.kurims.kyoto-u.ac.jp/~kyodo/kokyuroku/contents/2060.html",
    year: 2017,
    authors: [Wakatsuki],
  },
  // {
  //   type: "proceedings",
  //   title: "結晶のgrowthについて",
  //   journal: "数理科学実践研究レター",
  //   journalPage: "2018-21",
  //   journalUrl: "https://www.ms.u-tokyo.ac.jp/lmsr/2018/",
  //   year: 2018,
  //   authors: [Wakatsuki],
  // },
  {
    type: "published",
    title: "Coproducts in brane topology",
    arxiv: "1802.04973",
    journal: "Algebr. Geom. Topol.",  // Algebraic and Geometric Topology
    journalUrl: "https://msp.org/agt/about/journal/about.html",
    yearPreprint: 2018,
    journalPage: "19(6):2961--2988",
    articleUrl: "https://msp.org/agt/2019/19-6/p08.xhtml",
    yearPublished: 2019,
    authors: [Wakatsuki],
  },
  {
    type: "published",
    title: "Nontrivial example of the composition of the brane product and coproduct on Gorenstein spaces",
    arxiv: "1902.10936",
    journal: "Homology Homotopy Appl.", // Homology, Homotopy and Applications
    journalUrl: "https://intlpress.com/site/pub/pages/journals/items/hha/_home/_main/index.html",
    yearPreprint: 2019,
    journalPage: "22:333--341",
    articleUrl: "https://www.intlpress.com/site/pub/pages/journals/items/hha/content/vols/0022/0001/a019/",
    yearPublished: 2020,
    authors: [Wakatsuki],
  },
  {
    title: "New construction of the brane coproduct and vanishing of cup products on sphere spaces",
    arxiv: "1905.00644",
    yearPreprint: 2019,
    type: "preprint",
    authors: [Wakatsuki],
  },
  {
    title: "A reduction of the string bracket to the loop product",
    arxiv: "2109.10536",
    yearPreprint: 2021,
    type: "preprint",
    authors: [Kuribayashi, Naito, Wakatsuki, Yamaguchi],
  },
  {
    title: "Independence complexes of (n×4) and (n×5)-grid graphs",
    arxiv: "2203.16391",
    yearPreprint: 2022,
    type: "preprint",
    authors: [Matsushita, Wakatsuki],
  }
]
