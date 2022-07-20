import { ReactNode, Suspense } from 'react';

import LoadingSpinner from '../LoadingSpinner';

import { LazyLoadingWrapper } from './styles';

function LazyLoading ({ children }: { children: ReactNode }) {
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
