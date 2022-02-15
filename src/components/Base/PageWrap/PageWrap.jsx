import React from 'react'
import PageTitle from 'components/Navigations/PageTitle'
import { WrapContainer, WrapContent } from './styles'

function PageWrap ({ children, headerTitle, headerExtra, wrapContentClasses }) {
  return (
        <WrapContainer fluid>
            <PageTitle header={headerTitle} extra={headerExtra} />
            <WrapContent className={wrapContentClasses}>{children}</WrapContent>
        </WrapContainer>
  )
}

export default PageWrap
