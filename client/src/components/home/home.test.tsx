import { fireEvent, render, screen } from '@testing-library/react';
import Home from './home';

import {
  addUserToStore,
  removeUserFromStore,
} from '../../tests/helpers/handleStoreActions';
import { NEW_USER } from '../../../mock/mockData';

describe('Home Component', () => {
  beforeEach(() => {
    addUserToStore();
  });

  it('renders dashboard when user is logged in and has transactions', async () => {
    render(<Home />);

    expect(
      screen.getByRole('heading', {
        name: /dashboard/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/amount/i)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /uncategorised payments/i })
    ).toBeInTheDocument();
  });

  it('renders dashboard when new user is logged in', async () => {
    render(<Home />);
    addUserToStore(NEW_USER);
    expect(
      screen.getByRole('heading', { name: /add category to start/i })
    ).toBeInTheDocument();
  });

  it('should toggle addCategoryClicked state when Add category button is clicked', () => {
    const { getByText } = render(<Home />);

    const addCategoryBtn = getByText('Add category');
    expect(addCategoryBtn).toBeInTheDocument();
    fireEvent.click(addCategoryBtn);
  });

  it('should render message when user in not logged', () => {
    const { getByText } = render(<Home />);
    removeUserFromStore();
    const pleaseLogin = getByText('Please log-in to see the Dashboard');
    expect(pleaseLogin).toBeInTheDocument();
  });
});
