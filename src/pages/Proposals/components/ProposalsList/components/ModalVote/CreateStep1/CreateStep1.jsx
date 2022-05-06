import React from 'react';
import { useSelector } from 'react-redux';

import RadioBtnGroup from 'components/Custom/ModalActions/RadioBtnGroup';

import { basicVote, constitutionCheck } from './constants';

import { formVoteObject } from 'store/voting/proposals/selectors';

function CreateStep1 ({ register, errors }) {
  const formData = useSelector(formVoteObject);

  switch (formData?.first) {
    case 'basic-vote-on-proposal':
      return (
        <>
          <h2>{basicVote.subtitle}</h2>
          <h2>{basicVote.radioBtnDescr}</h2>
          <RadioBtnGroup
            formData={formData}
            values={basicVote.radioBtn}
            register={register}
            errors={errors}
            name={basicVote.radioBtnName}
            handleChange={(value) => {}}
          />
        </>
      );
    case 'constitution-check':
      return (
        <>
          <h2>{constitutionCheck.subtitle}</h2>
          <h2>{constitutionCheck.radioBtnDescr}</h2>
          <RadioBtnGroup
            formData={formData}
            values={constitutionCheck.radioBtn}
            register={register}
            errors={errors}
            name={constitutionCheck.radioBtnName}
            handleChange={(value) => {}}
          />
        </>
      );

    default:
      return null;
  }
}

export default CreateStep1;
