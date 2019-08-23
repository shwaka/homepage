"use strict";
var Article = /** @class */ (function () {
    function Article() {
    }
    return Article;
}());
var Talk = /** @class */ (function () {
    function Talk(talkObj) {
        Object.assign(this, talkObj);
    }
    Talk.prototype.getInfo = function () {
        if (this.ja != null) {
            return this.ja;
        }
        else if (this.en != null) {
            return this.en;
        }
        else {
            throw new Error("ja nor en found");
        }
    };
    Talk.prototype.toStr = function () {
        var talkInfo = this.getInfo();
        return this.base.date + " " + this.base.lang + " " + talkInfo.venue;
    };
    Talk.prototype.addToUl = function (id) {
        var ul = document.getElementById(id);
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(this.toStr()));
        if (ul != null) {
            ul.appendChild(li);
        }
    };
    return Talk;
}());
function loadFromJson(file) {
    var httpObj = new XMLHttpRequest();
    httpObj.open("get", file, true);
    httpObj.onload = function () {
        var talkObjArray = JSON.parse(this.responseText);
        talkObjArray.forEach(function (talkObj) {
            var talk = new Talk(talkObj);
            // console.log(talk.toStr());
            talk.addToUl("talk-list");
        });
    };
    httpObj.send(null);
}
