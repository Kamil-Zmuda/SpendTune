import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from '../login/login';
import Register from '../register/register';
import Home from '../home/home';
import SyncPage from '../syncPage/syncPage';
import { useCombinedStore } from '../../store/Store';
import { TTokenStore } from '../../types/types';
import Navbar from '../navbar/navbar';

function Dashboard() {
  const [tokenStore, setTokenStore] = useState<TTokenStore | null>(null);
  const loggedUser = useCombinedStore((state) => state.logged);
  
  return (
    <>
      <Navbar setTokenStore={setTokenStore}></Navbar>
      <Routes>
        <Route
          path="/"
          element={loggedUser ? <Home /> : <Navigate replace to={'/login'} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={loggedUser ? <Home /> : <Navigate replace to={'/'} />}
        />
        <Route
          path="/sync"
          element={
            loggedUser ? (
              <SyncPage tokenStore={tokenStore} />
            ) : (
              <Navigate replace to={'/home'} />
            )
          }
        />
        <Route path="*" element={<Navigate replace to="/home" />} />
      </Routes>
    </>
  );
}

export default Dashboard;
