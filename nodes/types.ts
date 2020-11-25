import { CreateNodeArgs, Node, NodeInput } from "gatsby"
import * as yup from "yup"

type FrontmatterHandlerProps<T> = {
  result: T
  args: CreateNodeArgs
}

export type FrontmatterHandler<T> = (
  args: FrontmatterHandlerProps<T>,
) => Node | void | Promise<void | Node>

export type Handler<T> = {
  validator: yup.Schema<T>
  handler: FrontmatterHandler<T>
}

export type MakeAndLinkNodeArgs<T> = {
  args: CreateNodeArgs
  newNode: NodeInput & T
  parentNode: NodeInput
}

export const makeAndLinkNode = <T = any>({
  args,
  newNode,
  parentNode,
}: MakeAndLinkNodeArgs<T>) => {
  const { actions } = args
  const { createNode, createParentChildLink } = actions
  createNode(newNode)

  //@ts-ignore TODO: child is defined as Node when it could be NodeInput
  createParentChildLink({ parent: parentNode, child: newNode })
}

export const buildHandler = <H extends Handler<any>>(handler: H) => handler
