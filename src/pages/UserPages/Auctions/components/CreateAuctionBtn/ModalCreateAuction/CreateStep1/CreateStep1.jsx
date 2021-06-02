import React, { useCallback } from 'react';

import { useSelector } from 'react-redux';
import { formObject } from 'store/selectors/auctions/modalHandler';
import { symbol } from 'store/selectors/stable-coin';

import InputGroup from 'components/Custom/ModalActions/InputGroup';

import { liquidation, systemDebt, systemSurplus } from './constants';
import { AUCTIONS_TYPES } from 'constants/statuses';

function CreateStep1(props) {
  const {
    activeTab,
    register,
    errors
  } = props;

  const formData = useSelector(formObject);
  const symbolType = useSelector(symbol);

  const switchContentOnTypeProposal = useCallback(() => {
    switch (activeTab) {
      case AUCTIONS_TYPES.liquidation:
        return (
          <>
            <h4>{liquidation.subtitleInputUp}</h4>
            <InputGroup
              formData={formData}
              inputArr={liquidation.inputPlaceholderUp}
              inputsObj={liquidation.inputUpObj}
              register={register}
              errors={errors}
            />
            <h4>{liquidation.subtitleInputMiddle}</h4>
            <InputGroup
              formData={formData}
              inputArr={liquidation.inputPlaceholderMiddle}
              inputsObj={liquidation.inputMiddleObj}
              register={register}
              errors={errors}
            />
            <h4>{liquidation.subtitleInputDown + symbolType}</h4>
            <InputGroup
              formData={formData}
              inputArr={liquidation.inputPlaceholderDown}
              inputsObj={liquidation.inputDownObj}
              register={register}
              errors={errors}
            />

          </>
        );
      case AUCTIONS_TYPES.systemDebt:
        return (
          <>
            <h4>{systemDebt.subtitleInput + symbolType}</h4>
            <InputGroup
              formData={formData}
              inputArr={systemDebt.inputPlaceholder}
              inputsObj={systemDebt.inputObj}
              register={register}
              errors={errors}
            />
          </>
        );
      case AUCTIONS_TYPES.systemSurplus:
        return (
          <>
            <h4>{systemSurplus.subtitleInput}</h4>
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

