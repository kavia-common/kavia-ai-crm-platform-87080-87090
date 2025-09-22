import React from 'react';
import Card from '../components/ui/Card';
import { formatCurrency } from '../utils/format';

// Use the exact stages and order specified
const stages = [
  'prospecting',
  'qualification',
  'discovery call',
  'demo',
  'poc proposal',
  'poc execution',
  'evaluation and feedback',
  'negotiation and contracting',
  'closed won',
  'closed lost',
];

// Update mock data to use the same exact stage labels as above
const mockDeals = [
  { id: 1, name: 'Acme Inc. - Expansion', amount: 54000, stage: 'poc proposal', owner: 'Alex' },
  { id: 2, name: 'Globex - Migration', amount: 120000, stage: 'discovery call', owner: 'Jamie' },
  { id: 3, name: 'Initech - Renewal', amount: 36000, stage: 'negotiation and contracting', owner: 'Tariq' },
  { id: 4, name: 'Umbrella - Pilot', amount: 22000, stage: 'prospecting', owner: 'Sam' },
  { id: 5, name: 'Stark Industries - POC', amount: 88000, stage: 'poc execution', owner: 'Morgan' },
  { id: 6, name: 'Wonka Industries - Demo', amount: 46000, stage: 'demo', owner: 'Lee' },
];

const Pipeline = () => {
  // Initialize stage buckets using the exact keys
  const byStage = stages.reduce((acc, s) => ({ ...acc, [s]: [] }), {});
  mockDeals.forEach(d => {
    if (byStage[d.stage]) byStage[d.stage].push(d);
  });

  const onMove = (id, nextStage) => {
    // TODO: integrate with DealsService.move(id, nextStage)
    console.log('move deal', id, '->', nextStage);
  };

  return (
    <div className="pipeline">
      {stages.map((s) => (
        <div key={s} className="pipeline-col">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
            <div style={{fontWeight:700, textTransform: 'capitalize'}}>{s}</div>
            <div className="helper">{byStage[s].length} deals</div>
          </div>
          {byStage[s].map((d) => (
            <div key={d.id} className="deal-card">
              <div style={{fontWeight:700, marginBottom:6}}>{d.name}</div>
              <div className="helper" style={{marginBottom:6}}>Owner: {d.owner}</div>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <div>{formatCurrency(d.amount)}</div>
                <select
                  className="select"
                  value={d.stage}
                  onChange={(e) => onMove(d.id, e.target.value)}
                >
                  {stages.map(st => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
          {byStage[s].length === 0 && (
            <Card>
              <div className="helper">Drag or move a deal here</div>
            </Card>
          )}
        </div>
      ))}
    </div>
  );
};

export default Pipeline;
