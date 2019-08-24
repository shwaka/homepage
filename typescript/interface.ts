/// <reference path="talk.ts"/>
/// <reference path="article.ts"/>

var talkListHandler: TalkListHandler;
var articleListHandler: ArticleListHandler;

function loadFromJson(file: string): void {
  const httpObj = new XMLHttpRequest();
  httpObj.open("get", file, true);
  httpObj.onload = function() {
    const json = this.responseText;
    const jsonObj = JSON.parse(json);
    const talkDiv = document.getElementById("talk") as HTMLElement; // まずい
    talkListHandler = new TalkListHandler(jsonObj.talks, talkDiv);
    // talkListGlobal = TalkList.create(json, "talk");
    // talkListGlobal.showList(Lang.ja, true);
    // talkList.showTable(Lang.ja);
    const articleDiv = document.getElementById("article") as HTMLElement; // まずい
    articleListHandler = new ArticleListHandler(jsonObj.articles, articleDiv);
    setupForm();
    updateTalks();
  }
  httpObj.send(null);
}

type ConfigForm = {order: RadioNodeList, language: RadioNodeList, format: RadioNodeList}
function isConfigForm(arg: any): arg is ConfigForm {
  // チェックが緩すぎる
  return ("order" in arg) && ("language" in arg) && ("format" in arg);
}

function getForm(): ConfigForm {
  const configForm = document.getElementById("config-form");
  if (!isConfigForm(configForm)) {
    throw Error("no config-form found");
  }
  return configForm;
}

function setupForm(): void {
  ["format-table", "order-new-old", "language-japanese"].forEach((id) => {
    const radioButton = document.getElementById(id) as any; // やばい
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
  // update
  talkListHandler.show(outputFormat, outputLang, reverse);
  articleListHandler.show(outputFormat, outputLang, reverse);

}
