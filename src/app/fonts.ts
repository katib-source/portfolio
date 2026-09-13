import { Archivo, JetBrains_Mono, Newsreader } from "next/font/google";

// Self-hosted at build time by next/font: no requests to Google from visitors' browsers.

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  style: ["italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

export const fontVariables = [archivo.variable, jetbrains.variable, newsreader.variable].join(" ");
