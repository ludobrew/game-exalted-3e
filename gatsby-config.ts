import { contentDirectories, pluginId } from "./src/data"
import { generateSourceFilesystemPlugins } from "@ludobrew/core/file"
import { resolve } from "path"

module.exports = (themeOptions: any) => {
  return {
    plugins: [
      ...generateSourceFilesystemPlugins({
        currentDir: resolve('.'),
        contentDirectories,
        pluginId,
      }),
      {
        resolve: "gatsby-plugin-mdx",
        options: {
          extensions: [".mdx", ".md"],
        },
      },
    ],
  }
}
