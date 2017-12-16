import React from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Link from 'react-toolbox/lib/link';
import Navigation from 'react-toolbox/lib/navigation';

const Nav = () => (
  <AppBar title="React Toolbox" >
    <Navigation type="horizontal">
      <Link to="/" label="Inbox" icon="inbox" />
      <Link to="/" active label="Profile" icon="person" />
    </Navigation>
  </AppBar>
);

export default Nav;
