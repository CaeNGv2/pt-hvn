import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { api } from "@/api";
import { useToast } from "@/components/toast";
import { Button } from "@/components/ui";
import { useAuth } from "@/hooks";
import { AuthShell, authInputClass } from "./AuthShell";

interface LocationState {
  from?: { pathname?: string };
}

/** Admin login page (separate credentials from members). */
export default function AdminLoginPage() {
  const { loginAdmin } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as LocationState | null)?.from?.pathname ?? "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await api.auth.authControllerAdminLogin({ username, password });
      const token = (res.data as { accessToken?: string } | undefined)?.accessToken;
      if (!token) throw new Error("No token returned");
      loginAdmin(token);
      showToast({ title: "Signed in as admin", tone: "success" });
      navigate(from, { replace: true });
    } catch (e) {
      setError("Invalid admin credentials." + JSON.stringify(e));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell title="Admin sign in" subtitle="Staff access only">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Username</span>
          <input
            type="text"
            required
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
