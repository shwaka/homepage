import {hasProperty, Lang, OutputFormat} from "./base"
import {TalkObject, isTalkObjectArray, TalkListHandler} from "./talk"
import {ArticleObject, isArticleObjectArray, ArticleListHandler} from "./article"
// <reference path="talk.ts"/>
// <reference path="article.ts"/>

main();

function main(): void {
  if (!isWindowWithGlobalVariables(window)) {
    throw Error("window does not have required properties")
  }
  document.addEventListener("DOMContentLoaded", function(){
    // scope の関係で上の type guard が効いてない？
    loadFromJson((window as Window & WindowWithGlobalVariables).researchJsonFile);
  });
  window.updateTalks = updateTalks;
}

interface WindowWithGlobalVariables {
  researchJsonFile: string;
  updateTalks: any;             // function type としてちゃんと実装
}

function isWindowWithGlobalVariables(win: Window): win is WindowWithGlobalVariables & Window {
  // ちゃんと実装しよう
  return true;
}


var talkListHandler: TalkListHandler;
var articleListHandler: ArticleListHandler;

interface ValidJson {
  talks: TalkObject[];
  articles: ArticleObject[];
}

function isValidJson(arg: unknown): arg is ValidJson {
  return (typeof arg == "object") && (arg != null) &&
    hasProperty(arg, "talks") && isTalkObjectArray(arg.talks) &&
    hasProperty(arg, "articles") && isArticleObjectArray(arg.articles);
}

function loadFromJson(file: string): void {
  const httpObj = new XMLHttpRequest();
  httpObj.open("get", file, true);
  httpObj.onload = function() {
    const json = this.responseText;
    const jsonObj = JSON.parse(json);
    if (!isValidJson(jsonObj)) {
      throw Error("invalid JSON");
    }
    const talkDiv = document.getElementById("talk")!; // まずい
    talkListHandler = new TalkListHandler(jsonObj.talks, talkDiv);
    // talkListGlobal = TalkList.create(json, "talk");
    // talkListGlobal.showList(Lang.ja, true);
    // talkList.showTable(Lang.ja);
    const articleDiv = document.getElementById("article")!; // まずい
    articleListHandler = new ArticleListHandler(jsonObj.articles, articleDiv);
    setupForm();
    updateTalks();
  }
  httpObj.send(null);
}

type ConfigForm = {order: RadioNodeList,
                   language: RadioNodeList,
                   format: RadioNodeList,
                   split: RadioNodeList}
function isConfigForm(arg: unknown): arg is ConfigForm {
  // チェックが緩すぎる
  return (typeof arg == "object") && (arg != null) &&
    ("order" in arg) && ("language" in arg) && ("format" in arg) && ("split" in arg);
}

function getForm(): ConfigForm {
  const configForm = document.getElementById("config-form");
  if (!isConfigForm(configForm)) {
    throw Error("no config-form found");
  }
  return configForm;
}

function setupForm(): void {
  ["format-table", "order-new-old", "language-japanese", "split-true"].forEach((id) => {
    const radioButton = document.querySelector<HTMLInputElement>(`#${id}`)!; // やばい
    radioButton.checked = true;
  })
}

function updateTalks(): void {
  const configForm: ConfigForm = getForm();
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
  let outputFormat: OutputFormat;
  if (format == "ol") {
    outputFormat = OutputFormat.ol;
  } else if (format == "ul") {
    outputFormat = OutputFormat.ul;
  } else if (format == "table") {
    outputFormat = OutputFormat.table;
  } else if (format == "itemize") {
    outputFormat = OutputFormat.itemize;
  } else {
    throw Error("Invalid output format");
  }
  // split
  const radioSplit = configForm.split;
  const split: boolean = (radioSplit.value == "true");
  // update
  talkListHandler.show(outputFormat, outputLang, reverse, split);
  articleListHandler.show(outputFormat, outputLang, reverse);
}
