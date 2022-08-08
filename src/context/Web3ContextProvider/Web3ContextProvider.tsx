import { createContext, FC, ReactElement, useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useWeb3React } from '@web3-react/core';
import { getWallet, WalletType } from 'connectors';
import { motion } from 'framer-motion';
import Web3 from 'web3';

import useLocalStorage from 'hooks/useLocalStorage';

import { Wrap } from './styles';

import { getAllAuctions } from 'store/auctions/actions';
import { getCheckIsUserRootNode } from 'store/root-node/action-creators';
import { getUserBalances } from 'store/transaction-handler/actions';
import { setLoadType, setNetwork, setUserAddress } from 'store/user-inf/action-creators';
import { getNumberAllProposals } from 'store/voting/proposals/actions';

import { getContractRegistryInstance } from 'contracts/contract-instance';

import {
  chainIdToNetworkMap,
  connectorParametersMap,
  networkConfigsMap,
  ORIGIN_NETWORK_NAME
} from 'constants/config';
import { LOAD_TYPES } from 'constants/statuses';
import { captureError } from 'utils/errors';
import { reloadPage } from 'utils/useful';

const { ethereum } = window;

export type Web3Data = {
  connectWallet: (wallet: WalletType, reload: boolean) => Promise<void>;
  disconnectWallet: () => void;
  error: Error | null;
  loading: boolean;
  setError: (error: Error | null) => void;
  chainId: number | undefined;
  switchNetwork: (chainId?: number, reload?: boolean) => Promise<void>;
  switchNetworkError: boolean | null;
  success: boolean;
  setSwitchNetworkError: (err: boolean | null) => void;
};

export const Web3Context = createContext({} as Web3Data);

