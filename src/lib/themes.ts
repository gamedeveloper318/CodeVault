export type ThemeName = "light" | "dark" | "orange" | "green" | "blue" | "purple";

export interface Theme {
  name: ThemeName;
  label: string;
  // CSS variable values
  bg: string;
  bgSecondary: string;
  surface: string;
  surfaceHover: string;
  border: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  primary: string;
  primaryHover: string;
  primaryText: string;
  accent: string;
  codeBg: string;
  shadow: string;
}

export const themes: Record<ThemeName, Theme> = {
  light: {
    name: "light",
    label: "Light",
    bg: "#f8fafc",
    bgSecondary: "#f1f5f9",
    surface: "#ffffff",
    surfaceHover: "#f8fafc",
    border: "#e2e8f0",
    text: "#0f172a",
    textSecondary: "#334155",
    textMuted: "#64748b",
    primary: "#6366f1",
    primaryHover: "#4f46e5",
    primaryText: "#ffffff",
    accent: "#8b5cf6",
    codeBg: "#1e293b",
    shadow: "0 24px 60px rgba(16,24,40,0.12)",
  },
  dark: {
    name: "dark",
    label: "Dark",
    bg: "#0f172a",
    bgSecondary: "#1e293b",
    surface: "#1e293b",
    surfaceHover: "#334155",
    border: "#334155",
    text: "#f1f5f9",
    textSecondary: "#cbd5e1",
    textMuted: "#94a3b8",
    primary: "#818cf8",
    primaryHover: "#6366f1",
    primaryText: "#0f172a",
    accent: "#a78bfa",
    codeBg: "#0f172a",
    shadow: "0 24px 60px rgba(0,0,0,0.4)",
  },
  orange: {
    name: "orange",
    label: "Orange",
    bg: "#fff7ed",
    bgSecondary: "#ffedd5",
    surface: "#ffffff",
    surfaceHover: "#fff7ed",
    border: "#fed7aa",
    text: "#1c1917",
    textSecondary: "#57534e",
    textMuted: "#78716c",
    primary: "#ea580c",
    primaryHover: "#c2410c",
    primaryText: "#ffffff",
    accent: "#f59e0b",
    codeBg: "#1c1917",
    shadow: "0 24px 60px rgba(194,65,12,0.15)",
  },
  green: {
    name: "green",
    label: "Green",
    bg: "#f0fdf4",
    bgSecondary: "#dcfce7",
    surface: "#ffffff",
    surfaceHover: "#f0fdf4",
    border: "#bbf7d0",
    text: "#14532d",
    textSecondary: "#166534",
    textMuted: "#4b7a52",
    primary: "#16a34a",
    primaryHover: "#15803d",
    primaryText: "#ffffff",
    accent: "#22c55e",
    codeBg: "#14532d",
    shadow: "0 24px 60px rgba(22,101,52,0.15)",
  },
  blue: {
    name: "blue",
    label: "Blue",
    bg: "#eff6ff",
    bgSecondary: "#dbeafe",
    surface: "#ffffff",
    surfaceHover: "#eff6ff",
    border: "#bfdbfe",
    text: "#0c4a6e",
    textSecondary: "#075985",
    textMuted: "#3b82a6",
    primary: "#2563eb",
    primaryHover: "#1d4ed8",
    primaryText: "#ffffff",
    accent: "#3b82f6",
    codeBg: "#0c4a6e",
    shadow: "0 24px 60px rgba(29,78,216,0.15)",
  },
  purple: {
    name: "purple",
    label: "Purple",
    bg: "#faf5ff",
    bgSecondary: "#f3e8ff",
    surface: "#ffffff",
    surfaceHover: "#faf5ff",
    border: "#e9d5ff",
    text: "#3b0764",
    textSecondary: "#581c87",
    textMuted: "#7c3a8e",
    primary: "#9333ea",
    primaryHover: "#7e22ce",
    primaryText: "#ffffff",
    accent: "#a855f7",
    codeBg: "#3b0764",
    shadow: "0 24px 60px rgba(126,34,206,0.15)",
  },
};

export const themeList: Theme[] = Object.values(themes);

export function applyTheme(themeName: ThemeName) {
  const theme = themes[themeName];
  const root = document.documentElement;
  root.style.setProperty("--bg", theme.bg);
  root.style.setProperty("--bg-secondary", theme.bgSecondary);
  root.style.setProperty("--surface", theme.surface);
  root.style.setProperty("--surface-hover", theme.surfaceHover);
  root.style.setProperty("--border", theme.border);
  root.style.setProperty("--text", theme.text);
  root.style.setProperty("--text-secondary", theme.textSecondary);
  root.style.setProperty("--text-muted", theme.textMuted);
  root.style.setProperty("--primary", theme.primary);
  root.style.setProperty("--primary-hover", theme.primaryHover);
  root.style.setProperty("--primary-text", theme.primaryText);
  root.style.setProperty("--accent", theme.accent);
  root.style.setProperty("--code-bg", theme.codeBg);
  root.style.setProperty("--shadow", theme.shadow);
  root.setAttribute("data-theme", themeName);
}
