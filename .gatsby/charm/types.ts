export interface Charmlike {
  /**
   * Type of thing
   */
  content: "charm" | "ma" | "macharm" | "evocation"

  /**
   * Name of charm
   */
  name: string

  /**
   * Essence prerequisite
   * @default 1
   */
  essence: number

  /**
   * Simple/Uniform and all that
   * @default "Permanent"
   */
  type: string

  /**
   * Mote costs
   * @default "—" (emdash)
   */
  cost: string

  /**
   * Scene/Instant and all that
   * @default "Permanent"
   */
  duration: string

  /**
   * List of charms required for this charm
   */
  requires: string[]

  /**
   * Uniform/Decisive-only and all that
   */
  keywords: string[]

  /**
   * The "lowdown" synopsis of a charm
   */
  shortDescription?: string

  /**
   *
   */
  mechanicalShorthand?: string

  /**
   * Like "social" or whatever.
   */
  tags: string[]
}

export type Charm = Omit<Charmlike, "content"> & {
  content: "charm"

  /**
   * The splat like Solar, or "My Homebrew Name"
   */
  splat: string

  /**
   * The type like Sail, Strength or Malfeus
   */
  trait: string

  /**
   * How much of X trait do you need? If you need other stats or requirements,
   * add them to `requires` instead
   * @default 1
   */
  rating: number

  /**
   * An optional subtree to put it under
   */
  tree?: string
}
