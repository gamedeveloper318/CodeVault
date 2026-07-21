"use client";

import { useState, useEffect } from "react";
import { themeList, applyTheme, type ThemeName } from "@/lib/themes";

const THEME_STORAGE_KEY = "codevault-theme";

export function ThemeToggle() {
  const [current, setCurrent] = useState<ThemeName>("light");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem(THEME_STORAGE_KEY) as ThemeName) || "light";
    setCurrent(saved);
    applyTheme(saved);
  }, []);

  const selectTheme = (name: ThemeName) => {
    setCurrent(name);
    applyTheme(name);
    localStorage.setItem(THEME_STORAGE_KEY, name);
    setOpen(false);
  };

  const currentTheme = themeList.find((t) => t.name === current)!;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-lg border border-themed bg-surface px-3 py-2 text-sm font-medium text-secondary-themed transition hover:bg-[var(--surface-hover)]"
        aria-label="Change theme"
      >
        <span
          className="h-4 w-4 rounded-full border border-themed"
          style={{ background: currentTheme.primary }}
        />
        <span className="hidden sm:inline">{currentTheme.label}</span>
        <svg
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-themed bg-surface shadow-lg">
            {themeList.map((theme) => (
              <button
                key={theme.name}
                onClick={() => selectTheme(theme.name)}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition hover:bg-[var(--surface-hover)] ${
                  current === theme.name ? "bg-[var(--bg-secondary)]" : ""
                }`}
              >
                <span
                  className="h-4 w-4 rounded-full border border-themed"
                  style={{ background: theme.primary }}
                />
                <span className="text-secondary-themed">{theme.label}</span>
                {current === theme.name && (
                  <svg
                    className="ml-auto h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    style={{ color: theme.primary }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
