import { GatsbyNode, ParentSpanPluginArgs, Node } from "gatsby"
import { charmNodeType } from "./Charm"

export type CharmType = "splat" | "ma" | "evocation" | "eclipse" | "other"
export const charmNodeTypes = ["ExaltedCharm"] as const

export type CharmlikeNode<T> = T & {
  fields: CharmlikeNodefields
} & Node

export type CharmlikeNodefields = {
  /**
   * File path for error messages, should be made on creation of node
   */
  filePath: string

  /**
   * Url for thing, should be made on creation of node
   */
  url: string

  /**
   * Link info so that other stuff can be automagically hotlinked.
   */
  requirements?: CharmRequirement[]
}

type DependancyObject = {
  needs: ({ node: Charmlike; source?: string })[]
  sources: Partial<Record<string, CharmlikeNode<Charmlike>>>
}

/**
 * ```
 * dependencyObjects:
 *  "Ox Body Technique":
 *    needs: [nodeA, nodeB]
 *    sources:
 *      Solar: nodeC
 *      Lunar: nodeQ
 *      2SS:   nodeX
 *      "A bat or something": null //will never happen
 * ```
 */
type LinkCollection = Partial<Record<string, DependancyObject>>
const linkingThing: LinkCollection = {}

/**
 * ```
 * "Solar":
 *    "Ox Body Technique": {
 *       node
 *       Charmlink[]
 * ```
 */
type FinalizeList = {
  [splat: string]: {
    [charm: string]: {
      node: CharmlikeNode<Charmlike>
      links: CharmRequirement[]
    }
  }
}
const finalThing: FinalizeList = {}

/**
 * Safely get a link
 * @param name Name of charm/evocation or whatever
 */
const getLink = (name: string): DependancyObject => {
  const link = linkingThing[name]
  if (link) {
    return link
  }
  return { needs: [], sources: {} }
}

/**
 * Puts all requires into the linkingThing to be compiled later, or in the case
 * of "entry charms", sets the node.fields.requirements to null
 * @param args requires should be the charm.requires to start with
 */
const putRequirementsInLinks = (args: {
  node: Node & Charmlike
  /**
   * The node.requires for Charmlikes to get the party started
   */
  requires: any
  nodeApi: ParentSpanPluginArgs
}) => {
  const { node, requires, nodeApi } = args
  const { actions, reporter } = nodeApi
  const { createNodeField } = actions

  // do this rigamarole for each individual requirement
  if (Array.isArray(requires)) {
    requires.forEach(requirement =>
      putRequirementsInLinks({ node, requires: requirement, nodeApi }),
    )
  }

  // Single charm requirement, place in links.
  if (typeof requires == "string") {
    switch (requires.toLowerCase()) {
      case "none":
      case "":
        // If they "say none" on purpose or
        // by accident we'll display a pretty none later
        createNodeField({ node, name: "requirements", value: null })
        return
      default:
        // Add it to the guys who need this.
        const link = getLink(requires)
        link.needs.push({ node })
        return
    }
  }

  if (typeof requires == "object") {
    const { name, source } = requires as CharmRequirement
    const link = getLink(name)
    link.needs.push({ node, source })
    return
  }

  // It's not there
  createNodeField({ node, name: "requirements", value: null })
  return
}

export const charmOnPreBootstrap: GatsbyNode["onPreBootstrap"] = (
  nodeApi,
  options,
) => {
  const { actions, getNodesByType, reporter } = nodeApi
  const { createNodeField } = actions
  // TODO: getNodesByType typing
  const charmNodes: CharmlikeNode<Charmlike>[] = [charmNodeType]
    .map(getNodesByType as ((s: string) => CharmlikeNode<Charmlike>[]))
    .flat()

  // Process CharmNodes
  for (const i in charmNodes) {
    // //TODO: test if this is needed
    // // Skip things like "length"
    // if (!charmNodes.hasOwnProperty(i)) {
    //   continue
    // }

    const node = charmNodes[i]

    // Provide this charm in the network
    const thisLink = getLink(node.name)
    thisLink.sources[node.charmSource] = node

    // Add this node to the goal doodad
    const splat = finalThing[node.charmSource] || {}
    const charmEntry = splat[node.name]
    if (!charmEntry) {
      splat[node.name] = { node, links: [] }
    } else {
      reporter.panic(
        `Another ${node.splat} charm with the the name ${node.name} exists!
fileA: ${node.fields.filePath}
fileB: ${charmEntry.node.fields.filePath}`,
      )
    }

    // Process requirements if present
    putRequirementsInLinks({ node, nodeApi, requires: node.requires })
  }

  for (const charmName in linkingThing) {
    const item = linkingThing[charmName]
    if (!item) {
      reporter.panic(`Dependancy object resulted in nothing for ${charmName}`)
      continue
    }

    const { needs, sources } = item
    for (const need of needs) {
      const wantingNode = need.node
      const wantingSource = need.source || wantingNode.charmSource
      const sourceNode = sources[wantingSource]
      if (sourceNode) {
        finalThing[wantingNode.charmSource][wantingNode.name].links.push({
          name: sourceNode.name,
          source: sourceNode.charmSource,
          link: sourceNode.fields.url,
          id: sourceNode.id,
        })
      } else {
        // That is fine, dependancy could be like "Strength 3" and that's never a charm like that
      }
    }
  }

  for (const splatName in finalThing) {
    const charmlist = finalThing[splatName]
    for (const charmName in charmlist) {
      const { node, links } = charmlist[charmName]
      createNodeField({ node, name: "requirements", value: links })
    }
  }
}

export type CharmRequirement = {
  source: string // [Solar, 2SS], [Crazy Teacup], [Bats in the Belfry Style], [Jam Commissioner Ogwan]
  name: string
  link?: string
  id?: string
}

export type Charmlike = {
  /**
   * Type of thing
   */
  charmType: CharmType

  /**
   * Like [Solar], [Crazy Teacup], [Bats in the Belfry Style], [Jam Commissioner Ogwan]
   */
  charmSource: string

  /**
   * Name of charm
   */
  name: string

  /**
   * Essence prerequisite
   */
  essence: number

  /**
   * Simple/Uniform and all that
   */
  type: string

  /**
   * Mote costs
   */
  cost: string

  /**
   * Scene/Instant and all that
   */
  duration: string

  /**
   * List of charms to do
   */
  requires?: [CharmRequirement | string] | CharmRequirement | string

  /**
   * Like "social" or whatever.
   */
  tags: string[]

  /**
   * Uniform/Decisive-only and all that
   */
  keywords: string[] | string

  /**
   * The "lowdown" synopsis of a charm
   */
  shortDescription: string
}
