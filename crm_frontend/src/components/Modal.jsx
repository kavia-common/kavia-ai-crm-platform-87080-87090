import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Modal
 * A simple modal dialog with header, body, and footer slots.
 */
export default function Modal({ open, title, children, footer, onClose }) {
  /** This is a public function. */
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">{title}</div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}
