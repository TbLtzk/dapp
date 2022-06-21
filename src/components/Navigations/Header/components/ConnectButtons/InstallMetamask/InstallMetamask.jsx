import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import ModalWindow from 'components/Base/ModalWindow';
import { InstallMetamaskContainer } from 'components/Navigations/Header/styles';

const metamaskIcon =
  'https://images.ctfassets.net/9sy2a0egs6zh/4zJfzJbG3kTDSk5Wo4RJI1/1b363263141cf629b28155e2625b56c9/mm-logo.svg';

function InstallMetamask ({ modalShow, setModalShow }) {
  const { t } = useTranslation();
  function onHide () {
    setModalShow(false);
  }
  function continueBtnHandler () {
    setModalShow(false);
  }

  const content = (
    <InstallMetamaskContainer>
      <Trans i18nKey="INSTALL_METAMASK_TEXT">
        <div className="list-card__line" />
        <p className="install-metamask__info">
          {t(
            'MetaMask is a browser plugin that allows users to make EVM compatible transactions through regular websites.'
          )}
        </p>
        <h4>{t('Get started:')}</h4>
        <p>{t('1. Install MetaMask for your browser (Supported Browsers: Chrome, Firefox, Brave, Edge)')}</p>
        <p>{t('2. Follow instructions.')}</p>
        <p>{t('3. Refresh the page.')}</p>
        <p>
          {t('4. Click')} <strong title={t('"Connect wallet"')}>{t('"Connect wallet"')}</strong>
        </p>
      </Trans>
      <div className="install-metamask__download">
        <img src={metamaskIcon} alt="metamask logo" />
        <div>
          <a
            target="_blank"
            href="https://metamask.io/download/"
            rel="noreferrer"
          >
            {t('INSTALL_METAMASK')}
          </a>
        </div>
      </div>
    </InstallMetamaskContainer>
  );

  return (
    <div>
      <ModalWindow
        iconRight="check-bold"
        modalTitle={t('INSTALL_METAMASK')}
        continueBtnTitle={t('DONE')}
        show={modalShow}
        content={content}
        continueBtnHandler={continueBtnHandler}
        onHide={onHide}
      />
    </div>
  );
}

export default InstallMetamask;
