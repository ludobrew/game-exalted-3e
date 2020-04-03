/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import { Helmet } from "react-helmet-async"
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StyleReset } from "gatsby-theme-ludobrew-core/src/components/StyleReset"
import { MDXProvider } from "@mdx-js/react"

interface PreloadFontProps {
  family: string
  sizes: Array<string | number>
}

const PreloadFont = ({ family, sizes }: PreloadFontProps) => {
  const sizeSpecification = sizes.join(",")
  const url = `https://fonts.googleapis.com/css?family=${family}:${sizeSpecification}`
  return (
    <Helmet>
      <link key="preload" rel="preload" as="style" href={url} />
      <link key="stylesheet" rel="stylesheet" href={url} />
    </Helmet>
  )
}

export default props => {
  const data = useStaticQuery(graphql`
    query GetSiteTitleAndDescription {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  const { title, description } = data.site.siteMetadata

  return (
    <React.Fragment>
      <StyleReset />
      <PreloadFont key="a" family="Cinzel" sizes={[900]} />
      <PreloadFont
        key="b"
        family="Volkhov"
        sizes={[400, "400i", 700, "700i"]}
      />
      <Styled.div
        as="main"
        sx={{
          height: "100vh",
          display: "grid",
          gridTemplateColumns: "250px 1fr",
          gridTemplateRows: "min-content 1fr min-content",
          gridTemplateAreas: `
          "header header"
          "mainBody mainBody"
          "footer footer"
        `,
        }}
      >
        <Styled.div
          as="header"
          sx={{
            variant: "layouts.header",
            gridArea: "header",
            p: 3,
          }}
        >
          <Styled.h1 sx={{ m: 0 }}>{title}</Styled.h1>
          <Styled.hr />
          <Styled.p sx={{ m: 0 }}>{description}</Styled.p>
        </Styled.div>
        {/* <nav
          sx={{
            variant: "layouts.sideNav",
            gridArea: "nav",
          }}
        >
          Nav things
        </nav> */}
        <Styled.div
          as="main"
          sx={{
            variant: "layouts.mainBody",
            gridArea: "mainBody",
          }}
        >
          {/* Current workaround for theme-ui by default providing a screwy table that is unstyled */}
          <MDXProvider
            components={{
              table: Styled.table,
            }}
          >
            {props.children}
          </MDXProvider>
        </Styled.div>
        <Styled.div
          as="footer"
          sx={{
            variant: "layouts.footer",
            gridArea: "footer",
          }}
        >
          {/* TODO: stuff here */}
        </Styled.div>
      </Styled.div>
    </React.Fragment>
  )
}
