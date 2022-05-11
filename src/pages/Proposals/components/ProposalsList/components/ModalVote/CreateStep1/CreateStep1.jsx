import React from 'react';
import { useSelector } from 'react-redux';

import RadioBtnGroup from 'components/Custom/ModalActions/RadioBtnGroup';

import { formVoteObject } from 'store/voting/proposals/selectors';

function CreateStep1 ({ register, errors }) {
  const formData = useSelector(formVoteObject);

  switch (formData?.first) {
    case 'basic-vote-on-proposal':
      return (
        <>
          <h2>Provide a vote for a proposal</h2>
          <h2>Do you vote YES or NO for this proposal?</h2>
          <RadioBtnGroup
            formData={formData}
            values={['No', 'Yes']}
            register={register}
            errors={errors}
            name="vote-proposal"
          />
        </>
      );
    case 'constitution-check':
      return (
        <>
          <h2>Only Root Node Eligible</h2>
          <h2>Do you consider this proposal breaches constitution?</h2>
          <RadioBtnGroup
            formData={formData}
            values={['Yes']}
            register={register}
            errors={errors}
            name="constitution-check"
          />
        </>
      );

    default:
      return null;
  }
}

export default CreateStep1;
