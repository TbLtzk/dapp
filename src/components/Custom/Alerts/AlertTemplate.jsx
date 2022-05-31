import React from 'react';
import { CloseButton } from 'react-bootstrap';

import { AlertWrapper } from './styles';

const AlertTemplate = ({ style, message, close }) => {
  return (
    <AlertWrapper style={style}>
      <div className="alert-template__header">
        <h1>{message?.header}</h1>
        <CloseButton onClick={close} />
      </div>
      <h4 className="alert-template__text">{message?.details}</h4>
    </AlertWrapper>
  );
};

export default AlertTemplate;
