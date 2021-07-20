import React, { useMemo } from 'react';

import { ProgressBar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { PROPOSALS_TYPES } from 'constants/statuses';
import {
  setCreateProposalObj,
  setStepCounter,
  setDisabledCreatedProposalBtn,
  createProposal
} from 'store/actions/action-creaters/voting/proposals';
import {
  formObject,
  createdStepsLimit,
  stepCounterModal,
  disabledContinueProposalBtn
} from 'store/selectors/voting/proposals';

import { useForm } from 'react-hook-form';

import ModalWindow from 'components/Base/ModalWindow';
import CreateStep1 from './CreateStep1';
import CreateStep2 from './CreateStep2';
import CreateStep3 from './CreateStep3';
import CreateStep4 from './CreateStep4';

import { arrExpert, arrQProposal, arrQProposalAdvanced, arrQRootNode, arrSlashing } from './constants';

import { mode } from 'store/selectors/dashboardMode';
import { MODE } from 'components/Base/DashboardMode/DashboarModeButton';

function ModalCreateProposal(props) {
  const {
    modalShow,
    onHide,
    activeTab,
    activeTabTitle
  } = props;
  const {
    register,
    errors,
    handleSubmit
  } = useForm();
  const dispatch = useDispatch();

  const formData = useSelector(formObject);
  const stepLimit = useSelector(createdStepsLimit);
  const stepCounter = useSelector(stepCounterModal);
  const disabledContinueBtn = useSelector(disabledContinueProposalBtn);
  const appMode = useSelector(mode)

  const radioArrFirstStep = useMemo(() => {
    switch (activeTab) {
      case PROPOSALS_TYPES.proposals:
        return appMode === MODE.advanced ? arrQProposalAdvanced : arrQProposal;
      case PROPOSALS_TYPES.rootNodePanel:
        return arrQRootNode;
      case PROPOSALS_TYPES.expertProposals:
        return arrExpert;
      case PROPOSALS_TYPES.slashingProposals:
        return arrSlashing;
      default:
        return [];
    }
  }, [activeTab]);

  const switchProposalContentDependsOnType = useMemo(() => {
    switch (stepCounter) {
      case 1:
        return (
          <CreateStep1
            formData={formData}
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
            formData={formData}
            activeTab={activeTab}
            activeTabTitle={activeTabTitle}
            register={register}
            errors={errors}
          />
        );
      case 3:
        return (
          <CreateStep3
            formData={formData}
            activeTab={activeTab}
            activeTabTitle={activeTabTitle}
            register={register}
            errors={errors}
          />
        );
      case 4:
        return (
          <CreateStep4
            formData={formData}
            activeTab={activeTab}
          />
        );
      default:
        return null;
    }

  }, [activeTab, stepCounter, register, errors, stepLimit]);

  const onNext = (data) => {
    dispatch(setCreateProposalObj({ ...formData, ...data }));
    if (stepCounter < stepLimit) {
      dispatch(setStepCounter(stepCounter + 1));
    } else {
      dispatch(createProposal({ ...formData, ...data }));
      onHide();
    }
  };

  return (
    <ModalWindow
      show={modalShow}
      onHide={onHide}
      modalTitle={activeTabTitle}
      backBtnTitle={
        stepCounter !== 1 ? 'Back' : null
      }
      backBtnHandler={() => {
        dispatch(setStepCounter(stepCounter - 1));
        dispatch(setDisabledCreatedProposalBtn(false));
      }}
      continueBtnTitle={
        stepLimit !== stepCounter ? 'Next' : 'Confirm'
      }
      disabled={disabledContinueBtn}
      continueBtnHandler={handleSubmit(onNext)}
      content={
        <>
          <ProgressBar now={((stepCounter / stepLimit) * 100).toFixed(3)}/>
          <div className="modal__steps">Step {stepCounter} of {stepLimit}</div>
          <form>
            {switchProposalContentDependsOnType}
          </form>
        </>
      }
    />
  );
}

export default ModalCreateProposal;

