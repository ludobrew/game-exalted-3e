import { GatsbyNode, CreateSchemaCustomizationArgs, PluginOptions } from "gatsby"
import { contentDirectories, pluginId } from "./src/data"
import { handleMDXNode } from "./src/nodes"
import { createDirectories } from "@ludobrew/core/file"


type ThemeOptions = Partial<{
  something: string
}>

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
    const { something } = themeOptions as ThemeOptions
    const { node } = props

    console.log("Inspecting", node.internal.type)
    switch (node.internal.type) {
      case "Mdx":
        return handleMDXNode(props, themeOptions)
      default:
        return
    }
  },

  //@ts-ignore
  createSchemaCustomization: (props: CreateSchemaCustomizationArgs, options: PluginOptions) => {
    // const { getNodes, actions, schema } = props
    // const { createTypes } = actions
    // const builder:any = schema

    // const simpleResolver = (field: string, type: string, fallback: any) => {
    //   return ({
    //     type,
    //     resolve: ( parent: Record<any, any> ) => parent[field] || fallback
    //   })
    // }

    // const typedefs = []

    // const ExaltedCharmRequirement = `
    //   type ExaltedCharmRequirement implements Node @dontInfer {
    //     source: String
    //     type: String
    //     name: String!
    //   }
    // `
    // typedefs.push(ExaltedCharmRequirement)

    // const CharmlikeFields = {
    //   name: "String!",
    //   essence: simpleResolver("essence", "Int!", 1),
    //   type: simpleResolver("type", "String!", "Supplemental"),
    //   cost: simpleResolver("cost", "String!", "—"),
    //   duration: simpleResolver("duration", "String!", "Instant"),
    //   categories: simpleResolver("categories", "[String!]!", ["None"]),
    //   keywords: simpleResolver("keywords", "[String!]!", ["None"]),
    //   shortDescription: simpleResolver("shortDescription", "String!", ""),

      // requiredCharms: {
      //   type: "[ExaltedCharmRequirement! | String!]!",
      //   resolve: (parent: any) => {
      //     return parent.requiredCharms || ["None"]
      //   }
      // },
    // }

    // const ExaltedCharmlike = builder.buildObjectType({
    //   name: "ExaltedCharmlike",
    //   interfaces: ['Node'],
    //   extensions: {
    //     infer: false
    //   },
    //   fields: CharmlikeFields

    // })
    // typedefs.push(ExaltedCharmlike)

    // const ExaltedCharm = `
    //   type ExaltedCharm implements ExaltedCharmlike {
    //     trait: String!
    //     splat: String!
    //     rating: Number!
    //   }
    // `

    // createTypes(typedefs)

    // const ExaltedCharm = {
    //   name: "ExaltedCharm",
    //   interfaces: ['Node'],
    //   extensions: {
    //     infer: false
    //   },
    //   fields: {
    //     ...CharmlikeFields,
    //     trait: "String!",
    //     splat: "String!",
    //     rating: "Int!",
    //   }
    // }
    // createTypes(ExaltedCharm)

    // const PossibleCharmRequirements = `union ExaltedRequiredCharms = ExaltedCharmRequirement | String`
    // const PossibleCharmRequirementsResolver = builder.buildObjectType({
    //   PossibleCharmRequirements: {
    //     __resolveType: (object: any) => {
    //       if (typeof object === "string") {
    //         return "String"
    //       }
    //       if (object.name) {
    //         return "ExaltedCharmRequirement"
    //       }
    //       return null
    //     }
    //   }
    // })

    // const CharmRequirementDef = builder.buildObjectType({
    //   name: "ExaltedCharmRequirement",
    //   fields: {
    //     source: "String",
    //     name: "String!",
    //   },
    //   interfaces: ['Node'],
    //   extensions: {
    //     infer: false,
    //   },
    // })


  }
}

// export const createPages = api.createPages
// export const createPagesStatefully = api.createPagesStatefully
// export const createResolvers = api.createResolvers
// export const createSchemaCustomization = api.createSchemaCustomization
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
