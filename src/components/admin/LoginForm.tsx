"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/admin/actions";

const initial: LoginState = { error: "" };

export function LoginForm() {
  const [state, action, pending] = useActionState(login, initial);

  return (
    <form action={action} className="login-form">
      <input type="text" name="username" value="admin" autoComplete="username" readOnly hidden />
      <label className="field">
        <span className="field-label">Password</span>
        <input
          className="input"
          type="password"
          name="password"
          autoComplete="current-password"
          required
          maxLength={256}
          autoFocus
        />
      </label>
      <div className="form-actions form-actions--tight">
        <button type="submit" className="btn-primary" disabled={pending}>
          {pending ? "Checking…" : "Sign in ↗"}
        </button>
        <span className="form-error" role="alert">
          {state.error}
        </span>
      </div>
    </form>
  );
}
