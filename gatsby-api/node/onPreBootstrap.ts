import { GatsbyNode } from "gatsby"
import { createDirectories } from "gatsby-theme-ludobrew-core/file"
import { contentDirectories } from "gatsby-theme-ludobrew-exalted-3e/nodes/data"

const extensionPoint: GatsbyNode["onPreBootstrap"] = async (props, options) => {
  await createDirectories({
    props,
    options,
    pluginPackageName: "gatsby-theme-ludobrew-exalted-3e",
    contentDirectories,
  })
  return
}

export default extensionPoint
