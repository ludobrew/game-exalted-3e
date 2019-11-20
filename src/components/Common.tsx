/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { GatsbyLinkProps, Link } from "gatsby"
import { gameId, gameShortName } from "@ludobrew/game-exalted-3e/src/data"
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
    <Styled.div
      sx={{
        "*": {
          ":after": {
            display: "inline-block",
            m: 1,
            content: `"/"`,
            color: "text",
          },
        },
      }}
    >
      <StyledLink key={gameId} to={pathify(gameId)}>
        {gameShortName}
      </StyledLink>
      {links}
    </Styled.div>
  )
}
