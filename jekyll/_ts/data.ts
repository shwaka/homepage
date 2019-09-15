import {hasProperty} from "./base"
import {TalkObject, isTalkObjectArray} from "./talk"
import {ArticleObject, isArticleObjectArray} from "./article"

export interface ValidJson {
  talks: TalkObject[];
  articles: ArticleObject[];
}

export function isValidJson(arg: unknown): arg is ValidJson {
  return (typeof arg == "object") && (arg != null) &&
    hasProperty(arg, "talks") && isTalkObjectArray(arg.talks) &&
    hasProperty(arg, "articles") && isArticleObjectArray(arg.articles);
}
