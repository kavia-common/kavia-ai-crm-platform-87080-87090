//
// Ocean Professional Theme: central design tokens and helpers
//
export const theme = {
  name: "Ocean Professional",
  colors: {
    primary: "#2563EB", // blue-600
    secondary: "#F59E0B", // amber-500
    success: "#10B981", // green-500 for confirmations
    warning: "#F59E0B",
    error: "#EF4444", // red-500
    background: "#f9fafb", // gray-50
    surface: "#ffffff",
    text: "#111827", // gray-900
    textMuted: "#6B7280", // gray-500
    border: "#E5E7EB", // gray-200
    shadow: "rgba(0, 0, 0, 0.08)",
  },
  radii: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    md: "0 4px 10px rgba(0,0,0,0.08)",
    lg: "0 10px 20px rgba(0,0,0,0.10)",
  },
  transitions: {
    base: "all 200ms ease",
    slow: "all 300ms ease",
  },
};

// PUBLIC_INTERFACE
export function applyTheme() {
  /** Apply CSS variables to document root for use across the app. */
  const root = document.documentElement;
  const c = theme.colors;
  root.style.setProperty("--color-primary", c.primary);
  root.style.setProperty("--color-secondary", c.secondary);
  root.style.setProperty("--color-success", c.success);
  root.style.setProperty("--color-error", c.error);
  root.style.setProperty("--bg", c.background);
  root.style.setProperty("--surface", c.surface);
  root.style.setProperty("--text", c.text);
  root.style.setProperty("--text-muted", c.textMuted);
  root.style.setProperty("--border", c.border);
  root.style.setProperty("--shadow", c.shadow);

  root.style.setProperty("--radius-sm", theme.radii.sm);
  root.style.setProperty("--radius-md", theme.radii.md);
  root.style.setProperty("--radius-lg", theme.radii.lg);

  root.style.setProperty("--shadow-sm", theme.shadows.sm);
  root.style.setProperty("--shadow-md", theme.shadows.md);
  root.style.setProperty("--shadow-lg", theme.shadows.lg);

  root.style.setProperty("--transition", theme.transitions.base);
  root.style.setProperty("--transition-slow", theme.transitions.slow);
}
