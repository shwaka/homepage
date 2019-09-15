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

function main(lang: Lang) {
  const dom = new JSDOM();
  const window = dom.window;
  const document = window.document;

  const body = document.body;
  const data = get_data();

  // articles
  const articleDiv = document.createElement("div");
  body.appendChild(articleDiv);
  const articleListHandler = new ArticleListHandler(window, data.articles, articleDiv);
  articleListHandler.show(OutputFormat.ol, lang, true);

  // talks
  const talkDiv = document.createElement("div");
  body.appendChild(talkDiv);
  const talkListHandler = new TalkListHandler(window, data.talks, talkDiv);
  talkListHandler.show(OutputFormat.ol, lang, true, true);

  // const pre = document.createElement("pre");
  // const talks = data.talks;
  // const s = JSON.stringify(talks, null, 2);
  // pre.appendChild(document.createTextNode(s));
  // body.appendChild(pre);

  console.log(body.innerHTML);
}

main(Lang.ja);
