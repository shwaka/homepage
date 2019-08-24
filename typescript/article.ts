/// <reference path="base.ts"/>

enum ArticleType {
  preprint = "preprint",
  toappear = "toappear",
  proceedings = "proceedings"
}

interface ArticleObject {
  title: string;
  arxiv?: string;
  year: number;
  journal?: string;
  "journal-url"?: string;
  type: ArticleType;
}

type ArticleKey = "title" | "journal" | "year" | "arxiv"

class Article extends Work<ArticleKey>{
  title: string;
  arxiv?: string;
  year: number;
  journal?: string;
  "journal-url"?: string;
  type: ArticleType;

  constructor(articleObj: ArticleObject) {
    super();
    (<any>Object).assign(this, articleObj);
  }

  getOutputElements(outputLang: Lang): {[T in ArticleKey]: HTMLElement} {
    // title
    const title = document.createElement("span");
    title.innerText = this.title;
    // journal
    const journal = document.createElement("span");
    if (this.type == ArticleType.toappear) {
      journal.innerText = `to appear in ${this.journal}` // anchor にする
    } else if (this.type == ArticleType.proceedings) {
      journal.innerText = String(this.journal); // anchor
    }
    // year
    const year = document.createElement("span");
    if (this.type == ArticleType.proceedings) {
      year.innerText = String(this.year);
    }
    // arxiv
    const arxiv = document.createElement("span");
    if (this.type == ArticleType.preprint || this.type == ArticleType.toappear) {
      arxiv.innerText = String(this.arxiv); // anchor
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
}

function isNormalArticle(article: Article): boolean {
  return article.type == ArticleType.preprint || article.type == ArticleType.toappear;
}

function isNonRefereedArticle(article: Article): boolean {
  return article.type == ArticleType.proceedings;
}
