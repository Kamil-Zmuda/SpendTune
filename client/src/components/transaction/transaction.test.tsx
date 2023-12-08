import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MOCK_USER_RAW_DATA } from '../../../mock/mockData';
import { TTransaction } from '../../types/types';
import Transaction from './transaction';
import * as apiService from '../../apiService';
import {
  addTokenToStore,
  addUserToStore,
} from '../../tests/helpers/handleStoreActions';
import { act } from 'react-dom/test-utils';

jest.mock('../../apiService');

describe('Transaction Component', () => {
  const mockTransaction: TTransaction = {
    ...MOCK_USER_RAW_DATA.transactions[0],
    user_category: 'Uncategorised',
  };

  it('renders transaction details and category dropdown with default value', () => {
    render(<Transaction transaction={mockTransaction} />);

    expect(screen.getByText('Uber 063015 SF**POOL**')).toBeInTheDocument();
    expect(screen.getByText('5.4 GBP')).toBeInTheDocument();
    expect(screen.getByText('2023-08-28')).toBeInTheDocument();

    const categoryDropdown = screen.getByRole('combobox');
    expect(categoryDropdown).toBeInTheDocument();
    expect(screen.getByDisplayValue('Uncategorised')).toBeInTheDocument();
  });

  it('should call onChange when the first option is selected', async () => {
    const { getByText, queryByTestId } = render(
      <Transaction transaction={mockTransaction} />
    );
    addUserToStore();
    const mySelectComponent = queryByTestId('test-select');
    expect(mySelectComponent).toBeDefined();
  });

  it('should call onChange when the first option is selected', async () => {
    const { getByText, queryByTestId } = render(
      <Transaction transaction={mockTransaction} />
    );
    addUserToStore();
    addTokenToStore();
    const mySelectComponent = queryByTestId('test-select');
    const mockedOnChange = jest.fn();
    expect(mySelectComponent).toBeDefined();

    expect(mySelectComponent).not.toBeNull();
    expect(mockedOnChange).toHaveBeenCalledTimes(0);
    expect(apiService.assignCategory).toBeCalledTimes(0);
    jest
      .spyOn(apiService, 'assignCategory')
      .mockResolvedValue(MOCK_USER_RAW_DATA);

    await act(async () => {
      if (mySelectComponent) {
        fireEvent.keyDown(mySelectComponent, { key: 'ArrowDown' });
        await waitFor(() => getByText('taxi'));
        fireEvent.change(mySelectComponent, { target: { value: 'taxi' } });

        expect(screen.getByDisplayValue('taxi')).toBeInTheDocument();
        expect(apiService.assignCategory).toBeCalledTimes(1);
      }
    });
  });
});
