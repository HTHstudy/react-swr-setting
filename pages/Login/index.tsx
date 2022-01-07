import React from 'react';
import { useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const login = () => {
    navigate('/workspace');
  };
  return (
    <div>
      <h1>This is Login Page</h1>
      <button onClick={goBack}>Go Back</button>
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
