import { Node, NodeInput, CreateNodeArgs } from "gatsby"

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
   * "Name" and "$charmSource $name",
   * could contain colloquialisms in the future
   */
  friendlyNames: string[]

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

export const makeCharmlikeNode = (
  props: CreateNodeArgs,
  newNode: NodeInput & Charmlike,
  parentNode: NodeInput,
) => {
  const { actions } = props
  const { createNode, createParentChildLink } = actions
  createNode(newNode)

  //@ts-ignore child is defined as Node when it could be NodeInput
  createParentChildLink({ parent: parentNode, child: newNode })
}
