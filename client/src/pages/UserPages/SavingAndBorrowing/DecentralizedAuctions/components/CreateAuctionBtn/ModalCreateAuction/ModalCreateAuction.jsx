import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  setCreateObj,
  setStepCounter,
} from 'store/actions/action-creaters/auctions/modalHandler';
import { createAuction } from 'store/actions/action-creaters/auctions/auctions';
import {
  formObject,
  createdStepsLimit,
  stepCounterModal,
} from 'store/selectors/auctions/modalHandler';

import { useForm } from 'react-hook-form';

import ModalWindow from 'components/Base/ModalWindow';
import CreateStep1 from './CreateStep1';
import CreateStep2 from './CreateStep2';

import { Title, Descr } from 'components/Custom/ModalActions/styles';

function ModalCreateAuction(props) {
  const { modalShow, onHide, activeTab } = props;
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
      dispatch(createAuction({ ...formData, ...data }));
      onHide();
    }
  };

  return (
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
          <Title style={{ textTransform: 'capitalize' }}>Create {activeTab?.replace(/-/g, ' ')} Auction</Title>
          <Descr>Step {stepCounter} of {stepLimit}</Descr>
          <form>
            {switchContentDependsOnType()}
          </form>
        </>
      }
    />
  );
}

export default ModalCreateAuction;

