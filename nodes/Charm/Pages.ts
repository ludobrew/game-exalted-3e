import { CreatePagesArgs, PluginOptions } from "gatsby"
import {
  pathify,
  simpleGraphql,
} from "gatsby-theme-ludobrew-core/gatsbyNodeTools"

const basePath = "gatsby-theme-ludobrew-exalted-3e/src/providers"
const splatPageComponent = require.resolve(`${basePath}/SplatPageProvider`)
const splatTraitPageComponent = require.resolve(
  `${basePath}/SplatTraitPageProvider.tsx`,
)
const splatCharmPageComponent = require.resolve(
  `${basePath}/SplatCharmPageProvider.tsx`,
)

const makeIndividualCharmPages = async (
  args: CreatePagesArgs,
  _themeOptions?: PluginOptions,
) => {
  const { actions, graphql } = args
  const { createPage } = actions

  const { errors, data } = await graphql<any>(`
    {
      allExaltedSplatCharm {
        nodes {
          id
          url
          name
          requires
          charmSource
        }
      }
    }
  `)

  if (errors) {
    throw errors
  }

  for (const node of data.allExaltedSplatCharm.nodes) {
    createPage({
      path: node.url,
      component: splatCharmPageComponent,
      context: {
        id: node.id,
        charmSource: node.charmSource,
        requires: node.requires || [],
        names: [node.name, `${node.charmSource} ${node.name}`],
      },
    })
  }

  return
}

const makeSplatPages = async (
  args: CreatePagesArgs,
  _themeOptions?: PluginOptions,
) => {
  const { actions, graphql } = args
  const { createPage } = actions

  const gql = simpleGraphql(graphql)

  type DistinctCharmFieldQuery = {
    allExaltedSplatCharm: { distinct: string[] }
  }

  const splatListing = await gql<DistinctCharmFieldQuery>`
    {
      allExaltedSplatCharm(filter: { charmType: { eq: splat } }) {
        distinct(field: charmSource)
      }
    }
  `

  for (const splat of splatListing.allExaltedSplatCharm.distinct) {
    createPage({
      path: pathify(splat),
      component: splatPageComponent,
      context: {
        splat,
      },
    })

    const traitListing = await gql<DistinctCharmFieldQuery>`
      {
        allExaltedSplatCharm(
          filter: {
            charmType: {eq: splat},
            charmSource: {eq: "${splat}"},
          }
        ) {
          distinct(field: trait)
        }
      }
    `

    for (const trait of traitListing.allExaltedSplatCharm.distinct) {
      createPage({
        path: pathify(splat, trait),
        component: splatTraitPageComponent,
        context: {
          splat,
          trait,
        },
      })
    }
  }

  return
}

export const makePages = async (
  args: CreatePagesArgs,
  themeOptions?: PluginOptions,
) => {
  return Promise.all([
    makeIndividualCharmPages(args, themeOptions),
    makeSplatPages(args, themeOptions),
  ])
}
