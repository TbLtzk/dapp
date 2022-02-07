import React from 'react'

import Sidebar from 'components/Navigations/Sidebar'
import LoadingTransaction from 'components/Custom/LoadingTransaction'
import PageTitle from 'components/Navigations/PageTitle'
import Header from 'components/Navigations/Header'

import { WrapContainer, Page, WrapContent } from './styles'

function PageWrap ({ children, headerTitle, headerExtra, wrapContentClasses }) {
  return (
        <Page>
            <Header />
            <div className="page__elements">
                <Sidebar />
                <WrapContainer fluid>
                    <PageTitle header={headerTitle} extra={headerExtra} />
                    <WrapContent className={wrapContentClasses}>{children}</WrapContent>
                </WrapContainer>
            </div>

            <LoadingTransaction />
        </Page>
  )
}

export default PageWrap
