import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SlashingProposal } from 'typings/proposals';

import Button from 'ui/Button';
import Modal from 'ui/Modal';

import ObjectionDetails from './components/ObjectionDetails';
import ProposerRemarkForm from './components/ProposerRemarkForm';

import { useUser } from 'store/user/hooks';

import { ObjectionStatus } from 'constants/slashing';

function ProposalObjection ({ proposal }: { proposal: SlashingProposal }) {
  const { t } = useTranslation();

  const user = useUser();
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => {
    setModalOpen(false);
  };

  const canConfirmAppeal = user.address === proposal.proposer &&
    proposal.objEscrow.objection.status === ObjectionStatus.PENDING;

  return (
    <div className="block">
      <div className="block__header">
        <h2 className="text-h2">{t('OBJECTION')}</h2>

        {canConfirmAppeal && (
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
        <ProposerRemarkForm proposal={proposal} onSubmit={handleClose} />
      </Modal>
    </div>
  );
}

export default ProposalObjection;
