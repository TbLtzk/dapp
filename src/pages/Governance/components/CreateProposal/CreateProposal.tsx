import { useState } from 'react';

import { ProposalType } from 'typings/proposals';
import Button from 'ui/Button';
import Icon from 'ui/Icon';

import ExpertProposalModal from './ExpertProposalModal';
import QProposalModal from './QProposalModal';
import RootProposalModal from './RootProposalModal';
import SlashingProposalModal from './SlashingProposalModal';

type CreateProposalType = Exclude<ProposalType, 'contractUpdate'>

function CreateProposal ({ type }: { type: CreateProposalType }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreateProposal = () => {
    setModalOpen(true);
  };

  const handleHideModal = () => {
    setModalOpen(false);
  };

  const modalProps = { modalOpen, onHide: handleHideModal };
  const modalMap = {
    q: <QProposalModal {...modalProps} />,
    rootNode: <RootProposalModal {...modalProps} />,
    slashing: <SlashingProposalModal {...modalProps} />,
    expert: <ExpertProposalModal {...modalProps} />,
  };

  return (
    <>
      <Button onClick={handleCreateProposal}>
        <Icon name="add" />
        <span>Create proposal</span>
      </Button>

      {modalMap[type]}
    </>
  );
}

export default CreateProposal;
