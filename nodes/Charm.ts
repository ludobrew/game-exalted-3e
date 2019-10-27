import {
  CreateNodeArgs,
  PluginOptions,
  Node,
  NodeInput,
  CreatePagesArgs,
} from "gatsby"
import {
  Charmlike,
  CharmlikeNode,
  makeFriendlyLinks,
  makeRequirementLinks,
} from "./Charmlike"
import { generateFrontmatterCheckers } from "@ludobrew/core/markdown"
import { FileNode } from "@ludobrew/core/gatsbyNodeTools"
import dashify from "dashify"
import { resolve } from "path"
import { ThemeOptions, baseSplats } from "./data"
import { pathify } from "@ludobrew/core/gatsbyNodeTools"

export const charmNodeType = "ExaltedCharm" as const

const splatPageComponent = resolve(
  __dirname,
  "../src/providers/SplatPageProvider.tsx",
)

const splatTraitPageComponent = resolve(
  __dirname,
  "../src/providers/SplatTraitPageProvider.tsx",
)

const splatCharmPageComponent = resolve(
  __dirname,
  "../src/providers/SplatCharmPageProvider.tsx",
)

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
  const { createNode, createParentChildLink, createPage } = actions
  const { errorMessage, valuesPresent } = generateFrontmatterCheckers(
    requiredCharmFrontmatter,
  )

  switch (content) {
    case "preface":
      console.log(`Doing preface ${fileNode.relativePath}`)
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
      //  /uags/bureaucracy/little-spider
      const url = "/" + [splat, trait, name].map(s => dashify(s)).join("/")

      const newNode: NodeInput & Charmlike = {
        charmType: "splat",
        charmSource: splat,
        ...(otherFrontmatter as Charm),
        parent: mdxNode.id,
        url,
        id: createNodeId(`${mdxNode.id} >>> ExaltedCharm${splat}${name}`),
        internal: {
          type: charmNodeType,
          contentDigest: createContentDigest(otherFrontmatter),
          description: "It does stuff",
        },
      }
      createNode(newNode)
      //@ts-ignore child is defined as Node when it could be NodeInput
      createParentChildLink({ parent: mdxNode, child: newNode })

      makeRequirementLinks(newNode, props)
      makeFriendlyLinks(newNode, props)
      return
    default:
      reporter.error(errorMessage(fileNode, "content", types))
  }
}

const makeIndividualCharmPages = async (
  args: CreatePagesArgs,
  themeOptions?: PluginOptions,
) => {
  const { actions, graphql } = args
  const { createPage } = actions

  const { errors, data } = await graphql(`
    {
      allExaltedCharm {
        nodes {
          id
          url
          name
          requires
          charmSource
        }
      }
    }
  `)

  if (errors) {
    throw errors
  }

  for (const node of data.allExaltedCharm.nodes) {
    createPage({
      path: node.url,
      component: splatCharmPageComponent,
      context: {
        id: node.id,
        charmSource: node.charmSource,
        requires: node.requires || [],
        names: [node.name, `${node.charmSource} ${node.name}`],
      },
    })
  }

  return
}

const simpleGraphql = async (
  graphql: (query: string) => any,
  query: string,
) => {
  const { errors, data } = await graphql(query)
  if (errors) {
    throw errors
  }
  return data
}

const makeSplatPages = async (
  args: CreatePagesArgs,
  themeOptions?: PluginOptions,
) => {
  const { actions, graphql } = args
  const { createPage } = actions

  const splatListing = await simpleGraphql(
    graphql,
    `
    {
      allExaltedCharm(filter: { charmType: { eq: splat } }) {
        distinct(field: charmSource)
      }
    }
  `,
  )

  for (const splat of splatListing.allExaltedCharm.distinct) {
    createPage({
      path: pathify(splat),
      component: splatPageComponent,
      context: {
        splat,
      },
    })

    const traitListing = await simpleGraphql(
      graphql,
      `
      {
        allExaltedCharm(
          filter: {
            charmType: {eq: splat},
            charmSource: {eq: "${splat}"},
          }
        ) {
          distinct(field: trait)
        }
      }
    `,
    )

    for (const trait of traitListing.allExaltedCharm.distinct) {
      createPage({
        path: pathify(splat, trait),
        component: splatTraitPageComponent,
        context: {
          splat,
          trait,
        },
      })
    }
  }

  return
}
export const makeCharmPages = async (
  args: CreatePagesArgs,
  themeOptions?: PluginOptions,
) => {
  return Promise.all([
    makeIndividualCharmPages(args, themeOptions),
    makeSplatPages(args, themeOptions),
  ])
}
