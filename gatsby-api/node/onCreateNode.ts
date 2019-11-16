import { GatsbyNode } from "gatsby"
import { handleMDXNode } from "../../nodes"

const extensionPoint: GatsbyNode['onCreateNode'] = async (props, options) => {
  const { node } = props

  switch (node.internal.type) {
    case "Mdx":
      return handleMDXNode(props, options)
    default:
      return
  }
}


export default extensionPoint
