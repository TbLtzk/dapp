import React from 'react'
import Alert from '../../Custom/Alerts'

import { PageTitleWrp, PageTitleName, PageTitleActions } from './styles'

function PageTitle ({ header, extra, extraButton }) {
  return (
        <PageTitleWrp>
            <PageTitleName>{header}</PageTitleName>
            <PageTitleActions>
                {extraButton}
                {extra}
            </PageTitleActions>
            <Alert />
        </PageTitleWrp>
  )
}

export default PageTitle
