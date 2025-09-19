import React from "react";

/**
 * PUBLIC_INTERFACE
 * Status badge for small highlights.
 */
export function Badge({ children, color = "primary" }) {
  const style = color === "amber"
    ? { background: "#FEF3C7", color: "#92400E", borderColor: "#FDE68A" }
    : color === "green"
    ? { background: "#ECFDF5", color: "#065F46", borderColor: "#A7F3D0" }
    : { background: "#EFF6FF", color: "#1D4ED8", borderColor: "#DBEAFE" };
  return (
    <span className="kbadge" style={{ background: style.background, color: style.color, borderColor: style.borderColor }}>
      {children}
    </span>
  );
}
