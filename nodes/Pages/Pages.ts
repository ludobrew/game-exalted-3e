import { pathify, simpleGraphql } from "@ludobrew/core/gatsbyNodeTools"
import { gameId } from "@ludobrew/game-exalted-3e/src/data"
import { CreatePagesArgs, PluginOptions } from "gatsby"

const basePath = "@ludobrew/game-exalted-3e/src/"
const basicPageComponent = require.resolve(
  `${basePath}/components/BasicPageLayout`,
)

const makeSystemPages = async (
  args: CreatePagesArgs,
  _themeOptions?: PluginOptions,
) => {
  const { actions, graphql } = args
  const { createPage } = actions

  const gql = simpleGraphql(graphql)

  const pagesQuery = await gql`
    {
      allMdx(
        filter: {
          frontmatter: { content: { eq: "page" }, splat: { eq: null } }
        }
      ) {
        nodes {
          id
          frontmatter {
            name
          }
        }
      }
    }
  `

  for (const node of pagesQuery.allMdx.nodes) {
    createPage({
      path: pathify(gameId, "pages", node.frontmatter.name),
      component: basicPageComponent,
      context: {
        id: node.id,
        name: node.frontmatter.name,
      },
    })
  }
}

export const makePages = async (
  args: CreatePagesArgs,
  themeOptions?: PluginOptions,
) => {
  return Promise.all([makeSystemPages(args, themeOptions)])
}
