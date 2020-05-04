// content: artifact
// name: Grand Oak Weights
import { NodeInput } from "gatsby"
import { pathify } from "gatsby-theme-ludobrew-core/gatsbyNodeTools"
import { Charmlike } from "./Charmlike"
import * as yup from "yup"
import { buildHandler, FrontmatterHandler, makeAndLinkNode } from "./types"

const basePath = "gatsby-theme-ludobrew-exalted-3e/src/components"
const artifactNodeType = "ExaltedArtifact"

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

export type Evocation = {
  artifact: string
} & Charmlike

const baseArtifactValidator = yup.object({
  content: yup
    .string()
    .lowercase()
    .matches(/artifact/)
    .required(),
  name: yup.string().required(),
  type: yup
    .string()
    .lowercase()
    .oneOf(["weapon", "armor", "other", null])
    .nullable()
    .default(null),
  rating: yup.number().min(2).max(6).nullable().required(),
  materials: yup.array().of(yup.string()).default([]),
  tags: yup.array().of(yup.string()).default([]),
})
export type BaseArtifact = yup.InferType<typeof baseArtifactValidator>

const artifactWeaponValidator = yup.object({
  type: yup.string().lowercase().matches(/armor/).required(),
  weight: yup
    .string()
    .lowercase()
    .oneOf(["light", "medium", "heavy"])
    .default("light"),
  accuracy: yup.number().notRequired(),
  overwhelming: yup.number().notRequired(),
  defense: yup.number().notRequired(),
  attunement: yup.string().notRequired(),
})

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

const artifactHandler: FrontmatterHandler<BaseArtifact> = ({
  result,
  args,
}) => {
  const { node: mdxNode, createContentDigest, createNodeId } = args
  const { name } = result
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

export const handlesContent = {
  artifact: buildHandler({
    validator: baseArtifactValidator,
    handler: artifactHandler,
  }),
  // evocation: buildHandler({
  //   validator: evocationValidator,
  //   handler: evocationHandler,
  // }),
}
