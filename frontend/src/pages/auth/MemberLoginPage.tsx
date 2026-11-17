import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { api } from "@/api";
import { useToast } from "@/components/toast";
import { Button } from "@/components/ui";
import { useAuth } from "@/hooks";
import { AuthShell, authInputClass } from "./AuthShell";

interface LocationState {
  from?: { pathname?: string };
}

/** Member login page. */
export default function MemberLoginPage() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LocationState | null)?.from?.pathname ?? "/portal";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await api.auth.authControllerMemberLogin({ email, password });
      const token = (res.data as { accessToken?: string } | undefined)?.accessToken;
      if (!token) throw new Error("No token returned");
      login(token);
      showToast({ title: "Welcome back!", tone: "success" });
      navigate(from, { replace: true });
    } catch (e) {
      setError(`Invalid email or password. ${JSON.stringify(e)}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      title="Sign in"
      subtitle="Access your Pet Heaven portal"
      footer={
        <>
          New here?{" "}
          <Link
            to="/portal/register"
            className="font-medium text-[var(--color-primary)] hover:underline"
          >
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Email</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={authInputClass}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Password</span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={authInputClass}
          />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button type="submit" disabled={submitting} className="w-full">
          {submitting ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </AuthShell>
  );
}
