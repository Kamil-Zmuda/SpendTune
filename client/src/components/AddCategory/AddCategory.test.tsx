import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  MOCK_USER_DATA,
  addUserToStore,
  removeUserFromStore,
} from '../../tests/helpers/handleStoreActions';
import AddCategory from './AddCategory';

const mockedSetAddCategoryClicked = jest.fn();

describe('AddCategory Component', () => {
  beforeEach(() => {
    addUserToStore();
  });

  it('renders AddCategory Component', async () => {
    render(
      <MemoryRouter>
        <AddCategory setAddCategoryClicked={mockedSetAddCategoryClicked} />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /add new category/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    expect(screen.getByText('X')).toBeInTheDocument();
  });
});
