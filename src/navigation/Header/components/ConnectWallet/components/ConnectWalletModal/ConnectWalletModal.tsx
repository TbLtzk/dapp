import { useSelector } from 'react-redux';

import { motion } from 'framer-motion';
import Check from 'ui/Check';

import Modal from 'components/Base/Modal';

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
  const network = useSelector(networkSelector);
  const docsUrl = network === chainIds.mainnet ? mainnetDocsUrl : testnetDocsUrl;

  const [isChecked, setIsChecked] = useLocalStorage('i-have-read-the-privacy-policy', false);

  return (
    <Modal open={modalOpen} onLeave={onModalClose}>
      <StyledConnectWalletModal>
        <div className="connect_header">
          <div className="header">
            <i className="mdi mdi-wallet-outline select-icon" />
            <h5>Connect wallet</h5>
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onModalClose}
          >
            <i className="mdi mdi-close select-icon" />
          </motion.div>
        </div>
        <div className="card__line" />
        {isChecked && <ConnectButtons />}

        <div className="connect_terms-of-service">
          <Check
            value={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <div>
            <p>
              <span>I have read, understood, and agreed to the </span>
              <a
                target="_blank"
                href="/data-privacy"
                rel="noreferrer"
              >
                Data privacy
              </a>
              <span> and </span>
              <a
                target="_blank"
                href="/imprint"
                rel="noreferrer"
              >
                Imprint
              </a>
              .
            </p>
          </div>
        </div>

        <div className="connect_new-to-q">
          <h5>New to Q?</h5>
          <a
            target="_blank"
            href={`${docsUrl}/five-minutes/`}
            rel="noreferrer"
          >
            <motion.p whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              Learn more about Q
            </motion.p>
          </a>
        </div>
      </StyledConnectWalletModal>
    </Modal>
  );
}

export default ConnectWalletModal;
