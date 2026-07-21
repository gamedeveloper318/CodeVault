"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-30 border-b border-themed bg-surface/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg text-lg font-bold text-white"
            style={{ background: "var(--primary)" }}
          >
            {"</>"}
          </div>
          <span className="text-xl font-bold tracking-tight text-themed">
            Code<span style={{ color: "var(--primary)" }}>Vault</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {session ? (
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 sm:flex">
                {session.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name ?? "User"}
                    className="h-8 w-8 rounded-full border border-themed"
                  />
                ) : (
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white"
                    style={{ background: "var(--primary)" }}
                  >
                    {(session.user?.name ?? session.user?.email ?? "?")
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                )}
                <span className="text-sm font-medium text-secondary-themed">
                  {session.user?.name ?? session.user?.email}
                </span>
              </div>
              <button
                onClick={() => signOut()}
                className="rounded-lg border border-themed px-3 py-2 text-sm font-medium text-secondary-themed transition hover:bg-[var(--surface-hover)]"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="primary-bg rounded-lg px-4 py-2 text-sm font-semibold transition"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
