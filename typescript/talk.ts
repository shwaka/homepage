enum Lang {
  ja = "ja",
  en = "en"
}

interface TalkBaseInfo {
  date: string;
  lang: string;
}

interface TalkInfo {
  title: string;
  conference: string;
  venue: string;
  url?: string;
}

interface TalkObject {
  base: TalkBaseInfo;
  ja?: TalkInfo;
  en?: TalkInfo;
}

interface TalkOutputElements {
  title: HTMLElement;
  conference: HTMLElement;
  venue: HTMLElement;
  date: HTMLElement;
}

class Talk implements TalkObject {
  base: TalkBaseInfo;
  ja?: TalkInfo;
  en?: TalkInfo;

  constructor(talkObj: TalkObject) {
    (<any>Object).assign(this, talkObj);
  }

  getInfo(outputLang: Lang): TalkInfo {
    if (this[outputLang] != null) {
      return this[outputLang] as TalkInfo; // 良くないけど…
    } else if (this.ja != null) {
      return this.ja;
    } else if (this.en != null) {
      return this.en;
    } else {
      throw new Error("ja nor en found");
    }
  }

  getDateString(outputLang: Lang): string {
    const date: Date = new Date(this.base.date);
    const year: number = date.getFullYear();
    const monthZeroIndex: number = date.getMonth(); // 0, 1,..., 11
    if (outputLang == Lang.ja) {
      return `${year}年${monthZeroIndex+1}月`;
    } else if (outputLang == Lang.en) {
      // const monthNames: Array<string> = [
      //     "January", "February", "March", "April", "May", "June",
      //     "July", "August", "September", "October", "November", "December"];
      const monthNames: string[] = [
        "Jan.", "Feb.", "Mar.", "Apr.", "May", "June",
        "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
      const monthString: string = monthNames[monthZeroIndex];
      return `${monthString} ${year}`;
    } else {
      throw new Error("This can't happen!");
    }
  }

  toStr(outputLang: Lang): string {
    const talkInfo = this.getInfo(outputLang);
    // return this.base.date + " " + this.base.lang + " " + talkInfo.venue;
    const date: string = this.getDateString(outputLang);
    const title: string = talkInfo.title;
    const conference: string = talkInfo.conference;
    const venue: string = talkInfo.venue;
    return `${title}, ${conference}, ${venue}, ${date}`;
  }

  getOutputElements(outputLang: Lang): TalkOutputElements {
    const talkInfo = this.getInfo(outputLang);
    // title
    const title = document.createElement("span");
    title.innerText = talkInfo.title;
    // conference
    let conference: HTMLElement;
    if (talkInfo.url) {
      const conferenceAnchor = document.createElement("a");
      conferenceAnchor.appendChild(document.createTextNode(talkInfo.conference));
      conferenceAnchor.target = "_blank";
      conferenceAnchor.href = talkInfo.url;
      conference = conferenceAnchor;
    } else {
      const conferenceSpan = document.createElement("span");
      conferenceSpan.innerText = talkInfo.conference;
      conference = conferenceSpan;
    }
    // venue
    const venue = document.createElement("span");
    venue.innerText = talkInfo.venue;
    // date
    const date = document.createElement("span");
    date.innerText = this.getDateString(outputLang);
    // output
    const outputElements = {
      title: title,
      conference: conference,
      venue: venue,
      date: date
    }
    return outputElements;
  }

  toLi(outputLang: Lang): HTMLLIElement {
    const li = document.createElement("li");
    const outputElements = this.getOutputElements(outputLang);
    li.appendChild(outputElements.title);
    li.appendChild(document.createTextNode(`, `));
    li.appendChild(outputElements.conference);
    li.appendChild(document.createTextNode(`, `));
    li.appendChild(outputElements.venue);
    li.appendChild(document.createTextNode(`, `));
    li.appendChild(outputElements.date);
    return li;
  }

  toTr(outputLang: Lang): HTMLTableRowElement {
    const tr = document.createElement("tr");
    const outputElements = this.getOutputElements(outputLang);
    [outputElements.title,
     outputElements.conference,
     outputElements.venue,
     outputElements.date].forEach(element => {
       const td = document.createElement("td");
       td.appendChild(element);
       tr.appendChild(td);
     })
    return tr;
  }
}

class TalkList {
  data: Talk[];
  output: HTMLElement;

  constructor(talkObjArray: TalkObject[], output: HTMLElement) {
    this.output = output;
    this.data = [];
    talkObjArray.forEach(talkObj => {
      // map 的な何かでどうにかならない？
      this.data.push(new Talk(talkObj));
    })
  }

  showUl(outputLang: Lang): void {
    this.output.innerHTML = ""; // clear the content of the HTML element
    const ul = document.createElement("ul");
    this.output.appendChild(ul);
    this.data.forEach(talk => {
      ul.appendChild(talk.toLi(outputLang));
    })
  }

  showTable(outputLang: Lang): void {
    this.output.innerHTML = ""; // clear the content of the HTML element
    const table = document.createElement("table");
    this.output.appendChild(table);
    this.data.forEach(talk => {
      table.appendChild(talk.toTr(outputLang));
    })
  }

  static create(json: string, id: string): TalkList {
    const output = document.getElementById(id) as HTMLUListElement; // さすがにマズい…
    const talkObjArray: TalkObject[] = JSON.parse(json);
    const talkList = new TalkList(talkObjArray, output);
    return talkList;
  }
}

function loadFromJson(file: string): void {
  const httpObj = new XMLHttpRequest();
  httpObj.open("get", file, true);
  httpObj.onload = function() {
    const json = this.responseText;
    const talkList = TalkList.create(json, "talk");
    talkList.showUl(Lang.ja);
    // talkList.showTable(Lang.ja);
  }
  httpObj.send(null);
}
