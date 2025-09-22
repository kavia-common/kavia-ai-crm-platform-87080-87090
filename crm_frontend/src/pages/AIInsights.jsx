import React, { useMemo, useState } from 'react';
import Card from '../components/ui/Card';
import { formatCurrency } from '../utils/format';

/**
 * Color helper for lead score banding.
 * cold: 0-49, warm: 50-74, hot: 75-100
 */
function scoreBand(score) {
  if (score >= 75) return { label: 'Hot', color: 'var(--color-primary)', bg: 'rgba(37,99,235,0.1)' };
  if (score >= 50) return { label: 'Warm', color: 'var(--color-secondary)', bg: 'rgba(245,158,11,0.12)' };
  return { label: 'Cold', color: 'var(--color-muted)', bg: 'rgba(17,24,39,0.06)' };
}

/**
 * Small radial progress indicator using SVG, Ocean Professional style.
 */
const Radial = ({ value = 0, size = 56, stroke = 8, color = 'var(--color-primary)' }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(100, value));
  const dash = (clamped / 100) * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-label={`Score ${value}%`}>
      <circle cx={size/2} cy={size/2} r={r} stroke="rgba(17,24,39,0.12)" strokeWidth={stroke} fill="none" />
      <circle
        cx={size/2}
        cy={size/2}
        r={r}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${c - dash}`}
        transform={`rotate(-90 ${size/2} ${size/2})`}
      />
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fontSize="12" fontWeight="700" fill="#111827">
        {clamped}
      </text>
    </svg>
  );
};

/**
 * Horizontal progress bar for forecast attainment/confidence.
 */
const HBar = ({ value = 0, color = 'var(--color-primary)' }) => {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div style={{ width: '100%', background: 'rgba(17,24,39,0.06)', borderRadius: 999, overflow: 'hidden', height: 10 }}>
      <div style={{ width: `${v}%`, height: '100%', background: color, transition: 'width .4s ease' }} />
    </div>
  );
};

/**
 * Simple tooltip wrapper.
 */
const Tip = ({ text, children }) => (
  <span className="ai-tip" aria-label={text} data-tip={text}>
    {children}
  </span>
);

const AIInsights = () => {
  // Sample demo data
  const [sortKey, setSortKey] = useState('score'); // 'score' | 'name' | 'recent'
  const scores = useMemo(() => ([
    { id: 'C-102', name: 'Jane Cooper', score: 86, reason: 'High engagement across email + visited pricing', recent: '1d', account: 'Acme Inc.' },
    { id: 'C-221', name: 'Wade Warren', score: 72, reason: 'Multiple page views, demo booked', recent: '2d', account: 'Globex' },
    { id: 'C-487', name: 'Cody Fisher', score: 58, reason: 'Opened email, no reply yet', recent: '4d', account: 'GCS Tech' },
    { id: 'C-731', name: 'Esther Howard', score: 43, reason: 'Low activity; bounced last email', recent: '9d', account: 'Northwind' },
    { id: 'C-932', name: 'Courtney Henry', score: 91, reason: 'Trial activated, requested quote', recent: '0d', account: 'Initech' },
  ]), []);
  const sortedScores = useMemo(() => {
    const list = [...scores];
    if (sortKey === 'name') return list.sort((a,b) => a.name.localeCompare(b.name));
    if (sortKey === 'recent') {
      const toDays = (s) => Number(String(s).replace('d','')) || 99;
      return list.sort((a,b) => toDays(a.recent) - toDays(b.recent));
    }
    return list.sort((a,b) => b.score - a.score);
  }, [scores, sortKey]);

  const forecast = [
    { period: 'This Month', expected: 120000, range: { min: 95000, max: 145000 }, confidence: 74, attainment: 62 },
    { period: 'This Quarter', expected: 310000, range: { min: 270000, max: 350000 }, confidence: 69, attainment: 48 },
  ];

  const health = {
    high: 61, medium: 27, risk: 12,
    note: 'Confidence reflects historical conversion by stage + recent activity velocity.',
  };

  const topLead = sortedScores[0];
  const topBand = scoreBand(topLead.score);

  return (
    <div className="grid" style={{ gap: 16 }}>
      {/* Summary header: Top lead highlight + quick stats */}
      <div className="grid cols-3">
        <Card
          title="Top Lead"
          subtitle="Highest priority contact to act on now"
          right={<Tip text="AI ranks leads using engagement, recency, firmographics, and fit signals.">
            <span className="helper">What is this?</span>
          </Tip>}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Radial value={topLead.score} color={topBand.color} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700 }}>{topLead.name}</div>
              <div className="helper">{topLead.account} • {topLead.recent} ago</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'center' }}>
                <span
                  className="badge"
                  style={{ background: topBand.bg, color: topBand.color }}
                >
                  {topBand.label}
                </span>
                <span className="helper" title="Reasoning behind this prioritization">
                  {topLead.reason}
                </span>
              </div>
            </div>
            <button className="button primary">Open Contact</button>
          </div>
        </Card>

        <Card title="AI Summary" subtitle="Fast insights">
          <div className="grid cols-2">
            <div className="card" style={{ padding: 12 }}>
              <div className="helper">Avg. Lead Score</div>
              <div style={{ fontWeight: 700, fontSize: 18 }}>
                {Math.round(sortedScores.reduce((s,c)=>s+c.score,0)/sortedScores.length)} / 100
              </div>
            </div>
            <div className="card" style={{ padding: 12 }}>
              <div className="helper">Hot Leads</div>
              <div style={{ fontWeight: 700, fontSize: 18 }}>
                {sortedScores.filter(s=>s.score>=75).length}
              </div>
            </div>
          </div>
          <div className="helper" style={{ marginTop: 8 }}>
            Tips: Engage hot leads within 24h; schedule demos for warm leads to improve conversion.
          </div>
        </Card>

        <Card title="Confidence Mix" subtitle="Pipeline health & risk distribution">
          <div className="grid cols-3">
            <div className="card" style={{ padding: 12, textAlign: 'center' }}>
              <div className="helper">High</div>
              <div style={{ fontWeight: 700, fontSize: 20, color: 'var(--color-primary)' }}>{health.high}%</div>
            </div>
            <div className="card" style={{ padding: 12, textAlign: 'center' }}>
              <div className="helper">Medium</div>
              <div style={{ fontWeight: 700, fontSize: 20, color: 'var(--color-secondary)' }}>{health.medium}%</div>
            </div>
            <div className="card" style={{ padding: 12, textAlign: 'center' }}>
              <div className="helper">At Risk</div>
              <div style={{ fontWeight: 700, fontSize: 20, color: 'var(--color-error)' }}>{health.risk}%</div>
            </div>
          </div>
          <div className="helper" style={{ marginTop: 8 }}>{health.note}</div>
        </Card>
      </div>

      {/* Lead Scoring List */}
      <Card
        title="Lead Scoring"
        subtitle="Sortable, color-coded priority list"
        right={
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              className={`button${sortKey==='score' ? ' primary' : ''}`}
              onClick={() => setSortKey('score')}
              title="Sort by AI score (desc)"
            >
              Score
            </button>
            <button
              className={`button${sortKey==='name' ? ' primary' : ''}`}
              onClick={() => setSortKey('name')}
              title="Sort alphabetically"
            >
              Name
            </button>
            <button
              className={`button${sortKey==='recent' ? ' primary' : ''}`}
              onClick={() => setSortKey('recent')}
              title="Sort by most recent activity"
            >
              Recent
            </button>
          </div>
        }
      >
        <table className="table">
          <thead>
            <tr>
              <th>Lead</th>
              <th>Account</th>
              <th>Score</th>
              <th>Band</th>
              <th>Why</th>
              <th>Last Activity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedScores.map((s) => {
              const band = scoreBand(s.score);
              return (
                <tr key={s.id}>
                  <td style={{ fontWeight: 600 }}>{s.name}</td>
                  <td className="helper">{s.account}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Radial value={s.score} size={44} stroke={7} color={band.color} />
                      <div style={{ fontWeight: 700 }}>{s.score}</div>
                    </div>
                  </td>
                  <td>
                    <span className="badge" style={{ background: band.bg, color: band.color }}>{band.label}</span>
                  </td>
                  <td className="helper">
                    <Tip text="Click for more details in the contact profile">
                      {s.reason}
                    </Tip>
                  </td>
                  <td className="helper">{s.recent} ago</td>
                  <td style={{ display: 'flex', gap: 8 }}>
                    <button className="button">Open</button>
                    <button className="button secondary">Schedule</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {/* Forecast & Probability */}
      <div className="grid cols-2">
        <Card
          title="Forecast"
          subtitle="Expected revenue, range, and progress"
          right={<Tip text="Expected value blends win probabilities with deal sizes and stage momentum.">
            <span className="helper">How calculated?</span>
          </Tip>}
        >
          <div className="grid">
            {forecast.map((f) => (
              <div key={f.period} className="card" style={{ padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{f.period}</div>
                    <div className="helper">Range: {formatCurrency(f.range.min)} – {formatCurrency(f.range.max)}</div>
                  </div>
                  <span className="badge" style={{ background: 'rgba(37,99,235,0.1)', color: 'var(--color-primary)' }}>
                    {f.confidence}% conf.
                  </span>
                </div>
                <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, alignItems: 'center' }}>
                  <HBar value={f.attainment} />
                  <div className="helper">{f.attainment}% to target</div>
                </div>
                <div style={{ marginTop: 10, fontWeight: 700 }}>{formatCurrency(f.expected)}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card
          title="Probability Analysis"
          subtitle="Stage-weighted conversion outlook"
          right={<Tip text="Based on historical stage conversion + recency/velocity signals.">
            <span className="helper">Details</span>
          </Tip>}
        >
          <div className="grid cols-3">
            <div className="card" style={{ padding: 16, textAlign: 'center' }}>
              <Radial value={health.high} color="var(--color-primary)" size={72} stroke={10} />
              <div style={{ marginTop: 8, fontWeight: 700 }}>High Confidence</div>
              <div className="helper">Likely to close with current momentum</div>
            </div>
            <div className="card" style={{ padding: 16, textAlign: 'center' }}>
              <Radial value={health.medium} color="var(--color-secondary)" size={72} stroke={10} />
              <div style={{ marginTop: 8, fontWeight: 700 }}>Medium</div>
              <div className="helper">Needs follow-ups to keep pace</div>
            </div>
            <div className="card" style={{ padding: 16, textAlign: 'center' }}>
              <Radial value={health.risk} color="var(--color-error)" size={72} stroke={10} />
              <div style={{ marginTop: 8, fontWeight: 700, color: 'var(--color-error)' }}>At Risk</div>
              <div className="helper">Stalled or low engagement</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AIInsights;
