import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { formObject } from 'store/selectors/auctions/modalHandler';
import { StableCoinQUSD } from 'contracts/StableCoin';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { contractsToAddresses } from 'contracts/mapping/contract-to-address';
import { setApproveModalBtn } from 'store/actions/action-creaters/auctions/auctions';
import { approveModalBtn } from 'store/selectors/auctions/auctions';

import InputGroup from 'components/Custom/ModalActions/InputGroup';

import { liquidation, systemSurplus, systemDebt } from './constants';

import { SubTitle } from 'components/Custom/ModalActions/styles';
import { checkTabContract } from '../constants';

function CreateStep1(props) {
  const { activeTab, register, errors } = props;
  const formData = useSelector(formObject);
  const userAddress = useSelector(userAddressMetamask);
  const approveBtn = useSelector(approveModalBtn);
  const dispatch = useDispatch();
  const StableCoin = new StableCoinQUSD();

  const onChangeInput = async (value) => {
    const contractName = checkTabContract(activeTab);
    let allowance = await StableCoin.allowance(userAddress, contractsToAddresses[contractName]);
    console.log('allowance', allowance);
    if (Number(value) > allowance) {
      dispatch(setApproveModalBtn(true));
    } else {
      dispatch(setApproveModalBtn(false));
    }
  };

  const showData = (data) => {
    return (
      <>
        <SubTitle>{data.subtitleInput}</SubTitle>
        <InputGroup
          onChangeInput={onChangeInput}
          formData={formData}
          inputArr={data.inputPlaceholder}
          inputsObj={data.inputObj}
          register={register}
          errors={errors}
        />
      </>
    );
  };

  const switchContentOnTypeProposal = useCallback(() => {
    switch (activeTab) {
      case 'liquidation':
        return showData(liquidation);
      case 'system-debt':
        return showData(systemDebt);
      case 'system-surplus':
        return showData(systemSurplus);
      default:
        return null;
    }
  }, [activeTab, register, errors]);

  return (
    <div>
      {switchContentOnTypeProposal()}
    </div>
  );
}

export default CreateStep1;

