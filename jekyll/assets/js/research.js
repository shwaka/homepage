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
    Talk.prototype.toLi = function (outputLang) {
        var li = document.createElement("li");
        var talkInfo = this.getInfo(outputLang);
        // title
        var title = talkInfo.title;
        li.appendChild(document.createTextNode(title + ", "));
        // conference
        var conference = talkInfo.conference;
        if (talkInfo.url) {
            var a = document.createElement("a");
            a.appendChild(document.createTextNode(conference));
            a.target = "_blank";
            a.href = talkInfo.url;
            li.appendChild(a);
            li.appendChild(document.createTextNode(", "));
        }
        else {
            li.appendChild(document.createTextNode(conference + ", "));
        }
        // venue
        var venue = talkInfo.venue;
        li.appendChild(document.createTextNode(venue + ", "));
        // date
        var date = this.getDateString(outputLang);
        li.appendChild(document.createTextNode("" + date));
        return li;
    };
    Talk.prototype.addToUl = function (ul, outputLang) {
        var li = this.toLi(outputLang);
        ul.appendChild(li);
    };
    return Talk;
}());
function loadFromJson(file) {
    var httpObj = new XMLHttpRequest();
    httpObj.open("get", file, true);
    var ul = document.getElementById("talk-list"); // さすがにマズい…
    httpObj.onload = function () {
        var talkObjArray = JSON.parse(this.responseText);
        talkObjArray.forEach(function (talkObj) {
            var talk = new Talk(talkObj);
            // console.log(talk.toStr());
            talk.addToUl(ul, Lang.ja);
        });
    };
    httpObj.send(null);
}
