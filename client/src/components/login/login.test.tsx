import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import * as apiService from '../../apiService'; // Import the actual logUser function
import Login from './login';
import { MOCK_USER_RAW_DATA } from '../../../mock/mockData';

const mockedUsedNavigate = jest.fn();

jest.mock('../../apiService');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

beforeEach(() => {
  mockedUsedNavigate.mockReset();
});

describe('Login Component', () => {
  it('renders successfully', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const loginBtn = screen.getByRole('button', { name: /login/i });
    const registerBtn = screen.getByRole('button', { name: /register/i });
    const textElm = screen.getByRole('heading', {
      name: /don't have an account yet\?/i,
    });
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(loginBtn).toBeInTheDocument();
    expect(registerBtn).toBeInTheDocument();
    expect(textElm).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('click on register should call useNavigate', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const registerBtn = screen.getByRole('button', { name: /register/i });
    fireEvent.click(registerBtn);
    expect(mockedUsedNavigate).toBeCalledTimes(1);
    expect(screen.getByText(/register/i)).toBeInTheDocument();
  });

  it('check if the inputs work correctly', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    expect(emailInput).toContainHTML('');
    expect(passwordInput).toContainHTML('');
    act(() => {
      userEvent.type(emailInput, 'test@example.com');
      userEvent.type(passwordInput, 'password123');
      expect(passwordInput).toContainHTML('password123');
    });
  });

  it('check if form sends login request', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const emailInput = screen.getByPlaceholderText('email');
    const passwordInput = screen.getByPlaceholderText('password');
    const submitButton = screen.getByText('Login');
    expect(apiService.logUser).toBeCalledTimes(0);
    jest.spyOn(apiService, 'logUser').mockResolvedValue(MOCK_USER_RAW_DATA);
    await act(async () => {
      userEvent.type(emailInput, 'test@example.com');
      userEvent.type(passwordInput, 'password123');
      fireEvent.click(submitButton);
      expect(apiService.logUser).toBeCalledTimes(1);
    });
  });
});
