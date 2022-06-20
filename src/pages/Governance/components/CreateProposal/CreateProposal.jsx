import { useState } from 'react';

import Button from 'components/Base/Button';

import ExpertProposalModal from './ExpertProposalModal';
import QProposalModal from './QProposalModal';
import RootProposalModal from './RootProposalModal';
import SlashingProposalModal from './SlashingProposalModal';

function CreateProposal ({ type }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreateProposal = () => {
    setModalOpen(true);
  };

  const handleHideModal = () => {
    setModalOpen(false);
  };

  const proposalTitleMap = {
    q: 'Create Q Proposal',
    slashing: 'Create Q Slashing Proposal',
    rootNode: 'Create Q Root Node Panel Proposal',
    expert: 'Create Q Expert Proposal',
  };

  const modalProps = { modalOpen, onHide: handleHideModal };
  const modalMap = {
    q: <QProposalModal {...modalProps} />,
    slashing: <RootProposalModal {...modalProps} />,
    rootNode: <SlashingProposalModal {...modalProps} />,
    expert: <ExpertProposalModal {...modalProps} />,
  };

  return (
    <>
      <Button onClick={handleCreateProposal}>
        <i className="mdi mdi-plus-circle-outline" />
        <span>{proposalTitleMap[type]}</span>
      </Button>

      {modalMap[type]}
    </>
  );
}

export default CreateProposal;
