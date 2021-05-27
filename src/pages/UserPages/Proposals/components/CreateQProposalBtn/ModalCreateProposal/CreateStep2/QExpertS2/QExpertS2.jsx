import React, { useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { formObject } from 'store/selectors/voting/proposals';
import { parameterValueByKey } from 'store/selectors/parameters';
import { getParameterKeysByType } from 'store/actions/action-creaters/parameters';

import RadioBtnGroup from 'components/Custom/ModalActions/RadioBtnGroup';
import InputGroup from 'components/Custom/ModalActions/InputGroup';
import CurrentParameterValue from 'components/Custom/ModalActions/CurrentParameterValue';

import { addNewExpert, removeExpert, parameterVote } from './constants';

function QExpertS2(props) {
  const { activeTab, register, errors } = props;
  const dispatch = useDispatch();
  const formData = useSelector(formObject);

  const parameterByKeyValue = useSelector(parameterValueByKey);

  const [typePanel, setTypePanel] = useState('');
  const [typeParameter, setTypeParameter] = useState('');
  const [parameterKey, setParameterKey] = useState('');

  const switchContentOnTypeProposal = useCallback(() => {
    switch (formData?.first) {
      case 'add-a-new-expert':
        return (
          <>
            <h2>{addNewExpert.subtitle}</h2>
            <h2>{addNewExpert.radioDescr}</h2>
            <RadioBtnGroup
              formData={formData}
              radioArr={addNewExpert.radioBtn}
              register={register}
              errors={errors}
              nameArr={addNewExpert.radioBtnName}
              handleChange={(value) => {
              }}
            />
            <h4>{addNewExpert.subtitleInputUp}</h4>
            <InputGroup
              formData={formData}
              inputArr={addNewExpert.inputUp}
              inputsObj={addNewExpert.inputUpObj}
              register={register}
              errors={errors}
            />
            <h4>{addNewExpert.subtitleInputDown}</h4>
            <InputGroup
              formData={formData}
              inputArr={addNewExpert.inputDown}
              inputsObj={addNewExpert.inputDownObj}
              register={register}
              errors={errors}
            />

          </>
        );
      case 'remove-a-current-expert':
        return (
          <>
            <h2>{removeExpert.subtitle}</h2>
            <h2>{removeExpert.radioDescr}</h2>
            <RadioBtnGroup
              formData={formData}
              radioArr={removeExpert.radioBtn}
              register={register}
              errors={errors}
              nameArr={removeExpert.radioBtnName}
              handleChange={(value) => {
              }}
            />
            <h4>{removeExpert.subtitleInputUp}</h4>
            <InputGroup
              formData={formData}
              inputArr={removeExpert.inputUp}
              inputsObj={removeExpert.inputUpObj}
              register={register}
              errors={errors}
            />
            <h4>{removeExpert.subtitleInputDown}</h4>
            <InputGroup
              formData={formData}
              inputArr={removeExpert.inputDown}
              inputsObj={removeExpert.inputDownObj}
              register={register}
              errors={errors}
            />

          </>
        );
      case 'parameter-vote':
        return (
          <>
            <h2>{parameterVote.subtitle}</h2>
            <h2>{parameterVote.radioDescr}</h2>
            <RadioBtnGroup
              formData={formData}
              radioArr={parameterVote.radioBtn}
              register={register}
              errors={errors}
              nameArr={parameterVote.radioBtnName}
              handleChange={(value) => {
                setTypePanel(value.target.value);
                dispatch(getParameterKeysByType(value.target.value, typeParameter));
              }}
            />
            <h2>{parameterVote.subtitleInputUp}</h2>
            <h2>{parameterVote.radioBtnTitleDown}</h2>
            <RadioBtnGroup
              formData={formData}
              radioArr={parameterVote.radioBtnDown}
              register={register}
              errors={errors}
              nameArr={parameterVote.radioBtnNameDown}
              handleChange={(value) => {
                setTypeParameter(value.target.value);
                dispatch(getParameterKeysByType(typePanel, value.target.value));
              }}
            />
            <InputGroup
              formData={formData}
              inputArr={parameterVote.inputUp}
              labelsArr={parameterVote.labelsArr}
              inputsObj={parameterVote.inputUpObj}
              register={register}
              errors={errors}
              onChangeInput={(val) => {
                setParameterKey(val);
              }}
            />
            <CurrentParameterValue
              typePanel={typePanel}
              typeParameter={typeParameter}
              parameterKey={parameterKey}
            />
            <InputGroup
              formData={formData}
              inputArr={parameterVote.inputUpSecond}
              inputsObj={parameterVote.inputUpObjSecond}
              register={register}
              errors={errors}
              onChangeInput={(val) => {
              }}
            />
            <h4>{parameterVote.subtitleInputDown}</h4>
            <InputGroup
              formData={formData}
              inputArr={parameterVote.inputDown}
              inputsObj={parameterVote.inputDownObj}
              register={register}
              errors={errors}
            />
          </>
        );
      default:
        return null;
    }

  }, [activeTab, register, errors, typePanel, typeParameter,
    parameterKey, parameterByKeyValue]);

  return (
    <div>
      {switchContentOnTypeProposal()}
    </div>
  );
}

export default QExpertS2;

