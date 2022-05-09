import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import FormInput from 'components/Base/Form/FormInput';
import RadioBtnGroup from 'components/Custom/ModalActions/RadioBtnGroup';

import { formObject } from 'store/voting/proposals/selectors';

import { CONTRACT_TYPES } from 'constants/contracts';

function QRootNodeS2 ({ register, errors }) {
  const formData = useSelector(formObject);
  const [showAddress, setShowAddress] = useState(formData['remove-current'] === 'yes');

  function handleChange (event) {
    if (event.target.value === 'no') {
      setShowAddress(false);
    } else {
      setShowAddress(true);
    }
  }

  switch (formData?.first) {
    case CONTRACT_TYPES.addAnewRootNode:
      return (
        <>
          <h2>Add Your account as a Candidate for the Root Node Panel. Optionally provide a Root Node to Remove.</h2>
          <FormInput
            refType="hash"
            name="hash"
            placeholder="Hash"
            label="Provide current constitution Hash to declare your consent"
            valid={errors.hash?.message}
            register={register}
          />
          <FormInput
            refType="external-link"
            name="external-link"
            placeholder="External Link"
            label="Provide a reference link to external source"
            valid={errors['external-link']?.message}
            register={register}
          />
          <h2>Do you want to remove a current Root Node</h2>
          <RadioBtnGroup
            formData={formData}
            values={['No', 'Yes']}
            register={register}
            errors={errors}
            name="remove-current"
            handleChange={handleChange}
          />
          {!showAddress
            ? null
            : (
              <FormInput
                refType="address"
                name="address"
                placeholder="Address"
                label="Root Node to Remove"
                valid={errors.address?.message}
                register={register}
              />
            )}
        </>
      );
    case CONTRACT_TYPES.removeACurrentRootNode:
      return (
        <>
          <h2>Nominate a Root Node to Remove</h2>
          <FormInput
            refType="address"
            name="address"
            placeholder="Address"
            label="Root Node to Remove"
            valid={errors.address?.message}
            register={register}
          />
          <FormInput
            refType="external-link"
            name="external-link"
            placeholder="External Link"
            label="Provide a reference link to external source"
            valid={errors['external-link']?.message}
            register={register}
          />
        </>
      );
    default:
      return null;
  }
}

export default QRootNodeS2;
