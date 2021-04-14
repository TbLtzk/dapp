import React, { useEffect, useState, useCallback } from 'react';
import Web3 from 'web3';

import LoadingSpinner from 'components/Base/LoadingSpinner';
import StartConfigurations from 'pages/StartConfigurations';
import InitApp from 'components/Base/InitApp';

import { WrapContainer } from './styles';

const web3 = new Web3(Web3.givenProvider);

function LoadingMetaMask() {
  const [isMetaMask, setIsMetaMask] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('Please install MetaMask!');
  const ethereum = window.ethereum;

  useEffect(async () => {
    web3.eth.getAccounts(function (err, accounts) {
      if (err != null) {
        setIsMetaMask('error');
        setErrorMessage('Please install MetaMask!');
      } else if (!accounts.length) {
        setIsMetaMask('not-logged');
      } else {
        const { ethereum } = window
        window.web3 = new Web3(ethereum)
        window.web3.eth.handleRevert = true;
        setIsMetaMask('logged');
      }
    });
    ethereum?.on('accountsChanged', function (accounts) {
      window.location.reload();
    });
    ethereum?.on('networkChanged', networkId => {
      window.location.reload();
    });
    web3.eth.net.getNetworkType((err, netId) => {
      if (netId !== 'private') {
        setErrorMessage('Choose the correct network!');
        setIsMetaMask('error');
      }
    });
    if (ethereum?.isMetaMask) {
      try {
        const promise = await new Promise(function (resolve, reject) {
          window.ethereum.enable();
        });
      } catch (error) {
        console.log('error', error);
      }
    } else {
      setIsMetaMask('loading');
    }
  }, [web3, ethereum]);

  const accountHandler = useCallback(() => {
    switch (isMetaMask) {
      case 'logged':
        return <InitApp/>;
      case 'not-logged':
        return <StartConfigurations error={'Waiting for login in MetaMask!'}/>;
      case 'error':
        return <StartConfigurations error={errorMessage}/>;
      case 'loading':
        return (
          <WrapContainer>
            <LoadingSpinner/>
          </WrapContainer>
        );
      default:
        return (
          <WrapContainer>
            <LoadingSpinner/>
          </WrapContainer>
        );
    }
  }, [isMetaMask]);

  return accountHandler();
}

export default LoadingMetaMask;

