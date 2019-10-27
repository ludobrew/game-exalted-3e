/** @jsx jsx */
import { jsx } from "@emotion/core"
import React from "react"
import { Charm } from "../../../nodes/Charm"
import { Link, graphql } from "gatsby"
import { Charmlike } from "../../../nodes/Charmlike"
import { pathify } from "@ludobrew/core/gatsbyNodeTools"

export const fragments = graphql`
  fragment CharmLink on Charmlike {
    name
    url
    charmSource
  }
`

type GenericCharmFunction = React.FC<{ charm: Charmlike }>
type CharmFunction = React.FC<{ charm: Charm }>

export const CharmLink: GenericCharmFunction = ({ charm }) => (
  <Link to={charm.url}>{charm.name}</Link>
)
export const EssenceRequirement: GenericCharmFunction = ({ charm }) => (
  <React.Fragment>Essence {charm.essence}</React.Fragment>
)

export const TraitRequirement: React.FC<{
  charm: Charm
  linkTrait?: boolean
}> = ({ charm, linkTrait = false }) => (
  <React.Fragment>
    {linkTrait ? (
      <Link to={pathify(charm.charmSource, charm.trait)}>{charm.trait}</Link>
    ) : (
      charm.trait
    )}{" "}
    {charm.rating}
  </React.Fragment>
)

export const TraitCategoryLink: CharmFunction = ({ charm }) => (
  <Link to={pathify(charm.charmSource, charm.trait)}>{charm.trait}</Link>
)

export const CharmDiscription: GenericCharmFunction = ({ charm }) => (
  <React.Fragment>
    {charm.shortDescription ? ` - ${charm.shortDescription}` : null}
  </React.Fragment>
)

export const CharmTagline: React.FC<{
  charm: Charm
  linkTrait?: boolean
}> = ({ charm, linkTrait = false }) => (
  <span key={charm.name}>
    <EssenceRequirement charm={charm} />,{" "}
    <TraitRequirement linkTrait={linkTrait} charm={charm} />
    {" - "}
    <CharmLink charm={charm} />
    {charm.shortDescription ? ` - ${charm.shortDescription}` : null}
  </span>
)
