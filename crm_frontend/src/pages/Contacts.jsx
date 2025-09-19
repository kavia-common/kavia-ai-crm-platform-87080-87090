import { createEntityPage } from './EntityList';

const Contacts = createEntityPage({
  entity: 'contacts',
  title: 'Contacts',
  columns: [
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'account_name', label: 'Account' },
  ],
  fields: [
    { name: 'first_name', label: 'First Name' },
    { name: 'last_name', label: 'Last Name' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phone', label: 'Phone', type: 'tel' },
    { name: 'account_id', label: 'Account ID' },
    { name: 'title', label: 'Title' },
    { name: 'notes', label: 'Notes', type: 'textarea', full: true },
  ],
});

export default Contacts;
