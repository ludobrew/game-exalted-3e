import { CreateNodeArgs, PluginOptions, CreatePagesArgs } from "gatsby"
import { FileNode, getSourceInstanceName } from "@ludobrew/core/gatsbyNodeTools"
import { contentDirectories } from "./data"
import path from "path"
import glob from "glob"
import { makeCharmNode } from "./Charm/Charm"
import { gameId } from "../data.json"

const asyncGlob = (pattern: string, options?: glob.IOptions) => {
  return new Promise<string[]>((resolve, reject) => {
    glob(pattern, options || {}, (err, matches) => {
      if (err) reject(err)
      resolve(matches)
    })
  })
}

const pagesGlob = path
  .resolve(path.join(__dirname, "**", "Pages.js")) // This is pages.js because ts compiled it
  .replace(/\\/g, "/")

export const createNodePages = async (
  args: CreatePagesArgs,
  themeOptions?: PluginOptions,
) => {
  const pageMatches = await asyncGlob(pagesGlob)
  console.log(__dirname, pagesGlob, pageMatches)
  await Promise.all(
    pageMatches
      .map(require)
      .map((fn: { makePages?: typeof createNodePages }) => {
        if (fn.makePages) {
          return fn.makePages(args, themeOptions)
        }
      }),
  )
}

export const handleMDXNode = async (
  props: CreateNodeArgs,
  options?: PluginOptions,
) => {
  const { node, getNode } = props
  const fileNode: FileNode = await getNode(node.parent)

  const mySourceInstanceName = getSourceInstanceName(
    contentDirectories,
    gameId,
    fileNode,
  )

  switch (mySourceInstanceName) {
    case "Pages":
      break
    case "Artifacts/Armors":
      break
    case "Artifacts/Other":
      break
    case "Artifacts/Weapons":
      break
    case "Charms":
      return makeCharmNode(props, fileNode, options)
    case "Pages":
      break
    case "QuickCharacters":
      break
    case "MartialArts":
      break
    case "Splats":
      break

    default:
      return
  }
}
