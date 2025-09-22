import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Tabs control. Provide items=[{key,label}] and activeKey.
 */
const Tabs = ({ items = [], activeKey, onChange }) => {
  return (
    <div className="tabs">
      {items.map((t) => (
        <div
          key={t.key}
          className={`tab${t.key === activeKey ? ' active' : ''}`}
          role="button"
          onClick={() => onChange?.(t.key)}
        >
          {t.label}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
