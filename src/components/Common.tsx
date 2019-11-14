/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { GatsbyLinkProps, Link } from "gatsby"
import { gameId, gameShortName } from "../../data.json"
import { intersperse } from "../lib"
import { pathify } from "@ludobrew/core/gatsbyNodeTools"

export const StyledLink = (props: GatsbyLinkProps<unknown>) => (
  <Styled.a as={Link} {...(props as any)} />
)

type BreadCrumbBarProps = {
  to?: string[]
}

export const BreadCrumbBar = ({ to = [] }: BreadCrumbBarProps) => {
  const links = to.map((item, index, array) => (
    <StyledLink key={item} to={pathify(gameId, ...array.slice(0, index + 1))}>
      {item}
    </StyledLink>
  ))
  return (
    <Styled.div>
      <StyledLink key={gameId} to={pathify(gameId)}>
        {gameShortName}
      </StyledLink>
      {links.length > 0 ? " / " : null}
      {[...intersperse(links, " / ")]}
      {" / "}
    </Styled.div>
  )
}
