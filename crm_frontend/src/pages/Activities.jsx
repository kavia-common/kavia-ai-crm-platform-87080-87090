import { createEntityPage } from './EntityList';

const Activities = createEntityPage({
  entity: 'activities',
  title: 'Activities',
  columns: [
    { key: 'type', label: 'Type' },
    { key: 'subject', label: 'Subject' },
    { key: 'related_to', label: 'Related To' },
    { key: 'due_date', label: 'Due Date' },
    { key: 'status', label: 'Status' },
  ],
  fields: [
    { name: 'type', label: 'Type', type: 'select', options: ['Call', 'Email', 'Meeting', 'Task'] },
    { name: 'subject', label: 'Subject' },
    { name: 'related_to', label: 'Related To' },
    { name: 'due_date', label: 'Due Date', type: 'date' },
    { name: 'status', label: 'Status', type: 'select', options: ['Open', 'Completed', 'Deferred'] },
    { name: 'notes', label: 'Notes', type: 'textarea', full: true },
  ],
});

export default Activities;
