import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '@pages/Login';
import Workspace from './Workspace';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/workspace" element={<Workspace />} />
      </Routes>
    </>
  );
};

export default App;
