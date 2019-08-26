/// <reference path="talk.ts"/>

function assert(arg: boolean, msg: string = "(no msg)"): void {
  if (!arg) {
    throw Error(`Assertion failed: ${msg}`);
  }
}

function testTalkBaseInfo(): void {
  const talkBaseInfo = {date: "hoge", lang: Lang.en};
  assert(isTalkBaseInfo(talkBaseInfo), "Basic example");

  const noLang = {date: "hoge"};
  assert(!isTalkBaseInfo(noLang), "lang missing");

  const wrongLang = {date: "hoge", lang: "fr"};
  assert(!isTalkBaseInfo(wrongLang), "wrong lang");

  const directLang = {date: "hoge", lang: "ja"};
  assert(isTalkBaseInfo(directLang), "lang directly specified");
}

function testTalkInfo(): void {
  assert(isTalkInfo({title: "mytitle",
                     conference: "myconference",
                     venue: "myplace"}),
         "example without url");
  assert(isTalkInfo({title: "mytitle",
                     conference: "myconference",
                     venue: "myplace",
                     url: "https://exmaple.com"}),
         "example with url");
  assert(!isTalkInfo({title: "mytitle",
                      conference: "myconference",
                      venue: 3}),
         "wrong type venue");
  assert(isTalkInfo({title: "mytitle",
                     conference: "myconference",
                     venue: "myplace",
                     url: 123}),
         "wrong type url");
}

function test(): void {
  testTalkBaseInfo();
  testTalkInfo();
}

test();
