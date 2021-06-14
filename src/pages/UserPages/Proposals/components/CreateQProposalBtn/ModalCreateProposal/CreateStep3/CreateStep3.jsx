import React, { useCallback, useState, Fragment, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { PROPOSALS_TYPES } from 'constants/statuses';
import { formObject } from 'store/selectors/voting/proposals';
import { getParameterKeysByType } from 'store/actions/action-creaters/parameters';
import { parameterValueByKey } from 'store/selectors/parameters';
import CurrentParameterValue from 'components/Custom/ModalActions/CurrentParameterValue';

import { constUpdate } from './constants';
import FormSelect from 'components/Base/Form/FormSelect';
import FormInput from 'components/Base/Form/FormInput';

function CreateStep3(props) {
  const {
    activeTab,
    register,
    errors
  } = props;
  const dispatch = useDispatch();
  const formData = useSelector(formObject);

  const parameterByKeyValue = useSelector(parameterValueByKey);

  const [params, setParams] = useState([{
    type: '',
    key: '',
    value: ''
  }]);

  const showCommonData = (children) => {
    return (
      <div>
        <h2>Chosen data:</h2>
        <h5>Type</h5>
        <p> {formData?.first?.replace(/-/g, ' ')}</p>
        {children}
      </div>
    );
  };

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

  function setNewValue(index, key, newType) {
    const newParams = [...params];
    newParams[index][key] = newType;
    setParams(newParams);
  }

  useEffect(() => {
    if (formData[constUpdate.radioBtnName]) {
      setParams(
        formData[constUpdate.radioBtnName].reduce((types, item, index) => {
          types.push({
            type: item,
            key: formData[constUpdate.inputsObjFirst][index],
            value: formData[constUpdate.inputsObjSecond][index],
          });
          return types;
        }, [])
      );
    }
  }, []);

  const contentSwitcher = useCallback(() => {
    switch (activeTab) {
      case PROPOSALS_TYPES.proposals:
        if (formData?.first === 'emergency-update' || formData?.first === 'general-q-update') {
          return showCommonData(
            <>
              <h5>External link</h5>
              <p>{formData['external-link']}</p>
            </>
          );
        } else if (formData?.first === 'constitution-update') {
          if (formData['change-constitution-parameter'] === 'no') {
            return showCommonData(
              <>
                <h5>Classification</h5>
                <p>{formData?.classification?.replace(/-/g, ' ')}</p>
                <h5>External link</h5>
                <p>{formData['external-link']}</p>
                <h5>Hash</h5>
                <p>{formData.hash}</p>
                <h5>Change Constitution Parameter</h5>
                <p>{formData['change-constitution-parameter']}</p>
              </>
            );
          } else {
            return (
              <div>
                <h2>{constUpdate.inputTitle}</h2>
                {params.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      <h2>{constUpdate.radioBtnTitle} #{index + 1}</h2>
                      <FormSelect
                        name={`${constUpdate.radioBtnName}[${index}]`}
                        register={register}
                        palette={'dark'}
                        value={params[index].type}
                        onChange={(value) => {
                          setNewValue(index, 'type', value.target.value);
                          dispatch(getParameterKeysByType('constitution', value.target.value));
                        }}
                        ref={register({ required: 'Choose one option!' })}
                        optionValues={constUpdate.radioBtn}
                      />
                      <FormInput
                        name={`${constUpdate.inputsObjFirst}[${index}]`}
                        type="string"
                        palette={'dark'}
                        value={params[index].key}
                        placeholder={constUpdate.inputsFirst}
                        ref={register({ required: 'Field is required!' })}
                        valid={errors[constUpdate.inputsObjFirst]?.[index]?.message}
                        onChange={(value) => {
                          setNewValue(index, 'key', value.target.value);
                        }}
                      />
                      <CurrentParameterValue
                        typePanel={'constitution'}
                        typeParameter={params[index].type}
                        parameterKey={params[index].key}
                      />
                      <FormInput
                        name={`${constUpdate.inputsObjSecond}[${index}]`}
                        type="string"
                        palette={'dark'}
                        value={params[index].value}
                        placeholder={constUpdate.inputsSecond}
                        ref={register({ required: 'Field is required!' })}
                        valid={errors[constUpdate.inputsObjSecond]?.[index]?.message}
                        onChange={(value) => {
                          setNewValue(index, 'value', value.target.value);
                        }}
                      />
                    </Fragment>
                  );
                })}
                <div className="modal__text-wrp">
                  <div className="modal__text-btn"
                       onClick={() => {
                         changeTypesCapacity(1);
                       }}
                  >Add type
                  </div>
                  {
                    params.length > 1
                      ? (<div className="modal__text-btn"
                              onClick={() => {
                                changeTypesCapacity(-1);
                              }}
                      >Remove type
                      </div>)
                      : null
                  }
                </div>
              </div>

            );
          }
        }
        break;
      case PROPOSALS_TYPES.rootNodePanel:
        return showCommonData(
          <>
            <h5>External link</h5>
            <p>{formData['external-link']}</p>
            {formData.first === 'add-a-new-root-node'
              ? <>
                <h5>Hash</h5>
                <p>{formData.hash}</p>
                <h5>Remove a current Root Node</h5>
                <p>{formData['remove-current']}</p>
                {formData['remove-current'] === 'no' ? null :
                  <>
                    <h5>Root Node to Remove</h5>
                    <p>{formData.address}</p>
                  </>
                }
              </>
              : <>
                <h5>Root Node to Remove</h5>
                <p>{formData.address}</p>
                <h5>External link</h5>
                <p>{formData['external-link']}</p>
              </>
            }
          </>
        );
      case PROPOSALS_TYPES.slashingProposals :
        return showCommonData(
          <>
            <h5>Candidate to Slash</h5>
            <p>{formData.address}</p>
            <h5>Stake Amount to slash</h5>
            <p>{formData['%-value']}%</p>
            <h5>External link</h5>
            <p>{formData['external-link']}</p>
          </>
        );
      case PROPOSALS_TYPES.expertProposals:
        return showCommonData(
          <>
            <h5>Panel to add an Expert</h5>
            <p>{formData['type-proposal']?.replace(/-/g, ' ')}</p>
            <h5>External link</h5>
            <p>{formData['external-link']}</p>
            {formData?.first !== 'parameter-vote'
              ? <><h5>Candidate Q Address</h5><p>{formData.address}</p></>
              : <>
                <h5>Key-Name</h5>
                <p>{formData.key}</p>
                <h5>Type of parameter</h5>
                <p>{formData['type-value-proposal']}</p>
                <h5>Value for Parameter</h5>
                <p>{formData.value}</p>
              </>
            }
          </>
        );
      default:
        return null;
    }

  }, [activeTab, register, errors, params, parameterByKeyValue]);

  return (
    <>
      {contentSwitcher()}
    </>
  );
}

export default CreateStep3;

