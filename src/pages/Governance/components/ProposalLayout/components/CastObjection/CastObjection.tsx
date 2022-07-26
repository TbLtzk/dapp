import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Proposal } from 'typings/proposals';
import Button from 'ui/Button';
import Modal from 'ui/Modal';
import Tip from 'ui/Tip';

import useMetamaskReset from 'hooks/useMetamaskReset';

import CastObjectionForm from './components/CastObjectionForm';

import formTypes from 'constants/form-types';

function CastObjection ({ proposal }: { proposal: Proposal }) {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => {
    setModalOpen(false);
  };

  useMetamaskReset(formTypes.castObjection, handleClose);

  return (
    <div className="cast-objection">
      <Tip
        type="warning"
        action={(
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
        <CastObjectionForm proposal={proposal} />
      </Modal>
    </div>
  );
}

export default CastObjection;
