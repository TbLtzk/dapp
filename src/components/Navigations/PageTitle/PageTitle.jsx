import React, { forwardRef } from 'react';

import Alert from 'components/Custom/Alerts';

import { PageTitleActions, PageTitleName, PageTitleWrp } from './styles';

const PageTitle = forwardRef(({ header, extra }, ref) => {
  return (
    <PageTitleWrp>
      <PageTitleName ref={ref}>{header}</PageTitleName>
      <PageTitleActions>
        {extra}
      </PageTitleActions>
      <Alert />
    </PageTitleWrp>
  );
});

export default PageTitle;
