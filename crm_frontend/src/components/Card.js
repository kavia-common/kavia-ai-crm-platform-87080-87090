import React from "react";

/**
 * PUBLIC_INTERFACE
 * Generic Card container with optional header and actions.
 */
export function Card({ title, actions, children, style }) {
  return (
    <section className="card" style={style}>
      {(title || actions) && (
        <div className="page-header" style={{ marginBottom: 8 }}>
          <div className="page-title">{title}</div>
          <div>{actions}</div>
        </div>
      )}
      {children}
    </section>
  );
}
