import React from 'react';
import loadable from '@loadable/component';

const NavBar = loadable(() => import('@layouts/NavBar'));

const Workspace = () => {
  return (
    <>
      <NavBar />
    </>
  );
};

export default Workspace;
