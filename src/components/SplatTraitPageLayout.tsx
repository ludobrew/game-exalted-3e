/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import React from "react"
import { graphql } from "gatsby"
import { groupBy } from "lodash"
import { Charm } from "../../nodes/Charm"
import { CharmTagline, CharmLink } from "./Charm/CharmData"
import Layout from "./Layout"

export const fragments = graphql`
  fragment SplatCharmPageTagline on ExaltedCharm {
    name
    essence
    rating
    shortDescription
    charmSource
    category
    url
  }
`

const toCategoryGroups = charms =>
  groupBy(charms, charm => (charm.category === null ? "none" : charm.category))

const ListGroup: React.FC<{ header?: string; charms: Charm[] }> = ({
  header,
  charms,
}) => (
  <>
    {header ? <h3>{header}</h3> : null}
    <ul key={header || "none"}>
      {charms.map(charm => (
        <li>
          <CharmTagline charm={charm} />
        </li>
      ))}
    </ul>
  </>
)

const categoryGroupToTaglines = categoryGroup => {
  const { none, ...other } = categoryGroup

  const results = []

  if (none) {
    results.push(<ListGroup charms={none.charms} />)
  }

  for (const category in other) {
    results.push(<ListGroup header={category} charms={other[category]} />)
  }

  return results
}

const SplatTraitPageLayout: React.FC<any> = ({ data, pageContext }) => {
  const { allExaltedCharm } = data
  const { trait, splat } = pageContext

  return (
    <Layout>
      <Styled.h1>
        {splat} {trait}
      </Styled.h1>
      <Styled.ul>
        {allExaltedCharm.charms.map(charm => (
          <Styled.li key={charm.name}>
            <CharmTagline charm={charm} />
          </Styled.li>
        ))}
      </Styled.ul>
    </Layout>
  )
}

export default SplatTraitPageLayout
