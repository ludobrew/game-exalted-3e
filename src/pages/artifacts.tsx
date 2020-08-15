/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { graphql, Link } from "gatsby"
import { SplatLink } from "../components/Charm/CharmData"
import React from "react"
import Layout from "../components/Layout"
import { BreadCrumbBar, StyledLink } from "../components/Common"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { pathify } from "gatsby-theme-ludobrew-core/gatsbyNodeTools"

type CategoryGroupListingProps = {
  heading: string

  group: GatsbyGroup<string>[]
  children?: React.ReactNode
}

type GatsbyGroup<FieldType> = {
  totalCount: number
  field: string
  fieldValue: FieldType
}

const CategoryGroupListing = ({
  heading,
  group,
  children,
}: CategoryGroupListingProps) => {
  if (group.length === 0) {
    return null
  }

  return (
    <React.Fragment>
      <Styled.h3>{heading}</Styled.h3>
      {children}
      <Styled.ul>
        {group.map(({ fieldValue, field, totalCount }) => {
          const to = pathify("artifacts", "category", field, fieldValue)

          if (fieldValue.match(/(6)|(\bn\/?a\b)/i)) {
            fieldValue = "N/A"
          }

          let link: React.ReactNode = (
            <Link to={to}>
              {fieldValue.slice(0, 1).toLocaleUpperCase()}
              {fieldValue.slice(1)}
            </Link>
          )

          if (fieldValue.match(/[1-5]/)) {
            link = (
              <React.Fragment>
                <Link to={to}>{fieldValue} Dot</Link> (
                {"•".repeat(Number(fieldValue))})
              </React.Fragment>
            )
          }

          return (
            <Styled.li key={fieldValue}>
              {link}
              {" - "}
              {totalCount} {totalCount > 1 ? "Artifacts" : "Artifact"}
            </Styled.li>
          )
        })}
      </Styled.ul>
    </React.Fragment>
  )
}

export default (props: any) => {
  const { data } = props
  return (
    <Layout>
      <BreadCrumbBar />
      <Styled.h2>Artifacts</Styled.h2>
      <CategoryGroupListing
        key={"type"}
        heading="By Type"
        group={data.type.group}
      />
      <CategoryGroupListing
        key={"material"}
        heading="By Material"
        group={data.material.group}
      />
      <CategoryGroupListing
        key={"rating"}
        heading={"By Rating"}
        group={data.rating.group}
      />
      <CategoryGroupListing
        key={"resonance"}
        heading="By Resonance"
        group={data.resonance.group}
      >
        Artifacts that specifically specify an exalt type they are compatable
        with outside of just the materials it is comprised of.
      </CategoryGroupListing>
    </Layout>
  )
}

export const exalted3equery = graphql`
  query Exalted3eArtifactSubpagesQuery {
    all: allExaltedArtifact {
      totalCount
    }
    type: allExaltedArtifact {
      group(field: type) {
        totalCount
        field
        fieldValue
      }
    }
    material: allExaltedArtifact {
      group(field: materials) {
        totalCount
        field
        fieldValue
      }
    }
    resonance: allExaltedArtifact {
      group(field: resonant) {
        totalCount
        field
        fieldValue
      }
    }
    rating: allExaltedArtifact {
      group(field: rating) {
        totalCount
        field
        fieldValue
      }
    }
  }
`
