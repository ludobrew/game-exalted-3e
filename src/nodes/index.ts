import { CreateNodeArgs, PluginOptions, Node } from "gatsby"
import { FileNode, getSourceInstanceName } from "@ludobrew/core/gatsbyNodeTools"
import { makePageNode } from "./Pages"
import { makeCharmNode } from "./Charm"
import { contentDirectories, pluginId } from "../data";

export const handleMDXNode = async (
  props: CreateNodeArgs,
  options?: PluginOptions,
) => {
  const { node, getNode } = props
  const fileNode: FileNode = await getNode(node.parent)

  const mySourceInstanceName = getSourceInstanceName(
    contentDirectories,
    pluginId,
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
