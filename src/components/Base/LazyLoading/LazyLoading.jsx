import React, { Suspense } from 'react';

import LoadingSpinner from '../LoadingSpinner';

import { LazyLoadingWrapper } from './styles';

function LazyLoading ({ children }) {
  return (
    <Suspense
      fallback={
        <LazyLoadingWrapper>
          <LoadingSpinner />
        </LazyLoadingWrapper>
      }
    >
      {children}
    </Suspense>
  );
}

export default LazyLoading;
