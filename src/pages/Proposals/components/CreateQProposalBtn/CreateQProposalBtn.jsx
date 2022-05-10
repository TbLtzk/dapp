import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'components/Base/Buttons/Button';

import ModalCreateProposal from './ModalCreateProposal';

import { successMessageSelector } from 'store/transaction-handler/selectors';
import { setCreatedStepsLimit, setCreateProposalObj, setStepCounter } from 'store/voting/proposals/action-creators';

import { PROPOSALS_TYPES } from 'constants/statuses';

function CreateQProposalBtn ({ activeTab }) {
  const dispatch = useDispatch();
  const shouldCloseModal = useSelector(successMessageSelector);

  const [modalShow, setModalShow] = useState(false);

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

  const onCreateProposal = () => {
    dispatch(setStepCounter(1));
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
    setModalShow(true);
  };

  const onHide = () => {
    setModalShow(false);
    dispatch(setCreateProposalObj({}));
  };

  useEffect(() => {
    if (shouldCloseModal) {
      onHide();
    }
  }, [shouldCloseModal]);

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
