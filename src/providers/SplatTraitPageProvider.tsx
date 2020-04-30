/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { graphql } from "gatsby"
import SplatTraitPageLayout from "../components/SplatTraitPageLayout"

const SplatTraitPageProvider = ({ data, pageContext }) => {
  return <SplatTraitPageLayout data={data} pageContext={pageContext} />
}

export default SplatTraitPageProvider

export const query = graphql`
  query SplatTraitPageProvider($splat: String, $trait: String) {
    preface: mdx(
      frontmatter: {
        content: { eq: "trait preface" }
        splat: { eq: $splat }
        trait: { eq: $trait }
      }
    ) {
      body
    }

    noTreeCharms: allExaltedSplatCharm(
      filter: {
        charmSource: { eq: $splat }
        trait: { eq: $trait }
        tree: { eq: null }
      }
      sort: { fields: [essence, rating, name] }
    ) {
      charms: nodes {
        name
        url
        essence
        trait
        rating
        charmSource
        shortDescription
      }
    }

    charmTrees: allExaltedSplatCharm(
      filter: { charmSource: { eq: $splat }, trait: { eq: $trait } }
      sort: { fields: [tree, essence, rating, name] }
    ) {
      trees: group(field: tree) {
        treeName: fieldValue
        charms: nodes {
          name
          url
          essence
          trait
          rating
          charmSource
          shortDescription
        }
      }
    }
  }
`
