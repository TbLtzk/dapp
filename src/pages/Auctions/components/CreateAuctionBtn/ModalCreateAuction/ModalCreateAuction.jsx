import React, { useCallback, useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import ModalWindow from 'components/Base/ModalWindow';

import CreateStep1 from './CreateStep1';
import CreateStep2 from './CreateStep2';

import { setCreateObj, setStepCounter } from 'store//modal-handler/action-creators';
import { createAuction } from 'store/auctions/action-creators';
import { createdStepsLimit, formObject, stepCounterModal } from 'store/modal-handler/selectors';

import { fields } from 'constants/fieldsNaming';

function ModalCreateAuction ({ modalShow, onHide, activeTab }) {
  const dispatch = useDispatch();

  const formData = useSelector(formObject);
  const stepLimit = useSelector(createdStepsLimit);
  const stepCounter = useSelector(stepCounterModal);

  const { register, errors, handleSubmit, setValue } = useForm({
    mode: 'onChange'
  });

  useEffect(() => {
    Object.values(fields).forEach((value) => {
      if (formData[value]) {
        setValue(value, formData[value]);
      }
    });
  }, [stepCounter]);

  const onNext = (data) => {
    dispatch(setCreateObj({ ...formData, ...data }));
    if (stepCounter < stepLimit) {
      dispatch(setStepCounter(stepCounter + 1));
    } else {
      dispatch(createAuction({ ...formData, ...data }));
      onHide();
    }
  };

  const backBtnHandler = () => {
    dispatch(setStepCounter(stepCounter - 1));
  };

  const modalTitle = 'Create ' + activeTab?.replace(/-/g, ' ') + ' auction';
  const backBtnTitle = stepCounter !== 1 ? 'Back' : null;
  const continueBtnTitle = stepLimit !== stepCounter ? 'Next' : 'Confirm';

  const switchContentDependsOnType = useCallback(() => {
    switch (stepCounter) {
      case 1:
        return <CreateStep1
          activeTab={activeTab}
          register={register}
          errors={errors}
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
  }, [activeTab, stepCounter, register, errors, stepLimit]);

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
      modalTitle={modalTitle}
      backBtnTitle={backBtnTitle}
      backBtnHandler={backBtnHandler}
      continueBtnTitle={continueBtnTitle}
      continueBtnHandler={handleSubmit(onNext)}
      content={content}
      onHide={onHide}
    />
  );
}

export default ModalCreateAuction;
