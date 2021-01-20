import { Theme } from "theme-ui"
import { SystemStyleObject } from "@styled-system/css"

const layouts: Record<string, SystemStyleObject> = {
  header: {
    bg: "primary",
    color: "#000",
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
    bg: "secondary",
    color: "textLight",
    p: "2",
  },
}

const theme = {
  colors: {
    primary: "#fcd734",
    secondary: "#444",
    accent: "#2234a3",
    text: "#222",
    textLight: "#EFEFEF",
    background: "#EFEFEF",

    grey: ["#DBDBDB", "#EFEFEF", "#444"],
    blue: ["hsl(240, 150%, 55%)", "#2234a3", "#000f73"],
  },

  // h6/h5/h4/h3/h2/h1
  fontSizes: [12, 14, 16, 18, 24, 32, 48, 64, 72],
  space: [0, 4, 8, 16, 24, 128, 256, 512],

  fonts: {
    body: "Volkhov, sans-serif",
    heading: "Cinzel, serif",
  },

  layouts: {
    header: {
      bg: "primary",
      color: "#000",
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
      bg: "secondary",
      color: "textLight",
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
      color: "blue.0",
      "&:visited": {
        color: "blue.2",
      },
      "&:active": {
        color: "blue.1",
      },
    },
    table: {
      borderCollapse: "collapse",
      borderSpacing: 0,
      thead: {
        bg: "secondary",
        color: "textLight",
      },
      tbody: {
        tr: {
          ":nth-of-type(even)": {
            bg: "grey.0",
          },
          ":hover": {
            bg: "primary",
          },
        },
      },
      th: {
        p: 2,
      },
      td: {
        p: 2,
      },
    },
  },
} as Theme

export default { ...theme, layouts }
