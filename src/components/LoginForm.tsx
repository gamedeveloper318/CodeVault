"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (mode === "register") {
      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Registration failed");
          setLoading(false);
          return;
        }
        // Auto-login after registration
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        if (result?.error) {
          setError("Login failed after registration");
          setLoading(false);
          return;
        }
        router.push(callbackUrl);
        router.refresh();
      } catch {
        setError("Something went wrong");
        setLoading(false);
      }
    } else {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }
      router.push(callbackUrl);
      router.refresh();
    }
  };

  const handleOAuth = async (provider: string) => {
    setError(null);
    await signIn(provider, { callbackUrl });
  };

  return (
    <div
      className="w-full max-w-md rounded-2xl border border-themed bg-surface p-8"
      style={{ boxShadow: "var(--shadow)" }}
    >
      <div className="mb-6 text-center">
        <div
          className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl text-xl font-bold text-white"
          style={{ background: "var(--primary)" }}
        >
          {"</>"}
        </div>
        <h1 className="text-2xl font-bold text-themed">
          {mode === "login" ? "Welcome back" : "Create account"}
        </h1>
        <p className="mt-1 text-sm text-muted-themed">
          {mode === "login"
            ? "Log in to continue generating code"
            : "Join CodeVault to generate unlimited code"}
        </p>
      </div>

      {/* OAuth buttons */}
      <div className="space-y-2.5">
        <OAuthButton
          provider="google"
          label="Continue with Google"
          onClick={() => handleOAuth("google")}
          icon={
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          }
        />
        <OAuthButton
          provider="facebook"
          label="Continue with Facebook"
          onClick={() => handleOAuth("facebook")}
          icon={
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          }
        />
        <OAuthButton
          provider="apple"
          label="Continue with Apple"
          onClick={() => handleOAuth("apple")}
          icon={
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
          }
        />
      </div>

      {/* Divider */}
      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-[var(--border)]" />
        <span className="text-xs text-muted-themed">or</span>
        <div className="h-px flex-1 bg-[var(--border)]" />
      </div>

      {/* Credentials form */}
      <form onSubmit={handleCredentials} className="space-y-3">
        {mode === "register" && (
          <div>
            <label className="mb-1 block text-sm font-medium text-secondary-themed">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-lg border border-themed bg-[var(--bg-secondary)] px-3 py-2.5 text-sm text-themed outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
            />
          </div>
        )}
        <div>
          <label className="mb-1 block text-sm font-medium text-secondary-themed">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full rounded-lg border border-themed bg-[var(--bg-secondary)] px-3 py-2.5 text-sm text-themed outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-secondary-themed">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength={6}
            className="w-full rounded-lg border border-themed bg-[var(--bg-secondary)] px-3 py-2.5 text-sm text-themed outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
          />
        </div>

        {error && (
          <div className="rounded-lg border border-red-300 bg-red-50 p-2.5 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="primary-bg w-full rounded-lg py-2.5 text-sm font-semibold transition disabled:opacity-50"
        >
          {loading
            ? "Please wait..."
            : mode === "login"
              ? "Log In"
              : "Create Account"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-muted-themed">
        {mode === "login" ? (
          <>
            Don&apos;t have an account?{" "}
            <button
              onClick={() => {
                setMode("register");
                setError(null);
              }}
              className="font-semibold"
              style={{ color: "var(--primary)" }}
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              onClick={() => {
                setMode("login");
                setError(null);
              }}
              className="font-semibold"
              style={{ color: "var(--primary)" }}
            >
              Log in
            </button>
          </>
        )}
      </p>

      <p className="mt-4 text-center">
        <Link
          href="/"
          className="text-sm text-muted-themed transition hover:text-secondary-themed"
        >
          ← Back to home
        </Link>
      </p>
    </div>
  );
}

function OAuthButton({
  label,
  onClick,
  icon,
}: {
  provider: string;
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-center gap-3 rounded-lg border border-themed bg-surface py-2.5 text-sm font-medium text-secondary-themed transition hover:bg-[var(--surface-hover)]"
    >
      {icon}
      {label}
    </button>
  );
}
