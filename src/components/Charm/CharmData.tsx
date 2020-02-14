/** @jsx jsx */
import { pathify } from "gatsby-theme-ludobrew-core/gatsbyNodeTools"
import { Charm } from "gatsby-theme-ludobrew-exalted-3e/nodes/Charm/Charm"
import { Charmlike } from "gatsby-theme-ludobrew-exalted-3e/nodes/Charmlike"
import { graphql } from "gatsby"
import React from "react"
import { jsx, Styled } from "theme-ui"
import { StyledLink } from "../Common"

export const fragments = graphql`
  fragment CharmLink on Charmlike {
    name
    url
    charmSource
  }
`

type RequiresCharmLike = {
  charm: Charmlike
}

type GenericCharmFunction = React.FC<{ charm: Charmlike }>
type CharmFunction = React.FC<{ charm: Charm }>

export const CharmLink: GenericCharmFunction = ({ charm }) => (
  <StyledLink to={charm.url}>{charm.name}</StyledLink>
)
export const EssenceRequirement = ({ charm }: RequiresCharmLike) => (
  <React.Fragment>Essence {charm.essence}</React.Fragment>
)

export const TraitRequirement: React.FC<{
  charm: Charm
  linkTrait?: boolean
}> = ({ charm, linkTrait = false }) => (
  <React.Fragment>
    {linkTrait ? (
      <StyledLink to={pathify(charm.charmSource, charm.trait)}>
        {charm.trait}
      </StyledLink>
    ) : (
      charm.trait
    )}{" "}
    {charm.rating}
  </React.Fragment>
)

export const TraitCategoryLink: CharmFunction = ({ charm }) => (
  <StyledLink to={pathify(charm.charmSource, charm.trait)}>
    {charm.trait}
  </StyledLink>
)

export const SplatLink: React.FC<{ splat: string }> = ({ splat }) => (
  <StyledLink to={pathify(splat)}>{splat}</StyledLink>
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
