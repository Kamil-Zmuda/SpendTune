import { queryByText, render, screen } from '@testing-library/react';
import {
  addUserToStore,
  removeUserFromStore,
} from '../../tests/helpers/handleStoreActions';
import Chart from './chart';
import { NEW_USER, MOCK_USER_RAW_DATA } from '../../../mock/mockData';
import 'jest-canvas-mock';

jest.mock('../../apiService');
jest.mock('react-chartjs-2', () => ({
  Doughnut: jest.fn(() => null), // Mock Doughnut to render nothing
}));

const AMOUNT =
  MOCK_USER_RAW_DATA.transactions[0].amount +
  MOCK_USER_RAW_DATA.transactions[1].amount;

describe('Chart Component', () => {
  beforeEach(() => {
    addUserToStore();
  });
  it('should render Chart with user data', () => {
    addUserToStore({
      ...NEW_USER,
      transactionsCategorized: [
        MOCK_USER_RAW_DATA.transactions[0],
        MOCK_USER_RAW_DATA.transactions[1],
      ],
      categories: MOCK_USER_RAW_DATA.categories,
    });
    render(<Chart />);
    expect(screen.getByText(/Expenses/i)).toBeInTheDocument();
    expect(
      screen.getByText(`Total: £${AMOUNT.toFixed(2)}`)
    ).toBeInTheDocument();
  });

  it('should not render if no user', async () => {
    removeUserFromStore();
    render(<Chart />);

    expect(screen.queryByText(/Expenses/i)).toBeNull();
  });
});
