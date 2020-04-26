import { CreateNodeArgs, PluginOptions, CreatePagesArgs } from "gatsby"
import {
  FileNode,
  getSourceInstanceName,
} from "gatsby-theme-ludobrew-core/gatsbyNodeTools"
import { contentDirectories } from "./data"
import path from "path"
import glob from "glob"
import { makeCharmNode } from "./Charm/Charm"

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

type HasMakePages = {
  makePages: typeof createNodePages
}

export const createNodePages = async (
  args: CreatePagesArgs,
  themeOptions?: PluginOptions,
) => {
  const pageMatches = await asyncGlob(pagesGlob)

  await Promise.all(
    pageMatches
      .map(require)
      .filter((fn) => fn.makePages)
      .map<HasMakePages>((fn) => fn.makePages(args, themeOptions)),
  )
}

export const handleMDXNode = async (
  props: CreateNodeArgs,
  options?: PluginOptions,
) => {
  const { node, getNode } = props
  const fileNode: FileNode = await getNode(node.parent)

  // TODO: better type frontmatter
  switch ((node.frontmatter as any).content) {
    case "charm":
      return makeCharmNode(props, fileNode, options)
    default:
      return
  }
}
