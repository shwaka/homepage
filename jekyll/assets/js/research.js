"use strict";
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
var Talk = /** @class */ (function () {
    function Talk(talkObj) {
        Object.assign(this, talkObj);
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
    Talk.prototype.toLi = function (outputLang) {
        var li = document.createElement("li");
        var outputElements = this.getOutputElements(outputLang);
        li.appendChild(outputElements.title);
        li.appendChild(document.createTextNode(", "));
        li.appendChild(outputElements.conference);
        li.appendChild(document.createTextNode(", "));
        li.appendChild(outputElements.venue);
        li.appendChild(document.createTextNode(", "));
        li.appendChild(outputElements.date);
        return li;
    };
    Talk.prototype.toTr = function (outputLang) {
        var tr = document.createElement("tr");
        var outputElements = this.getOutputElements(outputLang);
        [outputElements.title,
            outputElements.conference,
            outputElements.venue,
            outputElements.date].forEach(function (element) {
            var td = document.createElement("td");
            td.appendChild(element);
            tr.appendChild(td);
        });
        return tr;
    };
    return Talk;
}());
var TalkList = /** @class */ (function () {
    function TalkList(talkObjArray, output) {
        var _this = this;
        this.output = output;
        this.data = [];
        talkObjArray.forEach(function (talkObj) {
            // map 的な何かでどうにかならない？
            _this.data.push(new Talk(talkObj));
        });
    }
    TalkList.prototype.showUl = function (outputLang) {
        this.output.innerHTML = ""; // clear the content of the HTML element
        var ul = document.createElement("ul");
        this.output.appendChild(ul);
        this.data.forEach(function (talk) {
            ul.appendChild(talk.toLi(outputLang));
        });
    };
    TalkList.prototype.showTable = function (outputLang) {
        this.output.innerHTML = ""; // clear the content of the HTML element
        var table = document.createElement("table");
        this.output.appendChild(table);
        this.data.forEach(function (talk) {
            table.appendChild(talk.toTr(outputLang));
        });
    };
    TalkList.create = function (json, id) {
        var output = document.getElementById(id); // さすがにマズい…
        var talkObjArray = JSON.parse(json);
        var talkList = new TalkList(talkObjArray, output);
        return talkList;
    };
    return TalkList;
}());
function loadFromJson(file) {
    var httpObj = new XMLHttpRequest();
    httpObj.open("get", file, true);
    httpObj.onload = function () {
        var json = this.responseText;
        var talkList = TalkList.create(json, "talk");
        talkList.showUl(Lang.ja);
        // talkList.showTable(Lang.ja);
    };
    httpObj.send(null);
}
