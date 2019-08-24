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
    const headerList = [["title", "talk title"],
                        ["conference", "conference name"],
                        ["venue", "venue"],
                        ["date", "date of the talk"]] as [TalkKey, string][];
    super(headerList);
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

  getOutputElements(outputLang: Lang): {[T in TalkKey]: HTMLElement} {
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
}

class TalkList extends WorkList<TalkKey, Talk> {
  constructor(talkObjArray: TalkObject[], output: HTMLElement) {
    const data: Talk[] = [];
    talkObjArray.forEach(talkObj => {
      // map 的な何かでどうにかならない？
      data.push(new Talk(talkObj));
    })
    super(data, output);
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
    talkListGlobal = TalkList.create(json, "talk");
    talkListGlobal.showList(Lang.ja, true);
    // talkList.showTable(Lang.ja);
  }
  httpObj.send(null);
}

type ConfigForm = {order: RadioNodeList, language: RadioNodeList, format: RadioNodeList}
function isConfigForm(arg: any): arg is ConfigForm {
  // チェックが緩すぎる
  return ("order" in arg) && ("language" in arg) && ("format" in arg);
}

function updateTalks(): void {
  const configForm = document.getElementById("config-form");
  if (!isConfigForm(configForm)) {
    throw Error("no config-form found");
  }
  // order
  const radioOrder = configForm.order;
  const order: string = radioOrder.value;
  let reverse: boolean;
  if (order == "new-old") {
    reverse = true;
  } else if (order == "old-new") {
    reverse = false;
  } else {
    throw Error("invalid order specification");
  }
  // language
  const radioLanguage = configForm.language;
  const language: string = radioLanguage.value;
  let outputLang: Lang;
  if (language == "en") {
    outputLang = Lang.en;
  } else if (language == "ja") {
    outputLang = Lang.ja;
  } else {
    throw Error("invalid language");
  }
  // format
  const radioFormat = configForm.format;
  const format: string = radioFormat.value;
  // update
  if (format == "list") {
    talkListGlobal.showList(outputLang, reverse);
  } else if (format == "table") {
    talkListGlobal.showTable(outputLang, reverse);
  }
}

var talkListGlobal: TalkList;
