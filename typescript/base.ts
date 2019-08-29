var target_blankIconUrl: string = "undefined";

function makeAnchor(text: string, url: string, target_blank: boolean = true): HTMLAnchorElement {
  const a = document.createElement("a");
  a.appendChild(document.createTextNode(text));
  a.href = url;
  if (target_blank) {
    a.target = "_blank";
    // add icon
    // https://stackoverflow.com/questions/23463072/how-do-i-use-javascript-to-insert-an-svg-use-element-into-an-svg-group
    const svgns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgns, "svg");
    svg.classList.add("target-blank-icon");
    const use = document.createElementNS(svgns, "use");
    // const use = document.createElement("use");
    const xlinkns = "http://www.w3.org/1999/xlink";
    use.setAttributeNS(xlinkns, "href", target_blankIconUrl);
    svg.appendChild(use);
    a.appendChild(svg);
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

function hasProperty<T extends {}, K extends string>(
  obj: T, prop: K): obj is (T & {[S in K]: unknown})
{
  return prop in obj;
}

function hasPropertyOfType<T extends {}, K extends string, S extends keyof Types>(
  obj: T, prop: K, valueType: S): obj is (T & {[R in K]: Types[S]})
{
  return hasProperty(obj, prop) && (typeof obj[prop] == valueType);
}

function hasOptionalPropertyOfType<T extends {}, K extends string, S extends keyof Types>(
  obj: T, prop: K, valueType: S): obj is (T & {[R in K]?: Types[S]})
{
    return !hasProperty(obj, prop) || (typeof obj[prop] == valueType);
}

enum Lang {
  ja = "ja",
  en = "en"
}

abstract class Work<Key extends string> {
  protected abstract getOutputElements(outputLang: Lang): {[T in Key]: HTMLElement | null };

  constructor() {};

  public toLi(outputLang: Lang, headerList: [Key, string][]): HTMLLIElement {
    const li = document.createElement("li");
    const outputElements = this.getOutputElements(outputLang);
    let elementAlreadyAdded = false;
    headerList.forEach((keyHeader) => {
      const key = keyHeader[0];
      const element: HTMLElement | null = outputElements[key];
      // ↑ element の型注釈を省略すると，下の if 節内で element が non-null だと推論してくれない
      if (element != null) {
        if (elementAlreadyAdded) {
          li.appendChild(document.createTextNode(`, `));
        }
        li.appendChild(element);
        elementAlreadyAdded = true;
      }
    });
    return li;
  }

  public toTr(outputLang: Lang, headerList: [Key, string][]): HTMLTableRowElement {
    const tr = document.createElement("tr");
    const outputElements = this.getOutputElements(outputLang);
    headerList.forEach((keyHeader) => {
      const key = keyHeader[0];
      const td = document.createElement("td");
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

class WorkList<Key extends string, W extends Work<Key>> {
  private data: W[];

  constructor(data: W[]) {
    this.data = data;
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
    const list: HTMLUListElement | HTMLOListElement = document.createElement(listType);
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
    const tr = document.createElement("tr");
    headerList.forEach((keyHeader) => {
      const header: string = keyHeader[1];
      const th = document.createElement("th");
      th.appendChild(document.createTextNode(header));
      tr.appendChild(th);
    });
    return tr;
  }

  private toTable(outputLang: Lang,
                  headerList: [Key, string][],
                  reverse: boolean = false,
                  filter?: (work: W) => boolean): HTMLTableElement {
    const table = document.createElement("table");
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
    const div = document.createElement("div");
    div.classList.add("highlight"); // code block の highlight を適用
    const pre = document.createElement("pre");
    div.appendChild(pre);
    pre.appendChild(document.createTextNode("\\begin{itemize}\n"))
    this.getData(reverse, filter).forEach(work => {
      const item = work.toLaTeXItem(outputLang, headerList);
      pre.appendChild(document.createTextNode(`  ${item}\n`));
    });
    pre.appendChild(document.createTextNode("\\end{itemize}\n"))
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

enum OutputFormat {
  ul = "ul",
  ol = "ol",
  table = "table",
  itemize = "itemize",
}
