import { contentDirectories, pluginId } from "./nodes/data"
import { generateSourceFilesystemPlugins } from "@ludobrew/core/file"
import { resolve } from "path"

module.exports = (themeOptions: any) => {
  return {
    plugins: [
      ...generateSourceFilesystemPlugins({
        currentDir: resolve("."),
        contentDirectories,
        pluginId,
      }),
      "@ludobrew/core",
    ],
  }
}
