import { GatsbyNode } from "gatsby"

// TODO: props should be auto inferred
const extensionPoint: GatsbyNode['createSchemaCustomization'] = async (props, options) => {
  const { actions } = props
  const { createTypes } = actions

  const typeDefs = `
    enum CharmType {
      splat
      ma
      evocation
      eclipse
      other
    }

    interface Charmlike @nodeInterface {

      id: ID!

      """
      Where it is
      """
      url: String!

      """
      Type of thing
      """
      charmType: CharmType

      """
      Like [Solar], [Crazy Teacup], [Bats in the Belfry Style], [Jam Commissioner Ogwan]
      """
      charmSource: String

      """
      Like for determining "Orator" or "Power" craft charms
      """
      category: String

      """
      Name of charm
      """
      name: String

      """
      Essence prerequisite
      """
      essence: Int

      """
      Simple/Uniform and all that
      """
      type: String

      """
      Mote costs
      """
      cost: String

      """
      Scene/Instant and all that
      """
      duration: String

      """
      List of charms to do
      """
      requires: [String]

      """
      Like "social" or whatever.
      """
      tags: [String]

      """
      Uniform/Decisive-only and all that
      """
      keywords: [String]

      """
      The "lowdown" synopsis of a charm
      """
      shortDescription: String
    }

    type ExaltedCharm implements Node & Charmlike {

      id: ID!

      """
      Where it is
      """
      url: String!

      """
      Type of thing
      """
      charmType: CharmType

      """
      Like [Solar], [Crazy Teacup], [Bats in the Belfry Style], [Jam Commissioner Ogwan]
      """
      charmSource: String

      """
      Like for determining "Orator" or "Power" craft charms
      """
      category: String

      """
      Name of charm
      """
      name: String

      """
      Essence prerequisite
      """
      essence: Int

      """
      Simple/Uniform and all that
      """
      type: String

      """
      Mote costs
      """
      cost: String

      """
      Scene/Instant and all that
      """
      duration: String

      """
      List of charms to do
      """
      requires: [String]

      """
      Like "social" or whatever.
      """
      tags: [String]

      """
      Uniform/Decisive-only and all that
      """
      keywords: [String]

      """
      The "lowdown" synopsis of a charm
      """
      shortDescription: String
    }

    type FriendlyLinkToExaltedCharmlike implements Node {
      id: ID!
      friendlyName: String!
      path: String!
      charmSource: String!
    }

    type RequirementLinkToExaltedCharmlike implements Node {
      id: ID!
      requirement: String!
      path: String!
      charmSource: String!
    }
  `
  createTypes(typeDefs)
  return
}

export default extensionPoint
