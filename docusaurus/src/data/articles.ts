export interface ArticlePreprintObject {
  type: "preprint";
  title: string;
  arxiv: string;
  yearPreprint: number;
}

export interface ArticleToappearObject {
  type: "toappear";
  title: string;
  arxiv: string;
  yearPreprint: number;
  journal: string;
  journalUrl: string;
}

export interface ArticlePublishedObject {
  type: "published";
  title: string;
  arxiv: string;
  yearPreprint: number;
  journal: string;
  journalUrl: string;
  journalPage: string;
  articleUrl: string;
  yearPublished: number;
}

export interface ArticleProceedingsObject {
  type: "proceedings";
  title: string;
  year: string;
  journal: string;
  journalUrl: string;
  journalPage: string;
}

export type ArticleObject = ArticlePreprintObject | ArticleToappearObject | ArticlePublishedObject | ArticleProceedingsObject;

export const articles: ArticleObject[] = [
  {
    type: "preprint",
    title: "Description and triviality of the loop products and coproducts for rational Gorenstein spaces",
    arxiv: "1612.03563",
    yearPreprint: 2016,
  },
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
  },
  {
    title: "New construction of the brane coproduct and vanishing of cup products on sphere spaces",
    arxiv: "1905.00644",
    yearPreprint: 2019,
    type: "preprint",
  },
  {
    title: "A reduction of the string bracket to the loop product",
    arxiv: "2109.10536",
    yearPreprint: 2021,
    type: "preprint",
  },
]
