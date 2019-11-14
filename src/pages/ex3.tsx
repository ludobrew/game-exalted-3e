/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { graphql } from "gatsby"
import { SplatLink } from "../components/Charm/CharmData"
import Layout from "../components/Layout"
import { StyledLink } from "../components/Common"

const getSplats: (any) => { name: string; count: number }[] = data => {
  const arr = data.splats.splatInfo || []
  return arr
}

export default props => {
  const { data } = props

  return (
    <Layout>
      <Styled.div>
        <StyledLink to="/">Home</StyledLink>
      </Styled.div>
      <Styled.h1>Exalted 3e homebrew</Styled.h1>
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
    splats: allExaltedCharm {
      splatInfo: group(field: splat) {
        name: fieldValue
        count: totalCount
      }
    }
  }
`
