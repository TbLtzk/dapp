import React, { useCallback } from 'react';

import { useSelector } from 'react-redux';
import { formObject } from 'store/selectors/auctions/modalHandler';
import { symbol } from 'store/selectors/stable-coin';

import InputGroup from 'components/Custom/ModalActions/InputGroup';

import { liquidation, systemDebt, systemSurplus } from './constants';

import { SubTitle } from 'components/Custom/ModalActions/styles';

function CreateStep1(props) {
  const { activeTab, register, errors } = props;

  const formData = useSelector(formObject);
  const symbolType = useSelector(symbol);

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
            <SubTitle>{systemDebt.subtitleInput + symbolType}</SubTitle>
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
            <SubTitle>{systemSurplus.subtitleInput}</SubTitle>
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
  }, [activeTab, register, errors]);

  return (
    <div>
      {switchContentOnTypeProposal()}
    </div>
  );
}

export default CreateStep1;

