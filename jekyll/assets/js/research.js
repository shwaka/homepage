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
    Talk.prototype.toStr = function () {
        return this.base.date + " " + this.base.lang;
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
            console.log(talk.toStr());
        });
    };
    httpObj.send(null);
}
