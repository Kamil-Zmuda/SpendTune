// store.test.ts
import { renderHook } from '@testing-library/react';
import {
  MOCK_USER_DATA,
  MOCK_USER_TOKEN,
  addTokenToStore,
  addUserToStore,
} from '../tests/helpers/handleStoreActions';
import { useCombinedStore } from './Store';

describe('Zustand Store Tests', () => {
  it('should set and get logged user', () => {
    const { result } = renderHook(() => useCombinedStore());
    expect(result.current.logged).toBeNull();
    addUserToStore();
    expect(result.current.logged).toEqual(MOCK_USER_DATA);
  });

  it('should set and get auth token', () => {
    const { result } = renderHook(() => useCombinedStore());
    expect(result.current.token).toBeNull();
    addTokenToStore();
    expect(result.current.token).toBe(MOCK_USER_TOKEN);
  });
});

