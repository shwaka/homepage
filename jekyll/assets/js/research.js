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
var Article = /** @class */ (function () {
    function Article() {
    }
    return Article;
}());
var Lang;
(function (Lang) {
    Lang["ja"] = "ja";
    Lang["en"] = "en";
})(Lang || (Lang = {}));
var Work = /** @class */ (function () {
    function Work(headerList) {
        this.headerList = headerList;
    }
    ;
    Work.prototype.toLi = function (outputLang) {
        var li = document.createElement("li");
        var outputElements = this.getOutputElements(outputLang);
        this.headerList.forEach(function (keyHeader, index, array) {
            var key = keyHeader[0];
            li.appendChild(outputElements[key]);
            if (index < array.length - 1) {
                li.appendChild(document.createTextNode(", "));
            }
        });
        return li;
    };
    Work.prototype.toTr = function (outputLang) {
        var tr = document.createElement("tr");
        var outputElements = this.getOutputElements(outputLang);
        this.headerList.forEach(function (keyHeader) {
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
    WorkList.prototype.showList = function (outputLang, listType) {
        if (listType === void 0) { listType = "ol"; }
        this.output.innerHTML = ""; // clear the content of the HTML element
        var ul = document.createElement(listType);
        this.output.appendChild(ul);
        this.data.forEach(function (work) {
            ul.appendChild(work.toLi(outputLang));
        });
    };
    WorkList.prototype.showTable = function (outputLang) {
        this.output.innerHTML = ""; // clear the content of the HTML element
        var table = document.createElement("table");
        this.output.appendChild(table);
        this.data.forEach(function (work) {
            table.appendChild(work.toTr(outputLang));
        });
    };
    return WorkList;
}());
/// <reference path="base.ts"/>
var Talk = /** @class */ (function (_super) {
    __extends(Talk, _super);
    function Talk(talkObj) {
        var _this = this;
        var headerList = [["title", "talk title"],
            ["conference", "conference name"],
            ["venue", "venue"],
            ["date", "date of the talk"]];
        _this = _super.call(this, headerList) || this;
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
    return TalkList;
}(WorkList));
function loadFromJson(file) {
    var httpObj = new XMLHttpRequest();
    httpObj.open("get", file, true);
    httpObj.onload = function () {
        var json = this.responseText;
        var talkList = TalkList.create(json, "talk");
        talkList.showList(Lang.ja);
        // talkList.showTable(Lang.ja);
    };
    httpObj.send(null);
}
