import React from 'react';
import { useSelector } from 'react-redux';

import FormInput from 'components/Base/Form/FormInput';

import { formObject } from 'store/voting/proposals/selectors';

import { CONTRACT_TYPES } from 'constants/contracts';
import { fieldTypes } from 'constants/fieldTypes';

function SlashingS2 ({ register, errors, setValue }) {
  const formData = useSelector(formObject);

  switch (formData.first) {
    case CONTRACT_TYPES.rootNodeSlashing:
      return (
        <>
          <h2>Nominate a Root Node to be slashed</h2>
          <FormInput
            invertedColors
            refType={fieldTypes.address}
            name="address"
            placeholder="Address"
            label="Provide Slashing Details. Candidate to Slash"
            error={errors.address?.message}
            register={register}
          />
          <FormInput
            invertedColors
            refType={fieldTypes.percentValue}
            name="%-value"
            placeholder="%-Value"
            label="Root Node Stake Amount to slash (%)"
            error={errors['%-value']?.message}
            register={register}
            setValue={setValue}
          />
          <FormInput
            invertedColors
            refType={fieldTypes.externalLink}
            name="external-link"
            placeholder="External Link"
            label="Provide a reference link to external source"
            error={errors['external-link']?.message}
            register={register}
          />
        </>
      );
    case CONTRACT_TYPES.validatorNodeSlashing:
      return (
        <>
          <h2>Nominate a Validator Node to be slashed</h2>
          <FormInput
            invertedColors
            refType={fieldTypes.address}
            name="address"
            placeholder="Address"
            label="Provide Slashing Details. Candidate to Slash"
            error={errors.address?.message}
            register={register}
          />
          <FormInput
            invertedColors
            refType={fieldTypes.percentValue}
            name="%-value"
            placeholder="%-Value"
            label="Validator Node Stake and Pool Amount to slash (%)"
            error={errors['%-value']?.message}
            register={register}
            setValue={setValue}
          />
          <FormInput
            invertedColors
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
}

export default SlashingS2;
