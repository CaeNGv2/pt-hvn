import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { api } from "@/api";
import { useToast } from "@/components/toast";
import { Button } from "@/components/ui";
import { useAuth } from "@/hooks";
import { AuthShell, authInputClass } from "./AuthShell";

/** Member registration page. Registers, then signs the new member straight in. */
export default function MemberRegisterPage() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await api.members.membersControllerRegister({
        fullName,
        email,
        password,
        phone: phone.trim() || undefined,
      });

      // Register doesn't return a token — log in to obtain one.
      const res = await api.auth.authControllerMemberLogin({ email, password });
      const token = (res.data as { accessToken?: string } | undefined)?.accessToken;
      if (token) login(token);

      showToast({
        title: "Account created",
        description: `Welcome to Pet Heaven, ${fullName}!`,
        tone: "success",
      });
      navigate("/portal", { replace: true });
    } catch (e) {
      setError(`Couldn't create your account. ${JSON.stringify(e)}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      title="Create an account"
      subtitle="Join Pet Heaven to adopt or surrender a pet"
      footer={
        <>
          Already have an account?{" "}
          <Link
            to="/portal/login"
            className="font-medium text-[var(--color-primary)] hover:underline"
          >
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Full name</span>
          <input
            type="text"
            required
            maxLength={128}
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={authInputClass}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Email</span>
          <input
            type="email"
            required
            maxLength={256}
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
            minLength={4}
            maxLength={256}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={authInputClass}
          />
          <span className="text-xs text-[var(--color-text-default)]/50">
            At least 4 characters.
          </span>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">
            Phone <span className="text-[var(--color-text-default)]/40">(optional)</span>
          </span>
          <input
            type="tel"
            maxLength={32}
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={authInputClass}
          />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button type="submit" disabled={submitting} className="w-full">
          {submitting ? "Creating account…" : "Create account"}
        </Button>
      </form>
    </AuthShell>
  );
}
