import React, { lazy } from 'react';
import { Link } from 'react-router-dom';

import Button from 'components/Base/Button';
import LazyLoading from 'components/Base/LazyLoading';
import PageWrap from 'components/Base/PageWrap';

const QParameters = lazy(() => import('./QParameters'));

export default function index () {
  return (
    <PageWrap
      headerTitle="Q Parameters"
      headerExtra={
        <Link to="/">
          <Button
            alwaysEnabled
            look="white"
            title="Dashboard"
          />
        </Link>
      }
    >
      <LazyLoading>
        <QParameters />
      </LazyLoading>
    </PageWrap>
  );
}
