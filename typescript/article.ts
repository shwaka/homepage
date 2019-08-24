/// <reference path="base.ts"/>

enum ArticleType {
  preprint,
  toappear,
  proceedings
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
  static headerList = [["title", "タイトル"],
                       ["journal", "雑誌"],
                       ["year", "出版年"],
                       ["arxiv", "arXiv"]] as [ArticleKey, string][];
  constructor(articleObjArray: ArticleObject[]) {
    const data: Article[] = [];
    articleObjArray.forEach(articleObj => {
      // map 的な何かでどうにかならない？
      data.push(new Article(articleObj));
    })
    super(data);
  }

  static create(json: string): ArticleList {
    const articleObjArray: ArticleObject[] = JSON.parse(json);
    const articleList = new ArticleList(articleObjArray);
    return articleList;
  }
}

class ArticleListHandler {
  output: HTMLElement;
  articleList: ArticleList;

  constructor(json: string, output: HTMLElement) {
    this.output = output;
    this.articleList = ArticleList.create(json);
  }

  showList(outputLang: Lang,
           headerList: [ArticleKey, string][],
           reverse: boolean = false): void {
    this.output.innerHTML = ""; // clear the content of the HTML element
    this.output.appendChild(this.articleList.toList(outputLang, headerList, reverse));
  }
}
