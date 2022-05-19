import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Button from 'components/Base/Button';

import ExpertProposalModal from './ExpertProposalModal';
import QProposalModal from './QProposalModal';
import RootProposalModal from './RootProposalModal';
import SlashingProposalModal from './SlashingProposalModal';

import { successMessageSelector } from 'store/transaction-handler/selectors';

import { PROPOSALS_TYPES } from 'constants/statuses';

const proposalTitleMap = {
  [PROPOSALS_TYPES.proposals]: 'Q Proposal',
  [PROPOSALS_TYPES.slashingProposals]: 'Q Slashing Proposal',
  [PROPOSALS_TYPES.rootNodePanel]: 'Q Root Node Panel Proposal',
  [PROPOSALS_TYPES.expertProposals]: 'Q Expert Proposal',
};

function CreateProposal ({ type }) {
  const shouldCloseModal = useSelector(successMessageSelector);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreateProposal = () => {
    setModalOpen(true);
  };

  const handleHideModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (shouldCloseModal) {
      handleHideModal();
    }
  }, [shouldCloseModal]);

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
        <span>{`Create ${proposalTitleMap[type]}`}</span>
      </Button>

      {modalMap[type]}
    </>
  );
}

export default CreateProposal;
