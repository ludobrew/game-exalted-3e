/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
import React from "react"
import { graphql } from "gatsby"
import Layout from "./Layout"
import { BreadCrumbBar, StyledLink } from "./Common"
import { navigate } from "@reach/router"

type TableOfContentsItem = {
  url: string
  title: string
  items?: TableOfContentsItem[]
}

type TableOfContentsProps = {
  items: TableOfContentsItem[]
}

const TableOfContents = ({ items }: TableOfContentsProps) => {
  const list: JSX.Element[] = []
  for (const item of items) {
    list.push(
      <Styled.li key={item.url}>
        <Styled.a
          onClick={e => {
            navigate(item.url)
            e.preventDefault()
          }}
          href={item.url}
        >
          {item.title}
        </Styled.a>
        {item.items ? <TableOfContents items={item.items} /> : null}
      </Styled.li>,
    )
  }

  return <Styled.ul>{list}</Styled.ul>
}

const BasicPageLayout: React.FC<{ data: any }> = ({ data }) => {
  const { mdx } = data
  return (
    <Layout>
      <BreadCrumbBar />
      <Styled.h1
        sx={{
          display: "inline-block",
        }}
      >
        {mdx.frontmatter.name}
      </Styled.h1>

      <TableOfContents items={mdx.tableOfContents?.items ?? []} />
      <MDXRenderer>{mdx.body}</MDXRenderer>
    </Layout>
  )
}

export const BasicPageLayoutQuery = graphql`
  query BasicPageLayoutQuery($id: String) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        name
      }
      tableOfContents
    }
  }
`

export default BasicPageLayout
