import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { formObject } from 'store/selectors/auctions/modalHandler';
import { StableCoinQUSD } from 'contracts/src/StableCoin';
import { userAddressMetamask } from 'store/selectors/user-inf';
import { contractsToAddresses } from 'contracts/mapping/contract-to-address';
import { setApproveModalBtn } from 'store/actions/action-creaters/auctions/auctions';
import { approveModalBtn } from 'store/selectors/auctions/auctions';

import { AUCTIONS_TYPES } from 'constants/statuses';

import InputGroup from 'components/Custom/ModalActions/InputGroup';

import { liquidation, systemSurplus, systemDebt } from './constants';

import { checkTabContract } from '../constants';
import { symbol } from 'store/selectors/stable-coin';

function CreateStep1(props) {
  const { activeTab, register, errors } = props;
  const formData = useSelector(formObject);
  const userAddress = useSelector(userAddressMetamask);
  const approveBtn = useSelector(approveModalBtn);
  const dispatch = useDispatch();
  const StableCoin = new StableCoinQUSD();
  const symbolType = useSelector(symbol);

  const onChangeInput = async (value) => {
    const contractName = checkTabContract(activeTab);
    let allowance = await StableCoin.allowance(userAddress, contractsToAddresses[contractName]);
    if (Number(value) > allowance) {
      dispatch(setApproveModalBtn(true));
    } else {
      dispatch(setApproveModalBtn(false));
    }
  };

  const showData = (data, symbol) => {
    return (
      <>
        <h4>{data.subtitleInput + symbol}</h4>
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
      case AUCTIONS_TYPES.liquidation:
        return showData(liquidation, symbolType);
      case AUCTIONS_TYPES.systemDebt:
        return showData(systemDebt, symbolType);
      case AUCTIONS_TYPES.systemSurplus:
        return showData(systemSurplus, null);
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

