import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  approveModalBtn
} from 'store/selectors/auctions/auctions';
import {
  bidForAuction, setApproveModalBtn
} from 'store/actions/action-creaters/auctions/auctions';
import {
  setCreateObj,
  setDisabledCreatedObjBtn,
  setStepCounter,
} from 'store/actions/action-creaters/auctions/modalHandler';
import {
  stepCounterModal,
  formObject,
  createdStepsLimit
} from 'store/selectors/auctions/modalHandler';
import { userAddressMetamask } from 'store/selectors/user-inf';

import { useForm } from 'react-hook-form';

import ModalWindow from 'components/Base/ModalWindow';
import CreateStep1 from './CreateStep1';
import CreateStep2 from './CreateStep2';

import { Title, Descr } from 'components/Custom/ModalActions/styles';
import { contractsToAddresses } from 'contracts/mapping/contract-to-address';
import { maxApproveAmount } from '../../../../../../../contracts/handler/AuctionHandler';
import { StableCoinQUSD } from 'contracts/StableCoin';
import { checkTabContract } from './constants';
import { drizzleReactHooks } from '@drizzle/react-plugin';

const { useDrizzle } = drizzleReactHooks;

function ModalBid(props) {
  const { modalShow, onHide, activeTab, inf } = props;
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { drizzle } = useDrizzle();

  const formData = useSelector(formObject);
  const stepCounter = useSelector(stepCounterModal);
  const stepLimit = useSelector(createdStepsLimit);
  const approveBtn = useSelector(approveModalBtn);
  const userAddress = useSelector(userAddressMetamask);
  const StableCoin = new StableCoinQUSD();

  const switchProposalContentDependsOnType = useCallback(() => {
    switch (stepCounter) {
      case 1:
        return (
          <CreateStep1
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

  }, [activeTab, stepCounter, register, errors, stepLimit, dispatch]);

  const onNext = async (data) => {
    dispatch(setCreateObj({ ...formData, ...data }));
    if (approveBtn) {
      console.log('data', data);
      const contractName = checkTabContract(activeTab);
      let approve = await StableCoin.approve(contractsToAddresses[contractName], maxApproveAmount, userAddress);
      dispatch(setApproveModalBtn(false));
    } else {
      if (stepCounter < stepLimit) {
        dispatch(setStepCounter(stepCounter + 1));
      } else {
        dispatch(bidForAuction({
          ...formData, ...data,
          ...inf,
        }));
        onHide();
      }
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
        dispatch(setDisabledCreatedObjBtn(false));
      }}
      continueBtnTitle={

        stepLimit !== stepCounter ?
          approveBtn ? 'Approve' : 'Next'
          : 'Confirm'
      }
      continueBtnHandler={handleSubmit(onNext)}
      content={
        <>
          <Title style={{ textTransform: 'capitalize' }}>Bid for {activeTab?.replace(/-/g, ' ')} Auction</Title>
          <Descr>Step {stepCounter} of {stepLimit}</Descr>
          <form>
            {switchProposalContentDependsOnType()}
          </form>
        </>
      }
    />
  );
}

export default ModalBid;

