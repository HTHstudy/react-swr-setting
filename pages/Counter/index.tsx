import React from 'react';
import { useNavigate } from 'react-router';
import { useCounter2, useCounter } from '@store';

const Counter = () => {
  const { count, setCount } = useCounter();
  const { count2, setCount2 } = useCounter2();

  const handleInc = () => setCount(count + 1);
  const handleDec = () => setCount(count - 1);
  const handleInc2 = () => setCount2(count2 + 1);
  const handleDec2 = () => setCount2(count2 - 1);

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div>
        <span>count: {count}</span>
        <button onClick={handleInc}>inc</button>
        <button onClick={handleDec}>dec</button>
      </div>
      <button onClick={goBack}>Go Back</button>
      <div>
        <span>count: {count2}</span>
        <button onClick={handleInc2}>inc</button>
        <button onClick={handleDec2}>dec</button>
      </div>
    </>
  );
};

export default Counter;
