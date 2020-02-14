/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { graphql } from "gatsby"
import SplatPageLayout from "../components/SplatPageLayout"

const SplatPageProvider: React.FC<any> = ({ data, pageContext }) => {
  return <SplatPageLayout data={data} pageContext={pageContext} />
}

export default SplatPageProvider

export const query = graphql`
  query SplatPageProvider($splat: String) {
    # allExaltedCharm(filter: { charmSource: { eq: $splat } }) {
    #   traits: distinct(field: trait)
    # }

    traitList: allExaltedCharm(filter: { charmSource: { eq: $splat } }) {
      traits: group(field: trait) {
        name: fieldValue
        count: totalCount
      }
    }
  }
`
