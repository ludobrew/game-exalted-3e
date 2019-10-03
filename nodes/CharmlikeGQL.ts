export const CharmRequirementGQL = `
type CharmRequirement {
  source: String!
  name: String!
  link: String
  id: String
}
`

export const CharmtypeEnumGQL = `
enum CharmType = {
  splat
  ma
  evocation
  eclipse
  other
}
`

export const CharmlikeGQL = `
interface Charmlike {
  """
  Type of thing
  """
  charmType: CharmType

  """
  Like [Solar], [Crazy Teacup], [Bats in the Belfry Style], [Jam Commissioner Ogwan]
  """
  charmSource: String

  """
  Name of charm
  """
  name: String

  """
  Essence prerequisite
  """
  essence: number

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
  requires: [CharmRequirement | String] | CharmRequirement | String

  """
  Like "social" or whatever.
  """
  tags: [String]

  """
  Uniform/Decisive-only and all that
  """
  keywords: [String] | String

  """
  The "lowdown" synopsis of a charm
  """
  shortDescription: String
}
`
