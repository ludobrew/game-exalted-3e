import { Node, NodeInput, Actions, CreateNodeArgs } from "gatsby"

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
   * Link info so that other stuff can be automagically hotlinked.
   */
  requirements?: CharmRequirement[]
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
   * Url for thing, should be made on creation of node
   */
  url: string

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
  requires?: string[]

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

type FriendlyLinkToCharmlike = {
  friendlyName: string
  charmlike___NODE: string
  path: string
  charmSource: string
}

type RequirementLinkToCharmlike = {
  requirement: string
  charmlike___NODE: string
  path: string
  charmSource: string
}

export const makeRequirementLinks = (
  node: NodeInput & Charmlike,
  props: CreateNodeArgs,
) => {
  const { createNodeId, createContentDigest, actions } = props
  const { createNode, createParentChildLink } = actions

  if (!node.requires) {
    return
  }

  for (const requirement of node.requires) {
    const requirementLinkToCharmData = {
      path: node.url,
      charmlike___NODE: node.id,
      requirement,
      charmSource: node.charmSource,
    }

    const requirementLinkToCharm: NodeInput & RequirementLinkToCharmlike = {
      ...requirementLinkToCharmData,
      parent: node.id,
      id: createNodeId(`
        RequirementLinkToCharmlike
        ${requirement}
        from ${node.id}
      `),
      internal: {
        type: `RequirementLinkToExaltedCharmlike`,
        contentDigest: createContentDigest(requirementLinkToCharmData),
        description: "Points from a friendly name to a charm that wants it",
      },
    }

    createNode(requirementLinkToCharm)
    createParentChildLink({
      //@ts-ignore child is defined as Node when it could be NodeInput
      parent: node,
      //@ts-ignore child is defined as Node when it could be NodeInput
      child: requirementLinkToCharm,
    })
  }
}

/**
 * Makes the "generic and general" matchers for finding a particular Ox-Body vs a different one
 * @param node The new node to make (charmlike)
 * @param props The props from gastsby onCreateNode
 */
export const makeFriendlyLinks = (
  node: NodeInput & Charmlike,
  props: CreateNodeArgs,
) => {
  const { createNodeId, createContentDigest, actions } = props
  const { createNode, createParentChildLink } = actions

  const friendlyLinkTocharmlikeGenericData = {
    path: node.url,
    charmlike___NODE: node.id,
    friendlyName: node.name,
    charmSource: node.charmSource,
  }

  const friendlyLinkToGenericCharmlike: NodeInput & FriendlyLinkToCharmlike = {
    ...friendlyLinkTocharmlikeGenericData,
    parent: node.id,
    id: createNodeId(`
      FriendlyLinkToExaltedCharmlike
      Generic
      ${node.id}
    `),
    internal: {
      type: `FriendlyLinkToExaltedCharmlike`,
      contentDigest: createContentDigest(friendlyLinkTocharmlikeGenericData),
      description: "It does stuff",
    },
  }

  createNode(friendlyLinkToGenericCharmlike)
  createParentChildLink({
    //@ts-ignore child is defined as Node when it could be NodeInput
    parent: node,
    //@ts-ignore child is defined as Node when it could be NodeInput
    child: friendlyLinkToGenericCharmlike,
  })

  const friendlyLinkToSpecificCharmlikeData = {
    path: node.url,
    friendlyName: `${node.charmSource} ${node.name}`,
    charmlike___NODE: node.id,
    charmSource: node.charmSource,
  }

  const cannonicalLinkToSpecificCharmlike: NodeInput &
    FriendlyLinkToCharmlike = {
    ...friendlyLinkToSpecificCharmlikeData,
    parent: node.id,
    id: createNodeId(`
      FriendlyLinkToExaltedCharmlike
      Specific
      ${node.id}
    `),
    internal: {
      type: `FriendlyLinkToExaltedCharmlike`,
      contentDigest: createContentDigest(friendlyLinkToSpecificCharmlikeData),
      description: "It does stuff",
    },
  }

  createNode(cannonicalLinkToSpecificCharmlike)
  //@ts-ignore child is defined as Node when it could be NodeInput
  createParentChildLink({
    //@ts-ignore child is defined as Node when it could be NodeInput
    parent: node,
    //@ts-ignore child is defined as Node when it could be NodeInput
    child: cannonicalLinkToSpecificCharmlike,
  })
}
