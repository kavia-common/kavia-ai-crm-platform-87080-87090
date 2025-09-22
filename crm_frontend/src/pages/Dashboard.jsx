import React from 'react';
import Card from '../components/ui/Card';
import { formatCurrency } from '../utils/format';
import EmptyState from '../components/ui/EmptyState';

const mock = {
  kpis: [
    { label: 'Open Pipeline', value: 425000, trend: '+8.2%' },
    { label: 'Won MTD', value: 98000, trend: '+2.4%' },
    { label: 'Avg. Win Rate', value: '28%', trend: '+1.1%' },
    { label: 'Avg. Cycle', value: '34 days', trend: '−0.8d' },
  ],
  recent: [
    { id: 1, name: 'Acme Inc. - Q3 Expansion', amount: 54000, stage: 'poc proposal' },
    { id: 2, name: 'Globex - Migration', amount: 120000, stage: 'discovery call' },
    { id: 3, name: 'Initech - Renewal', amount: 36000, stage: 'negotiation and contracting' },
  ],
  ai: {
    forecast: '$310k this quarter (±$40k)',
    note: 'Top drivers: Increased conversion in Evaluation and higher average deal size.',
  },
};

const Dashboard = () => {
  return (
    <div className="grid" style={{gap:16}}>
      <div className="grid cols-4">
        {mock.kpis.map((k) => (
          <Card key={k.label} title={k.label} right={<div className="kpi-trend">{k.trend}</div>}>
            <div className="kpi">
              <div className="kpi-value">
                {typeof k.value === 'number' ? formatCurrency(k.value) : k.value}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid cols-2">
        <Card title="Recent Deals" subtitle="Your latest progressing opportunities">
          <table className="table">
            <thead>
              <tr>
                <th>Deal</th>
                <th>Stage</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {mock.recent.map((d) => (
                <tr key={d.id}>
                  <td>{d.name}</td>
                  <td><span className="badge success" style={{ textTransform: 'capitalize' }}>{d.stage}</span></td>
                  <td>{formatCurrency(d.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title="AI Forecast" subtitle="Quarter projection and drivers">
          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            <div><strong>Projection:</strong> {mock.ai.forecast}</div>
            <div className="helper">{mock.ai.note}</div>
          </div>
        </Card>
      </div>

      <EmptyState
        title="Get more from AI"
        description="Connect your backend to unlock lead scoring and probabilistic forecasting."
        action={<button className="button primary">View AI Insights</button>}
      />
    </div>
  );
};

export default Dashboard;
