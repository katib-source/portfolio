import type { Metadata } from "next";
import { JetBrains_Mono, Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const sans = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.katib.me"),
  title: "Katib Kachi — Data Science & IA | Alternance",
  description:
    "Etudiant en L3 Informatique a l'Universite Cote d'Azur, je construis des solutions data et IA utiles, de la preparation des donnees jusqu'a la mise en oeuvre applicative.",
  keywords: ["Data Science", "IA", "Machine Learning", "Universite Cote d'Azur", "Alternance", "Portfolio"],
  authors: [{ name: "Katib Kachi" }],
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Katib Kachi — Data Science & IA | Alternance",
    description:
      "Etudiant en L3 Informatique a l'Universite Cote d'Azur, je construis des solutions data et IA utiles, de la preparation des donnees jusqu'a la mise en oeuvre applicative.",
    type: "website",
    url: "https://www.katib.me",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Katib Kachi — Data Science & IA | Alternance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Katib Kachi — Data Science & IA | Alternance",
    description:
      "Etudiant en L3 Informatique a l'Universite Cote d'Azur, je construis des solutions data et IA utiles, de la preparation des donnees jusqu'a la mise en oeuvre applicative.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${display.variable} ${sans.variable} ${mono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
