"use client";

import { useState } from "react";

export function BookGuide() {
  const [open, setOpen] = useState(false);

  return (
    <section className="mx-auto mt-12 w-full max-w-3xl px-4 sm:px-6">
      <div
        className="overflow-hidden rounded-2xl border border-themed bg-surface transition-all duration-300"
        style={{ boxShadow: "var(--shadow)" }}
      >
        {/* Book cover header */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center gap-4 p-5 text-left transition hover:bg-[var(--surface-hover)]"
        >
          <div className="flex h-14 w-11 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-b from-[var(--primary)] to-[var(--primary-hover)] shadow-md">
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-themed">User Guide</h2>
            <p className="text-sm text-muted-themed">
              Learn what CodeVault is and how to use it
            </p>
          </div>
          <svg
            className={`h-5 w-5 text-muted-themed transition-transform ${open ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Book content */}
        {open && (
          <div className="border-t border-themed bg-[var(--bg-secondary)] p-6 animate-fade-in-up">
            <div className="prose prose-sm max-w-none">
              <h3 className="mb-2 text-base font-bold text-themed">
                What is CodeVault?
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-secondary-themed">
                CodeVault is a free AI-powered code generator that helps you build
                apps and websites faster. Instead of writing code from scratch, you
                simply describe what you want in plain English (a "prompt"), and
                CodeVault generates the complete, ready-to-use code for you.
              </p>

              <h3 className="mb-2 text-base font-bold text-themed">
                What does it do?
              </h3>
              <ul className="mb-4 space-y-2 text-sm text-secondary-themed">
                <li className="flex gap-2">
                  <span style={{ color: "var(--primary)" }}>✓</span>
                  Generates code in 16+ languages including JavaScript, Python,
                  Java, C++, Go, Rust, Swift, SQL, and more.
                </li>
                <li className="flex gap-2">
                  <span style={{ color: "var(--primary)" }}>✓</span>
                  Creates full programs, functions, components, API endpoints, and
                  database queries from a simple text prompt.
                </li>
                <li className="flex gap-2">
                  <span style={{ color: "var(--primary)" }}>✓</span>
                  Provides a one-click copy button so you can instantly paste the
                  generated code into your project.
                </li>
                <li className="flex gap-2">
                  <span style={{ color: "var(--primary)" }}>✓</span>
                  Detects the programming language automatically based on your
                  prompt.
                </li>
                <li className="flex gap-2">
                  <span style={{ color: "var(--primary)" }}>✓</span>
                  Completely free to use — no credit card required.
                </li>
              </ul>

              <h3 className="mb-2 text-base font-bold text-themed">
                How to use it
              </h3>
              <ol className="mb-4 space-y-2 text-sm text-secondary-themed">
                <li className="flex gap-2">
                  <span className="font-bold" style={{ color: "var(--primary)" }}>
                    1.
                  </span>
                  Type a clear prompt describing the code you need (e.g., "a Python
                  function to sort a list").
                </li>
                <li className="flex gap-2">
                  <span className="font-bold" style={{ color: "var(--primary)" }}>
                    2.
                  </span>
                  Click the "Generate Code" button.
                </li>
                <li className="flex gap-2">
                  <span className="font-bold" style={{ color: "var(--primary)" }}>
                    3.
                  </span>
                  Copy the generated code with one click and use it in your project.
                </li>
              </ol>

              <div
                className="rounded-lg border border-themed p-3"
                style={{ background: "var(--surface)" }}
              >
                <p className="text-xs text-muted-themed">
                  <strong className="text-secondary-themed">Free Trial:</strong>{" "}
                  First-time visitors can generate code once without logging in.
                  After that, create a free account to continue generating unlimited
                  code.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
