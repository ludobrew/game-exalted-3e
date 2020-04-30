/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import React from "react"
import { graphql } from "gatsby"
import { Charm } from "gatsby-theme-ludobrew-exalted-3e/nodes/Charm/Charm"
import { CharmTagline } from "./Charm/CharmData"
import Layout from "./Layout"
import { BreadCrumbBar } from "./Common"
import { OptionalMdxRenderer } from "gatsby-theme-ludobrew-core/src/components/OptionalMdxRenderer"

export const fragments = graphql`
  fragment SplatCharmPageTagline on ExaltedSplatCharm {
    name
    essence
    rating
    shortDescription
    charmSource
    tree
    url
  }
`

type CharmListProps = {
  charms: Charm[]
}

const CharmList = ({ charms }: CharmListProps) => {
  const liArray = charms.map((charm) => (
    <Styled.li key={charm.name}>
      <CharmTagline charm={charm} />
    </Styled.li>
  ))
  return <Styled.ul>{liArray}</Styled.ul>
}

type TreeDisplayProps = {
  treeName: string
  charms: Charm[]
}

const TreeDisplay = ({ treeName, charms }: TreeDisplayProps) => {
  if (charms.length === 0) {
    return null
  }

  return (
    <React.Fragment key={treeName}>
      <Styled.h2>{treeName}</Styled.h2>
      <CharmList charms={charms} />
    </React.Fragment>
  )
}

const SplatTraitPageLayout: React.FC<any> = ({ data, pageContext }) => {
  const { noTreeCharms, charmTrees, preface } = data
  const { trait, splat } = pageContext
  return (
    <Layout>
      <BreadCrumbBar to={[splat]} />
      <Styled.h1>{trait}</Styled.h1>
      <OptionalMdxRenderer mdxNode={preface} />
      {charmTrees.trees.map((tree) => (
        <TreeDisplay key={tree.treeName} {...tree} />
      ))}
      <TreeDisplay
        key={"OtherTree"}
        charms={noTreeCharms.charms}
        treeName="Other"
      />
    </Layout>
  )
}

export default SplatTraitPageLayout
