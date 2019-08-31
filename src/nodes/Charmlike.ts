import { resolve } from "path";

export type CharmType =   "splat" | "ma" | "evocation" | "eclipse" | "other"

export type CharmRequirement = {
  charmType: CharmType
  charmSource: string // [Solar, 2SS], [Crazy Teacup], [Bats in the Belfry Style], [Jam Commissioner Ogwan]
  name: string
  id?: string
}

export type Charmlike = {
  /**
   * Type of thing
   */
  charmType: CharmType

  /**
   * Like [Solar, 2SS], [Crazy Teacup], [Bats in the Belfry Style], [Jam Commissioner Ogwan]
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
  requirements?: [CharmRequirement | string] | CharmRequirement | string

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


type DependancyObject = {
  needs: string[]
  sources: Partial<Record<string, string>>
}

const dependencyObjects : Record<string, DependancyObject> = {}

/**
 * dependencyObjects:
 *  "Ox Body Technique":
 *    needs: [id3, id4]
 *    sources:
 *      Solar: id1
 *      Lunar: id2
 *      2SS:   id7
 *      "A bat or something": null //will never happen
 *
 *
 * onCreateNode(charmlike)
 *  for raw in charmlike.requirements
 *    if (raw.source) {
 *      // then it's already fleshed out
 *      fill in
 *    }
 *  dependencyObject = dependencyObjects[charmlike.name]
 *  if ! dependencyObject
 *    dependancyObject = { sources: {}, needs: [] }
 *    dependencyObjects[charmlike.name] = dependencyObject
 *
 *  //Some form of switch for each type here
 *  sourceId = dependancyObject.sources[charmlike.charmSource]
 *  if sourceId
 *    fetchIds(dependancyObject.needs)
 *    recombobulate(dependancyObject.needs)
 *  else
 *    dependancyObject.sources[charmlike.charmSource] = charmlike.id
 */


const onCreateNode = (charmlike: Charmlike, nodeId: string) => {

  //  for raw in charmlike.requirements
  //    if (raw.source) {
  //      // then it's already fleshed out
  //      fill in
  //    }
    let dependencyObject = dependencyObjects[charmlike.name]
    if (! dependencyObject) {
      dependencyObject = { sources: {}, needs: [] }
      dependencyObjects[charmlike.name] = dependencyObject
   }


    //Some form of switch for each type here
    let sourceId = dependencyObject.sources[charmlike.charmSource]
    if (sourceId){
      //fetchIds(dependencyObject.needs)
      //recombobulate(dependencyObject.needs)
    } else {
      dependencyObject.sources[charmlike.charmSource] = nodeId
    }

}

export const parseCharmRequirements = (charmlike: Charmlike): [CharmRequirement] => {
  if(charmlike)
  // trait: string
  // splat: string
  // rating: number
  return []
}
