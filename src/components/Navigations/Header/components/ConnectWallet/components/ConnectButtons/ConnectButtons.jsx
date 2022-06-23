import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { motion } from 'framer-motion';

import Button from 'components/Base/Button';
import { ethereum } from 'components/Custom/LoadingMetaMask/LoadingMetaMask';

import { loadTypeSelector, networkSelector } from 'store/user-inf/selectors';

import { chainIds, networkParameters } from 'constants/config';
import { LOAD_TYPES } from 'constants/statuses';
import ErrorHandler from 'func/ErrorHandler';

async function requestConnect (params) {
  try {
    await ethereum.request({ method: 'eth_requestAccounts' });
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: params.chainId }],
    });
  } catch (error) {
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

function ConnectButtons ({ docsUrl }) {
  const { t } = useTranslation();
  const loadType = useSelector(loadTypeSelector);
  const network = useSelector(networkSelector);

  function handleRequest (chainId, networkParam) {
    network === chainId ? requestLogin() : requestConnect(networkParam);
  }

  const content = () => {
    switch (loadType) {
      case LOAD_TYPES.loaded:
        return null;
      case LOAD_TYPES.wrongNetwork:
      case LOAD_TYPES.notLogged:
        return (
          <div className="connect_buttons">
            <Button
              alwaysEnabled
              style={{ width: '100%' }}
              onClick={() => handleRequest(chainIds.mainnet, networkParameters.mainnet)}
            >
              {t('CONNECT_TO_Q_MAINNET')}
            </Button>
            <Button
              alwaysEnabled
              style={{ width: '100%' }}
              onClick={() => handleRequest(chainIds.testnet, networkParameters.testnet)}
            >
              {t('CONNECT_TO_Q_TESTNET')}
            </Button>
          </div>
        );
      default:
        return (
          <div className="install_metamask">
            <p>Please read the instruction:</p>

            <a
              target="_blank"
              href={`${docsUrl}/how-to-install-metamask/`}
              rel="noreferrer"
            >
              <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                How to install and setup MetaMask
              </motion.p>
            </a>
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {content()}
    </motion.div>
  );
}

export default ConnectButtons;
