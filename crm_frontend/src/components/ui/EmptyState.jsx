import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Empty state with title and description.
 */
const EmptyState = ({ title = 'Nothing here yet', description = 'Add your first record to get started.', action }) => {
  return (
    <div className="card" style={{textAlign:'center', padding:24}}>
      <div style={{fontSize:18, fontWeight:700, marginBottom:8}}>{title}</div>
      <div className="helper" style={{marginBottom:16}}>{description}</div>
      {action}
    </div>
  );
};

export default EmptyState;
