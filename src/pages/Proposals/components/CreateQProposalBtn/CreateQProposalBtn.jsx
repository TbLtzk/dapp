import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from 'components/Base/Buttons/Button';

import ModalCreateProposal from './ModalCreateProposal';

import { setCreatedStepsLimit, setCreateProposalObj, setStepCounter } from 'store/voting/proposals/action-creators';

import { PROPOSALS_TYPES } from 'constants/statuses';

function CreateQProposalBtn ({ activeTab }) {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();

  const activeTabTitle = useMemo(() => {
    switch (activeTab) {
      case PROPOSALS_TYPES.rootNodePanel:
        return 'Q Root Node Panel Proposal';
      case PROPOSALS_TYPES.expertProposals:
        return 'Q Expert Proposal';
      case PROPOSALS_TYPES.slashingProposals:
        return 'Q Slashing Proposal';
      case PROPOSALS_TYPES.proposals:
      default:
        return 'Q Proposal';
    }
  }, [activeTab]);

  const onCreateProposal = async () => {
    dispatch(setStepCounter(1));
    setModalShow(true);
    switch (activeTab) {
      case PROPOSALS_TYPES.proposals:
        dispatch(setCreatedStepsLimit(4));
        break;
      case PROPOSALS_TYPES.rootNodePanel:
        dispatch(setCreatedStepsLimit(3));
        break;
      case PROPOSALS_TYPES.expertProposals:
        dispatch(setCreatedStepsLimit(3));
        break;
      case PROPOSALS_TYPES.slashingProposals:
        dispatch(setCreatedStepsLimit(3));
        break;
      default:
        break;
    }
  };

  const onHide = () => {
    setModalShow(false);
    dispatch(setCreateProposalObj({}));
  };

  return (
    <>
      <Button
        icon="plus-circle-outline"
        handleButton={onCreateProposal}
        title={`Create ${activeTabTitle}`}
      />
      <ModalCreateProposal
        activeTab={activeTab}
        activeTabTitle={activeTabTitle}
        modalShow={modalShow}
        onHide={onHide}
      />
    </>
  );
}

export default CreateQProposalBtn;
