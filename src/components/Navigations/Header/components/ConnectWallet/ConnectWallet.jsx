import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'components/Base/Button';

import ConnectWalletModal from './components/ConnectWalletModal';

function ConnectWallet () {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  function handleClose () {
    setModalOpen(false);
  }

  function handleOpen () {
    setModalOpen(true);
  }

  return (
    <>
      <Button
        alwaysEnabled
        style={{ margin: '0 0 0 20px' }}
        onClick={handleOpen}
      >
        <img
          style={{ width: '20px', marginRight: '5px' }}
          src="/icons/metamask.svg"
          alt="metamask"
        />
        {t('CONNECT_WALLET')}
      </Button>

      <ConnectWalletModal modalOpen={modalOpen} onModalClose={handleClose} />
    </>
  );
}

export default ConnectWallet;
