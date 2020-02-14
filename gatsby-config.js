const path = require("path")

require('source-map-support').install()
require('ts-node').register({
  project: path.resolve(path.join(__dirname, "tsconfig.json")),
  transpileOnly: true
})

const { contentDirectories } = require("./nodes/data")
const { generateSourceFilesystemPlugins } = require("gatsby-theme-ludobrew-core/file")
const { resolve } = require("path")
module.exports = (themeOptions) => {
  return {
    plugins: [
      "gatsby-theme-ludobrew-core",
      ...generateSourceFilesystemPlugins({
        currentDir: process.cwd(),
        contentDirectories,
        pluginId: "ex3",
      }),
    ],
  }
}
