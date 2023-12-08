import { renderHook } from '@testing-library/react';
import { useCombinedStore } from '../../store/Store';
import { act } from 'react-dom/test-utils';
import { MOCK_USER_RAW_DATA } from '../../../mock/mockData';
import { TUser } from '../../types/types';

export const MOCK_USER_DATA: TUser | null = {
  email: 'aaa@gmail.com',
  password: '123',
  firstName: 'Joe',
  lastName: 'Doe',
  accessToken: 'dasd34r2wfs',
  linkedBanks: {},
  next_cursor: 'dsada',
  transactions: MOCK_USER_RAW_DATA.transactions,
  transactionsCategorized: [],
  categories: MOCK_USER_RAW_DATA.categories,
};

export const MOCK_USER_TOKEN = 'your-auth-token';

export const addUserToStore = (data = MOCK_USER_DATA) => {
  const { result } = renderHook(() => useCombinedStore());
  return act(() => {
    result.current.setLoggedUser(data);
  });
};

export const removeUserFromStore = () => {
  const { result } = renderHook(() => useCombinedStore());
  return act(() => {
    result.current.setLoggedUser(null);
  });
};

export const addTokenToStore = () => {
  const { result } = renderHook(() => useCombinedStore());
  return act(() => {
    result.current.setAuthToken(MOCK_USER_TOKEN);
  });
};
