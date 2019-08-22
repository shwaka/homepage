interface TalkInfo {
    title: string;
    conference: string;
    venue: string;
    url?: string;
}

interface TalkObject {
    base: {
        date: Date,
        lang: string
    };
    ja?: TalkInfo;
    en?: TalkInfo;
}

class Talk {
    base: {
        date: Date,
        lang: string
    };

    constructor(talkObj: TalkObject){
        (<any>Object).assign(this, talkObj);
    }

    toStr(): string{
        return this.base.date + " " + this.base.lang;
    }
}

function loadFromJson(file: string){
    const httpObj = new XMLHttpRequest();
    httpObj.open("get", file, true);
    httpObj.onload = function(){
        const talkObjArray: TalkObject[] = JSON.parse(this.responseText);
        talkObjArray.forEach(talkObj => {
            const talk = new Talk(talkObj);
            console.log(talk.toStr());
        })
    }
    httpObj.send(null);
}
