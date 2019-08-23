interface TalkBaseInfo {
    date: Date;
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

    getInfo(): TalkInfo{
        if (this.ja != null){
            return this.ja;
        } else if (this.en != null) {
            return this.en;
        } else {
            throw new Error("ja nor en found");
        }
    }

    toStr(): string{
        const talkInfo = this.getInfo();
        return this.base.date + " " + this.base.lang + " " + talkInfo.venue;
    }

    addToUl(id: string): void{
        let ul = document.getElementById(id);
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(this.toStr()));
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
            talk.addToUl("talk-list");
        })
    }
    httpObj.send(null);
}
