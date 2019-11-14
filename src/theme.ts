/** @jsx jsx */
import { jsx, Theme } from "theme-ui"

export default {
  colors: {
    primary: "#F00",
    secondary: "#0F0",
    accent: "#00F",
    text: "#222",
    background: "#EFEFEF",
  },

  // h6/h5/h4/h3/h2/h1
  fontSizes: [12, 14, 16, 18, 24, 32, 48, 64, 72],
  space: [0, 4, 8, 16, 24],

  fonts: {
    body: "Volkhov, sans-serif",
    heading: "Cinzel, serif",
  },

  layouts: {
    header: {
      bg: "primary",
      color: "#FFF",
      p: "2",
    },
    mainBody: {
      p: "4",
    },
    sideNav: {
      bg: "secondary",
      p: "2",
    },
    footer: {
      bg: "accent",
      p: "2",
    },
  },

  styles: {
    h1: {
      fontFamily: "heading",
    },
    h2: {
      fontFamily: "heading",
    },
    h3: {
      fontFamily: "heading",
    },
    p: {
      fontFamily: "body",
      maxWidth: "50em",
    },
    li: {
      fontFamily: "body",
    },
    a: {
      fontFamily: "body",
    },
  },
} as Theme
