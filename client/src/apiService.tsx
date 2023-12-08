import { TUser } from './types/types';

const baseUrl = 'http://localhost:3001';

type LogUserProps = {
  email: string;
  password: string;
};

async function logUser({ email, password }: LogUserProps) {
  try {
    const userData = await fetch(baseUrl + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const user = await userData.json();
    return user;
  } catch (error) {
    console.log('Issue occured on login: ' + error);
  }
}

async function register(user: TUser) {
  try {
    const userData = await fetch(baseUrl + '/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const registeredUser = await userData.json();
    return registeredUser;
  } catch (error) {
    console.log('Issue occured on register: ' + error);
  }
}

async function logout() {
  try {
    await fetch(baseUrl + '/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log('Issue occured on logout: ' + error);
  }
}

type TAddCategoryProps = {
  category: string;
  token: string;
};

async function addCategory({ category, token }: TAddCategoryProps) {
  try {
    const categoryData = await fetch(baseUrl + '/category/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ category }),
    });
    const updatedUser = await categoryData.json();
    return updatedUser;
  } catch {
    console.log('Issue occured on add category.');
  }
}

type TAssignCategoryProps = {
  category: string;
  id: string;
  token: string;
};

async function assignCategory({ category, id, token }: TAssignCategoryProps) {
  console.log('category: ', category);
  try {
    const categoryData = await fetch(baseUrl + '/category/assign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({ category, id }),
    });
    const updatedUser = await categoryData.json();
    return updatedUser;
  } catch {
    console.log('Issue occured on assign category.');
  }
}

export { logUser, register, logout, addCategory, assignCategory };
