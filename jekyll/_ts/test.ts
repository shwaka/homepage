import {Lang} from "./base"
import {isTalkBaseInfo, isTalkInfo, isTalkObject, TalkInfo, TalkBaseInfo} from "./talk"
// <reference path="talk.ts"/>

function assert(arg: boolean, msg: string = "(no msg)"): void {
  if (!arg) {
    throw Error(`Assertion failed: ${msg}`);
  }
}

function testTalkBaseInfo(): void {
  assert(!isTalkBaseInfo("hoge"), "just a string");
  assert(!isTalkBaseInfo(3), "just a number");
  assert(isTalkBaseInfo({date: "hoge", lang: Lang.en}), "Basic example");
  assert(!isTalkBaseInfo({date: "hoge"}), "lang missing");
  assert(!isTalkBaseInfo({date: "hoge", lang: "fr"}), "wrong lang");
  assert(isTalkBaseInfo({date: "hoge", lang: "ja"}), "lang directly specified");
}

function testTalkInfo(): void {
  assert(isTalkInfo({title: "mytitle",
                     conference: "myconference",
                     venue: "myvenue"}),
         "example without url");
  assert(isTalkInfo({title: "mytitle",
                     conference: "myconference",
                     venue: "myvenue",
                     url: "https://exmaple.com"}),
         "example with url");
  assert(!isTalkInfo({title: "mytitle",
                      conference: "myconference",
                      venue: 3}),
         "wrong type venue");
  assert(!isTalkInfo({title: "mytitle",
                      conference: "myconference",
                      venue: "myvenue",
                      url: 123}),
         "wrong type url");
}

function testTalkObject(): void {
  const talkBaseInfo: TalkBaseInfo = {date: "hoge", lang: Lang.en};
  const talkInfo: TalkInfo = {title: "mytitle", conference: "myconf", venue: "myvenue"};
  assert(isTalkObject({base: talkBaseInfo, ja: talkInfo}), "only ja");
  assert(isTalkObject({base: talkBaseInfo, ja: talkInfo, en: talkInfo}), "both ja and en");
  assert(!isTalkObject({base: talkBaseInfo, ja: {title: "mytitle", conference: "myconf"}}),
         "venue missing in ja");
}

function test(): void {
  testTalkBaseInfo();
  testTalkInfo();
  testTalkObject();
}

test();
