import React from 'react';
import Link from 'react-toolbox/lib/link';
import Nav from '../Nav/Nav';
import Text from './Text';

const Home = () =>
  (
    <div>
      <h3>
        This is the home page
      </h3>
      <Text
        title="title"
      />
      <Link href='/about' label='About' />
    </div>
  );

export default Home;
