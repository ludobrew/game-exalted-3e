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
  const { traitList } = data
  const { splat } = pageContext

  return (
    <Layout>
      <BreadCrumbBar />
      <Styled.h1>{splat} Charms</Styled.h1>
      <Styled.ul>
        {traitList.traits
          .sort((a, b) => traitOrder(a.name, b.name))
          .map(({ name, count }) => (
            <Styled.li key={name}>
              <StyledLink to={pathify(gameId, splat, name)}>{name}</StyledLink>
              {" - "}
              {count} Charm{count == 1 ? "" : "s"}
            </Styled.li>
          ))}
      </Styled.ul>
    </Layout>
  )
}

export default SplatPageLayout
