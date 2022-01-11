import React, { lazy } from 'react'
import { Link } from 'react-router-dom'
import LazyLoading from 'components/Base/LazyLoading'
import PageWrap from 'components/Base/PageWrap'
import Button from 'components/Base/Buttons/Button'

const QParameters = lazy(() => import('./QParameters'))

export default function index () {
  return (
    <PageWrap
      wrapContentClasses="wrap-content__tow-colm"
      headerTitle="Q Parameters"
      headerExtra={
        <Link to="/">
          <Button type="white" title="Dashboard" handleButton={() => {}} />
        </Link>
      }
    >
      <LazyLoading>
        <QParameters />
      </LazyLoading>
    </PageWrap>
  )
}
