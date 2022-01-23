import { cv } from "@data/cv"
import { useLocale } from "@data/locale"
import React from "react"

export function TopPage(): JSX.Element {
  const locale = useLocale()
  const currentPosition = cv.currentPosition[locale]
  return (
    <>
      <h1>Shun Wakatsuki</h1>
      <ul>
        <li>email: {currentPosition.email}</li>
        <li>address: {currentPosition.address}</li>
      </ul>
      <h2>Research field</h2>
      <ul>
        <li>Rational homotopy theory</li>
        <li>String topology, Brane topology</li>
      </ul>
    </>
  )
}
