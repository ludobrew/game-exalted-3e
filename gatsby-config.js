const path = require("path")

require('source-map-support').install()
require('ts-node').register({
  project: path.resolve(path.join(__dirname, "tsconfig.json")),
  transpileOnly: true
})

const { contentDirectories } = require("./nodes/data")
const { generateSourceFilesystemPlugins } = require("@ludobrew/core/file")
const { resolve } = require("path")
module.exports = (themeOptions) => {
  return {
    plugins: [
      "@ludobrew/core",
      ...generateSourceFilesystemPlugins({
        currentDir: resolve("."),
        contentDirectories,
        pluginId: "ex3",
      }),
    ],
  }
}
