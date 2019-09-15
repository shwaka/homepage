import {hasProperty, hasOptionalPropertyOfType, hasPropertyOfType, Lang, Work, makeAnchor, WorkList, OutputFormat} from "./base"
// <reference path="base.ts"/>

export interface TalkBaseInfo {
  date: string;
  lang: Lang;
}

export function isTalkBaseInfo(arg: unknown): arg is TalkBaseInfo {
  return  (typeof arg == "object") && (arg != null) &&
    hasPropertyOfType(arg, "date", "string") &&
    hasPropertyOfType(arg, "lang", "string") && (arg.lang in Lang);
}

export interface TalkInfo {
  title: string;
  conference: string;
  venue: string;
  url?: string;
}

export function isTalkInfo(arg: unknown): arg is TalkInfo {
  return (typeof arg == "object") && (arg != null) &&
    hasPropertyOfType(arg, "title", "string") &&
    hasPropertyOfType(arg, "conference", "string") &&
    hasPropertyOfType(arg, "venue", "string") &&
    hasOptionalPropertyOfType(arg, "url", "string");
}

export interface TalkObject {
  base: TalkBaseInfo;
  ja?: TalkInfo;
  en?: TalkInfo;
}

export function isTalkObject(arg: unknown): arg is TalkObject {
  return (typeof arg == "object") && (arg != null) &&
    hasProperty(arg, "base") && isTalkBaseInfo(arg.base) &&
    (!hasProperty(arg, "ja") || isTalkInfo(arg.ja)) &&
    (!hasProperty(arg, "en") || isTalkInfo(arg.en));
}

export function isTalkObjectArray(arg: unknown): arg is TalkObject[] {
  return (arg instanceof Array) && arg.every(isTalkObject);
}

type TalkKey = "title" | "conference" | "venue" | "date";

class Talk extends Work<TalkKey> {
  private data: TalkObject;

  constructor(window: Window, talkObj: TalkObject) {
    super(window);
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
    const title = this.document.createElement("span");
    title.innerText = talkInfo.title;
    // conference
    let conference: HTMLElement;
    if (talkInfo.url) {
      conference = makeAnchor(this.window, talkInfo.conference, talkInfo.url);
    } else {
      conference = this.document.createElement("span");
      conference.innerText = talkInfo.conference;
    }
    // venue
    const venue = this.document.createElement("span");
    venue.innerText = talkInfo.venue;
    // date
    const date = this.document.createElement("span");
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
  constructor(window: Window, talkObjArray: TalkObject[]) {
    const data: Talk[] = talkObjArray.map(talkObj => new Talk(window, talkObj));
    super(window, data);
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

export class TalkListHandler {
  private output: HTMLElement;
  private talkList: TalkList;
  private document: Document;

  constructor(window: Window, talkObjArray: TalkObject[], output: HTMLElement) {
    this.output = output;
    this.talkList = new TalkList(window, talkObjArray);
    this.document = window.document;
  }

  private getHeadingEnglish(outputLang: Lang): HTMLHeadingElement {
    const h3 = this.document.createElement("h3");
    if (outputLang == Lang.en) {
      h3.innerText = "Talks in English";
    } else if (outputLang == Lang.ja) {
      h3.innerText = "国際研究集会";
    }
    return h3;
  }

  private getHeadingJapanese(outputLang: Lang): HTMLHeadingElement {
    const h3 = this.document.createElement("h3");
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
