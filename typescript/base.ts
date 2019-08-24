enum Lang {
  ja = "ja",
  en = "en"
}

abstract class Work<Key extends string> {
  abstract getOutputElements(outputLang: Lang): {[T in Key]: HTMLElement};

  constructor() {};

  toLi(outputLang: Lang, headerList: [Key, string][]): HTMLLIElement {
    const li = document.createElement("li");
    const outputElements = this.getOutputElements(outputLang);
    headerList.forEach((keyHeader, index, array) => {
      const key = keyHeader[0];
      li.appendChild(outputElements[key]);
      if (index < array.length - 1) {
        li.appendChild(document.createTextNode(`, `));
      }
    });
    return li;
  }

  toTr(outputLang: Lang, headerList: [Key, string][]): HTMLTableRowElement {
    const tr = document.createElement("tr");
    const outputElements = this.getOutputElements(outputLang);
    headerList.forEach((keyHeader) => {
      const key = keyHeader[0];
      const td = document.createElement("td");
      td.appendChild(outputElements[key]);
      tr.appendChild(td);
    });
    return tr;
  }
}

class WorkList<Key extends string, W extends Work<Key>> {
  data: W[];
  output: HTMLElement;

  constructor(data: W[], output: HTMLElement) {
    this.data = data;
    this.output = output;
  }

  getData(reverse: boolean = false,
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

  showList(outputLang: Lang,
           headerList: [Key, string][],
           reverse: boolean = false,
           filter?: (work: W) => boolean,
           listType: "ul"|"ol" = "ol"): void {
    this.output.innerHTML = ""; // clear the content of the HTML element
    const list = document.createElement(listType);
    if (reverse && listType == "ol") {
      const ol = list as HTMLOListElement; // もうちょっとマシな書き方？
      ol.reversed = true;
    }
    this.output.appendChild(list);
    this.getData(reverse, filter).forEach(work => {
      list.appendChild(work.toLi(outputLang, headerList));
    })
  }

  getTableHeader(headerList: [Key, string][]): HTMLTableRowElement {
    const tr = document.createElement("tr");
    headerList.forEach((keyHeader) => {
      const header: string = keyHeader[1];
      const th = document.createElement("th");
      th.appendChild(document.createTextNode(header));
      tr.appendChild(th);
    })
    return tr;
  }

  showTable(outputLang: Lang,
            headerList: [Key, string][],
            reverse: boolean = false,
            filter?: (work: W) => boolean): void {
    this.output.innerHTML = ""; // clear the content of the HTML element
    const table = document.createElement("table");
    this.output.appendChild(table);
    table.appendChild(this.getTableHeader(headerList));
    this.getData(reverse, filter).forEach(work => {
      table.appendChild(work.toTr(outputLang, headerList));
    })
  }
}
