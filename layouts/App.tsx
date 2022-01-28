import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import loadable from '@loadable/component';
import { useToken } from '@store';
import Api from '@utils/Api';

const Login = loadable(() => import('@pages/Login'));
const Workspace = loadable(() => import('@layouts/Workspace'));

const App = () => {
  const API = Api();
  const { token } = useToken();
  useEffect(() => {
    if (token) {
      API.checkToken();
    }
  }, [token]);

  if (!token) return <Login />;
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate replace to="/workspace" />} />
        <Route path="/workspace" element={<Workspace />} />
      </Routes>
    </>
  );
};

export default App;
