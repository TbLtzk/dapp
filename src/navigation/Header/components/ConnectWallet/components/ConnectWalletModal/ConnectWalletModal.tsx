import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import Check from 'ui/Check';
import Modal from 'ui/Modal';

import useLocalStorage from 'hooks/useLocalStorage';

import { StyledConnectWalletModal } from '../../styles';
import ConnectButtons from '../ConnectButtons';

import { networkSelector } from 'store/user-inf/selectors';

import { chainIds, mainnetDocsUrl, testnetDocsUrl } from 'constants/config';

type Props = {
  onModalClose: () => void;
  modalOpen: boolean;
};

function ConnectWalletModal ({ modalOpen, onModalClose }: Props) {
  const { t } = useTranslation();
  const network = useSelector(networkSelector);
  const docsUrl = network === chainIds.mainnet ? mainnetDocsUrl : testnetDocsUrl;

  const [isChecked, setIsChecked] = useLocalStorage('i-have-read-the-privacy-policy', false);

  return (
    <Modal
      open={modalOpen}
      title={t('CONNECT_WALLET')}
      onClose={onModalClose}
    >
      <StyledConnectWalletModal>
        {isChecked && <ConnectButtons />}

        <div className="connect_terms-of-service">
          <Check
            value={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <p className="text-md">
            <span> {t('I_HAVE_READ')} </span>
            <a
              className="link"
              target="_blank"
              href="/data-privacy"
              rel="noreferrer"
            >
              {t('DATA_PRIVACY')}
            </a>
            {' '}
            <span>{t('AND')}</span>
            {' '}
            <a
              className="link"
              target="_blank"
              href="/imprint"
              rel="noreferrer"
            >
              {t('IMPRINT')}
            </a>
            .
          </p>
        </div>

        <div className="connect_new-to-q">
          <p className="text-md color-secondary">{t('NEW_TO_Q')}</p>
          <a
            className="text-lg font-semibold"
            target="_blank"
            href={`${docsUrl}/five-minutes/`}
            rel="noreferrer"
          >
            {t('LEARN_MORE_ABOUT_Q')}
          </a>
        </div>
      </StyledConnectWalletModal>
    </Modal>
  );
}

export default ConnectWalletModal;
