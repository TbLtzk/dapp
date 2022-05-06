import React, { forwardRef } from 'react';

import Alert from '../../Custom/Alerts';

import { PageTitleActions, PageTitleName, PageTitleWrp } from './styles';

const PageTitle = forwardRef(({ header, extra, extraButton }, ref) => {
  return (
    <PageTitleWrp>
      <PageTitleName ref={ref}>{header}</PageTitleName>
      <PageTitleActions>
        {extraButton}
        {extra}
      </PageTitleActions>
      <Alert />
    </PageTitleWrp>
  );
});

export default PageTitle;
