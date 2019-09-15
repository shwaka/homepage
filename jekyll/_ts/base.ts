export function makeAnchor(window: Window & {target_blankIconUrl?: string}, text: string, url: string, target_blank: boolean = true): HTMLAnchorElement {
  const document = window.document;
  const a = document.createElement("a");
  a.appendChild(document.createTextNode(text));
  a.href = url;
  if (target_blank) {
    a.target = "_blank";
    // add icon
    // https://stackoverflow.com/questions/23463072/how-do-i-use-javascript-to-insert-an-svg-use-element-into-an-svg-group
    if (window.target_blankIconUrl != null) {
      const svgns = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgns, "svg");
      svg.classList.add("target-blank-icon");
      const use = document.createElementNS(svgns, "use");
      // const use = document.createElement("use");
      const xlinkns = "http://www.w3.org/1999/xlink";
      const target_blankIconUrl: string = window.target_blankIconUrl;
      use.setAttributeNS(xlinkns, "href", target_blankIconUrl);
      svg.appendChild(use);
      a.appendChild(svg);
    }
  }
  return a;
}

interface Types {
  undefined: undefined;
  object: object;
  boolean: boolean;
  number: number;
  string: string;
  symbol: symbol;
}

export function hasProperty<T extends {}, K extends string>(
  obj: T, prop: K): obj is (T & {[S in K]: unknown})
{
  return prop in obj;
}

export function hasPropertyOfType<T extends {}, K extends string, S extends keyof Types>(
  obj: T, prop: K, valueType: S): obj is (T & {[R in K]: Types[S]})
{
  return hasProperty(obj, prop) && (typeof obj[prop] == valueType);
}

export function hasOptionalPropertyOfType<T extends {}, K extends string, S extends keyof Types>(
  obj: T, prop: K, valueType: S): obj is (T & {[R in K]?: Types[S]})
{
    return !hasProperty(obj, prop) || (typeof obj[prop] == valueType);
}

export enum Lang {
  ja = "ja",
  en = "en"
}

export abstract class Work<Key extends string> {
  protected abstract getOutputElements(outputLang: Lang): {[T in Key]: HTMLElement | null };

  protected window: Window;
  protected document: Document;

  constructor(window: Window) {
    this.window = window;
    this.document = window.document;
  };

  public toLi(outputLang: Lang, headerList: [Key, string][]): HTMLLIElement {
    const li = this.document.createElement("li");
    const outputElements = this.getOutputElements(outputLang);
    let elementAlreadyAdded = false;
    headerList.forEach((keyHeader) => {
      const key = keyHeader[0];
      const element: HTMLElement | null = outputElements[key];
      // ↑ element の型注釈を省略すると，下の if 節内で element が non-null だと推論してくれない
      if (element != null) {
        if (elementAlreadyAdded) {
          li.appendChild(this.document.createTextNode(`, `));
        }
        li.appendChild(element);
        elementAlreadyAdded = true;
      }
    });
    return li;
  }

  public toTr(outputLang: Lang, headerList: [Key, string][]): HTMLTableRowElement {
    const tr = this.document.createElement("tr");
    const outputElements = this.getOutputElements(outputLang);
    headerList.forEach((keyHeader) => {
      const key = keyHeader[0];
      const td = this.document.createElement("td");
      const element: HTMLElement | null = outputElements[key]
      if (element != null) {
        td.appendChild(element);
      }
      tr.appendChild(td);
    });
    return tr;
  }

  protected abstract toLaTeX(outputLang: Lang, headerList: [Key, string][]): string;
  public toLaTeXItem(outputLang: Lang, headerList: [Key, string][]): string {
    const latexCode = this.toLaTeX(outputLang, headerList);
    return `\\item ${latexCode}`;
  }
}

export class WorkList<Key extends string, W extends Work<Key>> {
  private data: W[];
  protected window: Window;
  protected document: Document;

  constructor(window: Window, data: W[]) {
    this.data = data;
    this.window = window;
    this.document = window.document;
  }

  private getData(reverse: boolean = false,
                  filter?: (work: W) => boolean,): W[] {
    let data: W[];
    if (reverse) {
      data = this.data.slice().reverse();
    } else {
      data = this.data;
    }
    if (filter == null){
      return data
    }
    return data.filter(filter);
  }

  private toList(listType: OutputFormat.ol | OutputFormat.ul,
                 outputLang: Lang,
                 headerList: [Key, string][],
                 reverse: boolean = false,
                 filter?: (work: W) => boolean): HTMLUListElement | HTMLOListElement {
    const list: HTMLUListElement | HTMLOListElement = this.document.createElement(listType);
    if (reverse && listType == OutputFormat.ol) {
      const ol = list as HTMLOListElement; // もうちょっとマシな書き方？
      ol.reversed = true;
    }
    this.getData(reverse, filter).forEach(work => {
      list.appendChild(work.toLi(outputLang, headerList));
    });
    return list;
  }

  private getTableHeader(headerList: [Key, string][]): HTMLTableRowElement {
    const tr = this.document.createElement("tr");
    headerList.forEach((keyHeader) => {
      const header: string = keyHeader[1];
      const th = this.document.createElement("th");
      th.appendChild(this.document.createTextNode(header));
      tr.appendChild(th);
    });
    return tr;
  }

  private toTable(outputLang: Lang,
                  headerList: [Key, string][],
                  reverse: boolean = false,
                  filter?: (work: W) => boolean): HTMLTableElement {
    const table = this.document.createElement("table");
    table.appendChild(this.getTableHeader(headerList));
    this.getData(reverse, filter).forEach(work => {
      table.appendChild(work.toTr(outputLang, headerList));
    });
    return table;
  }

  private toLaTeXCodeBlock(outputLang: Lang,
                           headerList: [Key, string][],
                           reverse: boolean = false,
                           filter?: (work: W) => boolean): HTMLElement {
    const div = this.document.createElement("div");
    div.classList.add("highlight"); // code block の highlight を適用
    const pre = this.document.createElement("pre");
    div.appendChild(pre);
    pre.appendChild(this.document.createTextNode("\\begin{itemize}\n"))
    this.getData(reverse, filter).forEach(work => {
      const item = work.toLaTeXItem(outputLang, headerList);
      pre.appendChild(this.document.createTextNode(`  ${item}\n`));
    });
    pre.appendChild(this.document.createTextNode("\\end{itemize}\n"))
    return div;
  }

  public toHTMLElement(outputFormat: OutputFormat,
                       outputLang: Lang,
                       headerList: [Key, string][],
                       reverse: boolean = false,
                       filter?: (work: W) => boolean): HTMLElement {
    if (outputFormat == OutputFormat.ul || outputFormat == OutputFormat.ol ) {
      return this.toList(outputFormat, outputLang, headerList, reverse, filter);
    } else if (outputFormat == OutputFormat.table) {
      return this.toTable(outputLang, headerList, reverse, filter);
    } else if (outputFormat == OutputFormat.itemize) {
      return this.toLaTeXCodeBlock(outputLang, headerList, reverse, filter);
    } else {
      throw Error("This can't happen!");
    }
  }
}

export enum OutputFormat {
  ul = "ul",
  ol = "ol",
  table = "table",
  itemize = "itemize",
}
