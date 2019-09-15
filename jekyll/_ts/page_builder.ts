import * as fs from 'fs';
import {JSDOM} from "jsdom";
import {Lang, OutputFormat} from "./base";
import {TalkListHandler} from "./talk";
import { ArticleListHandler } from './article';
import {ValidJson, isValidJson} from './data';

function get_data(): ValidJson {
  const site = JSON.parse(fs.readFileSync("./site.json", "utf8"));
  const data = site.site.data as unknown;
  if (isValidJson(data)) {
    return data;
  }
  throw "Invalid data";
}

export function printContent(lang: Lang) {
  const dom = new JSDOM();
  const window = dom.window;
  const document = window.document;

  const body = document.body;
  const data = get_data();

  const articleHeader = document.createElement("h2");
  const talkHeader = document.createElement("h2");
  if (lang == Lang.ja) {
    articleHeader.appendChild(document.createTextNode("Publications"));
    talkHeader.appendChild(document.createTextNode("講演一覧"));
  } else {
    articleHeader.appendChild(document.createTextNode("Publications"));
    talkHeader.appendChild(document.createTextNode("Talks"));
  }

  // articles
  body.appendChild(articleHeader);
  const articleDiv = document.createElement("div");
  body.appendChild(articleDiv);
  const articleListHandler = new ArticleListHandler(window, data.articles, articleDiv);
  articleListHandler.show(OutputFormat.ol, lang, true);

  // talks
  body.appendChild(talkHeader);
  const talkDiv = document.createElement("div");
  body.appendChild(talkDiv);
  const talkListHandler = new TalkListHandler(window, data.talks, talkDiv);
  talkListHandler.show(OutputFormat.ol, lang, true, true);

  console.log(body.innerHTML);
}
