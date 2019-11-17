/** @jsx jsx */
import { jsx } from "@emotion/core"
import React from "react"
import { graphql } from "gatsby"
import SplatCharmPageLayout from "../components/SplatCharmPageLayout"

const SplatCharmPageProvider: React.FC<any> = ({ data, pageContext }) => {
  return <SplatCharmPageLayout data={data as any} pageContext={pageContext} />
}

export default SplatCharmPageProvider

export const query = graphql`
  fragment RequirementLinkData on RequirementLinkToExaltedCharmlikeGroupConnection {
    field
    fieldValue
    totalCount
    links: nodes {
      charmlike {
        url
        name
        essence
        ... on ExaltedCharm {
          trait
          rating
        }
      }
    }
  }

  query SplatCharmPageProvider(
    $names: [String]
    $charmSource: String
    $requires: [String]
    $id: String
  ) {
    charm: exaltedCharm(id: { eq: $id }) {
      name
      charmSource
      essence
      type
      cost
      duration
      rating
      trait
      splat
      tags

      requires

      mdx: parent {
        ... on Mdx {
          body
        }
      }
    }

    requiredForInSplat: allRequirementLinkToExaltedCharmlike(
      sort: {
        fields: [charmlike___essence, charmlike___rating, charmlike___name]
        order: ASC
      }
      filter: {
        requirement: { in: $names }
        charmSource: { eq: $charmSource }
        charmlike: { charmType: { eq: splat } }
      }
    ) {
      group(field: charmlike___charmSource) {
        ...RequirementLinkData
      }
    }

    requiredForOther: allRequirementLinkToExaltedCharmlike(
      sort: {
        fields: [charmlike___essence, charmlike___rating, charmlike___name]
        order: ASC
      }
      filter: {
        requirement: { in: $names }
        charmlike: { charmType: { ne: splat } }
      }
    ) {
      group(field: charmlike___charmType) {
        ...RequirementLinkData
      }
    }

    requires: allFriendlyLinkToExaltedCharmlike(
      filter: { friendlyName: { in: $requires } }
    ) {
      found: distinct(field: friendlyName)
      links: nodes {
        friendlyName
        charmSource
        charmlike {
          url
          name
        }
      }
    }
  }
`
