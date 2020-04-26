const path = require("path")

require('source-map-support').install()
require('ts-node').register({
  project: path.resolve(path.join(__dirname, "tsconfig.json")),
  transpileOnly: true
})

module.exports = (themeOptions) => {
  return {
    plugins: [
      "gatsby-theme-ludobrew-core",
      {
        resolve: "gatsby-source-filesystem",
        options: {
          path: "homebrew",
          ignore: [`**/\.*`],
        },
      }
    ]
  }
}
