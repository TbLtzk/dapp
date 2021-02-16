import React, { Fragment, useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import { setCreateObj, setStepCounter } from 'store/actions/action-creaters/auctions/modalHandler';
import { onEscrowCastObjection, onEscrowProposeDecision } from 'store/actions/action-creaters/voting/proposals';
import {
  createdStepsLimit,
  formObject,
  stepCounterModal
} from 'store/selectors/auctions/modalHandler';

import ModalWindow from 'components/Base/ModalWindow';
import CreateStep1 from './CreateStep1';
import CreateStep2 from './CreateStep2';

import { Descr, Title } from 'components/Custom/ModalActions/styles';

function ModalSlashingObjection(props) {
  const { modalShow, onHide, activeTab, contract, proposalId } = props;
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const formData = useSelector(formObject);
  const stepLimit = useSelector(createdStepsLimit);
  const stepCounter = useSelector(stepCounterModal);

  const switchContentDependsOnType = useCallback(() => {
    switch (stepCounter) {
      case 1:
        return (
          <CreateStep1
            formData={formData}
            activeTab={activeTab}
            register={register}
            errors={errors}
          />
        );
      case 2:
        return (
          <CreateStep2
            formData={formData}
            activeTab={activeTab}
            register={register}
            errors={errors}
          />
        );

      default:
        return null;
    }

  }, [activeTab, stepCounter, register, errors, stepLimit]);

  const onNext = (data) => {
    dispatch(setCreateObj({ ...formData, ...data }));
    if (stepCounter < stepLimit) {
      dispatch(setStepCounter(stepCounter + 1));
    } else {
      if (activeTab === 'cast-objection') {
        dispatch(onEscrowCastObjection({ ...formData, ...data }, contract, proposalId));
      } else if (activeTab === 'propose-decision') {
        dispatch(onEscrowProposeDecision({ ...formData, ...data }, contract, proposalId));
      }
      onHide();
    }
  };

  return (
    <>
      <ModalWindow
        show={modalShow}
        onHide={onHide}
        backBtnTitle={
          stepCounter !== 1 ? 'Back' : null
        }
        backBtnHandler={() => {
          dispatch(setStepCounter(stepCounter - 1));
        }}
        continueBtnTitle={
          stepLimit !== stepCounter ? 'Next' : 'Confirm'
        }
        continueBtnHandler={handleSubmit(onNext)}
        content={
          <>
            <Title style={{ textTransform: 'capitalize' }}>{activeTab?.replace(/-/g, ' ')}</Title>
            <Descr>Step {stepCounter} of {stepLimit}</Descr>
            <form>
              {switchContentDependsOnType()}
            </form>
          </>
        }
      />
    </>
  );
}

export default ModalSlashingObjection;

