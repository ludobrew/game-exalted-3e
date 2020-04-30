/** @jsx jsx */
import { jsx } from "@emotion/core"
import { graphql } from "gatsby/graphql"

type ArtifactTypePageProps = { data: any }

const ArtifactTypePage = ({ data }: ArtifactTypePageProps) => {
  return (
    <div>
      <div>Hello World!</div>
    </div>
  )
}

export const ArtifactTypePageQuery = graphql`
  query ArtifactTypePageQuery(type: String) {
    allMdx(filter: {frontmatter: {content: {eq: "artifact"}, type: $type }}) {
      group(field: frontmatter___type) {
        type: fieldValue
        artifacts: nodes {
          data: frontmatter {
            name
          }
        }
      }
    }
  }
`

export default ArtifactTypePage
