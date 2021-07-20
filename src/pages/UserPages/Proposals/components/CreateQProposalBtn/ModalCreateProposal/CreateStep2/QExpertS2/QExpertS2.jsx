import React, { Fragment, useCallback, useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { formObject } from 'store/selectors/voting/proposals';
import { parameterValueByKey } from 'store/selectors/parameters';
import { getParameterKeysByType } from 'store/actions/action-creaters/parameters';

import RadioBtnGroup from 'components/Custom/ModalActions/RadioBtnGroup';
import InputGroup from 'components/Custom/ModalActions/InputGroup';
import CurrentParameterValue from 'components/Custom/ModalActions/CurrentParameterValue';

import { addNewExpert, removeExpert, parameterVote } from './constants';
import FormSelect from 'components/Base/Form/FormSelect';
import FormInput from 'components/Base/Form/FormInput';

function QExpertS2(props) {
  const {
    activeTab,
    register,
    errors
  } = props;
  const dispatch = useDispatch();
  const formData = useSelector(formObject);

  const parameterByKeyValue = useSelector(parameterValueByKey);

  const [typePanel, setTypePanel] = useState('');
  const [parameterKey, setParameterKey] = useState('');

  const [params, setParams] = useState([{
    type: '',
    key: '',
    value: ''
  }]);

  function setNewValue(index, key, newType) {
    const newParams = [...params];
    newParams[index][key] = newType;
    setParams(newParams);
  }

  function changeTypesCapacity(action) {
    let newCapacity = 0;
    switch (action) {
      case -1:
        if (params.length - 1 < 1) return;
        const newParams = [...params];
        newParams.pop();
        setParams(newParams);
        break;
      case 1:
        if (newCapacity > 100) return;
        setParams([
          ...params,
          {
            type: '',
            key: '',
            value: ''
          }
        ]);
        break;
    }
  }

  function changePanel(panelType) {
    setTypePanel(panelType);
    params.forEach(item => {
      if (item.type) dispatch(getParameterKeysByType(panelType, item.type));
    });
  }

  useEffect(() => {
    if (formData?.first === 'parameter-vote') {
      let key = parameterVote.parameterType;

      if (formData[key]) {
        setParams(
          formData[key].reduce((types, item, index) => {
            types.push({
              type: item,
              key: formData[parameterVote.parameterKey][index],
              value: formData[parameterVote.parameterValue][index],
            });
            return types;
          }, [])
        );
      }
    }
  }, []);

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
                changePanel(value.target.value);
              }}
            />
            <h2>{parameterVote.subtitleInputUp}</h2>
            {params.map((item, index) => {
              return (
                <Fragment key={index}>
                  <h2>{parameterVote.radioBtnTitleDown} #{index + 1}</h2>
                  <div className="modal__one-line-form" style={{ marginBottom: 0 }}>
                    <FormSelect
                      width="40%"
                      name={`${parameterVote.parameterType}[${index}]`}
                      register={register}
                      palette={'dark'}
                      value={params[index].type}
                      onChange={(value) => {
                        setNewValue(index, 'type', value.target.value);
                        dispatch(getParameterKeysByType(typePanel, value.target.value));
                      }}
                      ref={register({ required: 'Choose one option!' })}
                      optionValues={parameterVote.radioBtnDown}
                    />
                    <FormInput
                      name={`${parameterVote.parameterKey}[${index}]`}
                      type="string"
                      palette={'dark'}
                      value={params[index].key}
                      placeholder={parameterVote.labelsArr}
                      ref={register({ required: 'Field is required!' })}
                      valid={errors[parameterVote.parameterKey]?.[index]?.message}
                      onChange={(value) => {
                        setNewValue(index, 'key', value.target.value);
                      }}
                    />
                  </div>
                  <FormInput
                    name={`${parameterVote.parameterValue}[${index}]`}
                    type="string"
                    palette={'dark'}
                    value={params[index].value}
                    placeholder={parameterVote.inputUpSecond}
                    ref={register({ required: 'Field is required!' })}
                    valid={errors[parameterVote.parameterValue]?.[index]?.message}
                    onChange={(value) => {
                      setNewValue(index, 'value', value.target.value);
                    }}
                  />
                  <CurrentParameterValue
                    typePanel={typePanel}
                    typeParameter={params[index].type}
                    parameterKey={params[index].key}
                  />
                </Fragment>
              );
            })}
            <div className="modal__text-wrp">
              <div className="modal__text-btn"
                   onClick={() => {
                     changeTypesCapacity(1);
                   }}
              >Add parameter
              </div>
              {
                params.length > 1
                  ? (<div className="modal__text-btn"
                          onClick={() => {
                            changeTypesCapacity(-1);
                          }}
                  >Remove parameter
                  </div>)
                  : null
              }
            </div>


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

  }, [activeTab, register, errors, typePanel, parameterKey, parameterByKeyValue, params]);

  return (
    <div>
      {switchContentOnTypeProposal()}
    </div>
  );
}

export default QExpertS2;

