export default (themeOptions) => {
  return {
    plugins: [
      "gatsby-theme-ludobrew-core",
      {
        resolve: "gatsby-source-filesystem",
        options: {
          path: "homebrew",
          ignore: [`**/\.*`],
        },
      },
    ],
  }
}
