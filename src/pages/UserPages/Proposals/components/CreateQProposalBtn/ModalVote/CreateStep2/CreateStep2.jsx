import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { votingLockingEnd } from 'store/selectors/q-piggy-bank';
import { formVoteObject } from 'store/selectors/voting/proposals';

import RadioBtnGroup from 'components/Custom/ModalActions/RadioBtnGroup';

import { basicVote, constitutionCheck, communityVeto } from './constants';

function CreateStep2(props) {
  const {
    activeTab,
    register,
    errors
  } = props;
  const formData = useSelector(formVoteObject);
  const userLockingEnd = useSelector(votingLockingEnd);
  const dispatch = useDispatch();

  const contentSwitcher = useCallback(() => {
    switch (formData?.first) {
      case 'basic-vote-on-proposal':
        return (
          <>
            <h2>{basicVote.subtitle}</h2>
            <h2>{basicVote.radioBtnDescr}</h2>
            <RadioBtnGroup
              formData={formData}
              radioArr={basicVote.radioBtn}
              register={register}
              errors={errors}
              nameArr={basicVote.radioBtnName}
              handleChange={(value) => {
              }}
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
              radioArr={constitutionCheck.radioBtn}
              register={register}
              errors={errors}
              nameArr={constitutionCheck.radioBtnName}
              handleChange={(value) => {
              }}
            />
          </>
        );
      case 'q-community-veto':
        return (
          <>
            <h2>{communityVeto.subtitle}</h2>
            <h2>{communityVeto.radioBtnDescr}</h2>
            <RadioBtnGroup
              formData={formData}
              radioArr={communityVeto.radioBtn}
              register={register}
              errors={errors}
              nameArr={communityVeto.radioBtnName}
              handleChange={(value) => {
              }}
            />
          </>
        );
      default:
        return null;
    }

  }, [activeTab, register, errors, userLockingEnd, dispatch]);

  return (
    <>
      {contentSwitcher()}
    </>
  );
}

export default CreateStep2;

