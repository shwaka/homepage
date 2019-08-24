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
    Talk.prototype.toStr = function (outputLang) {
        var talkInfo = this.getInfo(outputLang);
        // return this.base.date + " " + this.base.lang + " " + talkInfo.venue;
        var date = this.getDateString(outputLang);
        var title = talkInfo.title;
        var conference = talkInfo.conference;
        var venue = talkInfo.venue;
        return title + ", " + conference + ", " + venue + ", " + date;
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
    Talk.prototype.addToUl = function (ul, outputLang) {
        var li = this.toLi(outputLang);
        ul.appendChild(li);
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
    return TalkList;
}());
function loadFromJson(file) {
    var httpObj = new XMLHttpRequest();
    httpObj.open("get", file, true);
    // const ul = document.getElementById("talk-list") as HTMLUListElement; // さすがにマズい…
    var div = document.getElementById("talk"); // さすがにマズい…
    httpObj.onload = function () {
        var talkObjArray = JSON.parse(this.responseText);
        var talkList = new TalkList(talkObjArray, div);
        talkList.showUl(Lang.ja);
    };
    httpObj.send(null);
}
