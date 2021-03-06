import {hasProperty, hasPropertyOfType, Lang, Work, makeAnchor, WorkList, OutputFormat} from "./base"
// <reference path="base.ts"/>

enum ArticleType {
  preprint = "preprint",
  toappear = "toappear",
  published = "published",
  proceedings = "proceedings",
}

interface ArticlePreprintObject {
  type: ArticleType.preprint;
  title: string;
  arxiv: string;
  "year-preprint": number;
}

function isArticlePreprintObject(arg: unknown): arg is ArticlePreprintObject {
  return (typeof arg == "object") && (arg != null) &&
    hasProperty(arg, "type") && (arg.type == ArticleType.preprint) &&
    hasPropertyOfType(arg, "title", "string") &&
    hasPropertyOfType(arg, "arxiv", "string") &&
    hasPropertyOfType(arg, "year-preprint", "number");
}

interface ArticleToappearObject {
  type: ArticleType.toappear;
  title: string;
  arxiv: string;
  "year-preprint": number;
  journal: string;
  "journal-url": string;
}

function isArticleToappearObject(arg: unknown): arg is ArticleToappearObject {
  return (typeof arg == "object") && (arg != null) &&
    hasProperty(arg, "type") && (arg.type == ArticleType.toappear) &&
    hasPropertyOfType(arg, "title", "string") &&
    hasPropertyOfType(arg, "arxiv", "string") &&
    hasPropertyOfType(arg, "year-preprint", "number") &&
    hasPropertyOfType(arg, "journal", "string") &&
    hasPropertyOfType(arg, "journal-url", "string");
}

interface ArticlePublishedObject {
  type: ArticleType.published;
  title: string;
  arxiv: string;
  "year-preprint": number;
  journal: string;
  "journal-url": string;
  "journal-page": string;
  "article-url": string;
  "year-published": number;
}

function isArticlePublishedObjet(arg: unknown): arg is ArticlePublishedObject {
  return (typeof arg == "object") && (arg != null) &&
    hasProperty(arg, "type") && (arg.type == ArticleType.published) &&
    hasPropertyOfType(arg, "title", "string") &&
    hasPropertyOfType(arg, "arxiv", "string") &&
    hasPropertyOfType(arg, "year-preprint", "number") &&
    hasPropertyOfType(arg, "journal", "string") &&
    hasPropertyOfType(arg, "journal-url", "string") &&
    hasPropertyOfType(arg, "journal-page", "string") &&
    hasPropertyOfType(arg, "article-url", "string") &&
    hasPropertyOfType(arg, "year-published", "number");
}


interface ArticleProceedingsObject {
  type: ArticleType.proceedings;
  title: string;
  year: string;
  journal: string;
  "journal-url": string;
  "journal-page": string;
}

function isArticleProceedingsObject(arg: unknown): arg is ArticleProceedingsObject {
  return (typeof arg == "object") && (arg != null) &&
    hasProperty(arg, "type") && (arg.type == ArticleType.proceedings) &&
    hasPropertyOfType(arg, "title", "string") &&
    hasPropertyOfType(arg, "year", "number") &&
    hasPropertyOfType(arg, "journal", "string") &&
    hasPropertyOfType(arg, "journal-url", "string") &&
    hasPropertyOfType(arg, "journal-page", "string");
}

export type ArticleObject = ArticlePreprintObject | ArticleToappearObject | ArticlePublishedObject | ArticleProceedingsObject;

function isArticleObject(arg: unknown): arg is ArticleObject {
  return isArticlePreprintObject(arg) || isArticleToappearObject(arg) || isArticlePublishedObjet(arg) || isArticleProceedingsObject(arg);
}

export function isArticleObjectArray(arg: unknown): arg is ArticleObject[] {
  return (arg instanceof Array) && arg.every(isArticleObject);
}

type ArticleKey = "title" | "journal" | "year" | "arxiv"

class Article extends Work<ArticleKey>{
  private data: ArticleObject;

  constructor(window: Window, articleObj: ArticleObject) {
    super(window);
    this.data = articleObj;
  }

  public getType(): ArticleType {
    return this.data.type;
  }

