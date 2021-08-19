import React from 'react'
import { CloseButton } from 'react-bootstrap'
import { AlertWrapper } from './styles'

const AlertTemplate = ({ style, options, message, close }) => {
  const { header, text } = message
  return (
        <AlertWrapper style={style}>
            <div className="alert-template__header">
                <h1>{header}</h1>
                <CloseButton onClick={close} />
            </div>
            <h4 className="alert-template__text">{text}</h4>
        </AlertWrapper>
  )
}

export default AlertTemplate
