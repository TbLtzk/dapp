import React, { useEffect } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { MODE } from 'components/Base/DashboardMode/DashboardMode';
import ModalWindow from 'components/Base/ModalWindow';

import CreateStep1 from './CreateStep1';
import CreateStep2 from './CreateStep2';
import CreateStep3 from './CreateStep3';
import CreateStep4 from './CreateStep4';

import { mode } from 'store/dashboard-mode/selectors';
import {
  createProposal,
  setCreateProposalObj,
  setDisabledCreatedProposalBtn,
  setStepCounter
} from 'store/voting/proposals/action-creators';
import {
  createdStepsLimit,
  disabledContinueProposalBtn,
  formObject,
  stepCounterModal
} from 'store/voting/proposals/selectors';

import { fieldTypes } from 'constants/fieldTypes';
import { PROPOSALS_TYPES } from 'constants/statuses';

function ModalCreateProposal ({ modalShow, onHide, activeTab, activeTabTitle }) {
  const dispatch = useDispatch();

  const formData = useSelector(formObject);
  const stepLimit = useSelector(createdStepsLimit);
  const stepCounter = useSelector(stepCounterModal);
  const disabledContinueBtn = useSelector(disabledContinueProposalBtn);
  const appMode = useSelector(mode);

  const { register, errors, handleSubmit, setValue, watch } = useForm({
    mode: 'onChange'
  });

  const radioArrFirstStepObject = {
    [PROPOSALS_TYPES.proposals]: appMode === MODE.advanced
      ? ['Constitution Update', 'General Q Update', 'Emergency Update']
      : ['Constitution Update', 'General Q Update'],
    [PROPOSALS_TYPES.rootNodePanel]: ['Add a new Root Node', 'Remove a current Root Node'],
    [PROPOSALS_TYPES.expertProposals]: ['Add a new Expert', 'Remove a current Expert', 'Parameter Vote'],
    [PROPOSALS_TYPES.slashingProposals]: ['Root Node Slashing', 'Validator Node Slashing']
  };

  useEffect(() => {
    Object.values(fieldTypes).forEach((value) => {
      if (formData[value]) {
        setValue(value, formData[value]);
      }
    });
    if (formData?.first === 'parameter-vote' || formData['change-constitution-parameter'] === 'yes') {
      const paramLength = formData['parameter-type']?.length;
      if (paramLength) {
        formData['parameter-type'].forEach((type, index) => {
          setValue(`${'parameter-key'}[${index}]`, formData['parameter-key'][index]);
          setValue(
            `${'parameter-value'}[${index}]`,
            formData['parameter-value'][index]
          );
          setValue(`${'parameter-type'}[${index}]`, type);
        });
      }
    }
  }, [stepCounter, formData]);

  const radioArrFirstStep = radioArrFirstStepObject[activeTab];

  function backBtnHandler () {
    dispatch(setStepCounter(stepCounter - 1));
    dispatch(setDisabledCreatedProposalBtn(false));
  }

  function onNext (data) {
    dispatch(setCreateProposalObj({ ...formData, ...data }));
    if (stepCounter < stepLimit) {
      dispatch(setStepCounter(stepCounter + 1));
    } else {
      dispatch(createProposal({ ...formData, ...data }));
    }
  }

  const switchProposalContentDependsOnType = () => {
    switch (stepCounter) {
      case 1:
        return (
          <CreateStep1
            activeTab={activeTab}
            activeTabTitle={activeTabTitle}
            register={register}
            errors={errors}
            radioArr={radioArrFirstStep}
          />
        );
      case 2:
        return (
          <CreateStep2
            watch={watch}
            activeTab={activeTab}
            activeTabTitle={activeTabTitle}
            register={register}
            setValue={setValue}
            errors={errors}
          />
        );
      case 3:
        return (
          <CreateStep3
            watch={watch}
            activeTab={activeTab}
            activeTabTitle={activeTabTitle}
            register={register}
            errors={errors}
          />
        );
      case 4:
        return <CreateStep4 />;
      default:
        return null;
    }
  };

  const backBtnTitle = stepCounter !== 1 ? 'Back' : null;
  const continueBtnTitle = stepLimit !== stepCounter ? 'Next' : 'Confirm';
  const content = (
    <>
      <ProgressBar now={((stepCounter / stepLimit) * 100).toFixed(3)} />
      <div className="modal__steps">
        Step {stepCounter} of {stepLimit}
      </div>
      <form onSubmit={e => e.preventDefault()}>
        {switchProposalContentDependsOnType()}
      </form>
    </>
  );

  return (
    <ModalWindow
      show={modalShow}
      modalTitle={activeTabTitle}
      backBtnTitle={backBtnTitle}
      backBtnHandler={backBtnHandler}
      content={content}
      continueBtnTitle={continueBtnTitle}
      disabled={disabledContinueBtn}
      continueBtnHandler={handleSubmit(onNext)}
      onHide={onHide}
    />
  );
}

export default ModalCreateProposal;
