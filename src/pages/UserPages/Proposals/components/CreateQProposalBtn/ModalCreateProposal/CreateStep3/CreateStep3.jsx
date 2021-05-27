import React, { useCallback, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { PROPOSALS_TYPES } from 'constants/statuses';
import { formObject } from 'store/selectors/voting/proposals';
import { getParameterKeysByType } from 'store/actions/action-creaters/parameters';
import { parameterValueByKey } from 'store/selectors/parameters';
import CurrentParameterValue from 'components/Custom/ModalActions/CurrentParameterValue';

import InputGroup from 'components/Custom/ModalActions/InputGroup';
import RadioBtnGroup from 'components/Custom/ModalActions/RadioBtnGroup';

import { constUpdate } from './constants';

function CreateStep3(props) {
  const {
    activeTab,
    register,
    errors
  } = props;
  const dispatch = useDispatch();
  const formData = useSelector(formObject);

  const parameterByKeyValue = useSelector(parameterValueByKey);

  const [typeParameter, setTypeParameter] = useState('');
  const [parameterKey, setParameterKey] = useState('');

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
                <h2>{constUpdate.radioBtnTitle}</h2>
                <RadioBtnGroup
                  formData={formData}
                  radioArr={constUpdate.radioBtn}
                  register={register}
                  errors={errors}
                  nameArr={constUpdate.radioBtnName}
                  handleChange={(value) => {
                    setTypeParameter(value.target.value);
                    dispatch(getParameterKeysByType('constitution', value.target.value));
                  }}
                />
                <InputGroup
                  formData={formData}
                  inputArr={constUpdate.inputsFirst}
                  inputsObj={constUpdate.inputsObjFirst}
                  register={register}
                  errors={errors}
                  onChangeInput={(val) => {
                    setParameterKey(val);
                  }}
                />
                <CurrentParameterValue
                  typePanel={'constitution'}
                  typeParameter={typeParameter}
                  parameterKey={parameterKey}
                />
                <InputGroup
                  formData={formData}
                  inputArr={constUpdate.inputsSecond}
                  inputsObj={constUpdate.inputsObjSecond}
                  register={register}
                  errors={errors}
                  onChangeInput={(val) => {
                  }}
                />
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

  }, [activeTab, register, errors, typeParameter, parameterKey,
    parameterByKeyValue]);

  return (
    <>
      {contentSwitcher()}
    </>
  );
}

export default CreateStep3;

