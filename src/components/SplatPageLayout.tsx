/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

import React from "react"
import { pathify } from "@ludobrew/core/gatsbyNodeTools"
import { gameId } from "../../data.json"
import Layout from "./Layout"
import { StyledLink, BreadCrumbBar } from "./Common"

const traitOrder = (a: string, b: string) =>
  a === "Universal" ? -1 : a.localeCompare(b)

const SplatPageLayout: React.FC<any> = ({ data, pageContext }) => {
  const { allExaltedCharm } = data
  const { splat } = pageContext

  return (
    <Layout>
      <BreadCrumbBar />
      <Styled.h1>{splat} Charms</Styled.h1>
      {(allExaltedCharm.traits as string[]).sort(traitOrder).map(trait => (
        <Styled.li key={trait}>
          <StyledLink to={pathify(gameId, splat, trait)}>{trait}</StyledLink>
        </Styled.li>
      ))}
      <div> Hello SplatPageLayout </div>
    </Layout>
  )
}

export default SplatPageLayout
