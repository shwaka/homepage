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

  getData(reverse: boolean = false): W[] {
    if (reverse) {
      return this.data.slice().reverse();
    }
    return this.data;
  }

  showList(outputLang: Lang, headerList: [Key, string][], reverse: boolean = false, listType: "ul"|"ol" = "ol"): void {
    this.output.innerHTML = ""; // clear the content of the HTML element
    const list = document.createElement(listType);
    if (reverse && listType == "ol") {
      const ol = list as HTMLOListElement; // もうちょっとマシな書き方？
      ol.reversed = true;
    }
    this.output.appendChild(list);
    this.getData(reverse).forEach(work => {
      list.appendChild(work.toLi(outputLang, headerList));
    })
  }

  showTable(outputLang: Lang, headerList: [Key, string][], reverse: boolean = false): void {
    this.output.innerHTML = ""; // clear the content of the HTML element
    const table = document.createElement("table");
    this.output.appendChild(table);
    this.getData(reverse).forEach(work => {
      table.appendChild(work.toTr(outputLang, headerList));
    })
  }
}
