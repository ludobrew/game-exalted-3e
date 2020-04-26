export type ThemeOptions = Partial<{
  customSplats?: string[]
}>

export const contentDirectories = [
  "homebrew",
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
