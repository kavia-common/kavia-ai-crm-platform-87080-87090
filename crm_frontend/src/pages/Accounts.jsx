import { createEntityPage } from './EntityList';

const Accounts = createEntityPage({
  entity: 'accounts',
  title: 'Accounts',
  columns: [
    { key: 'name', label: 'Name' },
    { key: 'industry', label: 'Industry' },
    { key: 'website', label: 'Website' },
    { key: 'owner', label: 'Owner' },
  ],
  fields: [
    { name: 'name', label: 'Name' },
    { name: 'industry', label: 'Industry' },
    { name: 'website', label: 'Website' },
    { name: 'owner', label: 'Owner' },
    { name: 'billing_address', label: 'Billing Address', type: 'textarea', full: true },
    { name: 'shipping_address', label: 'Shipping Address', type: 'textarea', full: true },
  ],
});

export default Accounts;
