export type ThemeOptions = Partial<{
  customSplats?: string[]
}>

export const contentDirectories = [
  "Pages",
  "Artifacts/Armors",
  "Artifacts/Weapons",
  "Artifacts/Other",
  "QuickCharacters",
  "MartialArts",
  "Charms",
  "Splats",
] as const

export const baseSplats = [
  /**
   * Released Splats
   */
  "Solar",
  "Lunar",
  "Dragon Blooded",

  /**
   * Has brews/commonly brewed
   */
  "Sidereal",
  "Alchemical",
  "Abyssal",
  "Liminal",
  "Infernal",

  /**
   * Mysterious exalts
   */
  "Getimian",
  "Dream Souled",
  "Hearteater",
  "Umbral",
] as const
