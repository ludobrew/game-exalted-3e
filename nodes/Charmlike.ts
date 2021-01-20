import { NodeInput } from "gatsby"
import * as yup from "yup"

export type CharmType = "splat" | "ma" | "evocation" | "eclipse" | "other"

export const charmNodeTypes = ["ExaltedSplatCharm"] as const

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

export interface Charmlike {
  /**
   * Name of charm
   */
  name: string

  /**
   * Essence prerequisite, defaults to essence 1
   */
  essence?: number | null

  /**
   * Simple/Uniform and all that
   */
  type?: string | null

  /**
   * Mote costs, default is "None (emdash)"
   */
  cost?: string | null

  /**
   * Scene/Instant and all that, default is "Permanent (no duration)"
   */
  duration?: string | null

  /**
   * List of charms to do
   */
  requires?: string[]

  /**
   * Like "social" or whatever.
   */
  tags?: string[] | null

  /**
   * Uniform/Decisive-only and all that
   */
  keywords?: string[] | null

  /**
   * The "lowdown" synopsis of a charm
   */
  shortDescription?: string | null
}

export type CharmlikeNode = Charmlike &
  NodeInput & {
    /**
     * Like [Solar], [Crazy Teacup], [Bats in the Belfry Style], [Jam Commissioner Ogwan]
     */
    charmSource: string

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
  }

export const charmlikeValidator: yup.SchemaOf<Charmlike> = yup.object({
  requires: yup.array(yup.string()).notRequired().nullable().default([]),
  type: yup.string().notRequired().default("Permanent"),
  duration: yup.string().notRequired().default("Permanent"),
  cost: yup.string().trim().notRequired().nullable().default("—"),
  essence: yup.number().notRequired().default(1),
  keywords: yup.array(yup.string()).notRequired().nullable().default([]),
  name: yup.string().required("You are missing a name"),
  shortDescription: yup.string().nullable().notRequired(),
  tags: yup.array(yup.string()).notRequired().default([]),
})
