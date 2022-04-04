import Link from "@docusaurus/Link"
import React from "react"

export function NoteLink({filename}: {filename: string}): JSX.Element {
  // 何故か target="_blank" にしないと Not found になる
  return (
    <Link href={`/heavy/notes/${filename}`} target="_blank" rel="noreferrer">
      {filename}
    </Link>
  )
}
