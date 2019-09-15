import * as fs from 'fs';
import {JSDOM} from "jsdom";
import {Lang, OutputFormat} from "./base"
import {TalkListHandler} from "./talk";
import {ValidJson, isValidJson} from './data';

var document;

function get_data(): ValidJson {
  const site = JSON.parse(fs.readFileSync("./site.json", "utf8"));
  const data = site.site.data as unknown;
  if (isValidJson(data)) {
    return data;
  }
  throw "Invalid data";
}

function main() {
  const dom = new JSDOM();
  document = dom.window.document;

  const body = document.body;
  const data = get_data();

  // talks
  const talkDiv = document.createElement("div");
  body.appendChild(talkDiv);
  const talkListHandler = new TalkListHandler(data.talks, talkDiv);
  // talkListHandler.show(OutputFormat.ol, Lang.ja, true, true);

  // const pre = document.createElement("pre");
  // const talks = data.talks;
  // const s = JSON.stringify(talks, null, 2);
  // pre.appendChild(document.createTextNode(s));
  // body.appendChild(pre);

  console.log(body.innerHTML);
}

main();
