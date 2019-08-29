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

function isArticlePreprintObject(arg: unknown): arg is ArticlePreprintObject {
  return (typeof arg == "object") && (arg != null) &&
    hasProperty(arg, "type") && (arg.type == ArticleType.preprint) &&
    hasProperty(arg, "title") && (typeof arg.title == "string") &&
    hasProperty(arg, "arxiv") && (typeof arg.arxiv == "string") &&
    hasProperty(arg, "year") && (typeof arg.year == "number");
}

interface ArticleToappearObject {
  type: ArticleType.toappear;
  title: string;
  arxiv: string;
  year: number;
  journal: string;
  "journal-url": string;
}

function isArticleToappearObject(arg: unknown): arg is ArticleToappearObject {
  return (typeof arg == "object") && (arg != null) &&
    hasProperty(arg, "type") && (arg.type == ArticleType.toappear) &&
    hasProperty(arg, "title") && (typeof arg.title == "string") &&
    hasProperty(arg, "arxiv") && (typeof arg.arxiv == "string") &&
    hasProperty(arg, "year") && (typeof arg.year == "number") &&
    hasProperty(arg, "journal") && (typeof arg.journal == "string") &&
    hasProperty(arg, "journal-url") && (typeof arg["journal-url"] == "string");
}

interface ArticleProceedingsObject {
  type: ArticleType.proceedings;
  title: string;
  year: string;
  journal: string;
  "journal-url": string;
}

function isArticleProceedingsObject(arg: unknown): arg is ArticleProceedingsObject {
  return (typeof arg == "object") && (arg != null) &&
    hasProperty(arg, "type") && (arg.type == ArticleType.proceedings) &&
    hasProperty(arg, "title") && (typeof arg.title == "string") &&
    hasProperty(arg, "year") && (typeof arg.year == "number") &&
    hasProperty(arg, "journal") && (typeof arg.journal == "string") &&
    hasProperty(arg, "journal-url") && (typeof arg["journal-url"] == "string");
}

type ArticleObject = ArticlePreprintObject | ArticleToappearObject | ArticleProceedingsObject;

function isArticleObject(arg: unknown): arg is ArticleObject {
  return isArticlePreprintObject(arg) || isArticleToappearObject(arg) || isArticleProceedingsObject(arg);
}

function isArticleObjectArray(arg: unknown): arg is ArticleObject[] {
  return (arg instanceof Array) && arg.every(isArticleObject);
}

type ArticleKey = "title" | "journal" | "year" | "arxiv"

class Article extends Work<ArticleKey>{
  private data: ArticleObject;

  constructor(articleObj: ArticleObject) {
    super();
    this.data = articleObj;
  }

  public getType(): ArticleType {
    return this.data.type;
  }

  protected getOutputElements(outputLang: Lang): {[T in ArticleKey]: HTMLElement | null } {
    // title
    const title = document.createElement("span");
    title.classList.add("article-title");
    title.innerText = this.data.title;
    // journal
    let journal: HTMLElement | null = null;
    if (this.data.type == ArticleType.toappear) {
      journal = document.createElement("span");
      journal.appendChild(document.createTextNode("to appear in "));
      journal.appendChild(makeAnchor(this.data.journal, this.data["journal-url"]));
    } else if (this.data.type == ArticleType.proceedings) {
      journal = document.createElement("span");
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
      const a = makeAnchor(this.data.arxiv, url);
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
  private output: HTMLElement;
  private articleList: ArticleList;

  constructor(articleObjArray: ArticleObject[], output: HTMLElement) {
    this.output = output;
    this.articleList = new ArticleList(articleObjArray);
  }

  private getHeadingNormal(outputLang: Lang): HTMLHeadingElement {
    const h3 = document.createElement("h3");
    if (outputLang == Lang.en) {
      h3.innerText = "Papers and preprints";
    } else if (outputLang == Lang.ja) {
      h3.innerText = "論文・プレプリント";
    }
    return h3;
  }

  private getHeadingNonRefereed(outputLang: Lang): HTMLHeadingElement {
    const h3 = document.createElement("h3");
    if (outputLang == Lang.en) {
      h3.innerText = "Non refereed articles";
    } else if (outputLang == Lang.ja) {
      h3.innerText = "その他";
    }
    return h3;
  }

  public show(outputFormat: OutputFormat,
              outputLang: Lang,
              reverse: boolean = false): void {
    this.output.innerHTML = ""; // clear the content of the HTML element
    const headerListNormal = ArticleList.getHeaderListNormal(outputLang);
    this.output.appendChild(this.getHeadingNormal(outputLang));
    this.output.appendChild(this.articleList.toHTMLElement(
      outputFormat, outputLang, headerListNormal, reverse, isNormalArticle));
    const headerListNonRefereed = ArticleList.getHeaderListNonRefereed(outputLang);
    this.output.appendChild(this.getHeadingNonRefereed(outputLang));
    this.output.appendChild(this.articleList.toHTMLElement(
      outputFormat, outputLang, headerListNonRefereed, reverse, isNonRefereedArticle));
  }
}

function isNormalArticle(article: Article): boolean {
  return article.getType() == ArticleType.preprint || article.getType() == ArticleType.toappear;
}

function isNonRefereedArticle(article: Article): boolean {
  return article.getType() == ArticleType.proceedings;
}
