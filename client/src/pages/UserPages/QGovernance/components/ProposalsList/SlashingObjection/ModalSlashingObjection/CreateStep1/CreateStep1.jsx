import React, { useCallback } from 'react';

import { useSelector } from 'react-redux';
import { formObject } from 'store/selectors/auctions/modalHandler';

import InputGroup from 'components/Custom/ModalActions/InputGroup';
import RadioBtnGroup from 'components/Custom/ModalActions/RadioBtnGroup';

import { castObjection, proposeDecision } from './constants';
import { Descr, SubTitle } from 'components/Custom/ModalActions/styles';

function CreateStep1(props) {
  const { activeTab, register, errors } = props;

  const formData = useSelector(formObject);

  const switchContentOnTypeProposal = useCallback(() => {
    switch (activeTab) {
      case 'cast-objection':
        return (
          <>
            <SubTitle>{castObjection.subtitleOne}</SubTitle>
            <Descr>{castObjection.subtitleTwo}</Descr>
            <InputGroup
              formData={formData}
              inputArr={castObjection.inputPlaceholderUp}
              inputsObj={castObjection.inputUpObj}
              register={register}
              errors={errors}
            />
          </>
        );
      case 'propose-decision':
        return (
          <>
            <SubTitle>{proposeDecision.subtitleOne}</SubTitle>
            <Descr>{proposeDecision.subtitleTwo}</Descr>
            <InputGroup
              formData={formData}
              inputArr={proposeDecision.inputPlaceholder}
              inputsObj={proposeDecision.inputObj}
              register={register}
              errors={errors}
            />
            <Descr>{proposeDecision.inputLabelTwo}</Descr>
            <InputGroup
              formData={formData}
              inputArr={proposeDecision.inputPlaceholderTwo}
              inputsObj={proposeDecision.inputObjTwo}
              register={register}
              errors={errors}
            />
            <Descr>{proposeDecision.radioLabel}</Descr>
            <RadioBtnGroup
              formData={formData}
              radioArr={proposeDecision.radioBtn}
              register={register}
              errors={errors}
              nameArr={proposeDecision.radioName}
              handleChange={(value) => {
              }}
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

