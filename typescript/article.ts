/// <reference path="base.ts"/>

enum ArticleType {
  preprint = "preprint",
  toappear = "toappear",
  proceedings = "proceedings"
}

interface ArticlePreprintObject {
  type: ArticleType.preprint;
  title: string;
  arxiv: string;
  year: number;
}

interface ArticleToappearObject {
  type: ArticleType.toappear;
  title: string;
  arxiv: string;
  year: number;
  journal: string;
  "journal-url": string;
}

interface ArticleProceedingsObject {
  type: ArticleType.proceedings;
  title: string;
  year: string;
  journal: string;
  "journal-url": string;
}

type ArticleObject = ArticlePreprintObject | ArticleToappearObject | ArticleProceedingsObject;

type ArticleKey = "title" | "journal" | "year" | "arxiv"

class Article extends Work<ArticleKey>{
  data: ArticleObject;

  constructor(articleObj: ArticleObject) {
    super();
    this.data = articleObj;
  }

  getOutputElements(outputLang: Lang): {[T in ArticleKey]: HTMLElement} {
    // title
    const title = document.createElement("span");
    title.innerText = this.data.title;
    // journal
    const journal = document.createElement("span");
    if (this.data.type == ArticleType.toappear) {
      journal.appendChild(document.createTextNode("to appear in "));
      journal.appendChild(makeAnchor(this.data.journal, this.data["journal-url"]));
    } else if (this.data.type == ArticleType.proceedings) {
      journal.appendChild(makeAnchor(this.data.journal, this.data["journal-url"]));
    }
    // year
    const year = document.createElement("span");
    if (this.data.type == ArticleType.proceedings) {
      year.innerText = String(this.data.year);
    }
    // arxiv
    const arxiv = document.createElement("span");
    if (this.data.type == ArticleType.preprint || this.data.type == ArticleType.toappear) {
      const url = `https://arxiv.org/abs/${this.data.arxiv}`;
      arxiv.appendChild(makeAnchor(this.data.arxiv, url));
    }
    // output
    const outputElements = {
      title: title,
      journal: journal,
      year: year,
      arxiv: arxiv
    }
    return outputElements;
  }
}

class ArticleList extends WorkList<ArticleKey, Article> {
  constructor(articleObjArray: ArticleObject[]) {
    const data: Article[] = [];
    articleObjArray.forEach(articleObj => {
      // map 的な何かでどうにかならない？
      data.push(new Article(articleObj));
    })
    super(data);
  }

  static getHeaderListNormal(outputLang: Lang): [ArticleKey, string][] {
    if (outputLang == Lang.en) {
      return [["title", "title"],
              ["journal", "journal"],
              // ["year", "year"],
              ["arxiv", "arXiv"]] as [ArticleKey, string][];
    } else if (outputLang == Lang.ja) {
      return [["title", "タイトル"],
              ["journal", "雑誌"],
              // ["year", "出版年"],
              ["arxiv", "arXiv"]] as [ArticleKey, string][];
    } else {
      throw Error("invalid lang");
    }
  }

  static getHeaderListNonRefereed(outputLang: Lang): [ArticleKey, string][] {
    if (outputLang == Lang.en) {
      return [["title", "title"],
              ["journal", "journal"],
              ["year", "year"]] as [ArticleKey, string][];
    } else if (outputLang == Lang.ja) {
      return [["title", "タイトル"],
              ["journal", "雑誌"],
              ["year", "出版年"]] as [ArticleKey, string][];
    } else {
      throw Error("invalid lang");
    }
  }

  // static create(json: string): ArticleList {
  //   const articleObjArray: ArticleObject[] = JSON.parse(json);
  //   const articleList = new ArticleList(articleObjArray);
  //   return articleList;
  // }
}

class ArticleListHandler {
  output: HTMLElement;
  articleList: ArticleList;

  constructor(articleObjArray: ArticleObject[], output: HTMLElement) {
    this.output = output;
    this.articleList = new ArticleList(articleObjArray);
  }

  getHeadingNormal(outputLang: Lang): HTMLHeadingElement {
    const h3 = document.createElement("h3");
    if (outputLang == Lang.en) {
      h3.innerText = "Papers and preprints";
    } else if (outputLang == Lang.ja) {
      h3.innerText = "論文・プレプリント";
    }
    return h3;
  }

  getHeadingNonRefereed(outputLang: Lang): HTMLHeadingElement {
    const h3 = document.createElement("h3");
    if (outputLang == Lang.en) {
      h3.innerText = "Non refereed articles";
    } else if (outputLang == Lang.ja) {
      h3.innerText = "その他";
    }
    return h3;
  }

  showList(outputLang: Lang,
           reverse: boolean = false): void {
    this.output.innerHTML = ""; // clear the content of the HTML element
    const headerListNormal = ArticleList.getHeaderListNormal(outputLang);
    this.output.appendChild(this.getHeadingNormal(outputLang));
    this.output.appendChild(this.articleList.toList(
      outputLang, headerListNormal, reverse, isNormalArticle));
    const headerListNonRefereed = ArticleList.getHeaderListNonRefereed(outputLang);
    this.output.appendChild(this.getHeadingNonRefereed(outputLang));
    this.output.appendChild(this.articleList.toList(
      outputLang, headerListNonRefereed, reverse, isNonRefereedArticle));
  }

  showTable(outputLang: Lang,
            reverse: boolean = false): void {
    this.output.innerHTML = ""; // clear the content of the HTML element
    const headerListNormal = ArticleList.getHeaderListNormal(outputLang);
    this.output.appendChild(this.getHeadingNormal(outputLang));
    this.output.appendChild(this.articleList.toTable(
      outputLang, headerListNormal, reverse, isNormalArticle));
    const headerListNonRefereed = ArticleList.getHeaderListNonRefereed(outputLang);
    this.output.appendChild(this.getHeadingNonRefereed(outputLang));
    this.output.appendChild(this.articleList.toTable(
      outputLang, headerListNonRefereed, reverse, isNonRefereedArticle));
  }
}

function isNormalArticle(article: Article): boolean {
  return article.data.type == ArticleType.preprint || article.data.type == ArticleType.toappear;
}

function isNonRefereedArticle(article: Article): boolean {
  return article.data.type == ArticleType.proceedings;
}
