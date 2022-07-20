import { useState } from 'react';
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
  const userAddress = useSelector(userAddressMetamask);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => {
    setModalOpen(false);
  };

  useMetamaskReset(formTypes.proposerRemark, handleClose);

  return (
    <div className="block">
      <div className="block__header">
        <h2 className="text-h2">Objection</h2>

        {proposal.proposer === userAddress && (
          <Button
            compact
            look="secondary"
            onClick={() => setModalOpen(true)}
          >
            Confirm appeal
          </Button>
        )}
      </div>

      <div className="block__content">
        <ObjectionDetails proposal={proposal} />
      </div>

      <Modal
        open={modalOpen}
        title="Confirm Appeal"
        tip="As the slashing proposer you confirm that the slashed node has initiated a court appeal to receive an arbitral award"
        onClose={handleClose}
      >
        <ProposerRemarkForm proposal={proposal} />
      </Modal>
    </div>
  );
}

export default ProposalObjection;
