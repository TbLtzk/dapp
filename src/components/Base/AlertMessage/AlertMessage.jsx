import React from 'react'
import PropTypes from 'prop-types'

import { Alert } from 'react-bootstrap'

import { AlertStyle } from './styles'

function AlertMessage (props) {
  const { show, onClose, content, type, header } = props

  return (
        <AlertStyle
            variant={type}
            show={show}
            onClose={onClose}
            dismissible
        >
            <Alert.Heading>{header}</Alert.Heading>
            {!content
              ? null
              : <p>
                    {content}
                </p>
            }

        </AlertStyle>
  )
}

AlertMessage.propTypes = {
  type: PropTypes.string,
  show: PropTypes.bool,
  content: PropTypes.string,
  header: PropTypes.string,
  onClose: PropTypes.func
}

export default AlertMessage
