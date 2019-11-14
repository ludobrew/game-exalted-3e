/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import React from "react"
import { Charmlike } from "../../nodes/Charmlike"
import { Charm } from "../../nodes/Charm/Charm"
import { TraitRequirement } from "./Charm/CharmData"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "./Layout"
import { StyledLink, BreadCrumbBar } from "./Common"
import { intersperse } from "../lib"

type RequirementLinkProps = {
  charmlike: Charmlike
}

const RequirementLink = ({ charmlike }: RequirementLinkProps) => {
  return <StyledLink to={charmlike.url}>{charmlike.name}</StyledLink>
}

type RequiresData = {
  found: string[]
  links: {
    friendlyName: string
    charmlike: Charmlike
    charmSource: string
  }[]
}

const BuildsToLine: React.FC<{
  requiredForData: {
    group: {
      field: string
      fieldValue: string
      totalCount: number
      links: {
        charmlike: Charmlike
      }[]
    }[]
  }
}> = ({ requiredForData }) => {
  if (requiredForData.group.length === 0) {
    return null
  }

  return (
    <React.Fragment>
      <Styled.h2>Required for:</Styled.h2>
      {requiredForData.group.map(group => (
        <React.Fragment key={group.fieldValue}>
          <Styled.h3>
            {group.totalCount} {group.fieldValue} charm
            {group.totalCount > 1 ? "s" : ""}
          </Styled.h3>
          <Styled.ul>
            {group.links.map(({ charmlike }) => {
              return (
                <Styled.li key={charmlike.name}>
                  Essence {charmlike.essence},{" "}
                  {(charmlike as Charm).trait
                    ? `${(charmlike as Charm).trait} ${(charmlike as Charm)
                        .rating || 1}`
                    : ""}
                  : <RequirementLink charmlike={charmlike} />
                </Styled.li>
              )
            })}
          </Styled.ul>
        </React.Fragment>
      ))}
    </React.Fragment>
  )
}

const RequirementsLine: React.FC<{
  charmlike: Charmlike
  requiresData: RequiresData
  separator?: string
}> = ({ charmlike, requiresData, separator = ", " }) => {
  if (!charmlike.requires) {
    return null
  }

  const results = (charmlike.requires || []).map(rawRequirement => {
    // If we matched the requirement
    if (requiresData.found.indexOf(rawRequirement) >= 0) {
      // Find the link object
      const possibleLinks = requiresData.links.filter(
        link => link.friendlyName === rawRequirement,
      )
      // If there's many possibilities
      if (possibleLinks.length > 1) {
        // Find something that is of the same charmSource
        //  Bear Sleep Technique needs Lunar Ox-Body Technique
        const moreLikelyLink = possibleLinks.find(
          link => link.charmSource === charmlike.charmSource,
        )
        return (
          <RequirementLink
            key={rawRequirement}
            charmlike={moreLikelyLink.charmlike}
          />
        )
      } else if (possibleLinks.length === 1) {
        return (
          <RequirementLink
            key={rawRequirement}
            charmlike={possibleLinks[0].charmlike}
          />
        )
      } else {
        return (
          "There's a very strange thing going on here for " + rawRequirement
        )
      }
    } else {
      return rawRequirement
    }
  })

  return (
    <Styled.li>
      <Styled.p as={"span"}>Requires: </Styled.p>
      {[...intersperse(results, separator)]}
    </Styled.li>
  )
}

const SplatCharmPageLayout: React.FC<any> = ({ data, pageContext }) => {
  const { charm, requires, requiredForInSplat, requiredForOther } = data

  return (
    <Layout>
      <BreadCrumbBar to={[charm.splat, charm.trait]} />
      <Styled.h1>{charm.name}</Styled.h1>
      <Styled.ul>
        <Styled.li>
          <TraitRequirement linkTrait charm={charm} />
        </Styled.li>
        <RequirementsLine charmlike={charm} requiresData={requires} />
      </Styled.ul>
      <MDXRenderer>{charm.mdx.body}</MDXRenderer>
      <BuildsToLine requiredForData={requiredForInSplat} />
      <BuildsToLine requiredForData={requiredForOther} />
    </Layout>
  )
}

export default SplatCharmPageLayout
