/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { GatsbyLinkProps, Link } from "gatsby"

export const StyledLink = (props: GatsbyLinkProps<unknown>) => (
  <Styled.a as={Link} {...(props as any)} />
)
