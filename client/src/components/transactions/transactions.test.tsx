import { render, screen } from '@testing-library/react';
import { MOCK_USER_RAW_DATA, NEW_USER } from '../../../mock/mockData';
import {
  addUserToStore,
  removeUserFromStore,
} from '../../tests/helpers/handleStoreActions';
import Transactions from './transactions';

jest.mock('../../apiService');

describe('Transactions Component', () => {
  beforeEach(() => {
    addUserToStore();
  });
  it('should render component with logged user', () => {
    render(<Transactions />);
    expect(screen.getByText(/Uncategorised Payments/i)).toBeInTheDocument();
    expect(screen.getByText(/Amount/i)).toBeInTheDocument();
    expect(screen.getByText(/Payment Channel/i)).toBeInTheDocument();
    expect(screen.getByText(/Category/i)).toBeInTheDocument();
  });

  it('should render "Sync transactions to start" when user has 0 transactions', () => {
    addUserToStore(NEW_USER);
    render(<Transactions />);
    expect(screen.getByText(/Sync transactions to start/i)).toBeInTheDocument();
  });

  it('should render "No more transactions to categorize" when user has 0 transactions to categorize', () => {
    addUserToStore({
      ...NEW_USER,
      transactionsCategorized: [
        MOCK_USER_RAW_DATA.transactions[0],
        MOCK_USER_RAW_DATA.transactions[1],
      ],
    });
    render(<Transactions />);
    expect(
      screen.getByText(/No more transactions to categorize/i)
    ).toBeInTheDocument();
  });

  it('should render "Sync your bank to get new transactions" when user has 0 synced banks', () => {
    addUserToStore({
      ...NEW_USER,
      linkedBanks: undefined,
    });
    render(<Transactions />);
    expect(
      screen.getByText(/Sync your bank to get new transactions/i)
    ).toBeInTheDocument();
  });

  it('should render "Data has not been loaded" when user is not logged in', () => {
    removeUserFromStore();
    render(<Transactions />);
    expect(screen.getByText(/Data has not been loaded/i)).toBeInTheDocument();
  });
});
