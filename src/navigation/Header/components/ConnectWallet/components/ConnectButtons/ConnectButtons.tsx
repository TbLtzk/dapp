import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { WalletType } from 'connectors';
import { useWeb3Context } from 'context/Web3ContextProvider';

import Button from 'components/Base/Button';

function ConnectButtons () {
  const { t } = useTranslation();

  const { connectWallet, success, loading, error, setError } = useWeb3Context();

  useEffect(() => {
    return () => {
      setError(null);
    };
  }, []);

  if (success) {
    return (
      <div className="connect">
        <h5>{t('SUCCESS')}</h5>
        <p>{t('REFRESHING_THE_PAGE')}</p>
      </div>
    );
  }
  if (loading) {
    return <div className="connect-loading">{t('LOADING')}</div>;
  }
  if (error) {
    return (
      <div className="connect">
        <p>{'ERROR_WHILE_CONNECTING_TO_WALLET'}</p>
      </div>
    );
  }

  return (
    <div className="connect_buttons">
      <Button
        alwaysEnabled
        style={{ width: '100%' }}
        onClick={() => connectWallet(WalletType.INJECTED, true)}
      >
        <div className="connect-btn">
          <img
            src="/icons/metamask.svg"
            alt="metamask"
            className="icon"
          />
          <p>{t('CONNECT_WITH_METAMASK')}</p>
        </div>
      </Button>
      <Button
        alwaysEnabled
        style={{ width: '100%' }}
        onClick={() => connectWallet(WalletType.COINBASE, true)}
      >
        <div className="connect-btn">
          <img
            src="/icons/coinbase.png"
            alt="metamask"
            className="icon"
          />
          <p>{t('CONNECT_WITH_COINBASE')}</p>
        </div>
      </Button>

      {/* TODO: add bridge between dApp and connect to wallet
       <Button
        alwaysEnabled
        style={{ width: '100%' }}
        onClick={() => connectWallet(WalletType.WALLET_CONNECT, true)}
      >
        Connect with Wallet Connect
      </Button> */}
    </div>
  );
}

export default ConnectButtons;
