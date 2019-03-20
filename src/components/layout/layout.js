import React from 'react';

// Components
import Header from '../header/header';
import Footer from '../footer/footer';

const Layout = props => {
  return (
    <>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
