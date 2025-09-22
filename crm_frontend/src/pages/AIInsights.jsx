import React from 'react';
import Card from '../components/ui/Card';
import { formatCurrency } from '../utils/format';

const AIInsights = () => {
  const scores = [
    { id: 'C-102', name: 'Jane Cooper', score: 86, reason: 'High engagement, recent reply' },
    { id: 'C-221', name: 'Wade Warren', score: 72, reason: 'Multiple page views, demo booked' },
    { id: 'C-487', name: 'Cody Fisher', score: 58, reason: 'Opened email, no reply yet' },
  ];
  const forecast = [
    { period: 'This Month', expected: 120000, range: '$95k - $145k' },
    { period: 'This Quarter', expected: 310000, range: '$270k - $350k' },
  ];

  return (
    <div className="grid cols-2">
      <Card title="Lead Scoring" subtitle="Top recommended contacts to act on now">
        <table className="table">
          <thead>
            <tr>
              <th>Contact</th><th>Score</th><th>Why</th><th></th>
            </tr>
          </thead>
          <tbody>
            {scores.map(s => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td><span className="badge success">{s.score}</span></td>
                <td className="helper">{s.reason}</td>
                <td><button className="button">Open Contact</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card title="Forecast" subtitle="Revenue expectations and uncertainty">
        <table className="table">
          <thead>
            <tr>
              <th>Period</th><th>Expected</th><th>Range</th>
            </tr>
          </thead>
        <tbody>
            {forecast.map(f => (
              <tr key={f.period}>
                <td>{f.period}</td>
                <td>{formatCurrency(f.expected)}</td>
                <td>{f.range}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card title="Probability Analysis" subtitle="Pipeline health and risk">
        <div className="grid cols-3">
          <div className="card" style={{padding:16}}>
            <div className="helper">High Confidence</div>
            <div style={{fontSize:24, fontWeight:700}}>61%</div>
          </div>
          <div className="card" style={{padding:16}}>
            <div className="helper">Medium</div>
            <div style={{fontSize:24, fontWeight:700}}>27%</div>
          </div>
          <div className="card" style={{padding:16}}>
            <div className="helper">At Risk</div>
            <div style={{fontSize:24, fontWeight:700, color:'var(--color-error)'}}>12%</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AIInsights;
