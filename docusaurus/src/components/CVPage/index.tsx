import { cv } from "@data/cv"
import { HtmlFromMarkdown } from "@site/src/components/HtmlFromMarkdown"
import { LocaleDispatcher } from "@site/src/components/LocaleDispatcher"
import React from "react"
import { Awards } from "./Awards"
import { Fellowships } from "./Fellowships"
import styles from "./styles.module.scss"

function CVPageEn(): JSX.Element {
  return (
    <>
      <dl className={styles.cvdl}>
        <dt>Given Name</dt><dd>Shun</dd>
        <dt>Family Name</dt><dd>Wakatsuki</dd>
        <dt>Name in Japanese</dt><dd>若月駿</dd>
        <dt>Email</dt><dd>{cv.currentPosition.en.email}</dd>
        <dt>Birthplace</dt><dd>Kanagawa, Japan</dd>
        <dt>Nationality</dt><dd>Japan</dd>
        <dt>Current Position</dt><dd><HtmlFromMarkdown markdown={cv.currentPosition.en.name}/></dd>
      </dl>
      <h2>Education</h2>
      <ul>
        <li>Mar. 2010: Kaisei Senior High School, Tokyo, Japan</li>
        <li>Mar. 2014: B.S. in Mathematics, the University of Tokyo</li>
        <li>Mar. 2016: M.S. in Mathematical Sciences, the University of Tokyo</li>
        <li>Sep. 2019: Ph.D. in Mathematical Sciences, the University of Tokyo</li>
      </ul>
      <h2>Fellowships</h2>
      <Fellowships/>
      <h2>Awards</h2>
      <Awards/>
    </>
  )
}

function CVPageJa(): JSX.Element {
  return (
    <>
      <dl className={styles.cvdl}>
        <dt>名前</dt><dd>若月 駿</dd>
        <dt>Name</dt><dd>Shun Wakatsuki</dd>
        <dt>Email</dt><dd>{cv.currentPosition.ja.email}</dd>
        <dt>出身地</dt><dd>神奈川県</dd>
        <dt>国籍</dt><dd>日本</dd>
        <dt>所属</dt><dd><HtmlFromMarkdown markdown={cv.currentPosition.ja.name}/></dd>
      </dl>
      <h2>学歴</h2>
      <ul>
        <li>2010年3月 開成高等学校卒</li>
        <li>2014年3月 東京大学理学部数学科卒</li>
        <li>2016年3月 東京大学大学院数理科学研究科 修士課程修了</li>
        <li>
          2019年9月 東京大学大学院数理科学研究科 博士課程修了
          <ul>
            <li>博士(数理科学) 2019年9月13日 授与</li>
          </ul>
        </li>
      </ul>
      <h2>職歴</h2>
      <Fellowships/>
      <h2>受賞歴</h2>
      <Awards/>
    </>
  )
}

export function CVPage(): JSX.Element {
  return (
    <LocaleDispatcher en={<CVPageEn/>} ja={<CVPageJa/>}/>
  )
}
