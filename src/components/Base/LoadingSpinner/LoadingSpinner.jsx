import React from 'react'
import PropTypes from 'prop-types'

import { Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { theme } from 'store/theme/selectors'

function LoadingSpinner ({ type, className, size }) {
  const thm = useSelector(theme)
  return (
        <Spinner
            animation="border"
            size={size}
            variant={type || thm === 'dark' ? 'light' : 'dark'}
            className={className}
        />
  )
}

LoadingSpinner.propTypes = {
  type: PropTypes.string
}

LoadingSpinner.defaultProps = {
  type: 'dark'
}

export default LoadingSpinner
