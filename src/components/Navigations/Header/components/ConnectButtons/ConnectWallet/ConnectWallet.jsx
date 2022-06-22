import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { AnimatePresence, motion } from 'framer-motion';

import Button from 'components/Base/Button';
import Checkbox from 'components/Base/Form/Checkbox';
import Modal from 'components/Base/Modal';
import { StyledConnectWallet } from 'components/Navigations/Header/styles';

import { networkSelector } from 'store/user-inf/selectors';

import { chainIds, mainnetDocsUrl, testnetDocsUrl } from 'constants/config';

function ConnectWallet ({ modalShow, setModalShow }) {
  const { t } = useTranslation();
  const network = useSelector(networkSelector);
  const docsUrl = network === chainIds.mainnet ? mainnetDocsUrl : testnetDocsUrl;

  const [isChecked, setIsChecked] = useState(false);

  function handleClose () {
    setModalShow(false);
  }

  const content = (
    <StyledConnectWallet>
      <div className="connect_header">
        <div className="header">
          <i className="mdi mdi-wallet-outline select-icon" />
          <h5>Connect Wallet</h5>
        </div>
        <div onClick={handleClose}>
          <i className="mdi mdi-close select-icon" />
        </div>
      </div>
      <AnimatePresence>
        {isChecked && (
          <motion.div
            className="connect_wallets-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Button style={{ width: '100%', margin: '0 0 10px 0' }}>Metamask</Button>
            <Button style={{ width: '100%', margin: '0 0 10px 0' }}>Coinbase</Button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="connect_terms-of-service">
        <Checkbox check={isChecked} onCheck={() => setIsChecked(!isChecked)} />
        <div>
          <p>
            I have read, understood, and agreed to the <strong>Terms of Service</strong> and Protocol Disclaimer.
          </p>
        </div>
      </div>
      <div className="connect_new-to-q">
        <h5>New to Q?</h5>
        <a
          whileHover={{ scale: 1.5 }}
          whileTap={{ scale: 0.8 }}
          target="_blank"
          href={docsUrl}
          rel="noreferrer"
        >
          <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            Learn more about Q
          </motion.p>
        </a>
      </div>
    </StyledConnectWallet>
  );

  return (
    <Modal open={modalShow} onLeave={handleClose}>
      {content}
    </Modal>
  );
}

export default ConnectWallet;

//     <>
// <div className="list-card__line" />
// <p className="install-metamask__info">
//   {t(
//     'MetaMask is a browser plugin that allows users to make EVM compatible transactions through regular websites.'
//   )}
// </p>
// <h4>{t('Get started:')}</h4>
// <p>{t('1. Install MetaMask for your browser (Supported Browsers: Chrome, Firefox, Brave, Edge)')}</p>
// <p>{t('2. Follow instructions.')}</p>
// <p>{t('3. Refresh the page.')}</p>
// <p>
//   {t('4. Click')} <strong title={t('"Connect wallet"')}>{t('"Connect wallet"')}</strong>
// </p>
// </>
// <div className="install-metamask__download">
// <img src={metamaskIcon} alt="metamask logo" />
// <div>
//   <a
//     target="_blank"
//     href="https://metamask.io/download/"
//     rel="noreferrer"
//   >
//     {t('INSTALL_METAMASK')}
//   </a>
// </div>
// </div>
