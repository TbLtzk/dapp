import React, { Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'

import Button from 'components/Base/Buttons/Button'
import PageWrap from 'components/Base/PageWrap'
import { fallback } from 'constants/globalStyle'
const QParameters = lazy(() => import('./components/QParameters/QParameters'))

function Manage () {
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
            <Suspense fallback={fallback}>
                <QParameters />
            </Suspense>
        </PageWrap>
  )
}

export default Manage
