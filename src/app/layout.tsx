import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
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
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
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
