import { createContext, FC, ReactElement, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ChainId,
  createProvider,
  EthereumProvider,
  MetamaskProvider,
  ProviderDetector,
  ProviderProxyConstructor,
  PROVIDERS,
} from '@distributedlab/w3p';
import { useLocalStorage } from '@q-dev/react-hooks';
import { ethers } from 'ethers';
import { motion } from 'framer-motion';
import { DevnetFallback, ErrorHandler, MainnetFallback, TestnetFallback } from 'helpers';
import { ProviderWrapper, SupportedProviders } from 'typings/provider';

import { Wrap } from 'components/AppInitializer/styles';

import { useProvider } from 'hooks/useProvider';

import { chainIdToNetworkMap, connectorParametersMap, ORIGIN_NETWORK_NAME } from 'constants/config';
import { FALLBACK_PROVIDER_NAMES, FALLBACK_PROVIDERS } from 'constants/providers';
import { LOAD_TYPES } from 'constants/statuses';

export interface Web3Data extends Omit<ProviderWrapper, 'init' | 'switchNetwork'> {
  init: (providerType?: SupportedProviders) => Promise<void>;
  connectWallet: (providerType: SupportedProviders, onSuccess?: () => void | Promise<void>) => Promise<void>;
  switchNetwork: (chainId: ChainId) => Promise<void> | undefined;
  isRightNetwork: boolean;
};

function getFallbackProviderType (chainId?: number | string) {
  const networkName = chainId
    ? chainIdToNetworkMap[Number(chainId)] || ORIGIN_NETWORK_NAME
    : ORIGIN_NETWORK_NAME;
  switch (networkName) {
    case 'mainnet':
      return FALLBACK_PROVIDER_NAMES.mainnetFallback;
    case 'testnet':
      return FALLBACK_PROVIDER_NAMES.testnetFallback;
    case 'devnet':
      return FALLBACK_PROVIDER_NAMES.devnetFallback;
  }
}

export const Web3Context = createContext({} as Web3Data);