  protected getOutputElements(outputLang: Lang): {[T in ArticleKey]: HTMLElement | null } {
    // title
    const title = this.document.createElement("span");
    title.classList.add("article-title");
    title.appendChild(this.document.createTextNode(this.data.title));
    // journal
    let journal: HTMLElement | null = null;
    if (this.data.type == ArticleType.toappear) {
      journal = this.document.createElement("span");
      journal.appendChild(this.document.createTextNode("to appear in "));
      journal.appendChild(makeAnchor(this.window, this.data.journal,
                                     this.data["journal-url"]));
    } else if (this.data.type == ArticleType.published) {
      journal = this.document.createElement("span");
      const journal_str = `${this.data.journal}, ${this.data["journal-page"]}`
      journal.appendChild(makeAnchor(this.window, journal_str,
                                     this.data["article-url"]));
    } else if (this.data.type == ArticleType.proceedings) {
      journal = this.document.createElement("span");
      const journal_str = `${this.data.journal}, ${this.data["journal-page"]}`
      journal.appendChild(makeAnchor(this.window, journal_str, this.data["journal-url"]));
    }
    // year
    const year = this.document.createElement("span");
    if (this.data.type == ArticleType.proceedings) {
      year.appendChild(this.document.createTextNode(String(this.data.year)));
    }
    // arxiv
    const arxiv = this.document.createElement("span");
    if (this.data.type == ArticleType.preprint || this.data.type == ArticleType.toappear || this.data.type == ArticleType.published) {
      const url = `https://arxiv.org/abs/${this.data.arxiv}`;
      const a = makeAnchor(this.window, this.data.arxiv, url);
      a.classList.add("arxiv");
      arxiv.appendChild(a);
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

  protected toLaTeX(outputLang: Lang, headerList: [ArticleKey, string][]): string {
    let latexCode: string = "";
    // title
    latexCode += this.data.title;
    // journal
    if (this.data.type == ArticleType.toappear) {
      latexCode += `, to appear in ${this.data.journal}`;
    } else if (this.data.type == ArticleType.published) {
      latexCode += `, ${this.data.journal}, ${this.data["journal-page"]}, ${this.data["year-published"]}`
    } else if (this.data.type == ArticleType.proceedings) {
      latexCode += `, ${this.data.journal}`;
    }
    // arxiv
    if (this.data.type == ArticleType.toappear) {
      latexCode += `, also available at arXiv:${this.data.arxiv}`;
    } else if (this.data.type == ArticleType.preprint) {
      latexCode += `, arXiv:${this.data.arxiv}`;
    }
    return latexCode;
  }
}

class ArticleList extends WorkList<ArticleKey, Article> {
  constructor(window: Window, articleObjArray: ArticleObject[]) {
    const data: Article[] = articleObjArray.map(articleObj => new Article(window, articleObj));
    super(window, data);
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

export class ArticleListHandler {
  private output: HTMLElement;
  private articleList: ArticleList;
  private document: Document;

  constructor(window: Window, articleObjArray: ArticleObject[], output: HTMLElement) {
    this.output = output;
    this.articleList = new ArticleList(window, articleObjArray);
    this.document = window.document;
  }

  private getHeadingNormal(outputLang: Lang): HTMLHeadingElement {
    const h3 = this.document.createElement("h3");
    if (outputLang == Lang.en) {
      h3.appendChild(this.document.createTextNode("Papers and preprints"));
    } else if (outputLang == Lang.ja) {
      h3.appendChild(this.document.createTextNode("論文・プレプリント"));
    }
    return h3;
  }

  private getHeadingNonRefereed(outputLang: Lang): HTMLHeadingElement {
    const h3 = this.document.createElement("h3");
    if (outputLang == Lang.en) {
      h3.appendChild(this.document.createTextNode("Non refereed articles"));
    } else if (outputLang == Lang.ja) {
      h3.appendChild(this.document.createTextNode("その他"));
    }
    return h3;
  }

  public show(outputFormat: OutputFormat,
              outputLang: Lang,
              reverse: boolean = false): void {
    const htmlClass = "articles";
    this.output.innerHTML = ""; // clear the content of the HTML element
    const headerListNormal = ArticleList.getHeaderListNormal(outputLang);
    this.output.appendChild(this.getHeadingNormal(outputLang));
    this.output.appendChild(this.articleList.toHTMLElement(
      outputFormat, outputLang, headerListNormal, reverse, isNormalArticle, htmlClass));
    const headerListNonRefereed = ArticleList.getHeaderListNonRefereed(outputLang);
    this.output.appendChild(this.getHeadingNonRefereed(outputLang));
    this.output.appendChild(this.articleList.toHTMLElement(
      outputFormat, outputLang, headerListNonRefereed, reverse, isNonRefereedArticle, htmlClass));
  }
}

function isNormalArticle(article: Article): boolean {
  return article.getType() == ArticleType.preprint || article.getType() == ArticleType.toappear || article.getType() == ArticleType.published;
}

function isNonRefereedArticle(article: Article): boolean {
  return article.getType() == ArticleType.proceedings;
}
