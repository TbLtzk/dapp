import React, { lazy } from 'react'
import LazyLoading from 'components/Base/LazyLoading'
import PageWrap from 'components/Base/PageWrap'

const TimeLocks = lazy(() => import('./TimeLocks'))

export default function index () {
  return (
    <PageWrap headerTitle="Time Locks">
      <LazyLoading>
        <TimeLocks />
      </LazyLoading>
    </PageWrap>
  )
}
