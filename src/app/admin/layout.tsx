import type { Metadata } from "next";
import { connection } from "next/server";
import { fontVariables } from "@/app/fonts";
import "@/styles/base.css";
import "@/styles/admin.css";

export const metadata: Metadata = {
  title: "Project admin · katib*",
  robots: { index: false, follow: false, nocache: true },
  icons: { icon: "/favicon.svg" },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await connection();
  return (
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
