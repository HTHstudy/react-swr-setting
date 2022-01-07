import React from 'react';
import { Link } from 'react-router-dom';
import { useCounter, useCounter2, useText } from '@store';

const NavBar = () => {
  // const { text } = useText();
  // const { count } = useCounter();
  // const { count2 } = useCounter2();
  return (
    <div>
      <h1 style={{ display: 'none' }}>프로젝트 세팅(webpack/react/typescript/react-routerV6)</h1>
      <h1>네비게이션</h1>
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <Link to="/login">Login 페이지로 이동</Link> | <Link to="/signup">SignUp 페이지로 이동</Link> |{' '}
        <Link to="/counter">Counter 페이지로 이동</Link>
      </nav>
      {/* <p>text : {text}</p>
      <p>count : {count}</p>
      <p>count2 : {count2}</p>
      <p>count + count2 : {count + count2}</p> */}
    </div>
  );
};

export default NavBar;
