import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ModalWindow from 'components/Base/ModalWindow';

import { easterEggImg, imprintContent, privacyContent } from './policy-text';
import { PolicyContainer } from './styles';

function Policy () {
  const { t } = useTranslation();
  const [easterEgg, setEasterEgg] = useState(0);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(!localStorage.getItem('privacy-policy'));
  const [imprintModalOpen, setImprintModalOpen] = useState(false);

  const handlePrivacyModal = () => {
    setPrivacyModalOpen(false);
    localStorage.setItem('privacy-policy', '0');
  };

  const handleImprintModal = () => {
    setImprintModalOpen(false);
  };

  return (
    <>
      <span>&nbsp;|&nbsp;</span>
      <div className="policy_container">
        <p onClick={() => setPrivacyModalOpen(true)}> {t('DATA_PRIVACY')}</p>
        <span>&nbsp;|&nbsp;</span> <p onClick={() => setImprintModalOpen(true)}> {t('IMPRINT')}</p>
      </div>
      <ModalWindow
        iconRight="check-all"
        modalTitle={<div onClick={() => setEasterEgg((val) => val + 1)}>{t('DATA_PRIVACY')}</div>}
        continueBtnTitle="Agreed"
        closeButton={false}
        show={privacyModalOpen}
        content={
          <PolicyContainer>
            {privacyContent} {easterEgg > 10 && easterEggImg}
          </PolicyContainer>
        }
        continueBtnHandler={handlePrivacyModal}
      />
      <ModalWindow
        iconRight="close"
        modalTitle={t('IMPRINT')}
        continueBtnTitle="Close"
        closeButton={false}
        content={<PolicyContainer>{imprintContent}</PolicyContainer>}
        show={imprintModalOpen}
        continueBtnHandler={handleImprintModal}
        onHide={handleImprintModal}
      />
    </>
  );
}

export default Policy;
