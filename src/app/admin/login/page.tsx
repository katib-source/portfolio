import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { isAdmin, isAuthConfigured } from "@/lib/auth";

export const metadata: Metadata = { title: "Sign in · katib* admin" };

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <main className="login">
      <div className="panel login-card">
        <div className="admin-brand">
          <span className="wordmark">
            katib<span className="star">*</span>
          </span>
          <span className="admin-label">PROJECT ADMIN</span>
        </div>
        <p className="panel-note">sign in to edit projects and certifications.</p>
        {!isAuthConfigured() && process.env.NODE_ENV !== "production" && (
          <p className="form-error login-config">
            ADMIN_PASSWORD_HASH / SESSION_SECRET are not set — run `npm run hash-password` and add them to .env.local.
          </p>
        )}
        <LoginForm />
      </div>
    </main>
  );
}
