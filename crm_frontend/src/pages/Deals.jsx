import { createEntityPage } from './EntityList';

const Deals = createEntityPage({
  entity: 'deals',
  title: 'Deals',
  columns: [
    { key: 'name', label: 'Deal' },
    { key: 'stage', label: 'Stage' },
    { key: 'amount', label: 'Amount' },
    { key: 'close_date', label: 'Close Date' },
    { key: 'account_name', label: 'Account' },
  ],
  fields: [
    { name: 'name', label: 'Deal Name' },
    { name: 'stage', label: 'Stage', type: 'select', options: ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'] },
    { name: 'amount', label: 'Amount', type: 'number' },
    { name: 'close_date', label: 'Close Date', type: 'date' },
    { name: 'account_id', label: 'Account ID' },
    { name: 'notes', label: 'Notes', type: 'textarea', full: true },
  ],
});

export default Deals;
