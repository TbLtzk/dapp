import React, { useCallback } from 'react';

import { useSelector } from 'react-redux';
import { formObject } from 'store/selectors/voting/proposals';

import InputGroup from 'components/Custom/ModalActions/InputGroup';

import { rootSlashing, validatorSlashing } from './constants';

import { SubTitle } from 'components/Custom/ModalActions/styles';

function SlashingS2(props) {
  const { activeTab, register, errors } = props;
  const formData = useSelector(formObject);

  const switchContentOnTypeProposal = useCallback(() => {
    switch (formData?.first) {
      case 'root-node-slashing':
        return (
          <>
            <SubTitle>{rootSlashing.subtitle}</SubTitle>
            <InputGroup
              formData={formData}
              labelsArr={rootSlashing.inputTitleDescr}
              inputArr={rootSlashing.inputs}
              inputsObj={rootSlashing.inputsObj}
              register={register}
              errors={errors}
            />
            <SubTitle>{rootSlashing.inputTitleDown}</SubTitle>
            <InputGroup
              formData={formData}
              inputArr={rootSlashing.inputDown}
              inputsObj={rootSlashing.inputDownObj}
              register={register}
              errors={errors}
            />
          </>
        );
      case 'validator-node-slashing':
        return (
          <>
            <SubTitle>{validatorSlashing.subtitle}</SubTitle>
            <InputGroup
              formData={formData}
              labelsArr={validatorSlashing.inputTitleDescr}
              inputArr={validatorSlashing.inputs}
              inputsObj={validatorSlashing.inputsObj}
              register={register}
              errors={errors}
            />
            <SubTitle>{validatorSlashing.inputTitleDown}</SubTitle>
            <InputGroup
              formData={formData}
              inputArr={validatorSlashing.inputDown}
              inputsObj={validatorSlashing.inputDownObj}
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

export default SlashingS2;

