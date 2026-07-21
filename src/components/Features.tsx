"use client";

const FEATURES = [
  {
    title: "Prompt to Code",
    description:
      "Type what you need in plain English and get complete, runnable code instantly.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    ),
  },
  {
    title: "16+ Languages",
    description:
      "JavaScript, Python, Java, C++, Go, Rust, Swift, SQL, and many more.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
      />
    ),
  },
  {
    title: "One-Click Copy",
    description:
      "Copy the full generated code with a single click. Paste it into your project and go.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    ),
  },
  {
    title: "Free Forever",
    description:
      "No credit card, no paywalls. Generate code freely after a quick sign-up.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    ),
  },
  {
    title: "Multiple Themes",
    description:
      "Choose from Light, Dark, Orange, Green, Blue, and Purple themes. Code your way.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
      />
    ),
  },
  {
    title: "Easy Login",
    description:
      "Sign in with Google, Facebook, Apple, or email. One free trial, no login needed.",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    ),
  },
];

export function Features() {
  return (
    <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-themed">Why CodeVault?</h2>
        <p className="mt-2 text-muted-themed">
          Everything you need to turn ideas into code, fast.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="group rounded-2xl border border-themed bg-surface p-6 transition-all hover:-translate-y-1"
            style={{ boxShadow: "var(--shadow)" }}
          >
            <div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
              style={{ background: "var(--bg-secondary)" }}
            >
              <svg
                className="h-6 w-6"
                style={{ color: "var(--primary)" }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                {feature.icon}
              </svg>
            </div>
            <h3 className="text-lg font-bold text-themed">{feature.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-themed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
