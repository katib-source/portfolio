import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const sans = Geist({
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
  title: "Katib Kachi | Computer Science Portfolio",
  description: "L3 Computer Science student at Université Côte d'Azur specializing in AI, Data Science, and Machine Learning. Seeking alternance or internship opportunities.",
  keywords: ["Computer Science", "Artificial Intelligence", "Data Science", "Machine Learning", "Université Côte d'Azur", "Alternance", "Internship"],
  authors: [{ name: "Katib Kachi" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Katib Kachi | Computer Science Portfolio",
    description: "L3 Computer Science student at Université Côte d'Azur specializing in AI, Data Science, and Machine Learning.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Katib Kachi | Computer Science Portfolio",
    description: "L3 Computer Science student at Université Côte d'Azur specializing in AI, Data Science, and Machine Learning.",
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
        className={`${sans.variable} ${mono.variable} font-sans antialiased bg-background text-foreground`}
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
