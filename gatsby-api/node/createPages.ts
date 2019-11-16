import { GatsbyNode } from "gatsby"
import { createNodePages } from "../../nodes"

const extensionPoint: GatsbyNode['createPages'] = async (props, options) => {
  await createNodePages(props, options)
  return
}

export default extensionPoint
