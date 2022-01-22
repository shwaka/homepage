import React, { ReactNode } from "react"
import { Locale, useLocale } from "@data/locale"
import { useAlternatePageUtils } from "@docusaurus/theme-common"
import Link from "@docusaurus/Link"

type LocaleDispatcherProps = {
  [K in Locale]: ReactNode
}

export function LocaleDispatcher(props: LocaleDispatcherProps): JSX.Element {
  const locale: Locale = useLocale()
  return <>{props[locale]}</>
}

function LinkToLocale(props: { locale: Locale, children: ReactNode }): JSX.Element {
  // LocaleDropdownNavbarItem を元にして作成
  // https://github.com/facebook/docusaurus/blob/main/packages/docusaurus-theme-classic/src/theme/NavbarItem/LocaleDropdownNavbarItem/index.tsx
  const alternatePageUtils = useAlternatePageUtils()
  const url: string = alternatePageUtils.createUrl({ locale: props.locale, fullyQualified: false })
  const urlWithPathname = `pathname://${url}` // pathname:// を使わないと broken link と判定されてしまう
  return <Link to={urlWithPathname} target="_self" autoAddBaseUrl={false}>{props.children}</Link>
}

export function EnglishOnly(props: { children: ReactNode }): JSX.Element {
  return (
    <LocaleDispatcher
      en={props.children}
      ja={<div>このページは<LinkToLocale locale="en">英語版</LinkToLocale>でのみ提供されています．</div>} />
  )
}

export function JapaneseOnly(props: { children: ReactNode }): JSX.Element {
  return (
    <LocaleDispatcher
      en={<div>This page is provided only in <LinkToLocale locale="ja">Japanese version</LinkToLocale>.</div>}
      ja={props.children} />
  )
}
