import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useWeb3React } from '@web3-react/core';
import { getWallet } from 'connectors';
import { motion } from 'framer-motion';
import Web3 from 'web3';

import useLocalStorage from 'hooks/useLocalStorage';
import { Web3Context } from 'hooks/useWeb3Context';

import { Wrap } from './styles';

import { getAuctions } from 'store/auctions/action-creators';
import { getCheckIsUserRootNode } from 'store/root-node/action-creators';
import { setLoadType, setNetwork, setUserAddress } from 'store/user-inf/action-creators';
import { getNumberAllProposals } from 'store/voting/proposals/actions';

import { getContractRegistryInstance } from 'contracts/contract-instance';

import { networkParameters, networks, rpcUrls } from 'constants/config';
import { AUCTIONS_TYPES, LOAD_TYPES } from 'constants/statuses';
import ErrorHandler from 'func/ErrorHandler';
import { getChainId, getParametersDependsOnUrl, getProvider, reloadPage } from 'func/useful';

const { ethereum } = window;
// export type ERC20TokenType = {
//   address: string;
//   symbol: string;
//   decimals: number;
//   image?: string;
//   aToken?: boolean;
// };

// export type Web3Data = {
//   connectWallet: (wallet: any, chainId: number) => Promise<void>;
//   disconnectWallet: () => void;
//   currentAccount: string;
//   isActive: boolean;
//   loading: boolean;
//   provider: JsonRpcProvider | undefined;
//   chainId: number | undefined;
//   switchNetwork: (chainId: number) => Promise<void>;
//   addERC20Token: (args: ERC20TokenType) => Promise<boolean>;
//   switchNetworkError: Error | undefined;
//   switchNetworkPending: boolean;
//   setSwitchNetworkError: (err: Error | undefined) => void;
// };

const Web3ContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const params = getParametersDependsOnUrl();

  const [loadAppType, setLoadAppType] = useState(LOAD_TYPES.loading);

  const { connector, chainId, isActive, provider } = useWeb3React();

  const [selectedWallet, setSelectedWallet] = useLocalStorage('selectedWallet', undefined);
  const [selectedChainId, setSelectedChainId] = useLocalStorage('selectedChainId', params.chainId);
  const [selectedRpc, setSelectedRpc] = useLocalStorage('setSelectedRpc', params.rpc);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [switchNetworkError, setSwitchNetworkError] = useState(null);

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
  }, [connector]);

  const disconnectWallet = useCallback(async () => {
    try {
      setLoading(true);
      setSelectedWallet(undefined);
      cleanConnectorStorage();
      connector.deactivate ? await connector.deactivate() : await connector.resetState();
      if (connector && connector.close) {
        await connector.close();
      }
    } catch (error) {
      setError(error.message);
      console.error('error while disconnect', error.message);
    } finally {
      setLoading(false);
      reloadPage();
    }
  }, [connector]);

  const connectWallet = useCallback(
    async (walletType, reload = false) => {
      try {
        setLoading(true);
        const wallet = getWallet(walletType);
        await wallet.activate(undefined);
        setSelectedWallet(walletType);
        if (reload) {
          reloadPage();
        }
      } catch (error) {
        setError(error.message);
        console.error('error on activation', error);
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
  }, []);

  const switchNetwork = useCallback(async (newChainId = params.chainId) => {
    try {
      if (!ethereum) {
        setSelectedChainId(newChainId);
        setSelectedRpc(rpcUrls[newChainId]);
        reloadPage();
      } else {
        const networkParam = networkParameters[networks[newChainId]];
        const isSameNetwork = chainId === newChainId;
        await connector.activate(isSameNetwork ? undefined : networkParam).catch(() => setSwitchNetworkError(true));
        setSelectedChainId(newChainId);
      }
    } catch (error) {
      setError(error);
    }
  }, []);

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
            web3ProviderData: {
              connectWallet,
              disconnectWallet,
              provider,
              isActive,
              loading,
              chainId,
              error,
              switchNetwork,
              switchNetworkError,
              setSwitchNetworkError,
              setError,
            },
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
            transition={{ repeatType: Infinity, duration: 0.8 }}
          >
            <img src="/logo.png" alt="q" />
          </motion.div>
        </Wrap>
      );
  }
};

export default Web3ContextProvider;