const Web3ContextProvider: FC<{ children: ReactElement }> = ({ children }) => {
  const { t } = useTranslation();

  const providerDetector = useMemo(
    () => new ProviderDetector<FALLBACK_PROVIDER_NAMES>(),
    []);
  const provider = useProvider();

  const [loadAppType, setLoadAppType] = useState(LOAD_TYPES.loading);
  const [storeProviderType, setStoreProviderType] = useLocalStorage<SupportedProviders>('providerType', getFallbackProviderType());

  const isRightNetwork = useMemo(() =>
    Boolean(provider.chainId && chainIdToNetworkMap[provider.chainId]),
  [provider.chainId]);

  async function init (providerType?: SupportedProviders) {
    try {
      await providerDetector.init();

      addFallbackProvider();

      const supportedProviders: {
        [key in SupportedProviders]?: ProviderProxyConstructor
      } = {
        [FALLBACK_PROVIDER_NAMES.mainnetFallback]: MainnetFallback,
        [FALLBACK_PROVIDER_NAMES.testnetFallback]: TestnetFallback,
        [FALLBACK_PROVIDER_NAMES.devnetFallback]: DevnetFallback,
        [PROVIDERS.Metamask]: MetamaskProvider,
      };

      const currentProviderType: SupportedProviders = providerType ?? storeProviderType;

      const providerProxyConstructor: ProviderProxyConstructor =
        supportedProviders[currentProviderType]!;

      await provider.init(providerProxyConstructor, {
        providerDetector,
        listeners: {
          onAccountChanged: () => {
            setLoadAppType(LOAD_TYPES.loading);
            window.location.reload();
          },
          onChainChanged: () => {
            setLoadAppType(LOAD_TYPES.loading);
            window.location.reload();
          },
          onDisconnect: (e) => {
            setLoadAppType(LOAD_TYPES.loading);
            const providerType = getFallbackProviderType(e?.chainId);
            setStoreProviderType(providerType);
            window.location.reload();
          },
        }
      });

      if (!provider.isConnected) {
        await provider.connect();
      }

      setStoreProviderType(currentProviderType);
      if (providerType) {
        setLoadAppType(LOAD_TYPES.loading);
        window.location.reload();
      }
    } catch (error) {
      setStoreProviderType(getFallbackProviderType());
      throw error;
    }
  }

  async function connectWallet (providerType: SupportedProviders, onSuccess?: () => void | Promise<void>) {
    const supportedProviders: {
      [key in SupportedProviders]?: ProviderProxyConstructor
    } = {
      [PROVIDERS.Metamask]: MetamaskProvider,
    };

    const providerProxyConstructor: ProviderProxyConstructor =
        supportedProviders[providerType]!;

    if (!providerProxyConstructor) {
      throw new Error(`Provider ${providerType} not supported`);
    }

    const provider = await createProvider(
      providerProxyConstructor,
      { providerDetector }
    );

    if (!provider.isConnected) {
      await provider.connect();
    }

    if (onSuccess) {
      await onSuccess();
    }
    setLoadAppType(LOAD_TYPES.loading);
    setStoreProviderType(providerType);
    window.location.reload();
  }

  function addFallbackProvider () {
    Object.values(FALLBACK_PROVIDERS).forEach(({ name, rpcUrl }) => {
      if (providerDetector.providers?.[name]) return;
      providerDetector.addProvider({
        name,
        instance: new ethers.providers.JsonRpcProvider(
          rpcUrl,
          'any',
        ) as unknown as EthereumProvider,
      });
    });
  }

  async function disconnect () {
    setLoadAppType(LOAD_TYPES.loading);
    const providerType = getFallbackProviderType(provider.chainId);
    try {
      await provider.disconnect();
    } catch (error) {
      ErrorHandler.processWithoutFeedback(error);
    }

    setStoreProviderType(providerType);
    window.location.reload();
  }

  function switchNetwork (chainId: ChainId) {
    switch (provider.providerType) {
      case FALLBACK_PROVIDER_NAMES.mainnetFallback:
      case FALLBACK_PROVIDER_NAMES.testnetFallback:
      case FALLBACK_PROVIDER_NAMES.devnetFallback:
        setLoadAppType(LOAD_TYPES.loading);
        const fallbackType = getFallbackProviderType(chainId);
        if (!fallbackType || provider.providerType === fallbackType) return;
        setStoreProviderType(fallbackType);
        window.location.reload();
        return;
      default:
        const chainInfo = connectorParametersMap[+chainId];
        return provider.switchNetwork(chainId, chainInfo);
    }
  }

  async function initProvider () {
    try {
      await init();
      setLoadAppType(LOAD_TYPES.loaded);
    } catch (error) {
      setLoadAppType(LOAD_TYPES.initError);
    }
  }

  useEffect(() => {
    initProvider();
  }, []);

  switch (loadAppType) {
    case LOAD_TYPES.loaded:
      return (
        <Web3Context.Provider
          value={{
            ...provider,
            switchNetwork,
            isRightNetwork,
            init,
            disconnect,
            connectWallet,
          }}
        >
          {children}
        </Web3Context.Provider>
      );
    case LOAD_TYPES.initError:
      return (
        <Wrap>
          <div>
            <p>{t('APP_INIT_ERROR')}</p>
            <p>{t('APP_INIT_ERROR_MESSAGE')}</p>
          </div>
        </Wrap>
      );
    case LOAD_TYPES.loading:
    default:
      return (
        <Wrap>
          <motion.div
            className="breathing-q"
            animate={{ scale: 1.3 }}
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeOut',
              duration: 0.75
            }}
          >
            <img
              className="breathing-q__logo"
              src="/logo.png"
              alt="q"
            />
          </motion.div>
        </Wrap>
      );
  }
};

export const useWeb3Context = () => useContext(Web3Context);

export default Web3ContextProvider;
