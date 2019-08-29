"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var target_blankIconUrl = "undefined";
function makeAnchor(text, url, target_blank) {
    if (target_blank === void 0) { target_blank = true; }
    var a = document.createElement("a");
    a.appendChild(document.createTextNode(text));
    a.href = url;
    if (target_blank) {
        a.target = "_blank";
        // add icon
        // https://stackoverflow.com/questions/23463072/how-do-i-use-javascript-to-insert-an-svg-use-element-into-an-svg-group
        var svgns = "http://www.w3.org/2000/svg";
        var svg = document.createElementNS(svgns, "svg");
        svg.classList.add("target-blank-icon");
        var use = document.createElementNS(svgns, "use");
        // const use = document.createElement("use");
        var xlinkns = "http://www.w3.org/1999/xlink";
        use.setAttributeNS(xlinkns, "href", target_blankIconUrl);
        svg.appendChild(use);
        a.appendChild(svg);
    }
    return a;
}
function hasProperty(obj, prop) {
    return prop in obj;
}
function hasPropertyOfType(obj, prop, valueType) {
    return hasProperty(obj, prop) && (typeof obj[prop] == valueType);
}
function hasOptionalPropertyOfType(obj, prop, valueType) {
    return !hasProperty(obj, prop) || (typeof obj[prop] == valueType);
}
var Lang;
(function (Lang) {
    Lang["ja"] = "ja";
    Lang["en"] = "en";
})(Lang || (Lang = {}));
var Work = /** @class */ (function () {
    function Work() {
    }
    ;
    Work.prototype.toLi = function (outputLang, headerList) {
        var li = document.createElement("li");
        var outputElements = this.getOutputElements(outputLang);
        var elementAlreadyAdded = false;
        headerList.forEach(function (keyHeader) {
            var key = keyHeader[0];
            var element = outputElements[key];
            // ↑ element の型注釈を省略すると，下の if 節内で element が non-null だと推論してくれない
            if (element != null) {
                if (elementAlreadyAdded) {
                    li.appendChild(document.createTextNode(", "));
                }
                li.appendChild(element);
                elementAlreadyAdded = true;
            }
        });
        return li;
    };
    Work.prototype.toTr = function (outputLang, headerList) {
        var tr = document.createElement("tr");
        var outputElements = this.getOutputElements(outputLang);
        headerList.forEach(function (keyHeader) {
            var key = keyHeader[0];
            var td = document.createElement("td");
            var element = outputElements[key];
            if (element != null) {
                td.appendChild(element);
            }
            tr.appendChild(td);
        });
        return tr;
    };
    Work.prototype.toLaTeXItem = function (outputLang, headerList) {
        var latexCode = this.toLaTeX(outputLang, headerList);
        return "\\item " + latexCode;
    };
    return Work;
}());
var WorkList = /** @class */ (function () {
    function WorkList(data) {
        this.data = data;
    }
    WorkList.prototype.getData = function (reverse, filter) {
        if (reverse === void 0) { reverse = false; }
        var data;
        if (reverse) {
            data = this.data.slice().reverse();
        }
        else {
            data = this.data;
        }
        if (filter == null) {
            return data;
        }
        return data.filter(filter);
    };
    WorkList.prototype.toList = function (listType, outputLang, headerList, reverse, filter) {
        if (reverse === void 0) { reverse = false; }
        var list = document.createElement(listType);
        if (reverse && listType == OutputFormat.ol) {
            var ol = list; // もうちょっとマシな書き方？
            ol.reversed = true;
        }
        this.getData(reverse, filter).forEach(function (work) {
            list.appendChild(work.toLi(outputLang, headerList));
        });
        return list;
    };
    WorkList.prototype.getTableHeader = function (headerList) {
        var tr = document.createElement("tr");
        headerList.forEach(function (keyHeader) {
            var header = keyHeader[1];
            var th = document.createElement("th");
            th.appendChild(document.createTextNode(header));
            tr.appendChild(th);
        });
        return tr;
    };
    WorkList.prototype.toTable = function (outputLang, headerList, reverse, filter) {
        if (reverse === void 0) { reverse = false; }
        var table = document.createElement("table");
        table.appendChild(this.getTableHeader(headerList));
        this.getData(reverse, filter).forEach(function (work) {
            table.appendChild(work.toTr(outputLang, headerList));
        });
        return table;
    };
    WorkList.prototype.toLaTeXCodeBlock = function (outputLang, headerList, reverse, filter) {
        if (reverse === void 0) { reverse = false; }
        var div = document.createElement("div");
        div.classList.add("highlight"); // code block の highlight を適用
        var pre = document.createElement("pre");
        div.appendChild(pre);
        pre.appendChild(document.createTextNode("\\begin{itemize}\n"));
        this.getData(reverse, filter).forEach(function (work) {
            var item = work.toLaTeXItem(outputLang, headerList);
            pre.appendChild(document.createTextNode("  " + item + "\n"));
        });
        pre.appendChild(document.createTextNode("\\end{itemize}\n"));
        return div;
    };
    WorkList.prototype.toHTMLElement = function (outputFormat, outputLang, headerList, reverse, filter) {
        if (reverse === void 0) { reverse = false; }
        if (outputFormat == OutputFormat.ul || outputFormat == OutputFormat.ol) {
            return this.toList(outputFormat, outputLang, headerList, reverse, filter);
        }
        else if (outputFormat == OutputFormat.table) {
            return this.toTable(outputLang, headerList, reverse, filter);
        }
        else if (outputFormat == OutputFormat.itemize) {
            return this.toLaTeXCodeBlock(outputLang, headerList, reverse, filter);
        }
        else {
            throw Error("This can't happen!");
        }
    };
    return WorkList;
}());
var OutputFormat;
(function (OutputFormat) {
    OutputFormat["ul"] = "ul";
    OutputFormat["ol"] = "ol";
    OutputFormat["table"] = "table";
    OutputFormat["itemize"] = "itemize";
})(OutputFormat || (OutputFormat = {}));
/// <reference path="base.ts"/>
var ArticleType;
(function (ArticleType) {
    ArticleType["preprint"] = "preprint";
    ArticleType["toappear"] = "toappear";
    ArticleType["proceedings"] = "proceedings";
})(ArticleType || (ArticleType = {}));
function isArticlePreprintObject(arg) {
    return (typeof arg == "object") && (arg != null) &&
        hasProperty(arg, "type") && (arg.type == ArticleType.preprint) &&
        hasPropertyOfType(arg, "title", "string") &&
        hasPropertyOfType(arg, "arxiv", "string") &&
        hasPropertyOfType(arg, "year", "number");
}
function isArticleToappearObject(arg) {
    return (typeof arg == "object") && (arg != null) &&
        hasProperty(arg, "type") && (arg.type == ArticleType.toappear) &&
        hasPropertyOfType(arg, "title", "string") &&
        hasPropertyOfType(arg, "arxiv", "string") &&
        hasPropertyOfType(arg, "year", "number") &&
        hasPropertyOfType(arg, "journal", "string") &&
        hasPropertyOfType(arg, "journal-url", "string");
}
function isArticleProceedingsObject(arg) {
    return (typeof arg == "object") && (arg != null) &&
        hasProperty(arg, "type") && (arg.type == ArticleType.proceedings) &&
        hasPropertyOfType(arg, "title", "string") &&
        hasPropertyOfType(arg, "year", "number") &&
        hasPropertyOfType(arg, "journal", "string") &&
        hasPropertyOfType(arg, "journal-url", "string");
}
function isArticleObject(arg) {
    return isArticlePreprintObject(arg) || isArticleToappearObject(arg) || isArticleProceedingsObject(arg);
}
function isArticleObjectArray(arg) {
    return (arg instanceof Array) && arg.every(isArticleObject);
}
var Article = /** @class */ (function (_super) {
    __extends(Article, _super);
    function Article(articleObj) {
        var _this = _super.call(this) || this;
        _this.data = articleObj;
        return _this;
    }
    Article.prototype.getType = function () {
        return this.data.type;
    };
    Article.prototype.getOutputElements = function (outputLang) {
        // title
        var title = document.createElement("span");
        title.classList.add("article-title");
        title.innerText = this.data.title;
        // journal
        var journal = null;
        if (this.data.type == ArticleType.toappear) {
            journal = document.createElement("span");
            journal.appendChild(document.createTextNode("to appear in "));
            journal.appendChild(makeAnchor(this.data.journal, this.data["journal-url"]));
        }
        else if (this.data.type == ArticleType.proceedings) {
            journal = document.createElement("span");
            journal.appendChild(makeAnchor(this.data.journal, this.data["journal-url"]));
        }
        // year
        var year = document.createElement("span");
        if (this.data.type == ArticleType.proceedings) {
            year.innerText = String(this.data.year);
        }
        // arxiv
        var arxiv = document.createElement("span");
        if (this.data.type == ArticleType.preprint || this.data.type == ArticleType.toappear) {
            var url = "https://arxiv.org/abs/" + this.data.arxiv;
            var a = makeAnchor(this.data.arxiv, url);
            a.classList.add("arxiv");
            arxiv.appendChild(a);
        }
        // output
        var outputElements = {
            title: title,
            journal: journal,
            year: year,
            arxiv: arxiv
        };
        return outputElements;
    };
    Article.prototype.toLaTeX = function (outputLang, headerList) {
        var latexCode = "";
        // title
        latexCode += this.data.title;
        // journal
        if (this.data.type == ArticleType.toappear) {
            latexCode += ", to appear in " + this.data.journal;
        }
        else if (this.data.type == ArticleType.proceedings) {
            latexCode += ", " + this.data.journal;
        }
        // arxiv
        if (this.data.type == ArticleType.toappear) {
            latexCode += ", also available at arXiv:" + this.data.arxiv;
        }
        else if (this.data.type == ArticleType.preprint) {
            latexCode += ", arXiv:" + this.data.arxiv;
        }
        return latexCode;
    };
    return Article;
}(Work));
var ArticleList = /** @class */ (function (_super) {
    __extends(ArticleList, _super);
    function ArticleList(articleObjArray) {
        var _this = this;
        var data = [];
        articleObjArray.forEach(function (articleObj) {
            // map 的な何かでどうにかならない？
            data.push(new Article(articleObj));
        });
        _this = _super.call(this, data) || this;
        return _this;
    }
    ArticleList.getHeaderListNormal = function (outputLang) {
        if (outputLang == Lang.en) {
            return [["title", "title"],
                ["journal", "journal"],
                // ["year", "year"],
                ["arxiv", "arXiv"]];
        }
        else if (outputLang == Lang.ja) {
            return [["title", "タイトル"],
                ["journal", "雑誌"],
                // ["year", "出版年"],
                ["arxiv", "arXiv"]];
        }
        else {
            throw Error("invalid lang");
        }
    };
    ArticleList.getHeaderListNonRefereed = function (outputLang) {
        if (outputLang == Lang.en) {
            return [["title", "title"],
                ["journal", "journal"],
                ["year", "year"]];
        }
        else if (outputLang == Lang.ja) {
            return [["title", "タイトル"],
                ["journal", "雑誌"],
                ["year", "出版年"]];
        }
        else {
            throw Error("invalid lang");
        }
    };
    return ArticleList;
}(WorkList));
var ArticleListHandler = /** @class */ (function () {
    function ArticleListHandler(articleObjArray, output) {
        this.output = output;
        this.articleList = new ArticleList(articleObjArray);
    }
    ArticleListHandler.prototype.getHeadingNormal = function (outputLang) {
        var h3 = document.createElement("h3");
        if (outputLang == Lang.en) {
            h3.innerText = "Papers and preprints";
        }
        else if (outputLang == Lang.ja) {
            h3.innerText = "論文・プレプリント";
        }
        return h3;
    };
    ArticleListHandler.prototype.getHeadingNonRefereed = function (outputLang) {
        var h3 = document.createElement("h3");
        if (outputLang == Lang.en) {
            h3.innerText = "Non refereed articles";
        }
        else if (outputLang == Lang.ja) {
            h3.innerText = "その他";
        }
        return h3;
    };
    ArticleListHandler.prototype.show = function (outputFormat, outputLang, reverse) {
        if (reverse === void 0) { reverse = false; }
        this.output.innerHTML = ""; // clear the content of the HTML element
        var headerListNormal = ArticleList.getHeaderListNormal(outputLang);
        this.output.appendChild(this.getHeadingNormal(outputLang));
        this.output.appendChild(this.articleList.toHTMLElement(outputFormat, outputLang, headerListNormal, reverse, isNormalArticle));
        var headerListNonRefereed = ArticleList.getHeaderListNonRefereed(outputLang);
        this.output.appendChild(this.getHeadingNonRefereed(outputLang));
        this.output.appendChild(this.articleList.toHTMLElement(outputFormat, outputLang, headerListNonRefereed, reverse, isNonRefereedArticle));
    };
    return ArticleListHandler;
}());
function isNormalArticle(article) {
    return article.getType() == ArticleType.preprint || article.getType() == ArticleType.toappear;
}
function isNonRefereedArticle(article) {
    return article.getType() == ArticleType.proceedings;
}
/// <reference path="base.ts"/>
function isTalkBaseInfo(arg) {
    return (typeof arg == "object") && (arg != null) &&
        hasPropertyOfType(arg, "date", "string") &&
        hasPropertyOfType(arg, "lang", "string") && (arg.lang in Lang);
}
function isTalkInfo(arg) {
    return (typeof arg == "object") && (arg != null) &&
        hasPropertyOfType(arg, "title", "string") &&
        hasPropertyOfType(arg, "conference", "string") &&
        hasPropertyOfType(arg, "venue", "string") &&
        hasOptionalPropertyOfType(arg, "url", "string");
}
function isTalkObject(arg) {
    return (typeof arg == "object") && (arg != null) &&
        hasProperty(arg, "base") && isTalkBaseInfo(arg.base) &&
        (!hasProperty(arg, "ja") || isTalkInfo(arg.ja)) &&
        (!hasProperty(arg, "en") || isTalkInfo(arg.en));
}
function isTalkObjectArray(arg) {
    return (arg instanceof Array) && arg.every(isTalkObject);
}
var Talk = /** @class */ (function (_super) {
    __extends(Talk, _super);
    function Talk(talkObj) {
        var _this = _super.call(this) || this;
        _this.data = talkObj;
        return _this;
    }
    Talk.prototype.getLang = function () {
        return this.data.base.lang;
    };
    Talk.prototype.getInfo = function (outputLang) {
        if (this.data[outputLang] != null) {
            return this.data[outputLang]; // 良くないけど…
        }
        else if (this.data.ja != null) {
            return this.data.ja;
        }
        else if (this.data.en != null) {
            return this.data.en;
        }
        else {
            throw new Error("ja nor en found");
        }
    };
    Talk.prototype.getDateString = function (outputLang) {
        var date = new Date(this.data.base.date);
        var year = date.getFullYear();
        var monthZeroIndex = date.getMonth(); // 0, 1,..., 11
        if (outputLang == Lang.ja) {
            return year + "\u5E74" + (monthZeroIndex + 1) + "\u6708";
        }
        else if (outputLang == Lang.en) {
            // const monthNames: Array<string> = [
            //     "January", "February", "March", "April", "May", "June",
            //     "July", "August", "September", "October", "November", "December"];
            var monthNames = [
                "Jan.", "Feb.", "Mar.", "Apr.", "May", "June",
                "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."
            ];
            var monthString = monthNames[monthZeroIndex];
            return monthString + " " + year;
        }
        else {
            throw new Error("This can't happen!");
        }
    };
    Talk.prototype.getOutputElements = function (outputLang) {
        var talkInfo = this.getInfo(outputLang);
        // title
        var title = document.createElement("span");
        title.innerText = talkInfo.title;
        // conference
        var conference;
        if (talkInfo.url) {
            conference = makeAnchor(talkInfo.conference, talkInfo.url);
        }
        else {
            conference = document.createElement("span");
            conference.innerText = talkInfo.conference;
        }
        // venue
        var venue = document.createElement("span");
        venue.innerText = talkInfo.venue;
        // date
        var date = document.createElement("span");
        date.innerText = this.getDateString(outputLang);
        // output
        var outputElements = {
            title: title,
            conference: conference,
            venue: venue,
            date: date
        };
        return outputElements;
    };
    Talk.prototype.toLaTeX = function (outputLang, headerList) {
        var talkInfo = this.getInfo(outputLang);
        var title = talkInfo.title;
        var conference = talkInfo.conference;
        var venue = talkInfo.venue;
        var date = this.getDateString(outputLang);
        return title + ", " + conference + ", " + venue + ", " + date;
    };
    return Talk;
}(Work));
var TalkList = /** @class */ (function (_super) {
    __extends(TalkList, _super);
    function TalkList(talkObjArray) {
        var _this = this;
        var data = [];
        talkObjArray.forEach(function (talkObj) {
            // map 的な何かでどうにかならない？
            data.push(new Talk(talkObj));
        });
        _this = _super.call(this, data) || this;
        return _this;
    }
    TalkList.getHeaderList = function (outputLang) {
        if (outputLang == Lang.en) {
            return [["title", "talk title"],
                ["conference", "conference name"],
                ["venue", "venue"],
                ["date", "date"]];
        }
        else if (outputLang == Lang.ja) {
            return [["title", "講演タイトル"],
                ["conference", "研究集会名"],
                ["venue", "会場"],
                ["date", "日付"]];
        }
        else {
            throw Error("invalid lang");
        }
    };
    return TalkList;
}(WorkList));
var TalkListHandler = /** @class */ (function () {
    function TalkListHandler(talkObjArray, output) {
        this.output = output;
        this.talkList = new TalkList(talkObjArray);
    }
    TalkListHandler.prototype.getHeadingEnglish = function (outputLang) {
        var h3 = document.createElement("h3");
        if (outputLang == Lang.en) {
            h3.innerText = "Talks in English";
        }
        else if (outputLang == Lang.ja) {
            h3.innerText = "国際研究集会";
        }
        return h3;
    };
    TalkListHandler.prototype.getHeadingJapanese = function (outputLang) {
        var h3 = document.createElement("h3");
        if (outputLang == Lang.en) {
            h3.innerText = "Talks in Japanese";
        }
        else if (outputLang == Lang.ja) {
            h3.innerText = "国内研究集会";
        }
        return h3;
    };
    TalkListHandler.prototype.show = function (outputFormat, outputLang, reverse, split) {
        if (reverse === void 0) { reverse = false; }
        if (split === void 0) { split = true; }
        var headerList = TalkList.getHeaderList(outputLang);
        this.output.innerHTML = ""; // clear the content of the HTML element
        if (split) {
            this.output.appendChild(this.getHeadingEnglish(outputLang));
            this.output.appendChild(this.talkList.toHTMLElement(outputFormat, outputLang, headerList, reverse, isEnglishTalk));
            this.output.appendChild(this.getHeadingJapanese(outputLang));
            this.output.appendChild(this.talkList.toHTMLElement(outputFormat, outputLang, headerList, reverse, isJapaneseTalk));
        }
        else {
            this.output.appendChild(this.talkList.toHTMLElement(outputFormat, outputLang, headerList, reverse, undefined));
        }
    };
    return TalkListHandler;
}());
function isEnglishTalk(talk) {
    return (talk.getLang() == Lang.en);
}
function isJapaneseTalk(talk) {
    return (talk.getLang() == Lang.ja);
}
/// <reference path="talk.ts"/>
/// <reference path="article.ts"/>
var talkListHandler;
var articleListHandler;
function isValidJson(arg) {
    return (typeof arg == "object") && (arg != null) &&
        hasProperty(arg, "talks") && isTalkObjectArray(arg.talks) &&
        hasProperty(arg, "articles") && isArticleObjectArray(arg.articles);
}
function loadFromJson(file) {
    var httpObj = new XMLHttpRequest();
    httpObj.open("get", file, true);
    httpObj.onload = function () {
        var json = this.responseText;
        var jsonObj = JSON.parse(json);
        if (!isValidJson(jsonObj)) {
            throw Error("invalid JSON");
        }
        var talkDiv = document.getElementById("talk"); // まずい
        talkListHandler = new TalkListHandler(jsonObj.talks, talkDiv);
        // talkListGlobal = TalkList.create(json, "talk");
        // talkListGlobal.showList(Lang.ja, true);
        // talkList.showTable(Lang.ja);
        var articleDiv = document.getElementById("article"); // まずい
        articleListHandler = new ArticleListHandler(jsonObj.articles, articleDiv);
        setupForm();
        updateTalks();
    };
    httpObj.send(null);
}
function isConfigForm(arg) {
    // チェックが緩すぎる
    return (typeof arg == "object") && (arg != null) &&
        ("order" in arg) && ("language" in arg) && ("format" in arg) && ("split" in arg);
}
function getForm() {
    var configForm = document.getElementById("config-form");
    if (!isConfigForm(configForm)) {
        throw Error("no config-form found");
    }
    return configForm;
}
function setupForm() {
    ["format-table", "order-new-old", "language-japanese", "split-true"].forEach(function (id) {
        var radioButton = document.querySelector("#" + id); // やばい
        radioButton.checked = true;
    });
}
function updateTalks() {
    var configForm = getForm();
    // order
    var radioOrder = configForm.order;
    var order = radioOrder.value;
    var reverse;
    if (order == "new-old") {
        reverse = true;
    }
    else if (order == "old-new") {
        reverse = false;
    }
    else {
        throw Error("invalid order specification");
    }
    // language
    var radioLanguage = configForm.language;
    var language = radioLanguage.value;
    var outputLang;
    if (language == "en") {
        outputLang = Lang.en;
    }
    else if (language == "ja") {
        outputLang = Lang.ja;
    }
    else {
        throw Error("invalid language");
    }
    // format
    var radioFormat = configForm.format;
    var format = radioFormat.value;
    var outputFormat;
    if (format == "ol") {
        outputFormat = OutputFormat.ol;
    }
    else if (format == "ul") {
        outputFormat = OutputFormat.ul;
    }
    else if (format == "table") {
        outputFormat = OutputFormat.table;
    }
    else if (format == "itemize") {
        outputFormat = OutputFormat.itemize;
    }
    else {
        throw Error("Invalid output format");
    }
    // split
    var radioSplit = configForm.split;
    var split = (radioSplit.value == "true");
    // update
    talkListHandler.show(outputFormat, outputLang, reverse, split);
    articleListHandler.show(outputFormat, outputLang, reverse);
}
/// <reference path="talk.ts"/>
function assert(arg, msg) {
    if (msg === void 0) { msg = "(no msg)"; }
    if (!arg) {
        throw Error("Assertion failed: " + msg);
    }
}
function testTalkBaseInfo() {
    assert(!isTalkBaseInfo("hoge"), "just a string");
    assert(!isTalkBaseInfo(3), "just a number");
    assert(isTalkBaseInfo({ date: "hoge", lang: Lang.en }), "Basic example");
    assert(!isTalkBaseInfo({ date: "hoge" }), "lang missing");
    assert(!isTalkBaseInfo({ date: "hoge", lang: "fr" }), "wrong lang");
    assert(isTalkBaseInfo({ date: "hoge", lang: "ja" }), "lang directly specified");
}
function testTalkInfo() {
    assert(isTalkInfo({ title: "mytitle",
        conference: "myconference",
        venue: "myvenue" }), "example without url");
    assert(isTalkInfo({ title: "mytitle",
        conference: "myconference",
        venue: "myvenue",
        url: "https://exmaple.com" }), "example with url");
    assert(!isTalkInfo({ title: "mytitle",
        conference: "myconference",
        venue: 3 }), "wrong type venue");
    assert(!isTalkInfo({ title: "mytitle",
        conference: "myconference",
        venue: "myvenue",
        url: 123 }), "wrong type url");
}
function testTalkObject() {
    var talkBaseInfo = { date: "hoge", lang: Lang.en };
    var talkInfo = { title: "mytitle", conference: "myconf", venue: "myvenue" };
    assert(isTalkObject({ base: talkBaseInfo, ja: talkInfo }), "only ja");
    assert(isTalkObject({ base: talkBaseInfo, ja: talkInfo, en: talkInfo }), "both ja and en");
    assert(!isTalkObject({ base: talkBaseInfo, ja: { title: "mytitle", conference: "myconf" } }), "venue missing in ja");
}
function test() {
    testTalkBaseInfo();
    testTalkInfo();
    testTalkObject();
}
test();
