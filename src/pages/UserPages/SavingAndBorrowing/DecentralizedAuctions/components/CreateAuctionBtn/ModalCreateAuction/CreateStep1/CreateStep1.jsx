import React, { useCallback, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { formObject } from 'store/selectors/auctions/modalHandler';
import { symbol } from 'store/selectors/stable-coin';

import InputGroup from 'components/Custom/ModalActions/InputGroup';
import { getEPDRUint } from 'contracts/handler/ContractsEPDR';

import { liquidation, systemDebt, systemSurplus } from './constants';

import { SubTitle } from 'components/Custom/ModalActions/styles';

function CreateStep1(props) {
  const { activeTab, register, errors } = props;

  const formData = useSelector(formObject);
  const symbolType = useSelector(symbol);
  const [surplusLot, setSurplusLot] = useState('0');
  const [reserveLot, setReserveLot] = useState('0');

  useEffect (() => {
    getEPDRUint("governed.EPDR.QUSD_surplusLot", setSurplusLot);
    getEPDRUint("governed.EPDR.reserveLot", setReserveLot);
  },[])

  const switchContentOnTypeProposal = useCallback(() => {
    switch (activeTab) {
      case 'liquidation':
        return (
          <>
            <SubTitle>{liquidation.subtitleInputUp}</SubTitle>
            <InputGroup
              formData={formData}
              inputArr={liquidation.inputPlaceholderUp}
              inputsObj={liquidation.inputUpObj}
              register={register}
              errors={errors}
            />
            <SubTitle>{liquidation.subtitleInputMiddle}</SubTitle>
            <InputGroup
              formData={formData}
              inputArr={liquidation.inputPlaceholderMiddle}
              inputsObj={liquidation.inputMiddleObj}
              register={register}
              errors={errors}
            />
            <SubTitle>{liquidation.subtitleInputDown + symbolType}</SubTitle>
            <InputGroup
              formData={formData}
              inputArr={liquidation.inputPlaceholderDown}
              inputsObj={liquidation.inputDownObj}
              register={register}
              errors={errors}
            />

          </>
        );
      case 'system-debt':
        return (
          <>
          
            <SubTitle>{systemDebt.subtitleInputUp + reserveLot + 'Q'}</SubTitle>

            <SubTitle>{systemDebt.subtitleInputDown + symbolType}</SubTitle>
            <InputGroup
              formData={formData}
              inputArr={systemDebt.inputPlaceholder}
              inputsObj={systemDebt.inputObj}
              register={register}
              errors={errors}
            />
          </>
        );
      case 'system-surplus':
        return (
          <>
            <SubTitle>{systemSurplus.subtitleInputUp + surplusLot + symbolType}</SubTitle>

            <SubTitle>{systemSurplus.subtitleInputDown}</SubTitle>
            <InputGroup
              formData={formData}
              inputArr={systemSurplus.inputPlaceholder}
              inputsObj={systemSurplus.inputObj}
              register={register}
              errors={errors}
            />
          </>
          
        );
      default:
        return null;
        
    }
  }, [activeTab, register, errors, reserveLot, surplusLot]);

  return (
    <div>
      {switchContentOnTypeProposal()}
    </div>
  );
}

export default CreateStep1;

