/** @jsx jsx */
import { jsx } from "@emotion/core"
import React from "react"
import { graphql } from "gatsby"
import SplatTraitPageLayout from "../components/SplatTraitPageLayout"

const SplatTraitPageProvider: React.FC<any> = ({ data, pageContext }) => {
  return <SplatTraitPageLayout data={data} pageContext={pageContext} />
}

export default SplatTraitPageProvider

export const query = graphql`
  query SplatTraitPageProvider($splat: String, $trait: String) {
    allExaltedCharm(
      filter: { charmSource: { eq: $splat }, trait: { eq: $trait } }
      sort: { fields: [category, essence, rating, name] }
    ) {
      charms: nodes {
        name
        url
        essence
        trait
        rating
        charmSource
      }
    }
  }
`
