import React from 'react'

import { Block } from './styles'
import PropTypes from 'prop-types'
import Button from '../Buttons/Button'

function CustomBlock ({ children, style }) {
  return <Block style={style}>{children}</Block>
}

Button.propTypes = {
  style: PropTypes.string
}

export default CustomBlock
