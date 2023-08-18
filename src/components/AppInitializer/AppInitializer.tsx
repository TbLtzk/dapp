import { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { BaseContractInstance } from '@q-dev/q-js-sdk/lib/contracts/BaseContractInstance';
import { useWeb3Context } from 'context/Web3ContextProvider';
import { motion } from 'framer-motion';

import { Wrap } from './styles';

import { useAuctions } from 'store/auctions/hooks';
import { useProposals } from 'store/proposals/hooks';
import { useQVault } from 'store/q-vault/hooks';
import { useRootNodes } from 'store/root-nodes/hooks';
import { useServerConfig } from 'store/server-config/hooks';
import { useUser } from 'store/user/hooks';

import { initContractRegistryInstance } from 'contracts/contract-instance';

import { ZERO_ADDRESS } from 'constants/boundaries';
import { chainIdToNetworkMap, networkConfigsMap } from 'constants/config';
import { LOAD_TYPES } from 'constants/statuses';

function AppInitializer ({ children }: { children: ReactElement }) {
  const { t } = useTranslation();

  const { setAddress, setChainId } = useUser();
  const {
    currentProvider,
    currentSigner,
    init,
    address,
    chainId,
    isRightNetwork,
    setLoadAppType,
    loadAppType
  } = useWeb3Context();
  const { loadAllBalances } = useQVault();
  const { getAllProposals } = useProposals();
  const { getAllAuctions } = useAuctions();
  const { checkRootNodeMembership } = useRootNodes();
  const { loadFeatures } = useServerConfig();

  function setGasBuffer () {
    const network = chainIdToNetworkMap[Number(chainId)];
    if (network) {
      BaseContractInstance.DEFAULT_GASBUFFER = networkConfigsMap[network].gasBuffer;
    }
  }

  async function loadAdditionalInfo () {
    if (!currentProvider) return;
    if (!isRightNetwork) {
      setLoadAppType(LOAD_TYPES.loaded);
      return;
    };
    setLoadAppType(LOAD_TYPES.loading);
    try {
      setGasBuffer();
      initContractRegistryInstance(currentSigner || currentProvider);

      await Promise.all([
        loadAllBalances(),
        loadFeatures()
      ]);

      getAllProposals();
      getAllAuctions();
      checkRootNodeMembership();

      setLoadAppType(LOAD_TYPES.loaded);
    } catch (error) {
      setLoadAppType(LOAD_TYPES.initError);
    }
  }

  async function initApp () {
    try {
      await init();
    } catch (error) {
      setLoadAppType(LOAD_TYPES.initError);
    }
  }

  useEffect(() => {
    initApp();
  }, []);

  useEffect(() => {
    loadAdditionalInfo();
  }, [currentProvider, currentSigner, isRightNetwork, chainId]);

  useEffect(() => {
    setAddress(address || ZERO_ADDRESS);
  }, [address]);

  useEffect(() => {
    if (chainId) {
      setChainId(Number(chainId));
    }
  }, [chainId]);

  switch (loadAppType) {
    case LOAD_TYPES.loaded:
      return children;
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

export default AppInitializer;
