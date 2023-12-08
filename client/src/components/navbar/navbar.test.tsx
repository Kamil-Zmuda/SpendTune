import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import {
  MOCK_USER_DATA,
  addUserToStore,
  removeUserFromStore,
} from '../../tests/helpers/handleStoreActions';
import Navbar from './navbar';

const mockedSetTokenStore = jest.fn();

describe('Navbar Component', () => {
  beforeEach(() => {
    addUserToStore();
  });

  it('renders Navbar with buttons when user is logged in', async () => {
    render(
      <MemoryRouter>
        <Navbar setTokenStore={mockedSetTokenStore} />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('img', { name: /spendtune logo/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sync another bank/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sync transactions/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/hello,/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${MOCK_USER_DATA?.firstName} ${MOCK_USER_DATA?.lastName}`
      )
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('renders Navbar with logo when user is not logged in', async () => {
    removeUserFromStore();
    render(
      <MemoryRouter>
        <Navbar setTokenStore={mockedSetTokenStore} />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('img', { name: /spendtune logo/i })
    ).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /sync another bank/i }))
      .toBeNull;
  });
});
