import { createContext, FC, ReactElement, useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useWeb3React } from '@web3-react/core';
import { getWallet, WalletType } from 'connectors';
import { motion } from 'framer-motion';
import Web3 from 'web3';

import useLocalStorage from 'hooks/useLocalStorage';

import { Wrap } from './styles';

import { getAuctions } from 'store/auctions/action-creators';
import { getCheckIsUserRootNode } from 'store/root-node/action-creators';
import { setLoadType, setNetwork, setUserAddress } from 'store/user-inf/action-creators';
import { getNumberAllProposals } from 'store/voting/proposals/actions';

import { getContractRegistryInstance } from 'contracts/contract-instance';

import { networkParameters, networks, rpcUrls } from 'constants/config';
import { AUCTIONS_TYPES, LOAD_TYPES } from 'constants/statuses';
import { getChainId, getParametersDependsOnUrl, getProvider } from 'func/appConfig';
import ErrorHandler from 'func/ErrorHandler';
import { reloadPage } from 'func/useful';

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
  const params = getParametersDependsOnUrl();

  const [loadAppType, setLoadAppType] = useState(LOAD_TYPES.loading);

  const { connector, chainId } = useWeb3React();

  const [selectedRpc, setSelectedRpc] = useLocalStorage('setSelectedRpc', params.rpc);
  const [selectedWallet, setSelectedWallet] = useLocalStorage<undefined | WalletType>('selectedWallet', undefined);
  const [selectedChainId, setSelectedChainId] = useLocalStorage('selectedChainId', params.chainId);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [switchNetworkError, setSwitchNetworkError] = useState<boolean | null>(null);

  const loadAdditionalInfo = async () => {
    dispatch(getAuctions(AUCTIONS_TYPES.all));
    dispatch(getNumberAllProposals());
    dispatch(getCheckIsUserRootNode());
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
  }, []);

  const disconnectWallet = useCallback(async () => {
    try {
      setLoading(true);
      setSelectedWallet(undefined);
      cleanConnectorStorage();
      connector.deactivate ? await connector.deactivate() : await connector.resetState();
      // @ts-expect-error close can be returned by wallet
      if (connector && connector.close) {
        // @ts-expect-error close can be returned by wallet
        await connector.close();
      }
    } catch (error: any) {
      setError(error);
      ErrorHandler.processWithoutFeedback(error);
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
        await wallet.activate(undefined);
        setSuccess(true);
        setSelectedWallet(walletType);
        if (reload) {
          reloadPage();
        }
      } catch (error: any) {
        setError(error);
        ErrorHandler.processWithoutFeedback(error);
      } finally {
        setLoading(false);
      }
    },
    [disconnectWallet, connector]
  );

  const initConnection = useCallback(async () => {
    try {
      const httpProvider = new Web3(new Web3.providers.HttpProvider(selectedRpc));
      if (!ethereum) {
        // user without wallet
        window.web3 = httpProvider;
        dispatch(setNetwork(selectedChainId));
      } else {
        const provider = getProvider(ethereum, selectedWallet);
        const chainId = await getChainId(provider);
        if (!networks[chainId]) {
          // wrong network
          window.web3 = httpProvider;
        } else {
          window.web3 = new Web3(provider);

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
      ErrorHandler.processWithoutFeedback(error);
      setLoadAppType(LOAD_TYPES.initError);
    }
  }, [ethereum]);

  const switchNetwork = useCallback(
    async (newChainId = params.chainId) => {
      try {
        if (!ethereum) {
          setSelectedChainId(newChainId);
          setSelectedRpc(rpcUrls[newChainId]);
          reloadPage();
        } else {
          const networkParam = networkParameters[networks[newChainId]];
          const isSameNetwork = chainId === newChainId;
          try {
            await connector.activate(isSameNetwork ? undefined : networkParam);
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
