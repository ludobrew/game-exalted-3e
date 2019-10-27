/** @jsx jsx */
import { jsx } from "@emotion/core"
import React from "react"
import { graphql } from "gatsby"
import SplatPageLayout from "../components/SplatPageLayout"

const SplatPageProvider: React.FC<any> = ({ data, pageContext }) => {
  return <SplatPageLayout data={data} pageContext={pageContext} />
}

export default SplatPageProvider

export const query = graphql`
  query SplatPageProvider($splat: String) {
    allExaltedCharm(filter: { charmSource: { eq: $splat } }) {
      traits: distinct(field: trait)
    }
  }
`

// export const query = graphql`
//   query($charmSource: String) {
//     universal: allExaltedCharm(
//       filter: {
//         charmType: { eq: splat }
//         charmSource: { eq: $charmSource }
//         trait: { eq: "Universal" }
//       }
//       sort: { fields: [category, essence, rating, name] }
//     ) {
//       group(field: trait) {
//         charms: nodes {
//           ...SplatCharmPageTagline
//         }
//         trait: fieldValue
//       }
//     }

//     other: allExaltedCharm(
//       filter: {
//         charmType: { eq: splat }
//         charmSource: { eq: $charmSource }
//         trait: { ne: "Universal" }
//       }
//       sort: { fields: [category, essence, rating, name] }
//     ) {
//       group(field: trait) {
//         charms: nodes {
//           ...SplatCharmPageTagline
//         }
//         trait: fieldValue
//       }
//     }
//   }
// `
