import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Card with header and body sections.
 */
const Card = ({ title, subtitle, right, children, style }) => {
  return (
    <div className="card" style={style}>
      {(title || right) && (
        <div className="card-header" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <div style={{fontWeight:700}}>{title}</div>
            {subtitle && <div className="helper">{subtitle}</div>}
          </div>
          {right}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

export default Card;
