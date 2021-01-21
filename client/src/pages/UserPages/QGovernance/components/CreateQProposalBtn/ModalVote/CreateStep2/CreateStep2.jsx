import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { votingLockingEnd } from 'store/selectors/q-piggy-bank';
import { formVoteObject } from 'store/selectors/voting/proposals';

import RadioBtnGroup from 'components/Custom/ModalActions/RadioBtnGroup';

import { fromSolDateFormattingT1 } from 'func/date';
import { basicVote, constitutionCheck, communityVeto } from './constants';

import { SubTitle, Descr, Warning } from 'components/Custom/ModalActions/styles';

function CreateStep2(props) {
  const { activeTab, register, errors, proposalContract, vetoEndTime } = props;
  const formData = useSelector(formVoteObject);
  const userLockingEnd = useSelector(votingLockingEnd);
  const dispatch = useDispatch();

  const contentSwitcher = useCallback(() => {
    switch (formData?.first) {
      case 'basic-vote-on-proposal':
        // const userAddressL = useSelector(userAddressMetamask);
        // dispatch(getLockedAssets(userAddressL));
        let warning = null;
        if (proposalContract === 'ConstitutionVoting' || proposalContract === 'GeneralUpdateVoting'
          || proposalContract === 'RootsVoting' || proposalContract === 'EPDR_MembershipVoting'
          || proposalContract === 'EPQFI_MembershipVoting') {
          if (vetoEndTime >= userLockingEnd) {
            warning = `You can\`t vote because Voting Locking End
                        - ${fromSolDateFormattingT1(userLockingEnd)} is less than
                        Veto End Time - ${fromSolDateFormattingT1(vetoEndTime)}`;
          }
        }
        return (
          <>
            <SubTitle>{basicVote.subtitle}</SubTitle>
            <Descr>{basicVote.radioBtnDescr}</Descr>
            <RadioBtnGroup
              formData={formData}
              radioArr={basicVote.radioBtn}
              register={register}
              errors={errors}
              nameArr={basicVote.radioBtnName}
              handleChange={(value) => {
              }}
            />
            {warning ? <Warning>{warning}</Warning> : null}
          </>
        );
      case 'constitution-check':
        return (
          <>
            <SubTitle>{constitutionCheck.subtitle}</SubTitle>
            <Descr>{constitutionCheck.radioBtnDescr}</Descr>
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
            <SubTitle>{communityVeto.subtitle}</SubTitle>
            <Descr>{communityVeto.radioBtnDescr}</Descr>
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

