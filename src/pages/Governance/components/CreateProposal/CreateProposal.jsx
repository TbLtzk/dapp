import { useState } from 'react';

import Button from 'components/Base/Button';

import ExpertProposalModal from './ExpertProposalModal';
import QProposalModal from './QProposalModal';
import RootProposalModal from './RootProposalModal';
import SlashingProposalModal from './SlashingProposalModal';

import { PROPOSALS_TYPES } from 'constants/statuses';

function CreateProposal ({ type }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreateProposal = () => {
    setModalOpen(true);
  };

  const handleHideModal = () => {
    setModalOpen(false);
  };

  const proposalTitleMap = {
    [PROPOSALS_TYPES.proposals]: 'Create Q Proposal',
    [PROPOSALS_TYPES.slashingProposals]: 'Create Q Slashing Proposal',
    [PROPOSALS_TYPES.rootNodePanel]: 'Create Q Root Node Panel Proposal',
    [PROPOSALS_TYPES.expertProposals]: 'Create Q Expert Proposal',
  };

  const modalProps = { modalOpen, onHide: handleHideModal };
  const modalMap = {
    [PROPOSALS_TYPES.proposals]: <QProposalModal {...modalProps} />,
    [PROPOSALS_TYPES.rootNodePanel]: <RootProposalModal {...modalProps} />,
    [PROPOSALS_TYPES.slashingProposals]: <SlashingProposalModal {...modalProps} />,
    [PROPOSALS_TYPES.expertProposals]: <ExpertProposalModal {...modalProps} />,
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
