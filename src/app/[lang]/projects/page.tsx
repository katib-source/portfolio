import { notFound, redirect } from "next/navigation";
import { isLocale } from "@/lib/types";

export default async function ProjectsIndex({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  redirect(`/${lang}#projects`);
}
