"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { CodeBlock } from "./CodeBlock";

interface GenerateResponse {
  code: string;
  language: string;
  explanation: string;
  requiresLogin?: boolean;
}

const EXAMPLE_PROMPTS = [
  "A Python function to check if a number is prime",
  "React component for a todo list with add and delete",
  "SQL query to create a users table with indexes",
  "JavaScript function to debounce function calls",
  "Go HTTP server with a REST API endpoint",
];

export function PromptForm() {
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });
      const data = (await res.json()) as GenerateResponse;
      if (!res.ok) {
        if (data.requiresLogin) {
          setError("You've used your free trial. Please log in to continue generating code.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } else {
        setResult(data);
      }
    } catch {
      setError("Failed to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleGenerate();
    }
  };

  return (
    <div className="w-full">
      {/* Prompt input */}
      <div
        className="rounded-2xl border border-themed bg-surface p-4 transition-all"
        style={{ boxShadow: "var(--shadow)" }}
      >
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe the code you want to generate... (e.g., 'A Python function to calculate Fibonacci sequence')"
            rows={3}
            className="w-full resize-none rounded-xl border border-themed bg-[var(--bg-secondary)] p-4 text-sm text-themed outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
            style={{ color: "var(--text)" }}
          />
        </div>

        {/* Action bar */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_PROMPTS.slice(0, 2).map((ex) => (
              <button
                key={ex}
                onClick={() => setPrompt(ex)}
                className="rounded-full border border-themed px-3 py-1 text-xs text-muted-themed transition hover:bg-[var(--surface-hover)] hover:text-secondary-themed"
              >
                {ex.length > 35 ? ex.slice(0, 35) + "..." : ex}
              </button>
            ))}
          </div>
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="primary-bg flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Generating...
              </>
            ) : (
              <>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Generate Code
              </>
            )}
          </button>
        </div>
        <p className="mt-2 text-xs text-muted-themed">
          Press ⌘/Ctrl + Enter to generate
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          <svg
            className="h-5 w-5 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div className="flex-1">{error}</div>
          {!session && (
            <a
              href="/login"
              className="font-semibold underline"
              style={{ color: "var(--primary)" }}
            >
              Log in
            </a>
          )}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="mt-6 animate-fade-in-up">
          {result.explanation && (
            <div
              className="mb-3 rounded-xl border border-themed bg-[var(--bg-secondary)] p-4"
            >
              <div className="flex items-start gap-2">
                <svg
                  className="mt-0.5 h-4 w-4 flex-shrink-0"
                  style={{ color: "var(--primary)" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm text-secondary-themed">
                  {result.explanation}
                </p>
              </div>
            </div>
          )}
          <CodeBlock code={result.code} language={result.language} />
        </div>
      )}
    </div>
  );
}
