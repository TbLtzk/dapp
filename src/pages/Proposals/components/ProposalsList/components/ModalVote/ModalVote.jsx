import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import ModalWindow from 'components/Base/ModalWindow';

import CreateStep1 from './CreateStep1';
import CreateStep2 from './CreateStep2';

import {
  setDisabledCreatedProposalBtn,
  setStepVoteCounter,
  setVoteProposalObj,
  voteForProposal
} from 'store/voting/proposals/action-creators';
import { formVoteObject, stepVoteCounterModal } from 'store/voting/proposals/selectors';

function ModalVote ({ modalShow, onHide, proposalId, proposalContract, vetoEndTime, proposalStatus }) {
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const formData = useSelector(formVoteObject);
  const stepCounter = useSelector(stepVoteCounterModal);
  const stepLimit = 2;
  const checkTitleName = proposalStatus === 'Pending' ? 'Vote' : 'Veto';

  const switchProposalContentDependsOnType = () => {
    switch (stepCounter) {
      case 1:
        return (
          <CreateStep1
            proposalContract={proposalContract}
            vetoEndTime={vetoEndTime}
            formData={formData}
            register={register}
            errors={errors}
          />
        );
      case 2:
        return (
          <CreateStep2
            formData={formData}
            register={register}
            errors={errors}
            proposalContract={proposalContract}
          />
        );
      default:
        return null;
    }
  };

  const backBtnHandler = () => {
    dispatch(setStepVoteCounter(stepCounter - 1));
    dispatch(setDisabledCreatedProposalBtn(false));
  };

  const onNext = (data) => {
    dispatch(setVoteProposalObj({ ...formData, ...data }));
    if (stepCounter < stepLimit) {
      dispatch(setStepVoteCounter(stepCounter + 1));
    } else {
      dispatch(
        voteForProposal({
          ...formData,
          ...data,
          idProposal: proposalId,
          contract: proposalContract
        })
      );
      onHide();
    }
  };

  const content = (
    <>
      <ProgressBar now={((stepCounter / stepLimit) * 100).toFixed(3)} />
      <div className="modal__steps">
                Step {stepCounter} of {stepLimit}
      </div>
      <form>{switchProposalContentDependsOnType()}</form>
    </>
  );
  return (
    <ModalWindow
      show={modalShow}
      backBtnTitle={stepCounter !== 1 ? 'Back' : null}
      backBtnHandler={backBtnHandler}
      continueBtnTitle={stepLimit !== stepCounter ? 'Next' : 'Confirm'}
      modalTitle={`${checkTitleName} for proposal`}
      continueBtnHandler={handleSubmit(onNext)}
      content={content}
      onHide={onHide}
    />
  );
}

export default ModalVote;
