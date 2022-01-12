import React from 'react'
import PropTypes from 'prop-types'

import { Spinner } from 'react-bootstrap'

function LoadingSpinner ({ type, className, size }) {
  return (
        <Spinner
            animation="border"
            size={size}
            variant={type || 'dark'}
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
