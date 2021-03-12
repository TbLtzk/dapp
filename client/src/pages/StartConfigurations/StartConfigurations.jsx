import React, { useEffect } from 'react';

import { Col } from 'react-bootstrap';
import InstructionMetamask from 'pages/StartConfigurations/InstructionMetamask';

import { WrapContainer, WrapRow, WrapBlock } from './styles';

function StartConfigurations(props) {
  const { error } = props;

  const showInstructions = (errorMessage) => {
    return (
      <div>
        <h3>{errorMessage}</h3>
        <InstructionMetamask/>
      </div>
    );
  };

  const checkMetaMask = () => {
    return showInstructions(error);
  };

  return (
    <WrapContainer fluid>
      <WrapRow>
        <Col xs={12}>
          <WrapBlock block={!error}>
            {checkMetaMask()}
          </WrapBlock>
        </Col>
      </WrapRow>
    </WrapContainer>
  );
}

export default StartConfigurations;

