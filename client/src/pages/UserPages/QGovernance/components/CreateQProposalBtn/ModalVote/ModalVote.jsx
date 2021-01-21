import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { drizzleReactHooks } from '@drizzle/react-plugin';
import { useDispatch, useSelector } from 'react-redux';
import {
  setVoteProposalObj,
  setDisabledCreatedProposalBtn,
  setStepVoteCounter,
  voteForProposal
} from 'store/actions/action-creaters/voting/proposals';
import {
  stepVoteCounterModal,
  formVoteObject,
  disabledContinueProposalBtn
} from 'store/selectors/voting/proposals';
import { votingLockingEnd } from 'store/selectors/q-piggy-bank';

import { useForm } from 'react-hook-form';

import ModalWindow from 'components/Base/ModalWindow';
import CreateStep1 from './CreateStep1';
import CreateStep2 from './CreateStep2';
import CreateStep3 from './CreateStep3';

import { Title, Descr } from 'components/Custom/ModalActions/styles';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { getLockedAssets } from 'store/actions/action-creaters/q-piggy-bank';

const { useDrizzle } = drizzleReactHooks;

function ModalVote(props) {
  const { modalShow, onHide, activeTab, proposalId, proposalContract, vetoEndTime } = props;
  const { drizzle } = useDrizzle();
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const formData = useSelector(formVoteObject);
  const stepCounter = useSelector(stepVoteCounterModal);
  const stepLimit = 3;
  const disabledContinueBtn = useSelector(disabledContinueProposalBtn);
  const userLockingEnd = useSelector(votingLockingEnd);
  const userAddressL = useSelector(userAddressMetamask);

  useEffect(() => {
    dispatch(getLockedAssets(userAddressL));
  }, [dispatch, userAddressL]);

  const switchProposalContentDependsOnType = useCallback(() => {
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
            proposalContract={proposalContract}
            vetoEndTime={vetoEndTime}
            formData={formData}
            activeTab={activeTab}
            register={register}
            errors={errors}
          />
        );
      case 3:
        return (
          <CreateStep3
            formData={formData}
            activeTab={activeTab}
            register={register}
            errors={errors}
          />
        );
      default:
        return null;
    }

  }, [activeTab, stepCounter, register, errors, stepLimit, dispatch]);

  const onNext = (data) => {
    console.log('dataVote', { ...formData, ...data });
    if (formData?.first === 'basic-vote-on-proposal') {
      console.log('proposalContract', proposalContract);
      if (proposalContract === 'ConstitutionVoting' || proposalContract === 'GeneralUpdateVoting'
        || proposalContract === 'RootsVoting' || proposalContract === 'EPDR_MembershipVoting'
        || proposalContract === 'EPQFI_MembershipVoting') {
        if (vetoEndTime >= userLockingEnd) {
          dispatch(setDisabledCreatedProposalBtn(true));
        }
      }
    }
    dispatch(setVoteProposalObj({ ...formData, ...data }));
    if (stepCounter < stepLimit) {
      dispatch(setStepVoteCounter(stepCounter + 1));
    } else {
      console.log('formData check', formData);
      if (formData['constitution-check'] !== 'no') {
        dispatch(voteForProposal(drizzle, {
          ...formData, ...data,
          idProposal: proposalId,
          contract: proposalContract
        }));
      }
      console.log('result data', {
        ...formData, ...data,
        idProposal: proposalId,
        contract: proposalContract
      });
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
        dispatch(setStepVoteCounter(stepCounter - 1));
        dispatch(setDisabledCreatedProposalBtn(false));
      }}
      continueBtnTitle={
        stepLimit !== stepCounter ? 'Next' : 'Confirm'
      }
      disabled={disabledContinueBtn}
      continueBtnHandler={handleSubmit(onNext)}
      content={
        <>
          <Title style={{ textTransform: 'capitalize' }}>Vote for Proposal</Title>
          <Descr>Step {stepCounter} of {stepLimit}</Descr>
          <form>
            {switchProposalContentDependsOnType()}
          </form>
        </>
      }
    />
  );
}

export default ModalVote;

