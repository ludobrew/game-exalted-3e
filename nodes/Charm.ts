import { CreateNodeArgs, PluginOptions, Node, NodeInput } from "gatsby"
import { Charmlike, CharmlikeNode } from "./Charmlike"
import { generateFrontmatterCheckers } from "@ludobrew/core/markdown"
import { FileNode } from "@ludobrew/core/gatsbyNodeTools"
import dashify from "dashify"
import { resolve } from "path"
import { ThemeOptions, baseSplats } from "../src/data"

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

const requiredCharmFrontmatter = ["trait", "splat", "rating"]
type Charm = {
  trait: string
  splat: string
  rating: number
} & Charmlike

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
  const {
    createNode,
    createParentChildLink,
    createNodeField,
    createPage,
  } = actions
  const { errorMessage, valuesPresent } = generateFrontmatterCheckers(
    requiredCharmFrontmatter,
  )

  const { customSplats } = options as ThemeOptions
  const possibleSplats: string[] = []
  possibleSplats.push(...baseSplats)
  possibleSplats.push(...(customSplats || []))

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

      const { name, splat, trait } = otherFrontmatter as Charm

      const newNode: NodeInput & Charmlike = {
        charmType: "splat",
        charmSource: splat,
        ...(otherFrontmatter as Charm),
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

      // createNodeField({
      //   //@ts-ignore parent is missing on new node input and that is "fine"
      //   node: newNode,
      //   name: "filePath",
      //   value: fileNode.relativePath,
      // })

      // Should make
      //  /solar/athletics/gripping-sunlight
      //  /uags/bureaucracy/little-spider
      const url = "/" + [splat, trait, name].map(s => dashify(s)).join("/")

      //@ts-ignore parent is missing on new node input and that is "fine"
      // createNodeField({ node: newNode, name: "url", value: url })

      const componentPath = resolve(
        __dirname,
        "../src/components/CharmDataProvider.tsx",
      )

      const cannonicalName = dashify(`${newNode.charmSource} ${newNode.name}`)
      createPage({
        component: componentPath,
        path: url,
        context: {
          id: newNode.id,
          required: newNode.requires,
          cannonicalName,
        },
      })
      // createPageDependancy({ path: componentPath, nodeId: newNode.id })

      type CharmlikeConnection = {
        name: string
        charmSource: string
        path: string
        cannonicalName: string
      }

      const charmlikeGenericConnectionData = {
        path: url,
        name: newNode.name,
        cannonicalName,
        charmSource: newNode.charmSource,
      }

      const genericCharmlikeConnection: NodeInput & CharmlikeConnection = {
        ...charmlikeGenericConnectionData,
        id: createNodeId(`
          ExaltedCharmlikeConnection
          Generic
          ${newNode.charmSource}
          ${newNode.name}
        `),
        internal: {
          type: `ExaltedCharmlikeConnection`,
          contentDigest: createContentDigest(charmlikeGenericConnectionData),
          description: "It does stuff",
        },
      }

      createNode(genericCharmlikeConnection)
      createParentChildLink({
        //@ts-ignore child is defined as Node when it could be NodeInput
        parent: newNode,
        //@ts-ignore child is defined as Node when it could be NodeInput
        child: genericCharmlikeConnection,
      })

      const specificCharmlikeConnectionData = {
        path: url,
        name: `${newNode.charmSource} ${newNode.name}`,
        cannonicalName,
        charmSource: newNode.charmSource,
      }

      const specificCharmlikeConnection: NodeInput & CharmlikeConnection = {
        ...specificCharmlikeConnectionData,
        id: createNodeId(`
          ExaltedCharmlikeConnection
          Specific
          ${newNode.charmSource}
          ${newNode.name}
        `),
        internal: {
          type: `ExaltedCharmlikeConnection`,
          contentDigest: createContentDigest(specificCharmlikeConnectionData),
          description: "It does stuff",
        },
      }

      createNode(specificCharmlikeConnection)
      //@ts-ignore child is defined as Node when it could be NodeInput
      createParentChildLink({
        //@ts-ignore child is defined as Node when it could be NodeInput
        parent: newNode,
        //@ts-ignore child is defined as Node when it could be NodeInput
        child: specificCharmlikeConnection,
      })

      console.log(`Made ${url} from ${fileNode.relativePath}`)
      console.log(
        `   Generic connection id: ${genericCharmlikeConnection.id} ${genericCharmlikeConnection.cannonicalName}`,
      )
      console.log(
        `  Specific connection id: ${specificCharmlikeConnection.id} ${genericCharmlikeConnection.cannonicalName}`,
      )

      return
    default:
      reporter.error(errorMessage(fileNode, "content", types))
  }
}
