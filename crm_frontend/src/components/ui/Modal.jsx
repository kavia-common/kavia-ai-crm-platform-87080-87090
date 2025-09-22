import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Modal with header/body/footer. Controlled by open prop.
 */
const Modal = ({ open, title, children, footer, onClose }) => {
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose} aria-hidden="true">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div style={{fontWeight:700}}>{title}</div>
          <button className="button" onClick={onClose} aria-label="Close dialog">✕</button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
