import React from 'react';

import InstructionMetamask from 'pages/StartConfigurations/InstructionMetamask';

import StartConfigurationStyleLayout from 'components/Base/StartConfigurationStyleLayout';
import { WrapContainer, WrapBlock } from './styles';

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
    <StartConfigurationStyleLayout>
      <WrapContainer fluid>
        <WrapBlock block={!error}>
          {checkMetaMask()}
        </WrapBlock>
      </WrapContainer>
    </StartConfigurationStyleLayout>
  );
}

export default StartConfigurations;

