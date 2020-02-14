import { GatsbyNode, SourceNodesArgs } from "gatsby"
import { createLudobrewEntry } from "gatsby-theme-ludobrew-core/gatsbyNodeTools"
import {
  gameId,
  gameName,
  gameShortName,
  gameDescription,
} from "gatsby-theme-ludobrew-exalted-3e/src/data"

// TODO: Typedef is wonk. props should inferr like others
const extensionPoint: GatsbyNode["sourceNodes"] = async (props, options) => {
  createLudobrewEntry(props, {
    gameId,
    gameName,
    gameShortName,
    gameDescription,
  })
  return
}

export default extensionPoint
