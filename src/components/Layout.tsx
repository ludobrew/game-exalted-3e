/** @jsx jsx */
import { ThemeProvider, jsx, Styled } from "theme-ui"
import { Global } from "@emotion/core"
import theme from "../theme"
import { Helmet } from "react-helmet-async"
import React from "react"

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

export default props => (
  <ThemeProvider theme={theme}>
    <Global
      styles={theme => ({
        body: {
          background: theme.colors.background,
          padding: 0,
          margin: 0,
        },
      })}
    />
    <PreloadFont key="a" family="Cinzel" sizes={[900]} />
    <PreloadFont key="b" family="Volkhov" sizes={[400, "400i", 700, "700i"]} />
    <main
      sx={{
        height: "100vh",
        display: "grid",
        gridTemplateColumns: "250px 1fr",
        gridTemplateRows: "100px 1fr 100px",
        gridTemplateAreas: `
        "header header"
        "nav mainBody"
        "footer footer"
      `,
      }}
    >
      <header
        sx={{
          variant: "layouts.header",
          gridArea: "header",
        }}
      >
        <Styled.h1>Header Thing</Styled.h1>
      </header>
      <nav
        sx={{
          variant: "layouts.sideNav",
          gridArea: "nav",
        }}
      >
        Nav things
      </nav>
      <main
        sx={{
          variant: "layouts.mainBody",
          gridArea: "mainBody",
        }}
      >
        {props.children}
      </main>
      <footer
        sx={{
          variant: "layouts.footer",
          gridArea: "footer",
        }}
      >
        footer thing
      </footer>
    </main>
  </ThemeProvider>
)
