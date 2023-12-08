import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import * as apiService from '../../apiService';
import { MOCK_USER_RAW_DATA } from '../../../mock/mockData';
import Register from './register';

const mockedUsedNavigate = jest.fn();

jest.mock('../../apiService');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

beforeEach(() => {
  mockedUsedNavigate.mockReset();
});

describe('Register Component', () => {
  it('renders successfully', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    const registerBtn = screen.getByRole('button', { name: /register/i });
    const backBtn = screen.getByRole('button', { name: /back/i });
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const firstNameInput = screen.getByPlaceholderText(/first name/i);
    const lastNameInput = screen.getByPlaceholderText(/last name/i);
    expect(backBtn).toBeInTheDocument();
    expect(registerBtn).toBeInTheDocument();
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('click on go back should call useNavigate', async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    const backBtn = screen.getByRole('button', { name: /back/i });
    fireEvent.click(backBtn);
    expect(mockedUsedNavigate).toBeCalledTimes(1);
  });

  it('check if the inputs work correctly', async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const firstNameInput = screen.getByPlaceholderText(/first name/i);
    const lastNameInput = screen.getByPlaceholderText(/last name/i);
    expect(emailInput).toContainHTML('');
    expect(passwordInput).toContainHTML('');
    expect(firstNameInput).toContainHTML('');
    expect(lastNameInput).toContainHTML('');
    act(() => {
      userEvent.type(emailInput, 'test@example.com');
      userEvent.type(passwordInput, 'password123');
      userEvent.type(firstNameInput, 'john');
      userEvent.type(lastNameInput, 'doe');
      expect(emailInput).toContainHTML('test@example.com');
      expect(passwordInput).toContainHTML('password123');
      expect(firstNameInput).toContainHTML('john');
      expect(lastNameInput).toContainHTML('doe');
    });
  });

  it('check if form sends register request', async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const firstNameInput = screen.getByPlaceholderText(/first name/i);
    const lastNameInput = screen.getByPlaceholderText(/last name/i);
    const submitButton = screen.getByText('Register');
    expect(apiService.register).toBeCalledTimes(0);
    jest.spyOn(apiService, 'register').mockResolvedValue(MOCK_USER_RAW_DATA);
    await act(async () => {
      userEvent.type(emailInput, 'test@example.com');
      userEvent.type(passwordInput, 'password123');
      userEvent.type(firstNameInput, 'john');
      userEvent.type(lastNameInput, 'doe');
      fireEvent.click(submitButton);
      expect(apiService.register).toBeCalledTimes(1);
    });
  });
});
