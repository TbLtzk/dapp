import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Web3 } from '@q-dev/q-js-sdk';
import { useWeb3React } from '@web3-react/core';

import Routes from 'navigation/Routes';

import useLocalStorage from 'hooks/useLocalStorage';

import { connectors } from './connectors';

import { getAuctions } from 'store/auctions/action-creators';
import { getCheckIsUserRootNode } from 'store/root-node/action-creators';
import { setUserAddress } from 'store/user-inf/action-creators';
import { getNumberAllProposals } from 'store/voting/proposals/actions';

import { getContractRegistryInstance } from 'contracts/contract-instance';

import { AUCTIONS_TYPES } from 'constants/statuses';
import { getParametersDependsOnUrl } from 'func/useful';

const web3 = new Web3(Web3.givenProvider);

export const { ethereum } = window;
export let address = '0x0000000000000000000000000000000000000000';
function sleep (ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Test = () => {
  const dispatch = useDispatch();
  const [ac, setAc] = useState('');

  const { library, chainId, account, activate, deactivate, active } = useWeb3React();
  useEffect(() => {
    loadAdditionalInfo();
  }, []);

  const loadAdditionalInfo = async () => {
    dispatch(setUserAddress(account));

    window.web3 = web3;
    address = account;
    setAc(account);
    await sleep(2000);
    getContractRegistryInstance();
    dispatch(getAuctions(AUCTIONS_TYPES.all));
    dispatch(getNumberAllProposals());
    dispatch(getCheckIsUserRootNode());
  };

  return <Routes />;
};

function LoadingMetaMask () {
  const dispatch = useDispatch();
  const networkParams = getParametersDependsOnUrl();

  const { library, chainId, account, activate, deactivate, active } = useWeb3React();

  const [provider] = useLocalStorage('provider');
  const [state, setState] = useState(false);
  // const [web3, setWeb3] = useState();

  useEffect(() => {
    initConnection();
  }, []);

  const initConnection = async () => {
    await activate(connectors.coinbase);
  };

  if (active) {
    return <Test />;
  }

  return null;

  // switch (isMetaMask) {
  //   case LOAD_TYPES.initError:
  //     return <WrapContainer height="100vh">Can\'t load account data. Please reload app</WrapContainer>;
  //   case LOAD_TYPES.loaded:
  //     return <Routes />;
  //   case LOAD_TYPES.loading:
  //   default:
  //     return (
  //       <WrapContainer height="100vh">
  //         <LoadingSpinner type="light" />
  //       </WrapContainer>
  //     );
  // }
}

export default LoadingMetaMask;
