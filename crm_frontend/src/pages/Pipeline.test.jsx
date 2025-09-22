import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import Pipeline from './Pipeline';

// Mock useAPI to control returned deals list
jest.mock('../hooks/useAPI', () => ({
  useAPI: () => ({
    data: {
      // simulate wrapper with items field to exercise normalization in page
      items: [
        { id: '1', name: 'Acme - New', amount: 10000, stage: 'Prospecting', owner: 'Alex' },
        { id: '2', name: 'Globex - Qual', amount: 20000, stage: 'qualification', owner: 'Sam' },
        { id: '3', name: 'Initech - Call', amount: 30000, stage: 'discovery_call', owner: 'Priya' },
        { id: '4', name: 'Wonka - Contract', amount: 40000, stage: 'negotiation & contracting', owner: 'Lee' },
      ],
    },
    error: null,
    isLoading: false,
    mutate: jest.fn(),
  }),
}));

// Mock DealsService.move to verify it is called when changing stage
const moveMock = jest.fn();
jest.mock('../services/deals', () => ({
  DealsService: {
    move: (...args) => moveMock(...args),
  },
}));

describe('Pipeline page', () => {
  beforeEach(() => {
    moveMock.mockClear();
  });

  test('renders deals grouped by normalized stage strings', () => {
    render(<Pipeline />);
    // Column headers are stage names (textTransform capitalize), assert existence
    const prospectingHeader = screen.getByText(/prospecting/i);
    expect(prospectingHeader).toBeInTheDocument();

    const qualificationHeader = screen.getByText(/qualification/i);
    expect(qualificationHeader).toBeInTheDocument();

    const discoveryHeader = screen.getByText(/discovery call/i);
    expect(discoveryHeader).toBeInTheDocument();

    const negotiationHeader = screen.getByText(/negotiation and contracting/i);
    expect(negotiationHeader).toBeInTheDocument();

    // Deals appear under their normalized stage columns
    expect(screen.getByText('Acme - New')).toBeInTheDocument(); // Prospecting
    expect(screen.getByText('Globex - Qual')).toBeInTheDocument(); // Qualification
    expect(screen.getByText('Initech - Call')).toBeInTheDocument(); // Discovery
    expect(screen.getByText('Wonka - Contract')).toBeInTheDocument(); // Negotiation & contracting -> normalized with "and"
  });

  test('changing the select triggers DealsService.move with normalized stage', () => {
    render(<Pipeline />);
    // Find the card for Acme - New and change its select to "qualification"
    const dealCard = screen.getByText('Acme - New').closest('.deal-card');
    expect(dealCard).toBeInTheDocument();

    const select = within(dealCard!).getByRole('combobox');
    fireEvent.change(select, { target: { value: 'qualification' } });

    expect(moveMock).toHaveBeenCalledTimes(1);
    const [id, newStage] = moveMock.mock.calls[0];
    expect(id).toBe('1');
    expect(newStage).toBe('qualification');
  });
});
