import { CreateNodeArgs, PluginOptions, CreatePagesArgs } from "gatsby"
import { FileNode, getSourceInstanceName } from "@ludobrew/core/gatsbyNodeTools"
import { contentDirectories } from "./data"
import path from "path"
import glob from "glob"
import { makeCharmNode } from "./Charm/Charm"
import { gameId } from "@ludobrew/game-exalted-3e/src/data"

const asyncGlob = (pattern: string, options?: glob.IOptions) => {
  return new Promise<string[]>((resolve, reject) => {
    glob(pattern, options || {}, (err, matches) => {
      if (err) reject(err)
      resolve(matches)
    })
  })
}

const pagesGlob = path
  .resolve(path.join(__dirname, "**", "Pages.ts"))
  .replace(/\\/g, "/")

export const createNodePages = async (
  args: CreatePagesArgs,
  themeOptions?: PluginOptions,
) => {
  const pageMatches = await asyncGlob(pagesGlob)

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

  // Probably the wrong way to handle things
  switch (mySourceInstanceName) {
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
      makeCharmNode(props, fileNode, options)
      break

    default:
      return
  }
}
