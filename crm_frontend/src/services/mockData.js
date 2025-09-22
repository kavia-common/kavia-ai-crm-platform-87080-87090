//
// Static mock data used by the demo (client-side only, no backend required).
// This mirrors the shape expected by pages and replaces live API integration.
//

export const MOCK_STAGES = [
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

export const MOCK_DEALS = [
  // prospecting
  { id: 'd101', name: 'Acme Inc. - New Opportunity', amount: 25000, stage: 'prospecting', owner: 'Sam', closeDate: '2025-11-15' },
  { id: 'd102', name: 'Northwind Traders - Outreach', amount: 18000, stage: 'prospecting', owner: 'Priya', closeDate: '2025-11-28' },

  // qualification
  { id: 'd201', name: 'ioet - Initial Fit', amount: 32000, stage: 'qualification', owner: 'Alex', closeDate: '2025-12-10' },
  { id: 'd202', name: 'Globex - Qualification Call', amount: 28000, stage: 'qualification', owner: 'Lee', closeDate: '2025-12-12' },

  // discovery call
  { id: 'd301', name: 'GCS Tech - Discovery', amount: 54000, stage: 'discovery call', owner: 'Jamie', closeDate: '2025-12-20' },
  { id: 'd302', name: 'Acme Inc. - Expansion Discovery', amount: 41000, stage: 'discovery call', owner: 'Morgan', closeDate: '2025-12-24' },

  // demo
  { id: 'd401', name: 'Wonka Industries - Product Demo', amount: 46000, stage: 'demo', owner: 'Lee', closeDate: '2026-01-05' },
  { id: 'd402', name: 'Umbrella Corp - Platform Walkthrough', amount: 38000, stage: 'demo', owner: 'Tariq', closeDate: '2026-01-08' },

  // poc proposal
  { id: 'd501', name: 'Tata Elxsi - POC Proposal', amount: 88000, stage: 'poc proposal', owner: 'Alex', closeDate: '2026-01-20' },
  { id: 'd502', name: 'Initech - POC SOW', amount: 52000, stage: 'poc proposal', owner: 'Sam', closeDate: '2026-01-28' },

  // poc execution
  { id: 'd601', name: 'Stark Industries - POC Execution', amount: 93000, stage: 'poc execution', owner: 'Morgan', closeDate: '2026-02-12' },
  { id: 'd602', name: 'DigitalT3 - Pilot Implementation', amount: 67000, stage: 'poc execution', owner: 'Jamie', closeDate: '2026-02-15' },

  // evaluation and feedback
  { id: 'd701', name: 'MetaZ digital - Evaluation', amount: 74000, stage: 'evaluation and feedback', owner: 'Priya', closeDate: '2026-02-28' },
  { id: 'd702', name: 'Globex - Feedback Round', amount: 36000, stage: 'evaluation and feedback', owner: 'Lee', closeDate: '2026-03-05' },

  // negotiation and contracting
  { id: 'd801', name: 'Initech - Renewal Contract', amount: 36000, stage: 'negotiation and contracting', owner: 'Tariq', closeDate: '2026-03-20' },
  { id: 'd802', name: 'GCS Tech - Terms Negotiation', amount: 58000, stage: 'negotiation and contracting', owner: 'Alex', closeDate: '2026-03-24' },

  // closed won
  { id: 'd901', name: 'Acme Inc. - Q3 Expansion', amount: 54000, stage: 'closed won', owner: 'Morgan', closeDate: '2025-09-12' },
  { id: 'd902', name: 'ioet - Starter Plan', amount: 22000, stage: 'closed won', owner: 'Jamie', closeDate: '2025-08-30' },

  // closed lost
  { id: 'd1001', name: 'Umbrella - Legacy Replacement', amount: 30000, stage: 'closed lost', owner: 'Sam', closeDate: '2025-07-21' },
  { id: 'd1002', name: 'Northwind Traders - Budget Hold', amount: 19000, stage: 'closed lost', owner: 'Priya', closeDate: '2025-07-10' },
];

export const MOCK_CONTACTS = [
  { id: 'c101', firstName: 'Alex', lastName: 'Johnson', name: 'Alex Johnson', email: 'alex.johnson@example.com', phone: '+1 415 555 0101', status: 'Lead', company: 'Acme Inc.', owner: 'Sam' },
  { id: 'c102', firstName: 'Priya', lastName: 'Patel', name: 'Priya Patel', email: 'priya.patel@example.com', phone: '+1 415 555 0102', status: 'Customer', company: 'Northwind Traders', owner: 'Priya' },
  { id: 'c103', firstName: 'Lee', lastName: 'Chen', name: 'Lee Chen', email: 'lee.chen@example.com', phone: '+1 415 555 0103', status: 'Lead', company: 'Globex', owner: 'Lee' },
  { id: 'c104', firstName: 'Sam', lastName: 'Taylor', name: 'Sam Taylor', email: 'sam.taylor@example.com', phone: '+1 415 555 0104', status: 'Customer', company: 'ioet', owner: 'Sam' },
];

export const MOCK_ACCOUNTS = [
  { id: 'a101', name: 'Acme Inc.', domain: 'acme.com', owner: 'Morgan' },
  { id: 'a102', name: 'Northwind Traders', domain: 'northwind.com', owner: 'Priya' },
  { id: 'a103', name: 'Globex', domain: 'globex.com', owner: 'Lee' },
  { id: 'a104', name: 'ioet', domain: 'ioet.com', owner: 'Alex' },
  { id: 'a105', name: 'GCS Tech', domain: 'gcstech.io', owner: 'Jamie' },
];

export const MOCK_ACTIVITIES = [
  { id: 'act101', type: 'Call', when: '2025-09-01', subject: 'Intro call with Acme', notes: 'Discussed requirements', owner: 'Sam' },
  { id: 'act102', type: 'Meeting', when: '2025-09-03', subject: 'Discovery with Globex', notes: 'Stakeholder alignment', owner: 'Lee' },
  { id: 'act103', type: 'Email', when: '2025-09-05', subject: 'POC scope to ioet', notes: 'Sent SOW', owner: 'Alex' },
  { id: 'act104', type: 'Note', when: '2025-09-08', subject: 'Feedback from GCS', notes: 'Positive on features', owner: 'Jamie' },
];
