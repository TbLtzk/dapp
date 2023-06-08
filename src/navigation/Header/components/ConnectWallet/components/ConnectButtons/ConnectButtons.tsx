import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PROVIDERS } from '@distributedlab/w3p';
import { useWeb3Context } from 'context/Web3ContextProvider';
import { ErrorHandler, sleep } from 'helpers';

import Button from 'components/Button';

function ConnectButtons () {
  const { t } = useTranslation();
  const { connectWallet: connect } = useWeb3Context();

  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async (provider: PROVIDERS) => {
    setIsLoading(true);
    try {
      await connect(provider, async () => {
        setIsSuccess(true);
        await sleep(500);
      });
    } catch (error) {
      ErrorHandler.process(error, t('ERROR_WHILE_CONNECTING_TO_WALLET'));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  if (isSuccess) {
    return (
      <div className="connect">
        <h5>{t('SUCCESS')}</h5>
        <p>{t('REFRESHING_THE_PAGE')}</p>
      </div>
    );
  }

  if (isLoading) {
    return <div className="connect-loading">{t('LOADING')}</div>;
  }

  return (
    <div className="connect-buttons">
      {window.ethereum?.isMetaMask
        ? (
          <Button
            alwaysEnabled
            style={{ width: '100%' }}
            onClick={() => connectWallet(PROVIDERS.Metamask)}
          >
            <img
              src="/icons/metamask.svg"
              alt="metamask"
              className="connect-buttons__icon"
            />
            <span>{t('CONNECT_WITH_METAMASK')}</span>
          </Button>
        )
        : (
          <a
            href="https://metamask.io/"
            target="_blank"
            rel="noreferrer"
          >
            <Button
              alwaysEnabled
              block
              style={{ width: '100%' }}
            >
              <img
                src="/icons/metamask.svg"
                alt="metamask"
                className="connect-buttons__icon"
              />
              <span>{t('INSTALL_METAMASK')}</span>
            </Button>
          </a>
        )}
    </div>
  );
}

export default ConnectButtons;
