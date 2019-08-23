enum Lang {
    ja = "ja",
    en = "en"
}

interface TalkBaseInfo {
    date: string;
    lang: string;
}

interface TalkInfo {
    title: string;
    conference: string;
    venue: string;
    url?: string;
}

interface TalkObject {
    base: TalkBaseInfo;
    ja?: TalkInfo;
    en?: TalkInfo;
}

class Talk implements TalkObject{
    base: TalkBaseInfo;
    ja?: TalkInfo;
    en?: TalkInfo;

    constructor(talkObj: TalkObject){
        (<any>Object).assign(this, talkObj);
    }

    getInfo(outputLang: Lang): TalkInfo{
        if (this[outputLang] != null){
            return this[outputLang] as TalkInfo; // 良くないけど…
        } else if (this.ja != null) {
            return this.ja;
        } else if (this.en != null) {
            return this.en;
        } else {
            throw new Error("ja nor en found");
        }
    }

    getDateString(outputLang: Lang): string {
        const date: Date = new Date(this.base.date);
        const year: number = date.getFullYear();
        const monthZeroIndex: number = date.getMonth(); // 0, 1,..., 11
        if (outputLang == Lang.ja) {
            return `${year}年${monthZeroIndex+1}月`;
        } else if (outputLang == Lang.en) {
            // const monthNames: Array<string> = [
            //     "January", "February", "March", "April", "May", "June",
            //     "July", "August", "September", "October", "November", "December"];
            const monthNames: Array<string> = [
                "Jan.", "Feb.", "Mar.", "Apr.", "May", "June",
                "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
            const monthString: string = monthNames[monthZeroIndex];
            return `${monthString} ${year}`;
        } else {
            throw new Error("This can't happen!");
        }
    }

    toStr(outputLang: Lang): string{
        const talkInfo = this.getInfo(outputLang);
        // return this.base.date + " " + this.base.lang + " " + talkInfo.venue;
        const date: string = this.getDateString(outputLang);
        const title: string = talkInfo.title;
        const conference: string = talkInfo.conference;
        const venue: string = talkInfo.venue;
        return `${title}, ${conference}, ${venue}, ${date}`;
    }

    addToUl(id: string, outputLang: Lang): void{
        let ul = document.getElementById(id);
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(this.toStr(outputLang)));
        if (ul != null){
            ul.appendChild(li);
        }
    }
}

function loadFromJson(file: string){
    const httpObj = new XMLHttpRequest();
    httpObj.open("get", file, true);
    httpObj.onload = function(){
        const talkObjArray: TalkObject[] = JSON.parse(this.responseText);
        talkObjArray.forEach(talkObj => {
            const talk = new Talk(talkObj);
            // console.log(talk.toStr());
            talk.addToUl("talk-list", Lang.ja);
        })
    }
    httpObj.send(null);
}
