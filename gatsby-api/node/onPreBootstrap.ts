import { GatsbyNode } from "gatsby"
import { createDirectories } from "@ludobrew/core/file"
import { gameId } from "@ludobrew/game-exalted-3e/src/data"
import { contentDirectories } from "@ludobrew/game-exalted-3e/nodes/data"

const extensionPoint: GatsbyNode["onPreBootstrap"] = async (props, options) => {
  await createDirectories({
    props,
    options,
    pluginId: gameId,
    pluginPackageName: "@ludobrew/game-exalted-3e",
    contentDirectories,
  })
  return
}

export default extensionPoint
