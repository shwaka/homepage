import { translate } from "@docusaurus/Translate"
import React from "react"
import { Awards } from "./Awards"
import { Education } from "./Education"
import { Fellowships } from "./Fellowships"
import { Profile } from "./Profile"

export function CVPage(): JSX.Element {
  const educationHeader = translate({
    message: "Education",
    description: "The header for education",
    id: "cv.header.education",
  })
  const fellowshipsHeader = translate({
    message: "Fellowships",
    description: "The header for fellowships",
    id: "cv.header.fellowships",
  })
  const awardsHeader = translate({
    message: "Awards",
    description: "The header for awards",
    id: "cv.header.awards",
  })
  return (
    <>
      <Profile/>
      <h2>{educationHeader}</h2>
      <Education/>
      <h2>{fellowshipsHeader}</h2>
      <Fellowships/>
      <h2>{awardsHeader}</h2>
      <Awards/>
    </>
  )
}
