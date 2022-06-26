/* tslint:disable */
import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { JsonRpcProvider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';

import useLocalStorage from 'hooks/useLocalStorage';
import { Web3Context } from 'hooks/useWeb3Context';

import { getAuctions } from 'store/auctions/action-creators';
import { getCheckIsUserRootNode } from 'store/root-node/action-creators';
import { setLoadType, setNetwork, setUserAddress } from 'store/user-inf/action-creators';
import { getNumberAllProposals } from 'store/voting/proposals/actions';

import { getContractRegistryInstance } from 'contracts/contract-instance';

import { networkParameters, networks, ZERO_ADDRESS } from 'constants/config';
import { AUCTIONS_TYPES, LOAD_TYPES } from 'constants/statuses';
import ErrorHandler from 'func/ErrorHandler';
import { getParametersDependsOnUrl } from 'func/useful';

const { ethereum } = window;

async function requestConnect (params = {}) {
  try {
    await ethereum.request({ method: 'eth_requestAccounts' });
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      // @ts-expect-error no type
      params: [{ chainId: params.chainId }],
    });
  } catch (error) {
    // @ts-expect-error no type
    if (error.code === 4902) {
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [params],
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

export type ERC20TokenType = {
  address: string;
  symbol: string;
  decimals: number;
  image?: string;
  aToken?: boolean;
};

export type Web3Data = {
  connectWallet: (wallet: any, chainId: number) => Promise<void>;
  disconnectWallet: () => void;
  currentAccount: string;
  isActive: boolean;
  loading: boolean;
  provider: JsonRpcProvider | undefined;
  chainId: number | undefined;
  switchNetwork: (chainId: number) => Promise<void>;
  addERC20Token: (args: ERC20TokenType) => Promise<boolean>;
  switchNetworkError: Error | undefined;
  switchNetworkPending: boolean;
  setSwitchNetworkError: (err: Error | undefined) => void;
};

const getNetworkId = async () => {
  const networkId = await new Promise((resolve) => {
    /* Fix issue with first Metamask launch. */
    const timeout = setTimeout(() => {
      window.location.reload();
    }, 5000);
    ethereum.request({ method: 'net_version' }).then((netId: number) => {
      clearTimeout(timeout);
      resolve(netId);
    });
  });
  return networkId;
};

const web3 = new Web3(Web3.givenProvider);

const Web3ContextProvider: FC<{ children: ReactElement }> = ({ children }) => {
  const dispatch = useDispatch();

  const { connector, chainId, accounts, account, isActivating, isActive, provider, hooks } = useWeb3React();

  const [selectedWallet, setSelectedWallet] = useLocalStorage('selectedWallet', undefined);
  const [selectedChainId, setSelectedChainId] = useLocalStorage('selectedChainId', undefined);

  const [switchNetworkPending, setSwitchNetworkPending] = useState(false);

  const [loading, setLoading] = useState(false);
  const [deactivated, setDeactivated] = useState(false);
  const [triedCoinbase, setTriedCoinbase] = useState(false);
  const [switchNetworkError, setSwitchNetworkError] = useState<Error>();

  const [init, setInit] = useState(LOAD_TYPES.loading);
  const params = getParametersDependsOnUrl();

  const loadAdditionalInfo = async () => {
    dispatch(getAuctions(AUCTIONS_TYPES.all));
    dispatch(getNumberAllProposals());
    dispatch(getCheckIsUserRootNode());
  };

  const cleanConnectorStorage = useCallback((): void => {
    console.log('clean');
  }, [connector]);

  const disconnectWallet = useCallback(async () => {
    cleanConnectorStorage();
    setSelectedWallet(undefined);
    // connector.deactivate();
    dispatch(setUserAddress(ZERO_ADDRESS));

    // @ts-expect-error close can be returned by wallet
    if (connector && connector.close) {
      // @ts-expect-error close can be returned by wallet
      await connector.close();
    }

    setLoading(false);
    setDeactivated(true);
    // window.location.reload();
  }, []);

  const connectWallet = useCallback(
    async (wallet: any, selectedChainId: number | undefined) => {
      try {
        setLoading(true);
        await wallet.activate();
        // setSelectedWallet(wallet);
        // setSelectedChainId(selectedChainId);
      } catch (error) {
        console.error('error on activation', error);
      } finally {
        setLoading(false);
      }
    },
    [disconnectWallet]
  );

  const initConnection = async () => {
    const httpProvider = new Web3(new Web3.providers.HttpProvider(params.rpc));
    try {
      if (!ethereum) {
        // user without wallet
        window.web3 = httpProvider;
        dispatch(setNetwork(params.chainId));
      } else {
        const networkId = await getNetworkId();

        // @ts-ignore
        if (!networks[networkId]) {
          // wrong network
          window.web3 = httpProvider;
        } else {
          window.web3 = new Web3(ethereum);
          const accounts = await web3.eth.getAccounts();

          if (selectedWallet && accounts.length) {
            // @ts-ignore
            await connectWallet(selectedWallet as any, networkId);
            // @ts-ignore
            setSelectedChainId(networkId);
            dispatch(setUserAddress(accounts[0]));
            dispatch(setLoadType(LOAD_TYPES.loaded));
          }
        }
        dispatch(setNetwork(networkId));
      }
      await getContractRegistryInstance();
      await loadAdditionalInfo();
      setInit(LOAD_TYPES.loaded);
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
      setInit(LOAD_TYPES.initError);
    }
  };

  useEffect(() => {
    initConnection();
  }, []);

  const switchNetwork = async (newChainId: number) => {
    // @ts-ignore
    const networkParam = networkParameters[networks[newChainId]];
    if (chainId === newChainId) {
      await requestLogin();
    } else {
      await requestConnect(networkParam);
    }
    window.location.reload();
  };

  const addERC20Token = async ({ address, symbol, decimals, image }: ERC20TokenType): Promise<boolean> => {
    const injectedProvider = (window as any).ethereum;
    if (provider && account && window && injectedProvider) {
      await injectedProvider.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address,
            symbol,
            decimals,
            image,
          },
        },
      });

      return true;
    }
    return false;
  };

  switch (init) {
    case LOAD_TYPES.initError:
      return <div>Init Errors</div>;
    case LOAD_TYPES.loaded:
      return (
        <Web3Context.Provider
          value={{
            web3ProviderData: {
              connectWallet,
              disconnectWallet,
              provider,
              isActive,
              loading,
              chainId,
              switchNetwork,
              currentAccount: account?.toLowerCase() || '',
              addERC20Token,
              switchNetworkError,
              switchNetworkPending,
              setSwitchNetworkError,
            },
          }}
        >
          {children}
        </Web3Context.Provider>
      );
    case LOAD_TYPES.loading:
    default:
      return <div>Loading</div>;
  }
};

export default Web3ContextProvider;
