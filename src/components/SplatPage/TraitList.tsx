/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { graphql, useStaticQuery } from "gatsby"
import { useMemo } from "react"
import { StyledLink } from "../Common"
import { pathify } from "gatsby-theme-ludobrew-core/gatsbyNodeTools"

const defaultComparator = (a: string, b: string) => {
  if (a === "Universal") return -1
  if (b === "Universal") return 1
  return a.localeCompare(b)
}

type TraitlistData = {
  splat: string
  traitList: {
    traits: { name: string; count: number }[]
  }
}

const TraitList = ({ splat, traitList }: TraitlistData) => {
  // Todo, make sort order configurable
  // const data = useStaticQuery(graphql`
  //   query TraitListSortOrderData {
  //     site {
  //       siteMetadata {
  //         traitPriority
  //       }
  //     }
  //   }
  // `)
  const data = {} as any

  const traitOrder = useMemo(() => {
    const traitPriority: string[] =
      data?.site?.siteMetadata?.traitPriority ?? []
    if (traitPriority.length === 0) {
      return defaultComparator
    }

    return (a: string, b: string) => {
      const indexA = traitPriority.indexOf(a)
      const indexB = traitPriority.indexOf(b)
      if (indexA >= 0 && indexB >= 0) return indexA - indexB // I think
      if (indexA >= 0) return -1
      if (indexB >= 0) return 1
      return a.localeCompare(b)
    }
  }, [data])

  return (
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
  )
}

export default TraitList

export const TraitListRequiredDataFragment = graphql`
  fragment TraitListRequiredDataFragment on Query {
    traitList: allExaltedSplatCharm(filter: { charmSource: { eq: $splat } }) {
      traits: group(field: trait) {
        name: fieldValue
        count: totalCount
      }
    }
  }
`
