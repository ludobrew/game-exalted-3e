import { GatsbyNode } from "gatsby"
import { createLudobrewEntry } from "gatsby-theme-ludobrew-core/gatsbyNodeTools"
import { onCreateNode as nodesOnCreateNode, createNodePages } from "../nodes"
import { typeDefs } from "./gqlSchemas"
import {
  gameId,
  gameName,
  gameShortName,
  gameDescription,
} from "gatsby-theme-ludobrew-exalted-3e/src/data"

export const sourceNodes: GatsbyNode["sourceNodes"] = async (
  props,
  options,
) => {
  createLudobrewEntry(props, {
    gameId,
    gameName,
    gameShortName,
    gameDescription,
  })
  return
}

export const createPages: GatsbyNode["createPages"] = async (args, options) => {
  await createNodePages(args, options)
  return
}

export const onCreateNode: GatsbyNode["onCreateNode"] = async (
  props,
  options,
) => {
  return Promise.all([nodesOnCreateNode(props, options)])
}

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = async (
  props,
  options,
) => {
  const { actions } = props
  const { createTypes } = actions

  createTypes(typeDefs)
  return
}
