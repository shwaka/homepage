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
function makeAnchor(text, url) {
    var a = document.createElement("a");
    a.appendChild(document.createTextNode(text));
    a.target = "_blank";
    a.href = url;
    return a;
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
        headerList.forEach(function (keyHeader, index, array) {
            var key = keyHeader[0];
            li.appendChild(outputElements[key]);
            if (index < array.length - 1) {
                li.appendChild(document.createTextNode(", "));
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
            td.appendChild(outputElements[key]);
            tr.appendChild(td);
        });
        return tr;
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
    WorkList.prototype.toList = function (outputLang, headerList, reverse, filter, listType) {
        if (reverse === void 0) { reverse = false; }
        if (listType === void 0) { listType = "ol"; }
        var list = document.createElement(listType);
        if (reverse && listType == "ol") {
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
    return WorkList;
}());
/// <reference path="base.ts"/>
var ArticleType;
(function (ArticleType) {
    ArticleType["preprint"] = "preprint";
    ArticleType["toappear"] = "toappear";
    ArticleType["proceedings"] = "proceedings";
})(ArticleType || (ArticleType = {}));
var Article = /** @class */ (function (_super) {
    __extends(Article, _super);
    function Article(articleObj) {
        var _this = _super.call(this) || this;
        Object.assign(_this, articleObj);
        return _this;
    }
    Article.prototype.getOutputElements = function (outputLang) {
        // title
        var title = document.createElement("span");
        title.innerText = this.title;
        // journal
        var journal = document.createElement("span");
        if (this.type == ArticleType.toappear) {
            journal.innerText = "to appear in " + this.journal; // anchor にする
        }
        else if (this.type == ArticleType.proceedings) {
            journal.innerText = String(this.journal); // anchor
        }
        // year
        var year = document.createElement("span");
        if (this.type == ArticleType.proceedings) {
            year.innerText = String(this.year);
        }
        // arxiv
        var arxiv = document.createElement("span");
        if (this.type == ArticleType.preprint || this.type == ArticleType.toappear) {
            arxiv.innerText = String(this.arxiv); // anchor
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
    ArticleListHandler.prototype.showList = function (outputLang, reverse) {
        if (reverse === void 0) { reverse = false; }
        this.output.innerHTML = ""; // clear the content of the HTML element
        var headerListNormal = ArticleList.getHeaderListNormal(outputLang);
        this.output.appendChild(this.getHeadingNormal(outputLang));
        this.output.appendChild(this.articleList.toList(outputLang, headerListNormal, reverse, isNormalArticle));
        var headerListNonRefereed = ArticleList.getHeaderListNonRefereed(outputLang);
        this.output.appendChild(this.getHeadingNonRefereed(outputLang));
        this.output.appendChild(this.articleList.toList(outputLang, headerListNonRefereed, reverse, isNonRefereedArticle));
    };
    ArticleListHandler.prototype.showTable = function (outputLang, reverse) {
        if (reverse === void 0) { reverse = false; }
        this.output.innerHTML = ""; // clear the content of the HTML element
        var headerListNormal = ArticleList.getHeaderListNormal(outputLang);
        this.output.appendChild(this.getHeadingNormal(outputLang));
        this.output.appendChild(this.articleList.toTable(outputLang, headerListNormal, reverse, isNormalArticle));
        var headerListNonRefereed = ArticleList.getHeaderListNonRefereed(outputLang);
        this.output.appendChild(this.getHeadingNonRefereed(outputLang));
        this.output.appendChild(this.articleList.toTable(outputLang, headerListNonRefereed, reverse, isNonRefereedArticle));
    };
    return ArticleListHandler;
}());
function isNormalArticle(article) {
    return article.type == ArticleType.preprint || article.type == ArticleType.toappear;
}
function isNonRefereedArticle(article) {
    return article.type == ArticleType.proceedings;
}
/// <reference path="base.ts"/>
var Talk = /** @class */ (function (_super) {
    __extends(Talk, _super);
    function Talk(talkObj) {
        var _this = _super.call(this) || this;
        Object.assign(_this, talkObj);
        return _this;
    }
    Talk.prototype.getInfo = function (outputLang) {
        if (this[outputLang] != null) {
            return this[outputLang]; // 良くないけど…
        }
        else if (this.ja != null) {
            return this.ja;
        }
        else if (this.en != null) {
            return this.en;
        }
        else {
            throw new Error("ja nor en found");
        }
    };
    Talk.prototype.getDateString = function (outputLang) {
        var date = new Date(this.base.date);
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
            h3.innerText = "talks in English";
        }
        else if (outputLang == Lang.ja) {
            h3.innerText = "国際研究集会";
        }
        return h3;
    };
    TalkListHandler.prototype.getHeadingJapanese = function (outputLang) {
        var h3 = document.createElement("h3");
        if (outputLang == Lang.en) {
            h3.innerText = "talks in Japanese";
        }
        else if (outputLang == Lang.ja) {
            h3.innerText = "国内研究集会";
        }
        return h3;
    };
    TalkListHandler.prototype.showList = function (outputLang, reverse) {
        if (reverse === void 0) { reverse = false; }
        var headerList = TalkList.getHeaderList(outputLang);
        this.output.innerHTML = ""; // clear the content of the HTML element
        this.output.appendChild(this.getHeadingEnglish(outputLang));
        this.output.appendChild(this.talkList.toList(outputLang, headerList, reverse, isEnglishTalk));
        this.output.appendChild(this.getHeadingJapanese(outputLang));
        this.output.appendChild(this.talkList.toList(outputLang, headerList, reverse, isJapaneseTalk));
    };
    TalkListHandler.prototype.showTable = function (outputLang, reverse) {
        if (reverse === void 0) { reverse = false; }
        var headerList = TalkList.getHeaderList(outputLang);
        this.output.innerHTML = ""; // clear the content of the HTML element
        this.output.appendChild(this.getHeadingEnglish(outputLang));
        this.output.appendChild(this.talkList.toTable(outputLang, headerList, reverse, isEnglishTalk));
        this.output.appendChild(this.getHeadingJapanese(outputLang));
        this.output.appendChild(this.talkList.toTable(outputLang, headerList, reverse, isJapaneseTalk));
    };
    return TalkListHandler;
}());
function isEnglishTalk(talk) {
    return (talk.base.lang == Lang.en);
}
function isJapaneseTalk(talk) {
    return (talk.base.lang == Lang.ja);
}
/// <reference path="talk.ts"/>
/// <reference path="article.ts"/>
var talkListHandler;
var articleListHandler;
function loadFromJson(file) {
    var httpObj = new XMLHttpRequest();
    httpObj.open("get", file, true);
    httpObj.onload = function () {
        var json = this.responseText;
        var jsonObj = JSON.parse(json);
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
    return ("order" in arg) && ("language" in arg) && ("format" in arg);
}
function getForm() {
    var configForm = document.getElementById("config-form");
    if (!isConfigForm(configForm)) {
        throw Error("no config-form found");
    }
    return configForm;
}
function setupForm() {
    ["format-list", "order-new-old", "language-japanese"].forEach(function (id) {
        var radioButton = document.getElementById(id); // やばい
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
    // update
    if (format == "list") {
        talkListHandler.showList(outputLang, reverse);
        articleListHandler.showList(outputLang, reverse);
    }
    else if (format == "table") {
        talkListHandler.showTable(outputLang, reverse);
        articleListHandler.showTable(outputLang, reverse);
    }
}
