import React, { useMemo } from 'react';
import Card from '../components/ui/Card';
import { formatCurrency } from '../utils/format';

/**
 * PUBLIC_INTERFACE
 * SalesTeam page: Displays sales team members and the accounts/deals they own.
 * Data source: derives from the same mock deals used in the Pipeline page to keep mock data consistent.
 * Each team member groups:
 *  - Accounts (unique company names parsed from the deal name prefix, before the hyphen)
 *  - Deals list with stage and amount
 */
const SalesTeam = () => {
  // Mirror the mock deals from Pipeline to keep single source of truth for owners and companies
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

  // Extract company/account from deal name by splitting on ' - ' and taking the first token
  const getCompanyFromDeal = (dealName) => {
    if (!dealName) return 'Unknown';
    const parts = dealName.split(' - ');
    return parts[0]?.trim() || 'Unknown';
  };

  // Build team structure: { [owner]: { deals:[], accounts:Set, totals:{open, closedWon, total}} }
  const team = useMemo(() => {
    const acc = {};
    for (const d of mockDeals) {
      const owner = d.owner || 'Unassigned';
      const company = getCompanyFromDeal(d.name);
      if (!acc[owner]) {
        acc[owner] = {
          owner,
          deals: [],
          accounts: new Set(),
          totals: { open: 0, closedWon: 0, total: 0 },
        };
      }
      acc[owner].deals.push(d);
      acc[owner].accounts.add(company);
      acc[owner].totals.total += d.amount || 0;
      if (String(d.stage).toLowerCase() === 'closed won') {
        acc[owner].totals.closedWon += d.amount || 0;
      } else {
        acc[owner].totals.open += d.amount || 0;
      }
    }
    // Convert accounts Set to array and sort owners alphabetically
    return Object.values(acc)
      .map((o) => ({ ...o, accounts: Array.from(o.accounts).sort() }))
      .sort((a, b) => a.owner.localeCompare(b.owner));
  }, [mockDeals]);

  return (
    <div className="grid" style={{ gap: 16 }}>
      <Card
        title="Sales Team"
        subtitle="Team members and the accounts/deals they manage (from mock pipeline data)"
      >
        <div className="grid cols-2">
          {team.map((member) => (
            <div key={member.owner} className="card" style={{ padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ fontWeight: 700 }}>{member.owner}</div>
                <div className="helper">
                  {member.accounts.length} accounts • {member.deals.length} deals
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                <div className="card" style={{ padding: 12, flex: 1 }}>
                  <div className="helper">Open Pipeline</div>
                  <div style={{ fontWeight: 700 }}>{formatCurrency(member.totals.open)}</div>
                </div>
                <div className="card" style={{ padding: 12, flex: 1 }}>
                  <div className="helper">Closed Won</div>
                  <div style={{ fontWeight: 700 }}>{formatCurrency(member.totals.closedWon)}</div>
                </div>
                <div className="card" style={{ padding: 12, flex: 1 }}>
                  <div className="helper">Total Managed</div>
                  <div style={{ fontWeight: 700 }}>{formatCurrency(member.totals.total)}</div>
                </div>
              </div>

              <div style={{ marginBottom: 12 }}>
                <div className="helper" style={{ marginBottom: 6 }}>Accounts</div>
                {member.accounts.length ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {member.accounts.map((a) => (
                      <span key={a} className="badge success">{a}</span>
                    ))}
                  </div>
                ) : (
                  <div className="helper">No accounts</div>
                )}
              </div>

              <div>
                <div className="helper" style={{ marginBottom: 6 }}>Deals</div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Deal</th>
                      <th>Stage</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {member.deals.map((d) => (
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
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default SalesTeam;
