import { CreateNodeArgs, PluginOptions, Node, NodeInput } from "gatsby"
import { Charmlike, CharmlikeNode, makeCharmlikeNode } from "../Charmlike"
import { generateFrontmatterCheckers } from "@ludobrew/core/markdown"
import { FileNode, pathify } from "@ludobrew/core/gatsbyNodeTools"
import { gameId } from "@ludobrew/game-exalted-3e/src/data"

export const charmNodeType = "ExaltedCharm" as const

const types = ["preface", "charm"] as const

type RawCharmMDXNode = {
  frontmatter: AcceptedCharmMDXFrontmatter | AcceptedPrefaceMDXFrontmatter
} & Node

type AcceptedCharmMDXFrontmatter = {
  content: "charm"
} & Partial<Charm>

type AcceptedPrefaceMDXFrontmatter = {
  content: "preface"
} & Partial<CharmPagePreface>

type CharmPagePreface = {
  trait: string
  splat: string
}

type CharmPagePrefaceNode = CharmPagePreface & NodeInput

const keys = ["a", "b"] as const

const result: Record<typeof keys[number], number> = {
  a: 1,
  b: 2,
}

export const allCharmlikeProperties: Array<keyof Charmlike> = [
  "charmType",
  "charmSource",
  "name",
  "essence",
  "type",
  "cost",
  "duration",
  "requires",
  "tags",
  "keywords",
  "shortDescription",
]

const requiredCharmFrontmatter = ["trait", "splat", "rating"]
export type Charm = {
  trait: string
  splat: string
  rating: number
} & Charmlike

export const allCharmProperties: Array<keyof Charm> = [
  ...allCharmlikeProperties,
  ...(requiredCharmFrontmatter as Array<keyof Charm>),
]

export type CharmNode = CharmlikeNode<Charm>

export const makeCharmNode = (
  props: CreateNodeArgs,
  fileNode: FileNode,
  _?: PluginOptions,
) => {
  const { node: mdxNode, reporter, createContentDigest, createNodeId } = props
  const {
    content,
    ...otherFrontmatter
  } = (mdxNode as RawCharmMDXNode).frontmatter
  const { errorMessage, valuesPresent } = generateFrontmatterCheckers(
    requiredCharmFrontmatter,
  )

  switch (content) {
    case "preface":
      return
    case "charm":
      valuesPresent(
        requiredCharmFrontmatter,
        otherFrontmatter as Charm,
        fileNode,
        reporter,
      )

      const { name, splat, trait } = otherFrontmatter as Charm

      // Should make
      //  /solar/athletics/gripping-sunlight

      const newNode: NodeInput & Charmlike = {
        charmType: "splat",
        charmSource: splat,
        ...(otherFrontmatter as Charm),
        parent: mdxNode.id,
        url: pathify(gameId, splat, trait, name),
        id: createNodeId(`${mdxNode.id} >>> ExaltedCharm${splat}${name}`),
        friendlyNames: [`${splat} ${name}`, name],
        internal: {
          type: charmNodeType,
          contentDigest: createContentDigest(otherFrontmatter),
          description: "It does stuff",
        },
      }
      makeCharmlikeNode(props, newNode, mdxNode)
      return
    default:
      reporter.error(errorMessage(fileNode, "content", types))
  }
}
