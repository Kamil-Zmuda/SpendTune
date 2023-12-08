import React, { useState, Dispatch } from 'react';
import { useCombinedStore } from '../../store/Store';
import { addCategory } from '../../apiService';
import './AddCategory.css';

type AddCategoryProps = {
  setAddCategoryClicked: Dispatch<React.SetStateAction<boolean>>;
};

function AddCategory({ setAddCategoryClicked }: AddCategoryProps) {
  const loggedUser = useCombinedStore((state) => state.logged);
  const authToken = useCombinedStore((state) => state.token);
  const setLoggedUser = useCombinedStore((state) => state.setLoggedUser);
  // local states
  const [categoryInput, setCategoryInput] = useState('');

  async function handleAddCategory() {
    if (
      loggedUser &&
      loggedUser.categories &&
      loggedUser.categories.includes(categoryInput)
    ) {
      console.log('Category already exists');
      return;
    } else if (categoryInput.length < 3) {
      console.log('Category name must be at least 3 characters');
      return;
    } else {
      const updatedUser =
        authToken &&
        (await addCategory({
          category: categoryInput.toLowerCase(),
          token: authToken,
        }));
      setLoggedUser(updatedUser);
      setAddCategoryClicked(false);
      setCategoryInput('');
    }
  }

  function handleClose() {
    setAddCategoryClicked(false);
  }

  return (
    <div className="modal__overlay">
      <div className="modal">
        <div className="modal__close" onClick={handleClose}>
          X
        </div>
        <div className="modal__category">
          <h2 className="modal__title">Add new category</h2>
          <input
            type="text"
            placeholder="your category name"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            className="modal__input"
          />
          <button className="btn btn--flex" onClick={handleAddCategory}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
