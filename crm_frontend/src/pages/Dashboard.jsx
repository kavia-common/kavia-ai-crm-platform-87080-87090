import React, { useMemo } from 'react';
import Card from '../components/ui/Card';
import { formatCurrency } from '../utils/format';
import EmptyState from '../components/ui/EmptyState';

/**
 * Lightweight inline sparkline component using SVG for tiny trend charts.
 * Ocean Professional accents; no external dependencies.
 */
const Sparkline = ({ data = [], width = 120, height = 36, stroke = 'var(--color-primary)' }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <svg width={width} height={height} />;
  }
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = Math.max(1, max - min);
  const step = width / Math.max(1, data.length - 1);

  const points = data
    .map((v, i) => {
      const x = i * step;
      // invert y so higher values go up
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    })
    .join(' ');

  const last = data[data.length - 1] ?? 0;
  const first = data[0] ?? 0;
  const up = last >= first;

  return (
    <svg width={width} height={height} aria-label="sparkline trend">
      <polyline
        fill="none"
        stroke={up ? stroke : 'var(--color-error)'}
        strokeWidth="2"
        points={points}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* subtle gradient fill for area */}
      <defs>
        <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(37,99,235,0.25)" />
          <stop offset="100%" stopColor="rgba(37,99,235,0)" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${height} ${points} ${width},${height}`}
        fill={up ? 'url(#sparkFill)' : 'rgba(239,68,68,0.15)'}
      />
    </svg>
  );
};

/**
 * Tiny horizontal bar for percent metrics in tiles.
 */
const TinyBar = ({ value = 0, color = 'var(--color-primary)' }) => {
  const v = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div style={{ width: '100%', height: 8, background: 'rgba(17,24,39,0.08)', borderRadius: 999 }}>
      <div style={{ width: `${v}%`, height: '100%', background: color, borderRadius: 999 }} />
    </div>
  );
};

// Mock data for demo rendering; replace with service calls when backend is connected.
const mock = {
  kpis: [
    { label: 'Total Pipeline', value: 425000, trend: '+8.2%', change: 8.2, series: [320, 330, 340, 350, 360, 380, 420, 425] },
    { label: 'Deals Won (MTD)', value: 98000, trend: '+2.4%', change: 2.4, series: [70, 74, 72, 78, 81, 87, 95, 98] },
    { label: 'Win Rate', value: 28, unit: '%', trend: '+1.1%', change: 1.1, series: [21, 22, 23, 24, 25, 27, 27, 28] },
    { label: 'Avg. Sales Cycle', value: 34, unit: ' days', trend: '−0.8d', change: -0.8, series: [41, 40, 39, 38, 37, 36, 35, 34] },
  ],
  activity: {
    logged: 142,
    target: 180,
    series: [12, 18, 17, 16, 20, 23, 18, 18, 16, 22, 24, 26],
  },
  newLeads: {
    count: 38,
    series: [2, 4, 5, 4, 3, 6, 7, 3, 4, 5, 8, 9],
  },
  accounts: [
    { name: 'Acme Inc.', open: 3, value: 128000 },
    { name: 'Globex', open: 2, value: 84000 },
    { name: 'Initech', open: 1, value: 36000 },
    { name: 'GCS Tech', open: 2, value: 92000 },
  ],
  recent: [
    { id: 1, name: 'Acme Inc. - Q3 Expansion', amount: 54000, stage: 'poc proposal' },
    { id: 2, name: 'Globex - Migration', amount: 120000, stage: 'discovery call' },
    { id: 3, name: 'Initech - Renewal', amount: 36000, stage: 'negotiation and contracting' },
  ],
  insights: [
    { icon: '⚡', text: 'Follow up with 5 warm leads idle > 7 days to improve conversion.' },
    { icon: '🎯', text: 'Book 2 demos this week to stay on pace for MTD target.' },
    { icon: '📈', text: 'Accounts with 2+ activities in last 5 days show 18% higher win rate.' },
  ],
  ai: {
    forecast: '$310k this quarter (±$40k)',
    note: 'Top drivers: Increased conversion in Evaluation and higher average deal size.',
  },
};

const colorForChange = (change) => {
  if (change > 0) return 'var(--color-primary)';
  if (change < 0) return 'var(--color-error)';
  return 'var(--color-muted)';
};

const Dashboard = () => {
  const activityPct = useMemo(() => Math.round((mock.activity.logged / mock.activity.target) * 100), []);
  const totalOpenDeals = useMemo(() => mock.accounts.reduce((s, a) => s + a.open, 0), []);
  const pipelineTotal = useMemo(() => mock.kpis[0]?.value || 0, []);

  return (
    <div className="grid" style={{ gap: 16 }}>
      {/* KPI headline row */}
      <div className="grid cols-4">
        {mock.kpis.map((k) => {
          const num = typeof k.value === 'number' && k.unit !== '%';
          return (
            <Card
              key={k.label}
              title={k.label}
              right={
                <div className="kpi-trend" style={{ background: 'rgba(37,99,235,0.08)', color: colorForChange(k.change) }}>
                  {k.trend}
                </div>
              }
              style={{
                background: 'var(--color-surface)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 8 }}>
                <div>
                  <div className="kpi-value" style={{ lineHeight: 1.1 }}>
                    {num ? formatCurrency(k.value) : `${k.value}${k.unit || ''}`}
                  </div>
                  <div className="helper" style={{ marginTop: 4 }}>
                    {k.change >= 0 ? '▲' : '▼'} {Math.abs(k.change)}
                    {typeof k.value === 'number' && k.unit === '%' ? '%' : k.unit ? '' : '%'} vs prev.
                  </div>
                </div>
                <Sparkline data={k.series} width={130} height={40} />
              </div>
            </Card>
          );
        })}
      </div>

      {/* Actionable insights + Activity and Leads */}
      <div className="grid cols-3">
        <Card title="Actionable Insights" subtitle="AI-friendly nudges for the week">
          <div className="grid">
            {mock.insights.map((i, idx) => (
              <div key={idx} className="card" style={{ padding: 12, display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'linear-gradient(135deg, rgba(37,99,235,0.12), rgba(249,250,251,1))',
                  boxShadow: 'var(--shadow-sm)'
                }}>{i.icon}</div>
                <div style={{ fontWeight: 600 }}>{i.text}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card
          title="Activities Logged"
          subtitle={`${mock.activity.logged}/${mock.activity.target} this month`}
          right={<div className="helper">{activityPct}% to target</div>}
        >
          <Sparkline data={mock.activity.series} width={220} height={48} />
          <div style={{ marginTop: 10 }}>
            <TinyBar value={activityPct} />
          </div>
          <div className="helper" style={{ marginTop: 8 }}>
            Tip: reps with daily touchpoints see 1.4x pipeline growth.
          </div>
        </Card>

        <Card
          title="New Leads"
          subtitle="This month"
          right={<div className="badge" style={{ background: 'rgba(245,158,11,0.12)', color: 'var(--color-secondary)' }}>
            {mock.newLeads.count} new
          </div>}
        >
          <Sparkline data={mock.newLeads.series} width={220} height={48} />
          <div className="helper" style={{ marginTop: 8 }}>
            Aim for 10+ warm leads weekly to sustain pipeline velocity.
          </div>
        </Card>
      </div>

      {/* Accounts breakdown + Recent deals */}
      <div className="grid cols-2">
        <Card
          title="Account Breakdown"
          subtitle={`${totalOpenDeals} open deals • ${formatCurrency(pipelineTotal)} total pipeline`}
        >
          <table className="table" role="table" aria-label="Account breakdown table">
            <thead>
              <tr>
                <th>Account</th>
                <th>Open</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {mock.accounts.map((a) => (
                <tr key={a.name}>
                  <td style={{ fontWeight: 600 }}>{a.name}</td>
                  <td>
                    <span className="badge success">{a.open} open</span>
                  </td>
                  <td>{formatCurrency(a.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title="Recent Deals" subtitle="Latest opportunities in motion">
          <table className="table" role="table" aria-label="Recent deals table">
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
                  <td>
                    <span className="badge success" style={{ textTransform: 'capitalize' }}>
                      {d.stage}
                    </span>
                  </td>
                  <td>{formatCurrency(d.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* AI forecast teaser + CTA */}
      <div className="grid cols-2">
        <Card title="AI Forecast" subtitle="Quarter projection and drivers">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div><strong>Projection:</strong> {mock.ai.forecast}</div>
            <div className="helper">{mock.ai.note}</div>
          </div>
        </Card>

        <EmptyState
          title="Get more from AI"
          description="Connect your backend to unlock lead scoring and probabilistic forecasting."
          action={<a className="button primary" href="/ai">View AI Insights</a>}
        />
      </div>
    </div>
  );
};

export default Dashboard;
