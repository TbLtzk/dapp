import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'components/Base/Button';

import { NotFoundContainer } from './styles';

function NotFound () {
  return (
    <NotFoundContainer>
      <h5>Page does not exist</h5>
      <Link to="/">
        <Button alwaysEnabled style={{ width: '100%' }}>
          <i className="mdi mdi-home" />
          <span>Home</span>
        </Button>
      </Link>
    </NotFoundContainer>
  );
}

export default NotFound;
