import React from 'react';
import Card from '../components/ui/Card';

const Settings = () => {
  return (
    <div className="grid cols-2">
      <Card title="Workspace" subtitle="Name and branding">
        <div className="grid">
          <div>
            <div className="helper">Workspace Name</div>
            <input className="input" defaultValue="Kavia CRM" />
          </div>
          <div>
            <div className="helper">Primary Color</div>
            <input className="input" type="color" defaultValue="#2563EB" />
          </div>
        </div>
      </Card>
      <Card title="API" subtitle="Backend integration">
        <div className="grid">
          <div className="helper">Set REACT_APP_API_BASE in environment to connect to backend API.</div>
          <code style={{background:'#f3f4f6', padding:8, borderRadius:8}}>
            REACT_APP_API_BASE=https://your-backend.example.com/api
          </code>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
