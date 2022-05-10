import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FormInput from 'components/Base/Form/FormInput';
import RadioBtnGroup from 'components/Custom/ModalActions/RadioBtnGroup';

import { setCreatedStepsLimit } from 'store/voting/proposals/action-creators';
import { formObject } from 'store/voting/proposals/selectors';

import { CONTRACT_TYPES } from 'constants/contracts';

function QProposalS2 ({ register, errors }) {
  const formData = useSelector(formObject);
  const dispatch = useDispatch();

  function handleChange (event) {
    if (event.target.value === 'no') {
      dispatch(setCreatedStepsLimit(3));
    } else {
      dispatch(setCreatedStepsLimit(4));
    }
  }

  switch (formData?.first) {
    case CONTRACT_TYPES.constitutionUpdate:
      return (
        <div>
          <h2>Constitution Updates change the underlying agreement upon which the Q system operates.</h2>
          <h2>Which part of the Constitution is affected</h2>
          <RadioBtnGroup
            formData={formData}
            values={['fundamental-part', 'basic-part', 'detailed-part']}
            labels={[
              'Fundamental Part \t| Preamble',
              'Basic Part \t\t\t| Main Body and Definitions',
              'Detailed Part \t\t| Selected Appendices'
            ]}
            register={register}
            errors={errors}
            name="classification"
            handleChange={() => {}}
          />
          <FormInput
            refType="hash"
            name="hash"
            placeholder="Hash"
            label="Please provide the new constitution Hash"
            error={errors.hash?.message}
            register={register}
          />
          <FormInput
            refType="external-link"
            name="external-link"
            placeholder="External Link"
            label="Provide a reference link to external source"
            error={errors['external-link']?.message}
            register={register}
          />
          <h2>Does Your Proposal include a Change of a Constitution Parameter?</h2>
          <RadioBtnGroup
            formData={formData}
            values={['No', 'Yes']}
            register={register}
            errors={errors}
            name="change-constitution-parameter"
            handleChange={handleChange}
          />
        </div>
      );
    case CONTRACT_TYPES.generalQUpdate:
    case CONTRACT_TYPES.emergencyUpdate:
      return (
        <div>
          <h2>
            {formData.first === CONTRACT_TYPES.generalQUpdate
              ? 'General Q Updates gather the Community voice on ideas how to shape Q in the future.'
              : 'Emergency Updates enable Root Nodes to agree on an immediate update for the Q system.'
            }
          </h2>
          <h4>Provide a reference link to external source</h4>
          <FormInput
            refType="external-link"
            name="external-link"
            placeholder="External Link"
            label="Provide a reference link to external source"
            error={errors['external-link']?.message}
            register={register}
          />
        </div>
      );
    default:
      return null;
  }
}

export default QProposalS2;
