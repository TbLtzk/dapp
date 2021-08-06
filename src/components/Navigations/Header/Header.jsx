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
      <Alert/>
      <HeaderTitle>
        {header}
      </HeaderTitle>
      <HeaderActions>
      {extraButton}
        {extra}
      </HeaderActions>
    </HeaderWrp>
  )
}

export default Header
