import React from "react"

export interface ExtLinkProps {
  href: string
  text: string
}
export function ExtLink({href, text}: ExtLinkProps): JSX.Element {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {text}
    </a>
  )
}
