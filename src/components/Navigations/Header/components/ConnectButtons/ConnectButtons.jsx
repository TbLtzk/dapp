import { useState } from 'react';
import { useSelector } from 'react-redux';

import Button from 'components/Base/Button';
import { ethereum } from 'components/Custom/LoadingMetaMask/LoadingMetaMask';

import InstallMetamask from './InstallMetamask';

import { loadTypeSelector, networkSelector } from 'store/user-inf/selectors';

import { chainIds, networkParameters } from 'constants/config';
import { LOAD_TYPES } from 'constants/statuses';
import ErrorHandler from 'func/ErrorHandler';

async function requestConnect (params) {
  try {
    await ethereum.request({ method: 'eth_requestAccounts' });
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: params.chainId }]
    });
  } catch (error) {
    if (error.code === 4902) {
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [params]
        });
      } catch (error) {
        ErrorHandler.processWithoutFeedback(error);
      }
    }
    ErrorHandler.processWithoutFeedback(error);
  }
}

async function requestLogin () {
  try {
    await ethereum.request({ method: 'eth_requestAccounts' });
  } catch (error) {
    ErrorHandler.processWithoutFeedback(error);
  }
}

function ConnectButtons () {
  const loadType = useSelector(loadTypeSelector);
  const network = useSelector(networkSelector);

  const [modalShow, setModalShow] = useState(false);

  function handleModalShow () {
    setModalShow(!modalShow);
  }

  function handleRequest (chainId, networkParam) {
    network === chainId ? requestLogin() : requestConnect(networkParam);
  }

  switch (loadType) {
    case LOAD_TYPES.loaded:
      return null;
    case LOAD_TYPES.wrongNetwork:
    case LOAD_TYPES.notLogged:
      return (
        <>
          <Button
            alwaysEnabled
            style={{ margin: '0 0 0 20px' }}
            onClick={() => handleRequest(chainIds.mainnet, networkParameters.mainnet)}
          >
            Connect to Q Mainnet
          </Button>
          <Button
            alwaysEnabled
            style={{ margin: '0 0 0 20px' }}
            onClick={() => handleRequest(chainIds.testnet, networkParameters.testnet)}
          >
            Connect to Q Testnet
          </Button>
        </>
      );
    default:
      return (
        <>
          <Button
            alwaysEnabled
            style={{ margin: '0 0 0 20px' }}
            onClick={handleModalShow}
          >
            Install Metamask
          </Button>
          <InstallMetamask modalShow={modalShow} setModalShow={handleModalShow} />
        </>
      );
  }
}

export default ConnectButtons;
