/** @jsx jsx */
import { jsx } from "@emotion/core"
import React from "react"
import { Link } from "gatsby"
import { Charmlike } from "../../nodes/Charmlike"
import { Charm } from "../../nodes/Charm"
import { pathify } from "@ludobrew/core/gatsbyNodeTools"
import { TraitRequirement } from "./Charm/CharmData"

function* intersperse(iterable: Iterable<any>, separator: any) {
  let first = true
  for (const item of iterable) {
    if (!first) {
      yield separator
    }
    first = false
    yield item
  }
  return
}

const RequirementLink: React.FC<{ charmlike: Charmlike }> = ({ charmlike }) => {
  return <Link to={charmlike.url}>{charmlike.name}</Link>
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
    <>
      <h2>Required for:</h2>
      {requiredForData.group.map(group => (
        <React.Fragment key={group.fieldValue}>
          <h3>
            {group.totalCount} {group.fieldValue} charm
            {group.totalCount > 1 ? "s" : ""}
          </h3>
          <ul>
            {group.links.map(({ charmlike }) => {
              return (
                <li key={charmlike.name}>
                  Essence {charmlike.essence},{" "}
                  {(charmlike as Charm).trait
                    ? `${(charmlike as Charm).trait} ${(charmlike as Charm)
                        .rating || 1}`
                    : ""}
                  : <RequirementLink charmlike={charmlike} />
                </li>
              )
            })}
          </ul>
        </React.Fragment>
      ))}
    </>
  )
}

const RequirementsLine: React.FC<{
  charmlike: Charmlike
  requiresData: RequiresData
  separator?: string
}> = ({ charmlike, requiresData, separator = ", " }) => {
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

  return <React.Fragment>{[...intersperse(results, separator)]}</React.Fragment>
}

const SplatCharmPageLayout: React.FC<any> = ({ data }) => {
  const { charm, requires, requiredForInSplat, requiredForOther } = data
  return (
    <div>
      <h1>{charm.name}</h1>
      <ul>
        <li>
          <TraitRequirement linkTrait charm={charm} />
        </li>
        <li>
          Requires:{" "}
          <RequirementsLine charmlike={charm} requiresData={requires} />{" "}
        </li>
      </ul>
      <BuildsToLine requiredForData={requiredForInSplat} />
      <BuildsToLine requiredForData={requiredForOther} />
    </div>
  )
}

export default SplatCharmPageLayout
