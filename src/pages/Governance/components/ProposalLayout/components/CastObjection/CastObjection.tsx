import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal } from '@q-dev/q-ui-kit';
import { SlashingProposal } from 'typings/proposals';

import Button from 'components/Button';
import Tip from 'ui/Tip';

import CastObjectionForm from './components/CastObjectionForm';

import { ObjectionStatus } from 'constants/slashing';

function CastObjection ({ proposal }: { proposal: SlashingProposal }) {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="cast-objection">
      <Tip
        type="warning"
        action={proposal.objEscrow.objection.status === ObjectionStatus.OPEN && (
          <Button
            compact
            look="danger"
            onClick={() => setModalOpen(true)}
          >
            {t('CAST_OBJECTION')}
          </Button>
        )}
      >
        {t('SLASHED_PARTY_TIP')}
      </Tip>

      <Modal
        title={t('CAST_OBJECTION')}
        open={modalOpen}
        tip={t('CAST_OBJECTION_TIP')}
        onClose={handleClose}
      >
        <CastObjectionForm proposal={proposal} onSubmit={handleClose} />
      </Modal>
    </div>
  );
}

export default CastObjection;
