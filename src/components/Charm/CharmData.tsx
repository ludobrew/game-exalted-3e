/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import React from "react"
import { Charm } from "../../../nodes/Charm/Charm"
import { Link, graphql, GatsbyLinkProps } from "gatsby"
import { Charmlike } from "../../../nodes/Charmlike"
import { pathify } from "@ludobrew/core/gatsbyNodeTools"
import { gameId } from "../../../data.json"
import { StyledLink } from "../Common"

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
  <StyledLink to={charm.url}>{charm.name}</StyledLink>
)
export const EssenceRequirement: GenericCharmFunction = ({ charm }) => (
  <Styled.p as={"span"}>Essence {charm.essence}</Styled.p>
)

export const TraitRequirement: React.FC<{
  charm: Charm
  linkTrait?: boolean
}> = ({ charm, linkTrait = false }) => (
  <React.Fragment>
    {linkTrait ? (
      <StyledLink to={pathify(gameId, charm.charmSource, charm.trait)}>
        {charm.trait}
      </StyledLink>
    ) : (
      charm.trait
    )}{" "}
    {charm.rating}
  </React.Fragment>
)

export const TraitCategoryLink: CharmFunction = ({ charm }) => (
  <StyledLink to={pathify(gameId, charm.charmSource, charm.trait)}>
    {charm.trait}
  </StyledLink>
)

export const SplatLink: React.FC<{ splat: string }> = ({ splat }) => (
  <StyledLink to={pathify(gameId, splat)}>{splat}</StyledLink>
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
  <Styled.p as={"span"} key={charm.name}>
    <EssenceRequirement charm={charm} />,{" "}
    <TraitRequirement linkTrait={linkTrait} charm={charm} />
    {" - "}
    <CharmLink charm={charm} />
    {charm.shortDescription ? ` - ${charm.shortDescription}` : null}
  </Styled.p>
)
