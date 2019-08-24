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
    function WorkList(data, output) {
        this.data = data;
        this.output = output;
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
    WorkList.prototype.showList = function (outputLang, headerList, reverse, filter, listType) {
        if (reverse === void 0) { reverse = false; }
        if (listType === void 0) { listType = "ol"; }
        this.output.innerHTML = ""; // clear the content of the HTML element
        var list = document.createElement(listType);
        if (reverse && listType == "ol") {
            var ol = list; // もうちょっとマシな書き方？
            ol.reversed = true;
        }
        this.output.appendChild(list);
        this.getData(reverse, filter).forEach(function (work) {
            list.appendChild(work.toLi(outputLang, headerList));
        });
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
    WorkList.prototype.showTable = function (outputLang, headerList, reverse, filter) {
        if (reverse === void 0) { reverse = false; }
        this.output.innerHTML = ""; // clear the content of the HTML element
        var table = document.createElement("table");
        this.output.appendChild(table);
        table.appendChild(this.getTableHeader(headerList));
        this.getData(reverse, filter).forEach(function (work) {
            table.appendChild(work.toTr(outputLang, headerList));
        });
    };
    return WorkList;
}());
/// <reference path="base.ts"/>
// interface ArticleObject {
//   title: string;
//   arxiv
// }
// class Article extends Work<ArticleKey>{
//     title: string;
// }
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
            var conferenceAnchor = document.createElement("a");
            conferenceAnchor.appendChild(document.createTextNode(talkInfo.conference));
            conferenceAnchor.target = "_blank";
            conferenceAnchor.href = talkInfo.url;
            conference = conferenceAnchor;
        }
        else {
            var conferenceSpan = document.createElement("span");
            conferenceSpan.innerText = talkInfo.conference;
            conference = conferenceSpan;
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
    function TalkList(talkObjArray, output) {
        var _this = this;
        var data = [];
        talkObjArray.forEach(function (talkObj) {
            // map 的な何かでどうにかならない？
            data.push(new Talk(talkObj));
        });
        _this = _super.call(this, data, output) || this;
        return _this;
    }
    TalkList.create = function (json, id) {
        var output = document.getElementById(id); // さすがにマズい…
        var talkObjArray = JSON.parse(json);
        var talkList = new TalkList(talkObjArray, output);
        return talkList;
    };
    TalkList.headerListJa = [["title", "講演タイトル"],
        ["conference", "研究集会名"],
        ["venue", "会場"],
        ["date", "日付"]];
    TalkList.headerListEn = [["title", "talk title"],
        ["conference", "conference name"],
        ["venue", "venue"],
        ["date", "date"]];
    return TalkList;
}(WorkList));
/// <reference path="talk.ts"/>
/// <reference path="article.ts"/>
var talkListGlobal;
function loadFromJson(file) {
    var httpObj = new XMLHttpRequest();
    httpObj.open("get", file, true);
    httpObj.onload = function () {
        var json = this.responseText;
        talkListGlobal = TalkList.create(json, "talk");
        // talkListGlobal.showList(Lang.ja, true);
        // talkList.showTable(Lang.ja);
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
    var talksHeaderList;
    if (language == "en") {
        outputLang = Lang.en;
        talksHeaderList = TalkList.headerListEn;
    }
    else if (language == "ja") {
        outputLang = Lang.ja;
        talksHeaderList = TalkList.headerListJa;
    }
    else {
        throw Error("invalid language");
    }
    // format
    var radioFormat = configForm.format;
    var format = radioFormat.value;
    // update
    if (format == "list") {
        talkListGlobal.showList(outputLang, talksHeaderList, reverse);
    }
    else if (format == "table") {
        talkListGlobal.showTable(outputLang, talksHeaderList, reverse);
    }
}
