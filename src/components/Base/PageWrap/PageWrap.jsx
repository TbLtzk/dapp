import React from 'react';

import Header from 'components/Navigations/Header';
import LoadingTransaction from 'components/Custom/LoadingTransaction';
import { WrapContainer, Page } from './styles';

function PageWrap(props) {
  const { children } = props;

  return (
    <>
      <Page>
        <Header/>
        <WrapContainer fluid>
          {children}
        </WrapContainer>
        <LoadingTransaction/>
      </Page>
      </>
      );
}

PageWrap.propTypes = {};

export default PageWrap;