const Web3ContextProvider: FC<{ children: ReactElement }> = ({ children }) => {
  const dispatch = useDispatch();
  const networkConfig = networkConfigsMap[ORIGIN_NETWORK_NAME];

  const [loadAppType, setLoadAppType] = useState(LOAD_TYPES.loading);

  const { connector, chainId } = useWeb3React();

  const [selectedRpc, setSelectedRpc] = useLocalStorage('selectedRpc', networkConfig.rpcUrl);
  const [selectedWallet, setSelectedWallet] = useLocalStorage<undefined | WalletType>('selectedWallet', undefined);
  const [selectedChainId, setSelectedChainId] = useLocalStorage('selectedChainId', networkConfig.chainId);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [switchNetworkError, setSwitchNetworkError] = useState<boolean | null>(null);

  const loadAdditionalInfo = async () => {
    dispatch(getAllAuctions());
    dispatch(getNumberAllProposals());
    dispatch(getCheckIsUserRootNode());
    dispatch(getUserBalances());
  };

  const cleanConnectorStorage = useCallback(() => {
    localStorage.removeItem('-walletlink:https://www.walletlink.org:version');
    localStorage.removeItem('-walletlink:https://www.walletlink.org:session:id');
    localStorage.removeItem('-walletlink:https://www.walletlink.org:session:secret');
    localStorage.removeItem('-walletlink:https://www.walletlink.org:session:linked');
    localStorage.removeItem('-walletlink:https://www.walletlink.org:AppVersion');
    localStorage.removeItem('-walletlink:https://www.walletlink.org:Addresses');
    localStorage.removeItem('-walletlink:https://www.walletlink.org:walletUsername');
    localStorage.removeItem('walletconnect');
    localStorage.removeItem('selectedRpc');
    localStorage.removeItem('selectedChainId');
    localStorage.removeItem('selectedWallet');
  }, []);

  const disconnectWallet = useCallback(async () => {
    try {
      setLoading(true);
      setSelectedWallet(undefined);
      cleanConnectorStorage();
      connector.deactivate ? await connector.deactivate() : await connector.resetState();
      if (connector && 'close' in connector) {
        // @ts-expect-error close can be returned by wallet
        await connector.close();
      }
    } catch (error: any) {
      setError(error);
      captureError(error);
    } finally {
      setLoading(false);
      reloadPage(0);
    }
  }, [connector]);

  const connectWallet = useCallback(
    async (walletType: WalletType, reload = false as boolean) => {
      try {
        setLoading(true);
        const wallet = getWallet(walletType);
        if (reload && (!chainId || !chainIdToNetworkMap[chainId])) {
          await switchNetwork(selectedChainId);
        }
        await wallet.activate(undefined);
        setSuccess(true);
        setSelectedWallet(walletType);
        if (reload) {
          reloadPage();
        }
      } catch (error: any) {
        setError(error);
        captureError(error);
      } finally {
        setLoading(false);
      }
    },
    [disconnectWallet, connector, chainId]
  );

  const initConnection = useCallback(async () => {
    try {
      const httpProvider = new Web3(new Web3.providers.HttpProvider(selectedRpc));
      if (!ethereum) {
        // user without wallet
        window.web3 = httpProvider;
        dispatch(setNetwork(selectedChainId));
      } else {
        const provider = getProvider(selectedWallet);
        const chainId = await getChainId(provider);
        if (!chainIdToNetworkMap[chainId]) {
          // wrong network
          window.web3 = httpProvider;
        } else {
          window.web3 = new Web3(provider as any);
          const accounts = await window.web3.eth.getAccounts();

          if (selectedWallet && accounts.length) {
            await connectWallet(selectedWallet, false);
            setSelectedChainId(chainId);
            dispatch(setUserAddress(accounts[0]));
            dispatch(setLoadType(LOAD_TYPES.loaded));
          }
        }
        dispatch(setNetwork(chainId));
      }
      await getContractRegistryInstance();
      await loadAdditionalInfo();
      setLoadAppType(LOAD_TYPES.loaded);
    } catch (error) {
      captureError(error);
      setLoadAppType(LOAD_TYPES.initError);
    }
  }, [ethereum]);

  const getProvider = (selectedWallet = WalletType.INJECTED) => {
    if (!ethereum.providers?.length) {
      return ethereum;
    }

    let provider;
    switch (selectedWallet) {
      case WalletType.COINBASE:
        provider = ethereum.providers.find(
          ({ isCoinbaseWallet, isCoinbaseBrowser }) => isCoinbaseWallet || isCoinbaseBrowser
        );
        break;
      case WalletType.INJECTED:
        provider = ethereum.providers.find(({ isMetaMask }) => isMetaMask);
        break;
      default:
        provider = ethereum.providers[0];
    }

    if (provider) {
      ethereum.setSelectedProvider(provider);
    }
    return provider;
  };

  const getChainId = async (provider: any) => {
    /* Fix issue with first Metamask launch. */
    const timeout = setTimeout(window.location.reload, 5000);
    const chainId = await provider.request({ method: 'net_version' });
    clearTimeout(timeout);
    return chainId;
  };

  const switchNetwork = useCallback(
    async (newChainId = networkConfig.chainId) => {
      try {
        if (!ethereum) {
          setSelectedChainId(newChainId);
          setSelectedRpc(connectorParametersMap[newChainId].rpcUrls[0]);
          reloadPage();
        } else {
          const isSameNetwork = chainId === newChainId;
          try {
            await connector.activate(isSameNetwork ? undefined : connectorParametersMap[newChainId]);
          } catch (error) {
            setSwitchNetworkError(true);
          }
          setSelectedChainId(newChainId);
        }
      } catch (error: any) {
        setError(error);
      }
    },
    [connector, chainId]
  );

  useEffect(() => {
    initConnection();
    ethereum?.on('accountsChanged', () => window.location.reload());
    ethereum?.on('chainChanged', () => window.location.reload());
  }, []);

  switch (loadAppType) {
    case LOAD_TYPES.initError:
      return (
        <Wrap>
          <div>
            <h5>Init error</h5>
            <p>Please, refresh the page</p>
          </div>
        </Wrap>
      );
    case LOAD_TYPES.loaded:
      return (
        <Web3Context.Provider
          value={{
            connectWallet,
            disconnectWallet,
            loading,
            chainId,
            success,
            error,
            setError,
            switchNetwork,
            switchNetworkError,
            setSwitchNetworkError,
          }}
        >
          {children}
        </Web3Context.Provider>
      );
    case LOAD_TYPES.loading:
    default:
      return (
        <Wrap>
          <motion.div
            className="breathing-q"
            animate={{ scale: 1.2 }}
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeOut',
              duration: 0.5
            }}
          >
            <img src="/logo.png" alt="q" />
          </motion.div>
        </Wrap>
      );
  }
};

export const useWeb3Context = () => useContext(Web3Context);

export default Web3ContextProvider;
