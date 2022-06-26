/* tslint:disable */
import { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { JsonRpcProvider } from '@ethersproject/providers';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import Web3 from 'web3';

import useLocalStorage from 'hooks/useLocalStorage';
import { Web3Context } from 'hooks/useWeb3Context';

import { getWallet, WalletType } from './walletOptions';

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
  connectWallet: (wallet: WalletType, chainId: number) => Promise<void>;
  disconnectWallet: () => void;
  currentAccount: string;
  connected: boolean;
  loading: boolean;
  provider: JsonRpcProvider | undefined;
  chainId: number | undefined;
  switchNetwork: (chainId: number) => Promise<void>;
  addERC20Token: (args: ERC20TokenType) => Promise<boolean>;
  error: Error | undefined;
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
  const { account, chainId, library: provider, activate, active, error, deactivate, setError } = useWeb3React();

  const [selectedWallet, setSelectedWallet] = useLocalStorage('selectedWallet', undefined);
  const [selectedChainId, setSelectedChainId] = useLocalStorage('selectedChainId', undefined);
  const [switchNetworkPending, setSwitchNetworkPending] = useState(false);
  const [connector, setConnector] = useState<AbstractConnector>();
  const [loading, setLoading] = useState(false);
  const [deactivated, setDeactivated] = useState(false);
  const [triedCoinbase, setTriedCoinbase] = useState(false);
  const [switchNetworkError, setSwitchNetworkError] = useState<Error>();

  const [init, setInit] = useState(LOAD_TYPES.loading);
  const { rpc } = getParametersDependsOnUrl();

  const dispatch = useDispatch();

  const loadAdditionalInfo = async () => {
    dispatch(getAuctions(AUCTIONS_TYPES.all));
    dispatch(getNumberAllProposals());
    dispatch(getCheckIsUserRootNode());
  };

  const cleanConnectorStorage = useCallback((): void => {
    if (connector instanceof WalletConnectConnector) {
      localStorage.removeItem('walletconnect');
    } else if (connector instanceof WalletLinkConnector) {
      localStorage.removeItem('-walletlink:https://www.walletlink.org:version');
      localStorage.removeItem('-walletlink:https://www.walletlink.org:session:id');
      localStorage.removeItem('-walletlink:https://www.walletlink.org:session:secret');
      localStorage.removeItem('-walletlink:https://www.walletlink.org:session:linked');
      localStorage.removeItem('-walletlink:https://www.walletlink.org:AppVersion');
      localStorage.removeItem('-walletlink:https://www.walletlink.org:Addresses');
      localStorage.removeItem('-walletlink:https://www.walletlink.org:walletUsername');
    }
  }, [connector]);

  const disconnectWallet = useCallback(async () => {
    cleanConnectorStorage();
    setSelectedWallet(undefined);
    deactivate();
    dispatch(setUserAddress(ZERO_ADDRESS));
    // @ts-expect-error close can be returned by wallet
    if (connector && connector.close) {
      // @ts-expect-error close can be returned by wallet
      await connector.close();
    }

    setLoading(false);
    setDeactivated(true);
    window.location.reload();
  }, []);

  const connectWallet = useCallback(
    async (wallet: WalletType, selectedChainId: number | undefined) => {
      try {
        setLoading(true);
        const connector: AbstractConnector = getWallet(wallet, selectedChainId);
        await activate(connector, undefined, true);
        // @ts-expect-error no type
        setSelectedWallet(wallet);
        // @ts-expect-error no type
        setSelectedChainId(selectedChainId);
        setDeactivated(false);
      } catch (error) {
        console.error('error on activation', error);
        // @ts-expect-error no type
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [disconnectWallet]
  );

  const initConnection = async () => {
    const httpProvider = new Web3(new Web3.providers.HttpProvider(rpc));
    try {
      if (!ethereum) {
        // user without wallet
        window.web3 = httpProvider;
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
            await connectWallet(selectedWallet as WalletType, networkId);
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
              connected: active,
              loading,
              chainId,
              switchNetwork,
              currentAccount: account?.toLowerCase() || '',
              addERC20Token,
              error,
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
