/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { graphql } from "gatsby"
import { SplatLink } from "../components/Charm/CharmData"
import Layout from "../components/Layout"

const getSplats: (any) => { name: string; totalCount }[] = data => {
  const arr = data.splats.splatInfo || []
  return arr
}

export default props => {
  const { data } = props

  return (
    <Layout>
      <Styled.h1>Exalted 3e homebrew</Styled.h1>
      <Styled.ul>
        {getSplats(data).map(splatInfo => (
          <Styled.li key={splatInfo.name}>
            <SplatLink splat={splatInfo.name} /> - {splatInfo.totalCount} Charms
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
        totalCount
      }
    }
  }
`
