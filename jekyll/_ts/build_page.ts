import {JSDOM} from "jsdom";

function hoge() {
  const htmlText = `<!DOCTYPE html>
<html>
<body>
hoge
<div id="hoge">foo</div>
</body>
</html>`;
  const dom = new JSDOM(htmlText);
  const document = dom.window.document;

  const div = document.getElementById("hoge") as HTMLElement;
  const span = document.createElement("span");
  span.appendChild(document.createTextNode("spannnnn"));
  div.appendChild(span);

  console.log(dom.serialize());
}

hoge();
