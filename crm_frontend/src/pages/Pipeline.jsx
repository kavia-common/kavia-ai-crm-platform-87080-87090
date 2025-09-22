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

/**
 * Mock deals distributed so each stage has at least 1–2 deals.
 * Provided companies used across stages: Tata Elxsi, ioet, GCS Tech, DigitalT3, MetaZ digital.
 * Remaining are generic company names.
 */
const mockDeals = [
  // prospecting
  { id: 101, name: 'Acme Inc. - New Opportunity', amount: 25000, stage: 'prospecting', owner: 'Sam' },
  { id: 102, name: 'Northwind Traders - Outreach', amount: 18000, stage: 'prospecting', owner: 'Priya' },

  // qualification
  { id: 201, name: 'ioet - Initial Fit', amount: 32000, stage: 'qualification', owner: 'Alex' },
  { id: 202, name: 'Globex - Qualification Call', amount: 28000, stage: 'qualification', owner: 'Lee' },

  // discovery call
  { id: 301, name: 'GCS Tech - Discovery', amount: 54000, stage: 'discovery call', owner: 'Jamie' },
  { id: 302, name: 'Acme Inc. - Expansion Discovery', amount: 41000, stage: 'discovery call', owner: 'Morgan' },

  // demo
  { id: 401, name: 'Wonka Industries - Product Demo', amount: 46000, stage: 'demo', owner: 'Lee' },
  { id: 402, name: 'Umbrella Corp - Platform Walkthrough', amount: 38000, stage: 'demo', owner: 'Tariq' },

  // poc proposal
  { id: 501, name: 'Tata Elxsi - POC Proposal', amount: 88000, stage: 'poc proposal', owner: 'Alex' },
  { id: 502, name: 'Initech - POC SOW', amount: 52000, stage: 'poc proposal', owner: 'Sam' },

  // poc execution
  { id: 601, name: 'Stark Industries - POC Execution', amount: 93000, stage: 'poc execution', owner: 'Morgan' },
  { id: 602, name: 'DigitalT3 - Pilot Implementation', amount: 67000, stage: 'poc execution', owner: 'Jamie' },

  // evaluation and feedback
  { id: 701, name: 'MetaZ digital - Evaluation', amount: 74000, stage: 'evaluation and feedback', owner: 'Priya' },
  { id: 702, name: 'Globex - Feedback Round', amount: 36000, stage: 'evaluation and feedback', owner: 'Lee' },

  // negotiation and contracting
  { id: 801, name: 'Initech - Renewal Contract', amount: 36000, stage: 'negotiation and contracting', owner: 'Tariq' },
  { id: 802, name: 'GCS Tech - Terms Negotiation', amount: 58000, stage: 'negotiation and contracting', owner: 'Alex' },

  // closed won
  { id: 901, name: 'Acme Inc. - Q3 Expansion', amount: 54000, stage: 'closed won', owner: 'Morgan' },
  { id: 902, name: 'ioet - Starter Plan', amount: 22000, stage: 'closed won', owner: 'Jamie' },

  // closed lost
  { id: 1001, name: 'Umbrella - Legacy Replacement', amount: 30000, stage: 'closed lost', owner: 'Sam' },
  { id: 1002, name: 'Northwind Traders - Budget Hold', amount: 19000, stage: 'closed lost', owner: 'Priya' },
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
