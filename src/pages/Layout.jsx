import React from 'react';
import { Outlet } from 'react-router';

import Header from '../components/header/Header';

const Layout = () => {


  return (
    <div>
      <Header />

      <div>
        <Outlet />
      </div>
      
    </div>
  );
};

export default Layout;
