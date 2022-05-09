import React, { useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import ModalWindow from 'components/Base/ModalWindow';

import CreateStep1 from './CreateStep1';
import CreateStep2 from './CreateStep2';

import { setCreateObj, setStepCounter } from 'store/modal-handler/action-creators';
import { createdStepsLimit, formObject, stepCounterModal } from 'store/modal-handler/selectors';
import { setVoteProposalObj } from 'store/voting/proposals/action-creators';
import {
  onEscrowCastObjection,
  onEscrowProposeDecision,
  onEscrowProposerRemark
} from 'store/voting/slashing-proposals/action-creators';

import { CONTRACTS_NAMES } from 'constants/contracts';
import { fields } from 'constants/fieldsNaming';
import { slashingTypes } from 'constants/slashingTypes';

function ModalSlashingObjection ({ modalShow, onHide, activeTab, contract, proposalId }) {
  const dispatch = useDispatch();

  const formData = useSelector(formObject);
  const stepLimit = useSelector(createdStepsLimit);
  const stepCounter = useSelector(stepCounterModal);

  const contractName =
        contract === CONTRACTS_NAMES.validatorsSlashingVoting
          ? CONTRACTS_NAMES.validatorsSlashingEscrow
          : CONTRACTS_NAMES.rootNodesSlashingEscrow;

  const { register, errors, handleSubmit, setValue } = useForm({ mode: 'onChange' });

  useEffect(() => {
    Object.values(fields).forEach((value) => {
      if (formData[value]) {
        setValue(value, formData[value]);
      }
    });
  }, [stepCounter]);

  function onNext (data) {
    dispatch(setCreateObj({ ...formData, ...data }));
    if (stepCounter < stepLimit) {
      dispatch(setStepCounter(stepCounter + 1));
    } else {
      dispatch(setVoteProposalObj({ contractName, id: proposalId }));
      switch (activeTab) {
        case slashingTypes.castObjection: {
          dispatch(onEscrowCastObjection({ ...formData, ...data }, contractName, proposalId));
          break;
        }
        case slashingTypes.proposeDecision: {
          dispatch(onEscrowProposeDecision({ ...formData, ...data }, contractName, proposalId));
          break;
        }
        case slashingTypes.proposerRemark: {
          dispatch(onEscrowProposerRemark({ ...formData, ...data }, contractName, proposalId));
          break;
        }
      }
      onHide();
    }
  }

  function backBtnHandler () {
    dispatch(setStepCounter(stepCounter - 1));
  }

  function switchContentDependsOnType () {
    switch (stepCounter) {
      case 1:
        return <CreateStep1
          activeTab={activeTab}
          register={register}
          errors={errors}
          setValue={setValue}
        />;
      case 2:
        return <CreateStep2
          activeTab={activeTab}
          register={register}
          errors={errors}
        />;

      default:
        return null;
    }
  }

  const continueBtnTitle = stepLimit !== stepCounter ? 'Next' : 'Confirm';
  const modalTitle = activeTab?.replace(/-/g, ' ').charAt(0).toUpperCase() + activeTab?.replace(/-/g, ' ').slice(1);
  const backBtnTitle = stepCounter !== 1 ? 'Back' : null;

  const content = (
    <>
      <ProgressBar now={((stepCounter / stepLimit) * 100).toFixed(3)} />
      <div className="modal__steps">
        Step {stepCounter} of {stepLimit}
      </div>
      <form>{switchContentDependsOnType()}</form>
    </>
  );

  return (
    <ModalWindow
      show={modalShow}
      backBtnTitle={backBtnTitle}
      backBtnHandler={backBtnHandler}
      continueBtnTitle={continueBtnTitle}
      continueBtnHandler={handleSubmit(onNext)}
      modalTitle={modalTitle}
      content={content}
      onHide={onHide}
    />
  );
}

export default ModalSlashingObjection;
