import React from "react";

/**
 * PUBLIC_INTERFACE
 * Accessible modal with header, body, and actions.
 */
export function Modal({ open, title, onClose, children, actions }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <div className="modal-actions">
            {actions}
            <button className="btn secondary" onClick={onClose}>Close</button>
          </div>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
