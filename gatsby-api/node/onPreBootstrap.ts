import { GatsbyNode } from "gatsby"
import { createDirectories } from "@ludobrew/core/file"
import { gameId, gameName, gameShortName, gameDescription } from "../../data.json"
import { contentDirectories, pluginId, ThemeOptions } from "../../nodes/data"
import { resolve } from "path"

const extensionPoint: GatsbyNode['onPreBootstrap'] = async (props, options) => {
  await createDirectories({
    props,
    options,
    pluginId: gameId,
    pluginDirectory: resolve(__dirname, "..", ".."),
    contentDirectories
  })
  return
}

export default extensionPoint
