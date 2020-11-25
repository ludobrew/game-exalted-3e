import { CreateNodeArgs, PluginOptions, CreatePagesArgs } from "gatsby"
import { FileNode } from "gatsby-theme-ludobrew-core/gatsbyNodeTools"
import path from "path"
import glob from "glob"

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

import { handlesContent as artifactHandlers } from "./Artifact"
import { handlesContent as splatHandlers } from "./Charm/Charm"
import { Handler } from "./types"

const handlers = {
  ...artifactHandlers,
  ...splatHandlers,
} as Record<string, Handler<any>>

export const onCreateNode = async (
  args: CreateNodeArgs<{ frontmatter?: { content?: string } }>,
  _?: PluginOptions,
) => {
  const { node, getNode, reporter } = args
  const fileNode = (await getNode(node.parent)) as FileNode
  if (!node.frontmatter?.content) {
    reporter.warn(`${fileNode.relativePath} is missing the content field"`)
    return
  }

  const contentType = node.frontmatter.content.toLowerCase()
  if (contentType in handlers) {
    const { validator, handler } = handlers[contentType]
    try {
      const result = await validator.validate(node.frontmatter)
      const nodePerhaps = await handler({ result, args })
      return nodePerhaps
    } catch (e) {
      reporter.log(
        `The file at: "/${fileNode.relativePath}" resulted in the following error"`,
      )
      reporter.error(e)
      return
    }
  }
}
