// content: artifact
// name: Grand Oak Weights
import { NodeInput } from "gatsby"
import { pathify } from "gatsby-theme-ludobrew-core/gatsbyNodeTools"
import { Charmlike, charmlikeValidator } from "./Charmlike"
import * as yup from "yup"
import { buildHandler, FrontmatterHandler, makeAndLinkNode } from "./types"

const basePath = "gatsby-theme-ludobrew-exalted-3e/src/components"
const artifactNodeType = "ExaltedArtifact"
const evocationNodeType = "ExaltedEvocation"

//@ts-ignore
const artifactTypePageComponent = require.resolve(
  `${basePath}/ArtifactTypePageComponent`,
)
// weight: ~ # One of light/medium/heavy or ~ for "not applicable"
// type: other # One of weapon, armor, or other

// rating: 2 # 2-6 where 6 is n/a

// shortDescription: ~

// materials: [] # Primary MMs for indexing
// tags: [Movement]

const baseArtifactValidator = yup.object({
  content: yup
    .string()
    .lowercase()
    .matches(/artifact/)
    .required(),
  name: yup.string().required(),
  type: yup.string().lowercase().nullable().default(null),
  rating: yup.number().min(2).max(6).nullable().required(),
  materials: yup.array().of(yup.string()).nullable().default([]),
  resonance: yup.array().of(yup.string()).nullable().default([]),
  hearthstoneSlots: yup.number().nullable().notRequired().default(0),
  attunement: yup.string().nullable().notRequired().default(null),
  tags: yup.array().of(yup.string()).nullable().default([]),
})
export interface BaseArtifact
  extends yup.TypeOf<typeof baseArtifactValidator> {}

interface ArtifactWeaponAdditionalProperties extends BaseArtifact {
  type: "weapon"
  weight: ArtifactWeight
  damage?: number | null
  accuracy?: number | null
  overwhelming?: number | null
  defense?: number | null
  combatTypes: CombatType[]
}

/**
 * Melee is "something that can be used as a regular weapon"
 */
export type CombatType = "archery" | "thrown" | "melee"

const artifactWeaponValidator: yup.SchemaOf<ArtifactWeaponAdditionalProperties> = baseArtifactValidator.shape(
  {
    type: yup.string().lowercase().equals(["weapon"]).required(),
    combatTypes: yup
      .array(yup.string().equals(["archery", "thrown", "melee"]))
      .notRequired()
      .nullable()
      .default(["melee"]),
    weight: yup
      .string()
      .lowercase()
      .oneOf([
        "light",
        "medium",
        "heavy",
        null,
      ]) as yup.SchemaOf<ArtifactWeight>,
    damage: yup.number().notRequired().default(null),
    accuracy: yup.number().notRequired().default(null),
    overwhelming: yup.number().notRequired().default(null),
    defense: yup.number().notRequired().default(null),
  },
)

const getWeaponWithDefaults = (artifact: ArtifactWeapon): ArtifactWeapon => {
  const defaults: Partial<ArtifactWeapon> = {}
  switch (artifact.weight) {
    // Thrown + Archery:
    // dmg / ow / attunement
    // l: 10 / 3 / 5
    // m: 12 / 4 / 5
    // h: 14 / 5 / 5
    // Note: display ranges probably for thrown things?
    // Inspect tags add additional info?
    //    acc / dmg / def / ow / attunement
    // l: 5 / 10 / 3 / 5
    // m: 3 / 12 / 4 / 5
    // h: 1 / 14 / 5 / 5
    case "light":
      defaults.accuracy = 5
      defaults.damage = 10
      defaults.attunement = "5m"
      defaults.overwhelming = 3
      defaults.defense = 0
      break
    case "medium":
      defaults.accuracy = 3
      defaults.damage = 12
      defaults.attunement = "5m"
      defaults.overwhelming = 4
      defaults.defense = 1
      break
    case "heavy":
      defaults.accuracy = 1
      defaults.damage = 14
      defaults.attunement = "5m"
      defaults.overwhelming = 5
      defaults.defense = 0
      break
  }

  return {
    ...defaults,
    ...artifact,
  }
}

interface EvocationAdditionalProperties extends Charmlike {
  artifact: string
}

const evocationValidator: yup.SchemaOf<EvocationAdditionalProperties> = charmlikeValidator.shape(
  {
    artifact: yup.string().required(),
  },
)

export type Evocation = yup.InferType<typeof evocationValidator>

export type ArtifactWeapon = yup.InferType<typeof artifactWeaponValidator>

/**
 * Null is "not applicable weight" for trinkets or the like
 */
export type ArtifactWeight = "light" | "medium" | "heavy" | null

/**
 * Null or other is for "misc" artifacts
 */
export type ArtifactType = "weapon" | "armor" | "other" | null

// export type Artifact = {
//   content: "artifact"
//   name: string
//   weight?: ArtifactWeight
//   type: ArtifactType
//   /**
//    * Null or 6 is for Art N/A
//    */
//   rating: 2 | 3 | 4 | 5 | 6 | null

//   shortDescription?: string
//   materials: string[]
//   tags: string[]
// }

export type Weapon = BaseArtifact & {
  type: "weapon"
}

const artifactHandler: FrontmatterHandler<BaseArtifact | ArtifactWeapon> = ({
  result,
  args,
}) => {
  const { node: mdxNode, createContentDigest, createNodeId } = args
  const { name, type } = result
  switch (type) {
    case "weapon":
      result = getWeaponWithDefaults(result as ArtifactWeapon)
      break
  }

  const newNode: NodeInput & BaseArtifact = {
    ...result,
    parent: mdxNode.id,
    url: pathify("artifact", name),
    id: createNodeId(`${mdxNode.id} >>> ${artifactNodeType}${name}`),
    internal: {
      type: artifactNodeType,
      contentDigest: createContentDigest(result),
      description: "It does stuff",
    },
  }
  makeAndLinkNode<BaseArtifact>({ args, newNode, parentNode: mdxNode })
  return
}

const evocationHandler: FrontmatterHandler<Evocation> = ({ result, args }) => {
  const { node: mdxNode, createContentDigest, createNodeId } = args
  const { name, artifact } = result
  const newNode: NodeInput & Evocation = {
    ...result,
    parent: mdxNode.id,
    url: pathify("artifact", artifact, name),
    id: createNodeId(
      `${mdxNode.id} >>> ${evocationNodeType}${artifact}${name}`,
    ),
    internal: {
      type: evocationNodeType,
      contentDigest: createContentDigest(result),
      description: "It does stuff",
    },
  }
  makeAndLinkNode<Evocation>({ args, newNode, parentNode: mdxNode })
  return
}

export const handlesContent = {
  artifact: buildHandler({
    validator: baseArtifactValidator,
    handler: artifactHandler,
  }),
  evocation: buildHandler({
    validator: evocationValidator,
    handler: evocationHandler,
  }),
}
