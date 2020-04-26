/** @jsx jsx */
import { jsx, Styled } from "theme-ui"

import React from "react"
import { pathify } from "gatsby-theme-ludobrew-core/gatsbyNodeTools"
import { OptionalMdxRenderer } from "gatsby-theme-ludobrew-core/src/components/OptionalMdxRenderer"
import Layout from "./Layout"
import { StyledLink, BreadCrumbBar } from "./Common"
import TraitList from "./SplatPage/TraitList"

const traitOrder = (a: string, b: string) => {
  if (a === "Universal") return -1
  if (b === "Universal") return 1
  return a.localeCompare(b)
}

const SplatPageLayout: React.FC<any> = ({ data, pageContext }) => {
  const { traitList, preface } = data
  const { splat } = pageContext

  return (
    <Layout>
      <BreadCrumbBar />
      <Styled.h1>{splat}</Styled.h1>
      <OptionalMdxRenderer mdxNode={preface} />
      <Styled.h2>Charms</Styled.h2>
      <TraitList splat={splat} traitList={traitList} />
    </Layout>
  )
}

export default SplatPageLayout
