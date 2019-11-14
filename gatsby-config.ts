import { contentDirectories } from "./nodes/data"
import { gameId } from "./data.json"
import { generateSourceFilesystemPlugins } from "@ludobrew/core/file"
import { resolve } from "path"

module.exports = (themeOptions: any) => {
  return {
    plugins: [
      ...generateSourceFilesystemPlugins({
        currentDir: resolve("."),
        contentDirectories,
        pluginId: gameId,
      }),
      "@ludobrew/core",
    ],
  }
}
