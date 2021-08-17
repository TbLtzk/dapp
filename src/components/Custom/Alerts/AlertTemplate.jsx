import React from 'react'
import { CloseButton } from 'react-bootstrap'
import { AlertWrapper } from './styles'

const AlertTemplate = ({ style, options, message, close }) => {
  return (
        <AlertWrapper style={style}>
            <div className="modal-title">
                <h1>{message.title}</h1>
                <CloseButton onClick={close} />
            </div>
            <h4>{message.info}</h4>
        </AlertWrapper>
  )
}

export default AlertTemplate
