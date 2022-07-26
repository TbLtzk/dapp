import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { SlashingProposal } from 'typings/proposals';
import Button from 'ui/Button';
import Modal from 'ui/Modal';

import useMetamaskReset from 'hooks/useMetamaskReset';

import ObjectionDetails from './components/ObjectionDetails';
import ProposerRemarkForm from './components/ProposerRemarkForm';

import { userAddressMetamask } from 'store/user-inf/selectors';

import formTypes from 'constants/form-types';

function ProposalObjection ({ proposal }: { proposal: SlashingProposal }) {
  const { t } = useTranslation();

  const userAddress = useSelector(userAddressMetamask);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => {
    setModalOpen(false);
  };

  useMetamaskReset(formTypes.proposerRemark, handleClose);

  return (
    <div className="block">
      <div className="block__header">
        <h2 className="text-h2">{t('OBJECTION')}</h2>

        {proposal.proposer === userAddress && (
          <Button
            compact
            look="secondary"
            onClick={() => setModalOpen(true)}
          >
            {t('CONFIRM_APPEAL')}
          </Button>
        )}
      </div>

      <div className="block__content">
        <ObjectionDetails proposal={proposal} />
      </div>

      <Modal
        open={modalOpen}
        title={t('CONFIRM_APPEAL')}
        tip={t('CONFIRM_APPEAL_TIP')}
        onClose={handleClose}
      >
        <ProposerRemarkForm proposal={proposal} />
      </Modal>
    </div>
  );
}

export default ProposalObjection;
