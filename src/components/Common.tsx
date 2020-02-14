/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { GatsbyLinkProps, Link } from "gatsby"
import { gameShortName } from "gatsby-theme-ludobrew-exalted-3e/src/data"
import { pathify } from "gatsby-theme-ludobrew-core/gatsbyNodeTools"

export const StyledLink = (props: GatsbyLinkProps<unknown>) => (
  <Styled.a as={Link} {...(props as any)} />
)

type BreadCrumbBarProps = {
  to?: string[]
}

export const SlashSeperator = (props: any) => (
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
    {...props}
  />
)

export const BreadCrumbBar = ({ to = [] }: BreadCrumbBarProps) => {
  const links = to.map((item, index, array) => (
    <StyledLink key={item} to={pathify(...array.slice(0, index + 1))}>
      {item}
    </StyledLink>
  ))

  return (
    <SlashSeperator>
      <StyledLink key={"Home"} to={"/"}>
        Home
      </StyledLink>
      {links}
    </SlashSeperator>
  )
}
