import {
  CreateNodeArgs,
  PluginOptions,
  Node,
  Reporter,
  NodeInput,
} from "gatsby"
import { Charmlike, CharmRequirement } from "./Charmlike"
import { generateFrontmatterCheckers } from "@ludobrew/core/markdown"
import { FileNode } from "@ludobrew/core/gatsbyNodeTools"

export const charmNodeType = "ExaltedCharm" as const

type NewNode = NodeInput & {
  internal: {}
}

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

const requiredCharmFrontmatter = ["trait", "splat", "rating"]
type Charm = {
  trait: string
  splat: string
  rating: number
} & Charmlike

export type CharmNode = Charm &
  Node & {
    /**
     * Created after linking everything up
     */
    fields?: {
      /**
       * Link info so that other stuff can be automagically hotlinked.
       */
      requirements?: CharmRequirement[]
    }
  }

const simpleResolver = (field: string, type: string, fallback: any) => {
  return {
    type,
    resolve: (parent: Record<any, any>) => parent[field] || fallback,
  }
}

export const makeCharmNode = (
  props: CreateNodeArgs,
  fileNode: FileNode,
  options?: PluginOptions,
) => {
  const {
    node: mdxNode,
    reporter,
    actions,
    createContentDigest,
    createNodeId,
  } = props
  const {
    content,
    ...otherFrontmatter
  } = (mdxNode as RawCharmMDXNode).frontmatter
  const { createNode, createParentChildLink } = actions
  const { errorMessage, valuesPresent } = generateFrontmatterCheckers(
    requiredCharmFrontmatter,
  )

  switch (content) {
    case "preface":
      console.log(`Doing preface ${fileNode.relativePath}`)
      return
    case "charm":
      console.log("Doing charm")
      valuesPresent(
        requiredCharmFrontmatter,
        otherFrontmatter as Charm,
        fileNode,
        reporter,
      )

      const { name, splat } = otherFrontmatter as Charm

      const newNode: NodeInput = {
        ...otherFrontmatter,
        id: createNodeId(`ExaltedCharm${splat}${name}`),
        internal: {
          type: charmNodeType,
          contentDigest: createContentDigest(otherFrontmatter),
          description: "It does stuff",
        },
      }
      console.log(`Made ${fileNode.relativePath}`)
      createNode(newNode)

      //@ts-ignore child is defined as Node when it could be NodeInput
      // createParentChildLink({ parent: mdxNode, child: newNode })
      return
    default:
      reporter.error(errorMessage(fileNode, "content", types))
  }
}
