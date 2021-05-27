import React, { useMemo, useState } from 'react';

import { useDispatch } from 'react-redux';
import { PROPOSALS_TYPES } from 'constants/statuses';
import {
  setCreatedStepsLimit,
  setCreateProposalObj,
  setStepCounter
} from 'store/actions/action-creaters/voting/proposals';
import { getParameterValueByKeySuccess } from 'store/actions/action-creaters/parameters';

import ModalCreateProposal from './ModalCreateProposal';
import Button from 'components/Base/Buttons/Button';

import { QExpert, QProposal, QRootNode, QSlashing } from './constants';

function CreateQProposalBtn(props) {
  const { activeTab } = props;
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();

  const activeTabTitle = useMemo(() => {
    switch (activeTab) {
      case PROPOSALS_TYPES.proposals:
        return QProposal;
      case PROPOSALS_TYPES.rootNodePanel:
        return QRootNode;
      case PROPOSALS_TYPES.expertProposals:
        return QExpert;
      case PROPOSALS_TYPES.slashingProposals:
        return QSlashing;
      default:
        return QProposal;
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
        return QProposal;
    }
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
        onHide={() => {
          setModalShow(false);
          dispatch(setCreateProposalObj({}));
          dispatch(getParameterValueByKeySuccess(''));
        }}
      />
    </>

  );
}

export default CreateQProposalBtn;

