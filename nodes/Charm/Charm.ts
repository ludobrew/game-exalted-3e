import { CharmlikeNode, charmlikeValidator } from "../Charmlike"
import { pathify } from "gatsby-theme-ludobrew-core/gatsbyNodeTools"
import * as yup from "yup"
import { FrontmatterHandler, makeAndLinkNode, buildHandler } from "../types"

export const charmNodeType = "ExaltedSplatCharm" as const

export type SplatCharmAdditionalProperties = {
  trait: string
  splat: string
  rating?: number | null
}

const charmValidator = charmlikeValidator.shape<SplatCharmAdditionalProperties>(
  {
    trait: yup.string().required(),
    splat: yup
      .string()
      .required((result) =>
        JSON.stringify({ ...result, e: "Splat was wonky" }),
      ),
    rating: yup.number().notRequired().nullable().default(1),
  },
)

export type Charm = yup.InferType<typeof charmValidator>
export type CharmNode = Charm & CharmlikeNode

const splatCharmHandler: FrontmatterHandler<Charm> = ({ result, args }) => {
  const { name, splat, trait } = result
  const { createContentDigest, createNodeId, node: parentNode } = args

  // Should make
  //  /solar/athletics/gripping-sunlight

  const newNode: CharmNode = {
    charmType: "splat",
    charmSource: splat,
    ...result,
    parent: parentNode.id,
    url: pathify(splat, trait, name),
    id: createNodeId(`${parentNode.id} >>> ExaltedSplatCharm${splat}${name}`),
    friendlyNames: [`${splat} ${name}`, name],
    internal: {
      type: charmNodeType,
      contentDigest: createContentDigest(result),
      description: "It does stuff",
    },
  }

  makeAndLinkNode({ args, newNode, parentNode })
  return
}
export const handlesContent = {
  charm: buildHandler({
    validator: charmValidator,
    handler: splatCharmHandler,
  }),
}
