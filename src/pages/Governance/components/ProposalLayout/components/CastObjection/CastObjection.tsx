import { useState } from 'react';

import { Proposal } from 'typings/proposals';
import Button from 'ui/Button';
import Modal from 'ui/Modal';
import Tip from 'ui/Tip';

import useMetamaskReset from 'hooks/useMetamaskReset';

import CastObjectionForm from './components/CastObjectionForm';

import formTypes from 'constants/form-types';

function CastObjection ({ proposal }: { proposal: Proposal }) {
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
            Cast Objection
          </Button>
        )}
      >
        You are the slashed party. You may object to this executed slashing proposal and seek for an arbitral award.
      </Tip>

      <Modal
        title="Cast Objection"
        open={modalOpen}
        tip="As the target of a slashing proposal you have the right to object the slashing"
        onClose={handleClose}
      >
        <CastObjectionForm proposal={proposal} />
      </Modal>
    </div>
  );
}

export default CastObjection;
