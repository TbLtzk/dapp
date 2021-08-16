import React from 'react'
import Alert from '../../Custom/Alerts'

import {
  HeaderWrp,
  HeaderTitle,
  HeaderActions
} from './styles'

function Header (props) {
  const {
    header,
    extra,
    extraButton
  } = props
  return (
    <HeaderWrp>
      <HeaderTitle>
        {header}
      </HeaderTitle>
      <HeaderActions>
      {extraButton}
        {extra}
      </HeaderActions>
      <Alert/>
    </HeaderWrp>
  )
}

export default Header
