import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from 'components/Base/Button';

import { NotFoundContainer } from './styles';

function NotFound () {
  const history = useHistory();
  return (
    <NotFoundContainer>
      <h5>Page does not exist</h5>
      <Button
        alwaysEnabled
        onClick={() => history.push('/')}
      >
        <i className="mdi mdi-home" />
        <span>Home</span>
      </Button>
    </NotFoundContainer>
  );
}

export default NotFound;
