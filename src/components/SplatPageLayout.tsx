/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

import React from "react"
import { pathify } from "gatsby-theme-ludobrew-core/gatsbyNodeTools"
import Layout from "./Layout"
import { StyledLink, BreadCrumbBar } from "./Common"
import { MDXRenderer } from "gatsby-plugin-mdx"

const traitOrder = (a: string, b: string) =>
  a === "Universal" ? -1 : a.localeCompare(b)

const SplatPageLayout: React.FC<any> = ({ data, pageContext }) => {
  const { traitList, preface } = data
  const { splat } = pageContext

  return (
    <Layout>
      <BreadCrumbBar />
      <Styled.h1>{splat}</Styled.h1>
      {preface?.body ? <MDXRenderer>{preface?.body}</MDXRenderer> : null}
      <Styled.h2>Charms</Styled.h2>
      <Styled.ul>
        {traitList.traits
          .sort((a, b) => traitOrder(a.name, b.name))
          .map(({ name, count }) => (
            <Styled.li key={name}>
              <StyledLink to={pathify(splat, name)}>{name}</StyledLink>
              {" - "}
              {count} Charm{count == 1 ? "" : "s"}
            </Styled.li>
          ))}
      </Styled.ul>
    </Layout>
  )
}

export default SplatPageLayout
