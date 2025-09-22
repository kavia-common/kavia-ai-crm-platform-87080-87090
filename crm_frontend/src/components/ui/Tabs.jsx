import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Tabs control. Provide items=[{key,label}] and activeKey.
 */
const Tabs = ({ items = [], activeKey, onChange }) => {
  return (
    <div className="tabs" role="tablist" aria-label="Tabs">
      {items.map((t) => {
        const active = t.key === activeKey;
        return (
          <div
            key={t.key}
            className={`tab${active ? ' active' : ''}`}
            role="tab"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange?.(t.key)}
          >
            {t.label}
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
