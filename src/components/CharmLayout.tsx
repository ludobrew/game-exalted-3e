/** @jsx jsx */
import { jsx } from "@emotion/core"
import { graphql } from "gatsby"

const CharmLayout: React.FC<{ data: any; pageContext?: any }> = ({
  data,
  pageContext,
}) => {
  const { id } = pageContext || {}
  return <div>I am a charm of id {id}</div>
}

export default CharmLayout
