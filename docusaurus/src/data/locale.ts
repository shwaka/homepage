import useDocusaurusContext from "@docusaurus/useDocusaurusContext"

export const locales = ["en", "ja"] as const
export type Locale = (typeof locales)[number]

export function useLocale(): Locale {
  // https://docusaurus.io/docs/docusaurus-core#useDocusaurusContext
  const { i18n } = useDocusaurusContext()
  const locale: string = i18n.currentLocale
  return locale as Locale
}

export function useLocaleName(): string {
  switch (useLocale()) {
    case "en":
      return "English"
    case "ja":
      return "日本語"
  }
}
