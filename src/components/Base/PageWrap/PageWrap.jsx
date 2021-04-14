import React from 'react';

import PropTypes from 'prop-types';

import Header from 'components/Navigations/Header';
import LoadingTransaction from 'components/Custom/LoadingTransaction';
import { WrapContainer } from './styles';

function PageWrap(props) {
  const { children } = props;

  return (
    <>
      <Header/>
      <WrapContainer fluid>
        {children}
      </WrapContainer>
      <LoadingTransaction/>
    </>
  );
}

PageWrap.propTypes = {};

export default PageWrap;

