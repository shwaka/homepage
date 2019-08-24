/// <reference path="base.ts"/>

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

type TalkKey = "title" | "conference" | "venue" | "date";

class Talk extends Work<TalkKey> implements TalkObject {
  base: TalkBaseInfo;
  ja?: TalkInfo;
  en?: TalkInfo;

  constructor(talkObj: TalkObject) {
    super();
    (<any>Object).assign(this, talkObj);
  }

  private getInfo(outputLang: Lang): TalkInfo {
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

  private getDateString(outputLang: Lang): string {
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

  public getOutputElements(outputLang: Lang): {[T in TalkKey]: HTMLElement} {
    const talkInfo = this.getInfo(outputLang);
    // title
    const title = document.createElement("span");
    title.innerText = talkInfo.title;
    // conference
    let conference: HTMLElement;
    if (talkInfo.url) {
      conference = makeAnchor(talkInfo.conference, talkInfo.url);
    } else {
      conference = document.createElement("span");
      conference.innerText = talkInfo.conference;
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
}

class TalkList extends WorkList<TalkKey, Talk> {
  constructor(talkObjArray: TalkObject[]) {
    const data: Talk[] = [];
    talkObjArray.forEach(talkObj => {
      // map 的な何かでどうにかならない？
      data.push(new Talk(talkObj));
    })
    super(data);
  }

  static getHeaderList(outputLang: Lang): [TalkKey, string][] {
    if (outputLang == Lang.en) {
      return [["title", "talk title"],
              ["conference", "conference name"],
              ["venue", "venue"],
              ["date", "date"]] as [TalkKey, string][];
    } else if (outputLang == Lang.ja) {
      return [["title", "講演タイトル"],
              ["conference", "研究集会名"],
              ["venue", "会場"],
              ["date", "日付"]] as [TalkKey, string][];
    } else {
      throw Error("invalid lang");
    }
  }
  // static create(json: string): TalkList {
  //   const talkObjArray: TalkObject[] = JSON.parse(json);
  //   const talkList = new TalkList(talkObjArray);
  //   return talkList;
  // }
}

class TalkListHandler {
  private output: HTMLElement;
  private talkList: TalkList;

  constructor(talkObjArray: TalkObject[], output: HTMLElement) {
    this.output = output;
    this.talkList = new TalkList(talkObjArray);
  }

  private getHeadingEnglish(outputLang: Lang): HTMLHeadingElement {
    const h3 = document.createElement("h3");
    if (outputLang == Lang.en) {
      h3.innerText = "talks in English";
    } else if (outputLang == Lang.ja) {
      h3.innerText = "国際研究集会";
    }
    return h3;
  }

  private getHeadingJapanese(outputLang: Lang): HTMLHeadingElement {
    const h3 = document.createElement("h3");
    if (outputLang == Lang.en) {
      h3.innerText = "talks in Japanese";
    } else if (outputLang == Lang.ja) {
      h3.innerText = "国内研究集会";
    }
    return h3;
  }

  public show(outputFormat: OutputFormat,
              outputLang: Lang,
              reverse: boolean = false): void {
    const headerList = TalkList.getHeaderList(outputLang);
    this.output.innerHTML = ""; // clear the content of the HTML element
    this.output.appendChild(this.getHeadingEnglish(outputLang));
    this.output.appendChild(this.talkList.toHTMLElement(
      outputFormat, outputLang, headerList, reverse, isEnglishTalk));
    this.output.appendChild(this.getHeadingJapanese(outputLang));
    this.output.appendChild(this.talkList.toHTMLElement(
      outputFormat, outputLang, headerList, reverse, isJapaneseTalk));
  }
}

function isEnglishTalk(talk: Talk): boolean {
  return (talk.base.lang == Lang.en);
}

function isJapaneseTalk(talk: Talk): boolean {
  return (talk.base.lang == Lang.ja);
}
