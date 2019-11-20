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
import { GithubEditLink } from "@ludobrew/core/src/components/Github"
import css from "@emotion/css"
import { pathify } from "@ludobrew/core/gatsbyNodeTools"
import { gameId } from "../data"

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

const emdash = "—"

type TagLineProps = {
  tags?: string[]
  splat: string
}

const TagLine = ({ tags = [], splat }: TagLineProps) => {
  if (!tags || tags.length == 0) {
    return null
  }

  // TODO: when I make the pathify(gameId, splat, "tag", tag) path.
  let tagLine = tags.map(
    tag =>
      // <StyledLink key={tag} to={pathify(gameId, splat, "tag", tag)}>
      tag,
    // </StyledLink>
  )
  // TODO: figureout intersperse typing
  tagLine = intersperse(tagLine, ", ") as any
  return <Styled.li>Tags: {Array(...tagLine)}</Styled.li>
}

type InfoBlobProps = {
  charm: Charm
  requiresData: any
}

const InfoBlob = ({ charm, requiresData }: InfoBlobProps) => {
  const { cost, type, keywords, duration, essence, tags, splat } = charm

  let keywordBlob: any[] = ["None"]

  if (keywords) {
    if (Array.isArray(keywords) && keywords.length > 0) {
      // TODO: when I make the pathify(gameId, splat, "keyword", keyword) path.
      keywordBlob = keywords.map(
        keyword =>
          // <StyledLink
          //   key={keyword}
          //   to={pathify(gameId, splat, "keyword", keyword)}
          // >
          keyword,
        // </StyledLink>
      )
      keywordBlob = Array(intersperse(keywordBlob, ", "))
    } else {
      keywordBlob = [keywords]
    }
  }

  return (
    <Styled.ul>
      <Styled.li>
        Cost: {cost || emdash}; Mins:{" "}
        <TraitRequirement linkTrait charm={charm} />, Essence {essence}
      </Styled.li>
      <Styled.li>Type: {type || "Simple"}</Styled.li>
      <Styled.li>Keywords: {keywordBlob}</Styled.li>
      <Styled.li>Duration: {duration ? duration : "Instant"}</Styled.li>
      <TagLine tags={tags} splat={splat} />
      <RequirementsLine charmlike={charm} requiresData={requiresData} />
    </Styled.ul>
  )
}

const SplatCharmPageLayout: React.FC<any> = ({ data, pageContext }) => {
  const { charm, requires, requiredForInSplat, requiredForOther } = data

  return (
    <Layout>
      <BreadCrumbBar to={[charm.splat, charm.trait]} />
      <Styled.h1
        sx={{
          display: "inline-block",
        }}
      >
        {charm.name}
      </Styled.h1>{" "}
      <GithubEditLink
        sx={{
          verticalAlign: "baseline",
        }}
        file={charm.mdx.file}
      />
      <InfoBlob charm={charm} requiresData={requires} />
      <MDXRenderer>{charm.mdx.body}</MDXRenderer>
      <BuildsToLine requiredForData={requiredForInSplat} />
      <BuildsToLine requiredForData={requiredForOther} />
    </Layout>
  )
}

export default SplatCharmPageLayout
