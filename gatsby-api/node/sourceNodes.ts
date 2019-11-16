import { GatsbyNode, SourceNodesArgs } from "gatsby"
import { createLudobrewEntry } from "@ludobrew/core/gatsbyNodeTools"
import { gameId, gameName, gameShortName, gameDescription } from "../../data.json"

// TODO: Typedef is wonk. props should inferr like others
const extensionPoint: GatsbyNode['sourceNodes'] = async (props, options) => {
  createLudobrewEntry(props, {
    gameId,
    gameName,
    gameShortName,
    gameDescription,
  })
  return
}

export default extensionPoint
