import React from 'react';
import { logout } from '../../apiService';
import { useNavigate } from 'react-router-dom';
import { useCombinedStore } from '../../store/Store';
import { getLinkToken, syncTransactions } from '../../plaidService';
import './navbar.css';

export type NavbarProps = {
  children?: any; //TODO change this any
  setTokenStore: Function;
};

function Navbar({ setTokenStore }: NavbarProps) {
  const loggedUser = useCombinedStore((state) => state.logged);
  const authToken = useCombinedStore((state) => state.token);
  const setLoggedUser = useCombinedStore((state) => state.setLoggedUser);
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    setLoggedUser(null);
    navigate('/');
  }

  async function handleSync() {
    const linkToken = authToken && (await getLinkToken(authToken));
    setTokenStore(linkToken);
    navigate('/sync');
  }

  async function handleSyncTransactions() {
    const updatedUser = authToken && (await syncTransactions(authToken));
    if (updatedUser && updatedUser._id) {
      setLoggedUser(updatedUser);
      console.log('Plaid API - Transactions synced');
      return;
    }
    console.log('Issue while syncing transactions -->', updatedUser);
    return;
  }

  return (
    <nav className='navbar'>
      <div className='navbar__section'>
        <img className='navbar__img' src='/logo.svg' alt='SpendTune Logo' />
        {loggedUser && (
          <button className='navbar__btn' onClick={handleSync}>
            {loggedUser.linkedBanks &&
            Object.keys(loggedUser.linkedBanks).length
              ? 'Sync another bank'
              : 'Sync bank'}
          </button>
        )}

        {loggedUser && loggedUser.linkedBanks && (
          <button className='navbar__btn' onClick={handleSyncTransactions}>
            Sync transactions
          </button>
        )}
      </div>
      <div className='navbar__section'>
        {loggedUser && (
          <p>
            <span className='navbar__greeting'>Hello,</span>{' '}
            {loggedUser.firstName} {loggedUser.lastName}
          </p>
        )}
        {loggedUser && (
          <button className='navbar__btn' onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
