import {
  GatsbyNode,
  CreateSchemaCustomizationArgs,
  PluginOptions,
} from "gatsby"
import { contentDirectories, pluginId, ThemeOptions } from "./src/data"
import { handleMDXNode } from "./nodes"
import { createDirectories } from "@ludobrew/core/file"

const api: GatsbyNode = {
  onPreBootstrap: async (props, options) => {
    await createDirectories({
      props,
      options,
      pluginId,
      pluginDirectory: __dirname,
      contentDirectories,
    })
  },

  onCreateNode: async (props, themeOptions) => {
    const { node } = props

    switch (node.internal.type) {
      case "Mdx":
        return handleMDXNode(props, themeOptions)
      default:
        return
    }
  },

  createSchemaCustomization: async (
    props: CreateSchemaCustomizationArgs,
    themeOptions: ThemeOptions & PluginOptions,
  ) => {
    const { actions } = props
    const { createTypes, createFieldExtension } = actions

    const typeDefs = `
      enum CharmType {
        splat
        ma
        evocation
        eclipse
        other
      }

      interface Charmlike @nodeInterface {

        id: ID!

        """
        Type of thing
        """
        charmType: CharmType

        """
        Like [Solar], [Crazy Teacup], [Bats in the Belfry Style], [Jam Commissioner Ogwan]
        """
        charmSource: String

        """
        Like for determining "Orator" or "Power" craft charms
        """
        category: String

        """
        Name of charm
        """
        name: String

        """
        Essence prerequisite
        """
        essence: Int

        """
        Simple/Uniform and all that
        """
        type: String

        """
        Mote costs
        """
        cost: String

        """
        Scene/Instant and all that
        """
        duration: String

        """
        List of charms to do
        """
        requires: [String]

        """
        Like "social" or whatever.
        """
        tags: [String]

        """
        Uniform/Decisive-only and all that
        """
        keywords: [String]

        """
        The "lowdown" synopsis of a charm
        """
        shortDescription: String
      }

      type ExaltedCharm implements Node & Charmlike @childOf(Mdx)
      type ExaltedCharmlikeConnection implements Node

    `
    createTypes(typeDefs)
  },
}

// export const createPages = api.createPages
// export const createPagesStatefully = api.createPagesStatefully
// export const createResolvers = api.createResolvers
export const createSchemaCustomization = api.createSchemaCustomization
// export const generateSideEffects = api.generateSideEffects
// export const onCreateBabelConfig = api.onCreateBabelConfig
// export const onCreateDevServer = api.onCreateDevServer
export const onCreateNode = api.onCreateNode
// export const onCreatePage = api.onCreatePage
// export const onCreateWebpackConfig = api.onCreateWebpackConfig
// export const onPostBootstrap = api.onPostBootstrap
// export const onPostBuild = api.onPostBuild
export const onPreBootstrap = api.onPreBootstrap
// export const onPreBuild = api.onPreBuild
// export const onPreExtractQueries = api.onPreExtractQueries
// export const onPreInit = api.onPreInit
// export const preprocessSource = api.preprocessSource
// export const resolvableExtensions = api.resolvableExtensions
// export const setFieldsOnGraphQLNodeType = api.setFieldsOnGraphQLNodeType
// export const sourceNodes = api.sourceNodes
