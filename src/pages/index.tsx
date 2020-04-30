/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { graphql } from "gatsby"
import { SplatLink } from "../components/Charm/CharmData"
import Layout from "../components/Layout"
import { BreadCrumbBar, StyledLink } from "../components/Common"
import { MDXRenderer } from "gatsby-plugin-mdx"

const getSplats: (any: any) => { name: string; count: number }[] = (data) => {
  const arr = data.splats.splatInfo || []
  return arr
}

const getPages: (any: any) => { name: string; path: string }[] = (data) => {
  return data.pages.pageInfo.map((pageInfo) => ({
    name: pageInfo.context.name,
    path: pageInfo.path,
  }))
}

export default (props) => {
  const { data } = props

  return (
    <Layout>
      <BreadCrumbBar />
      {data.mdx?.body ? <MDXRenderer>{data.mdx.body}</MDXRenderer> : null}
      <Styled.h2>Homebrew Documents</Styled.h2>
      <Styled.ul>
        {getPages(data).map(({ name, path }) => (
          <Styled.li key={name}>
            <StyledLink to={path}>{name}</StyledLink>
          </Styled.li>
        ))}
      </Styled.ul>
      <Styled.h2>Splats</Styled.h2>
      <Styled.ul>
        {getSplats(data).map(({ name, count }) => (
          <Styled.li key={name}>
            <SplatLink splat={name} /> - {count} Charms
          </Styled.li>
        ))}
      </Styled.ul>
    </Layout>
  )
}

export const exalted3equery = graphql`
  query Exalted3ePageQuery {
    mdx(frontmatter: { content: { eq: "Home" } }) {
      body
    }
    pages: allSitePage(
      filter: { path: { regex: "/^/pages/" } }
      sort: { fields: path }
    ) {
      pageInfo: nodes {
        path
        context {
          name
        }
      }
    }
    splats: allExaltedSplatCharm {
      splatInfo: group(field: splat) {
        name: fieldValue
        count: totalCount
      }
    }
  }
`
