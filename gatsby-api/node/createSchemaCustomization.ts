import { GatsbyNode } from "gatsby"

const charmlikeInterface = `
"""
Generated names to check for auto-linking
"""
friendlyNames: [String!]!

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
tree: String

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
`

// TODO: props should be auto inferred
const extensionPoint: GatsbyNode["createSchemaCustomization"] = async (
  props,
  options,
) => {
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
      ${charmlikeInterface}
    }

    type ExaltedCharm implements Node & Charmlike {
      id: ID!
      ${charmlikeInterface}
    }
  `
  createTypes(typeDefs)
  return
}

export default extensionPoint
