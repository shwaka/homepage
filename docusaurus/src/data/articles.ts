interface ArticlePreprintObject {
  type: "preprint";
  title: string;
  arxiv: string;
  "year-preprint": number;
}

interface ArticleToappearObject {
  type: "toappear";
  title: string;
  arxiv: string;
  "year-preprint": number;
  journal: string;
  "journal-url": string;
}

interface ArticlePublishedObject {
  type: "published";
  title: string;
  arxiv: string;
  "year-preprint": number;
  journal: string;
  "journal-url": string;
  "journal-page": string;
  "article-url": string;
  "year-published": number;
}

interface ArticleProceedingsObject {
  type: "proceedings";
  title: string;
  year: string;
  journal: string;
  "journal-url": string;
  "journal-page": string;
}

export type ArticleObject = ArticlePreprintObject | ArticleToappearObject | ArticlePublishedObject | ArticleProceedingsObject;

export const articles: ArticleObject[] = [
  {
    type: "preprint",
    title: "Description and triviality of the loop products and coproducts for rational Gorenstein spaces",
    arxiv: "1612.03563",
    "year-preprint": 2016,
  },
  {
    type: "published",
    title: "Coproducts in brane topology",
    arxiv: "1802.04973",
    journal: "Algebr. Geom. Topol.",  // Algebraic and Geometric Topology
    "journal-url": "https://msp.org/agt/about/journal/about.html",
    "year-preprint": 2018,
    "journal-page": "19(6):2961--2988",
    "article-url": "https://msp.org/agt/2019/19-6/p08.xhtml",
    "year-published": 2019,
  },
]
