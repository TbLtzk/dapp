import React, { useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { formObject } from 'store/selectors/voting/proposals';
import { parameterValueByKey } from 'store/selectors/parameters';
import { getParameterValueByKey } from 'store/actions/action-creaters/parameters';

import RadioBtnGroup from 'components/Custom/ModalActions/RadioBtnGroup';
import InputGroup from 'components/Custom/ModalActions/InputGroup';
import InputGroupParameter from 'components/Custom/ModalActions/InputGroupParameter';

import { addNewExpert, removeExpert, parameterVote } from './constants';

import { SubTitle, Descr } from 'components/Custom/ModalActions/styles';

function QExpertS2(props) {
  const { activeTab, register, errors } = props;
  const dispatch = useDispatch();
  const formData = useSelector(formObject);

  const parameterByKeyValue = useSelector(parameterValueByKey);
  const [parameterValue, setParameterValue] = useState(parameterByKeyValue);

  const [typePanel, setTypePanel] = useState('');
  const [typeParameter, setTypeParameter] = useState('');
  const [parameterKey, setParameterKey] = useState('');
  console.log('parameterValue', parameterValue);

  useEffect(() => {
    if (formData?.first === 'parameter-vote') {
      console.log('parameterValue in ', parameterValue);
      console.log('formData in ', formData?.value);
      setParameterValue(parameterByKeyValue);
    }

  }, [parameterByKeyValue, typePanel, typeParameter, parameterKey, formData]);

  const switchContentOnTypeProposal = useCallback(() => {
    switch (formData?.first) {
      case 'add-a-new-expert':
        return (
          <>
            <SubTitle>{addNewExpert.subtitle}</SubTitle>
            <Descr>{addNewExpert.radioDescr}</Descr>
            <RadioBtnGroup
              formData={formData}
              radioArr={addNewExpert.radioBtn}
              register={register}
              errors={errors}
              nameArr={addNewExpert.radioBtnName}
              handleChange={(value) => {
              }}
            />
            <SubTitle>{addNewExpert.subtitleInputUp}</SubTitle>
            <InputGroup
              formData={formData}
              inputArr={addNewExpert.inputUp}
              inputsObj={addNewExpert.inputUpObj}
              register={register}
              errors={errors}
            />
            <SubTitle>{addNewExpert.subtitleInputDown}</SubTitle>
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
            <SubTitle>{removeExpert.subtitle}</SubTitle>
            <Descr>{removeExpert.radioDescr}</Descr>
            <RadioBtnGroup
              formData={formData}
              radioArr={removeExpert.radioBtn}
              register={register}
              errors={errors}
              nameArr={removeExpert.radioBtnName}
              handleChange={(value) => {
              }}
            />
            <SubTitle>{removeExpert.subtitleInputUp}</SubTitle>
            <InputGroup
              formData={formData}
              inputArr={removeExpert.inputUp}
              inputsObj={removeExpert.inputUpObj}
              register={register}
              errors={errors}
            />
            <SubTitle>{removeExpert.subtitleInputDown}</SubTitle>
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
            <SubTitle>{parameterVote.subtitle}</SubTitle>
            <Descr>{parameterVote.radioDescr}</Descr>
            <RadioBtnGroup
              formData={formData}
              radioArr={parameterVote.radioBtn}
              register={register}
              errors={errors}
              nameArr={parameterVote.radioBtnName}
              handleChange={(value) => {
                console.log('setTypePanel', value.target.value);
                setTypePanel(value.target.value);
              }}
            />
            <SubTitle>{parameterVote.subtitleInputUp}</SubTitle>
            <SubTitle>{parameterVote.radioBtnTitleDown}</SubTitle>
            <RadioBtnGroup
              formData={formData}
              radioArr={parameterVote.radioBtnDown}
              register={register}
              errors={errors}
              nameArr={parameterVote.radioBtnNameDown}
              handleChange={(value) => {
                console.log('setTypeParameter', value.target.value);
                setTypeParameter(value.target.value);
                dispatch(getParameterValueByKey(typePanel, value.target.value, parameterKey));
              }}
            />
            <InputGroup
              formData={formData}
              inputArr={parameterVote.inputUp}
              inputsObj={parameterVote.inputUpObj}
              register={register}
              errors={errors}
              onChangeInput={(val) => {
                console.log('setParameterKey', val);
                setParameterKey(val);
                dispatch(getParameterValueByKey(typePanel, typeParameter, val));
              }}
            />
            <SubTitle>{parameterVote.subtitleUpSecond}</SubTitle>
            <InputGroupParameter
              formData={formData}
              inputArr={parameterVote.inputUpSecond}
              inputsObj={parameterVote.inputUpObjSecond}
              register={register}
              value={parameterValue}
              errors={errors}
              onChangeInput={(val) => {
                console.log('val', val);
                // console.log('parameterValue', parameterValue);
                setParameterValue(val);
                // console.log('setTypePanel', typePanel);
                // console.log('setTypeParameter', typeParameter);
                // console.log('setParameterKey', parameterKey);

              }}
            />
            <SubTitle>{parameterVote.subtitleInputDown}</SubTitle>
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

  }, [activeTab, register, errors, typePanel, typeParameter, parameterKey,
    parameterValue, parameterByKeyValue]);

  return (
    <div>
      {switchContentOnTypeProposal()}
    </div>
  );
}

export default QExpertS2;

