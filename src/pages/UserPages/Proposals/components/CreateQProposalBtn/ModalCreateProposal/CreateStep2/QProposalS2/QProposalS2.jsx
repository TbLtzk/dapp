import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { formObject } from 'store/selectors/voting/proposals';
import { setCreatedStepsLimit } from 'store/actions/action-creaters/voting/proposals';

import RadioBtnGroup from 'components/Custom/ModalActions/RadioBtnGroup';
import InputGroup from 'components/Custom/ModalActions/InputGroup';

import { constUpdate, generalUpdate, emergencyUpdate } from './constants';

import { Descr } from 'components/Custom/ModalActions/styles';
import { removeRootNode } from '../QRootNodeS2/constants';

function QProposalS2(props) {
  const {
    activeTab,
    register,
    errors
  } = props;
  const formData = useSelector(formObject);

  const dispatch = useDispatch();

  const switchContentOnTypeProposal = useCallback(() => {
    switch (formData?.first) {
      case 'constitution-update':
        return (
          <>
            <h2>{constUpdate.subtitle}</h2>
            <h2>{constUpdate.radioBtnUpTitle}</h2>
            <RadioBtnGroup
              formData={formData}
              radioArr={constUpdate.radioBtnUp}
              register={register}
              errors={errors}
              nameArr="classification"
              handleChange={() => {
              }}
            />
            <InputGroup
              labelsArr={constUpdate.inputTitle}
              formData={formData}
              inputArr={constUpdate.inputs}
              inputsObj={constUpdate.inputsObj}
              register={register}
              errors={errors}
            />
            <h2>{constUpdate.radioBtnDownTitle}</h2>
            <RadioBtnGroup
              formData={formData}
              radioArr={constUpdate.radioBtnDown}
              register={register}
              errors={errors}
              nameArr={constUpdate.radioBtnDownName}
              handleChange={(value) => {
                value.target.value === 'no'
                  ? dispatch(setCreatedStepsLimit(3))
                  : dispatch(setCreatedStepsLimit(4));
              }}
            />
          </>
        );
      case 'general-q-update':
      case 'emergency-update':
        return (
          <>
            <h2>
              {formData.first === 'general-q-update'
                ? generalUpdate.subtitle
                : emergencyUpdate.subtitle
              }
            </h2>
            <h4>{generalUpdate.inputTitleDescr}</h4>
            <InputGroup
              formData={formData}
              inputArr={generalUpdate.inputs}
              inputsObj={generalUpdate.inputsObj}
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

export default QProposalS2;

