import { CreatePagesArgs, PluginOptions } from "gatsby"
import { pathify, simpleGraphql } from "@ludobrew/core/gatsbyNodeTools"
import { gameId } from "@ludobrew/game-exalted-3e/src/data"

const basePath = "@ludobrew/game-exalted-3e/src/providers"
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

  const { errors, data } = await graphql(`
    {
      allExaltedCharm {
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

  for (const node of data.allExaltedCharm.nodes) {
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

  type DistinctCharmFieldQuery = { allExaltedCharm: { distinct: string[] } }

  const splatListing = await gql<DistinctCharmFieldQuery>`
    {
      allExaltedCharm(filter: { charmType: { eq: splat } }) {
        distinct(field: charmSource)
      }
    }
  `

  for (const splat of splatListing.allExaltedCharm.distinct) {
    createPage({
      path: pathify(gameId, splat),
      component: splatPageComponent,
      context: {
        splat,
      },
    })

    const traitListing = await gql<DistinctCharmFieldQuery>`
      {
        allExaltedCharm(
          filter: {
            charmType: {eq: splat},
            charmSource: {eq: "${splat}"},
          }
        ) {
          distinct(field: trait)
        }
      }
    `

    for (const trait of traitListing.allExaltedCharm.distinct) {
      createPage({
        path: pathify(gameId, splat, trait),
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
