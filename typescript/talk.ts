/// <reference path="base.ts"/>

interface TalkBaseInfo {
  date: string;
  lang: Lang;
}

function isTalkBaseInfo(arg: unknown): arg is TalkBaseInfo {
  return  (typeof arg == "object") && (arg != null) &&
    hasProperty(arg, "date") && (typeof arg.date == "string") &&
    hasProperty(arg, "lang") && (typeof arg.lang == "string") && (arg.lang in Lang);
}

interface TalkInfo {
  title: string;
  conference: string;
  venue: string;
  url?: string;
}

function isTalkInfo(arg: unknown): arg is TalkInfo {
  return (typeof arg == "object") && (arg != null) &&
    hasProperty(arg, "title") && (typeof arg.title == "string") &&
    hasProperty(arg, "conference") && (typeof arg.conference == "string") &&
    hasProperty(arg, "venue") && (typeof arg.venue == "string") &&
    (!hasProperty(arg, "url") || (typeof arg.url == "string"));
}

interface TalkObject {
  base: TalkBaseInfo;
  ja?: TalkInfo;
  en?: TalkInfo;
}

function isTalkObject(arg: unknown): arg is TalkObject {
  return (typeof arg == "object") && (arg != null) &&
    hasProperty(arg, "base") && isTalkBaseInfo(arg.base) &&
    (!hasProperty(arg, "ja") || isTalkInfo(arg.ja)) &&
    (!hasProperty(arg, "en") || isTalkInfo(arg.en));
}

function isTalkObjectArray(arg: unknown): arg is TalkObject[] {
  return (arg instanceof Array) && arg.every(isTalkObject);
}

type TalkKey = "title" | "conference" | "venue" | "date";

class Talk extends Work<TalkKey> {
  private data: TalkObject;

  constructor(talkObj: TalkObject) {
    super();
    this.data = talkObj;
  }

  public getLang(): Lang {
    return this.data.base.lang;
  }

  private getInfo(outputLang: Lang): TalkInfo {
    if (this.data[outputLang] != null) {
      return this.data[outputLang] as TalkInfo; // 良くないけど…
    } else if (this.data.ja != null) {
      return this.data.ja;
    } else if (this.data.en != null) {
      return this.data.en;
    } else {
      throw new Error("ja nor en found");
    }
  }

  private getDateString(outputLang: Lang): string {
    const date: Date = new Date(this.data.base.date);
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

  protected getOutputElements(outputLang: Lang): {[T in TalkKey]: HTMLElement} {
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

  protected toLaTeX(outputLang: Lang, headerList: [TalkKey, string][]): string {
    const talkInfo = this.getInfo(outputLang);
    const title: string = talkInfo.title;
    const conference: string = talkInfo.conference;
    const venue: string = talkInfo.venue;
    const date: string = this.getDateString(outputLang);
    return `${title}, ${conference}, ${venue}, ${date}`;
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
      h3.innerText = "Talks in English";
    } else if (outputLang == Lang.ja) {
      h3.innerText = "国際研究集会";
    }
    return h3;
  }

  private getHeadingJapanese(outputLang: Lang): HTMLHeadingElement {
    const h3 = document.createElement("h3");
    if (outputLang == Lang.en) {
      h3.innerText = "Talks in Japanese";
    } else if (outputLang == Lang.ja) {
      h3.innerText = "国内研究集会";
    }
    return h3;
  }

  public show(outputFormat: OutputFormat,
              outputLang: Lang,
              reverse: boolean = false,
              split: boolean = true): void {
    const headerList = TalkList.getHeaderList(outputLang);
    this.output.innerHTML = ""; // clear the content of the HTML element
    if (split) {
      this.output.appendChild(this.getHeadingEnglish(outputLang));
      this.output.appendChild(this.talkList.toHTMLElement(
        outputFormat, outputLang, headerList, reverse, isEnglishTalk));
      this.output.appendChild(this.getHeadingJapanese(outputLang));
      this.output.appendChild(this.talkList.toHTMLElement(
        outputFormat, outputLang, headerList, reverse, isJapaneseTalk));
    } else {
      this.output.appendChild(this.talkList.toHTMLElement(
        outputFormat, outputLang, headerList, reverse, undefined));
    }
  }
}

function isEnglishTalk(talk: Talk): boolean {
  return (talk.getLang() == Lang.en);
}

function isJapaneseTalk(talk: Talk): boolean {
  return (talk.getLang() == Lang.ja);
}
