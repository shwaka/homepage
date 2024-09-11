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

export const Wakatsuki: Author = {
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
const Asao: Author = {
  longName: "Yasuhiko Asao",
  shortName: "Y. Asao",
  jaName: "浅尾泰彦",
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
    type: "published",
    authors: [Kuribayashi, Naito, Wakatsuki, Yamaguchi],
    journal: "Algebr. Geom. Topol.",  // Algebraic and Geometric Topology
    journalUrl: "https://msp.org/agt/about/journal/about.html",
    journalPage: "24 (2024) 2619–2654",
    articleUrl: "https://msp.org/agt/2024/24-5/p07.xhtml",
    yearPublished: 2024,
  },
  {
    title: "Independence complexes of (n×4) and (n×5)-grid graphs",
    arxiv: "2203.16391",
    yearPreprint: 2022,
    type: "published",
    authors: [Matsushita, Wakatsuki],
    journal: "Topology Appl.", // Topology and its Applications
    journalUrl: "https://www.sciencedirect.com/journal/topology-and-its-applications",
    journalPage: "334, Article ID 108541, 18 p.",
    articleUrl: "https://doi.org/10.1016/j.topol.2023.108541",
    yearPublished: 2023,
  },
  {
    title: "Cartan calculi on the free loop spaces",
    arxiv: "2207.05941",
    yearPreprint: 2022,
    type: "published",
    authors: [Kuribayashi, Naito, Wakatsuki, Yamaguchi],
    journal: "J. Pure Appl. Algebra",
    journalUrl: "https://www.sciencedirect.com/journal/journal-of-pure-and-applied-algebra",
    journalPage: "228, No. 11, Article ID 107708, 39 p.",
    articleUrl: "https://www.sciencedirect.com/science/article/pii/S0022404924001051",
    yearPublished: 2023,
  },
  {
    title: "Independence complexes of (n×6)-grid graphs",
    arxiv: "2207.10363",
    yearPreprint: 2022,
    type: "published",
    authors: [Matsushita, Wakatsuki],
    journal: "Homology Homotopy Appl.", // Homology, Homotopy and Applications
    journalUrl: "https://intlpress.com/site/pub/pages/journals/items/hha/_home/_main/index.html",
    journalPage: "26, No. 1, 15-27",
    articleUrl: "https://www.intlpress.com/site/pub/pages/journals/items/hha/content/vols/0026/0001/a002/",
    yearPublished: 2024,
  },
  {
    title: "Dominance complexes, neighborhood complexes and combinatorial Alexander duals",
    arxiv: "2312.02639",
    yearPreprint: 2023,
    type: "preprint",
    authors: [Matsushita, Wakatsuki],
  },
  {
    title: "Minimal projective resolution and magnitude homology of geodetic metric spaces",
    arxiv: "2408.12147",
    yearPreprint: 2024,
    type: "preprint",
    authors: [Asao, Wakatsuki],
  },
]
