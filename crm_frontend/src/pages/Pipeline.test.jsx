import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import Pipeline from './Pipeline';

// In demo mode, Pipeline uses local state with mock deals.
// We verify grouping and that changing a select updates the UI (client-side move).
describe('Pipeline page (demo mode)', () => {
  test('renders canonical stage columns and shows some mock deals', () => {
    render(<Pipeline />);
    expect(screen.getByText(/prospecting/i)).toBeInTheDocument();
    expect(screen.getByText(/qualification/i)).toBeInTheDocument();
    expect(screen.getByText(/discovery call/i)).toBeInTheDocument();
    expect(screen.getByText(/negotiation and contracting/i)).toBeInTheDocument();

    // Ensure at least one known mock deal is present
    // Using a safe query: "Acme Inc. - New Opportunity" exists in mock data
    expect(screen.getByText('Acme Inc. - New Opportunity')).toBeInTheDocument();
  });

  test('changing the select moves deal between columns (client-side)', () => {
    render(<Pipeline />);
    const dealCard = screen.getByText('Acme Inc. - New Opportunity').closest('.deal-card');
    expect(dealCard).toBeInTheDocument();

    const select = within(dealCard).getByRole('combobox');
    fireEvent.change(select, { target: { value: 'qualification' } });

    // After move, the select should reflect the new value
    expect(select).toHaveValue('qualification');
  });
});
