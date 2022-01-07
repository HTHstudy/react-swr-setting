import React from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <h1>This is SignUp Page</h1>
      <button onClick={goBack}>Go Back</button>
      <Link to="/"> 홈으로</Link>
    </div>
  );
};

export default SignUp;
