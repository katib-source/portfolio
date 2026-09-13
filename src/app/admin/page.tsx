import { redirect } from "next/navigation";
import { AdminApp } from "@/components/admin/AdminApp";
import { isAdmin } from "@/lib/auth";
import { isStorageConfigured, readContent } from "@/lib/content";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  const content = await readContent();
  return <AdminApp initial={content} storageReady={isStorageConfigured()} />;
}
