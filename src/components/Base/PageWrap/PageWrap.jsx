import React from 'react';

import Sidebar from 'components/Navigations/Sidebar';
import LoadingTransaction from 'components/Custom/LoadingTransaction';
import Header from 'components/Navigations/Header';

import { WrapContainer, Page, WrapContent } from './styles';

function PageWrap(props) {
  const {
    children,
    headerTitle,
    headerExtra,
    extraButton,
    wrapContentClasses
  } = props;

  return (
    <Page>
      <Sidebar/>
      <WrapContainer fluid>
        <Header
          header={headerTitle}
          extra={headerExtra}
          extraButton={extraButton}
        />
        <WrapContent className={wrapContentClasses}>
          {children}
        </WrapContent>
      </WrapContainer>
      <LoadingTransaction/>
    </Page>
  );
}

PageWrap.propTypes = {};

export default PageWrap;

