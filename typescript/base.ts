enum Lang {
  ja = "ja",
  en = "en"
}

abstract class Work<Key extends string> {
  headerList: [Key, string][];

  abstract getOutputElements(outputLang: Lang): {[T in Key]: HTMLElement};

  constructor(headerList: [Key, string][]) {
    this.headerList = headerList;
  };

  toLi(outputLang: Lang): HTMLLIElement {
    const li = document.createElement("li");
    const outputElements = this.getOutputElements(outputLang);
    this.headerList.forEach((keyHeader, index, array) => {
      const key = keyHeader[0];
      li.appendChild(outputElements[key]);
      if (index < array.length - 1) {
        li.appendChild(document.createTextNode(`, `));
      }
    });
    return li;
  }

  toTr(outputLang: Lang): HTMLTableRowElement {
    const tr = document.createElement("tr");
    const outputElements = this.getOutputElements(outputLang);
    this.headerList.forEach((keyHeader) => {
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

  showList(outputLang: Lang, listType: "ul"|"ol" = "ol"): void {
    this.output.innerHTML = ""; // clear the content of the HTML element
    const ul = document.createElement(listType);
    this.output.appendChild(ul);
    this.data.forEach(work => {
      ul.appendChild(work.toLi(outputLang));
    })
  }

  showTable(outputLang: Lang): void {
    this.output.innerHTML = ""; // clear the content of the HTML element
    const table = document.createElement("table");
    this.output.appendChild(table);
    this.data.forEach(work => {
      table.appendChild(work.toTr(outputLang));
    })
  }
}
