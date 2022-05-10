import React, { Fragment, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { ParameterType } from '@q-dev/q-js-sdk';

import FormInput from 'components/Base/Form/FormInput';
import FormSelect from 'components/Base/Form/FormSelect';
import CurrentParameterValue from 'components/Custom/ModalActions/CurrentParameterValue';
import RadioBtnGroup from 'components/Custom/ModalActions/RadioBtnGroup';

import { formObject } from 'store/voting/proposals/selectors';

import { CONTRACT_TYPES } from 'constants/contracts';
import { fieldTypes } from 'constants/fieldTypes';
import { fillArray, parameterKeyValidation, validatePattern } from 'func/useful';

function QExpertS2 ({ activeTab, register, errors, watch }) {
  const formData = useSelector(formObject);
  const [typePanel, setTypePanel] = useState(formData['type-proposal'] || null);
  const [params, setParams] = useState(formData['parameter-type']?.length || 1);

  function handleParams (value) {
    switch (value) {
      case -1: {
        setParams(params - 1);
        break;
      }
      default: {
        if (params < 100) {
          setParams(params + 1);
        }
      }
    }
  }

  function changePanel (event) {
    setTypePanel(event.target.value);
  }

  const switchContentOnTypeProposal = useCallback(() => {
    switch (formData?.first) {
      case CONTRACT_TYPES.addNewExpert:
        return (
          <>
            <h2>Nominate an Expert to add to an Expert Panel</h2>
            <h2>Select the Panel to which you want to add an Expert</h2>
            <RadioBtnGroup
              formData={formData}
              values={[
                'Q Fees & Incentives Membership Panel',
                'Q DeFi (Decentralized Finance) Membership Panel',
                'Q Root Node Selection Expert Panel'
              ]}
              register={register}
              errors={errors}
              name="type-proposal"
              handleChange={changePanel}
            />
            <FormInput
              refType={fieldTypes.address}
              name="address"
              placeholder="Address"
              label="Provide Candidate Q Address"
              error={errors.address?.message}
              register={register}
            />
            <FormInput
              refType={fieldTypes.externalLink}
              name="external-link"
              placeholder="External Link"
              label="Provide a reference link to external source"
              error={errors['external-link']?.message}
              register={register}
            />
          </>
        );
      case CONTRACT_TYPES.removeCurrentExpert:
        return (
          <>
            <h2>Nominate an Expert to Remove from an Expert Panel</h2>
            <h2>Select the Panel to which you want to remove an Expert</h2>
            <RadioBtnGroup
              formData={formData}
              values={[
                'Q Fees & Incentives Membership Panel',
                'Q DeFi (Decentralized Finance) Membership Panel',
                'Q Root Node Selection Expert Panel'
              ]}
              register={register}
              errors={errors}
              name="type-proposal"
              handleChange={changePanel}
            />
            <FormInput
              refType={fieldTypes.address}
              name="address"
              placeholder="Address"
              label="Provide Candidate Q Address"
              error={errors.address?.message}
              register={register}
            />
            <FormInput
              refType={fieldTypes.externalLink}
              name="external-link"
              placeholder="External Link"
              label="Provide a reference link to external source"
              error={errors['external-link']?.message}
              register={register}
            />
          </>
        );
      case CONTRACT_TYPES.parameterVote:
        return (
          <>
            <h2>Create a Proposal to Change a Q System Parameter.</h2>
            <h2>Select the Panel which governs the parameter</h2>
            <RadioBtnGroup
              formData={formData}
              values={[
                'Q Fees & Incentives Membership Panel',
                'Q DeFi (Decentralized Finance) Membership Panel',
                'Q Root Node Selection Expert Panel'
              ]}
              register={register}
              errors={errors}
              name="type-proposal"
              handleChange={changePanel}
            />
            <h2>Please provide exact Key-Name, Type and new Value for Parameter</h2>
            {fillArray(params).map((_, index) => (
              <Fragment key={index}>
                <h2>Choose type #{index + 1}</h2>
                <div className="modal__one-line-form" style={{ marginBottom: 0 }}>
                  <FormSelect
                    ref={register({ required: 'Choose one option!' })}
                    width="40%"
                    name={`parameter-type[${index}]`}
                    register={register}
                    palette="dark"
                    optionValues={[
                      {
                        lbl: 'Address',
                        value: ParameterType.ADDRESS
                      },
                      {
                        lbl: 'Boolean',
                        value: ParameterType.BOOL
                      },
                      {
                        lbl: 'String',
                        value: ParameterType.STRING
                      },
                      {
                        lbl: 'Uint',
                        value: ParameterType.UINT
                      }
                    ]}
                  />
                  <FormInput
                    ref={register({
                      required: 'Please, fill the field',
                      validate: (key) => parameterKeyValidation(key)
                    })}
                    name={`parameter-key[${index}]`}
                    type="string"
                    placeholder="Key"
                    error={errors['parameter-key']?.[index]?.message}
                  />
                </div>
                <FormInput
                  ref={register({
                    required: 'Please, fill the field',
                    validate: (value) =>
                      validatePattern(value, watch(`parameter-type[${index}]`))
                  })}
                  name={`parameter-value[${index}]`}
                  type="string"
                  placeholder="Value"
                  error={errors['parameter-value']?.[index]?.message}
                />

                <CurrentParameterValue
                  typeContract={typePanel}
                  parameterType={watch(`parameter-type[${index}]`)}
                  parameterKey={watch(`parameter-key[${index}]`)}
                />
              </Fragment>
            ))}
            <div className="modal__text-wrp">
              <div className="modal__text-btn" onClick={() => handleParams(1)}>
                Add Parameter
              </div>
              {params > 1
                ? (
                  <div className="modal__text-btn" onClick={() => handleParams(-1)}>
                    Remove Parameter
                  </div>
                )
                : null}
            </div>
            <FormInput
              refType={fieldTypes.externalLink}
              name="external-link"
              placeholder="External Link"
              label="Provide a reference link to external source"
              error={errors['external-link']?.message}
              register={register}
            />
          </>
        );
      default:
        return null;
    }
  }, [activeTab, register, errors, typePanel, params]);

  return <div>{switchContentOnTypeProposal()}</div>;
}

export default QExpertS2;
