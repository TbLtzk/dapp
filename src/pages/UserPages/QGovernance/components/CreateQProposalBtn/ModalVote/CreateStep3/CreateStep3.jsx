import React, { useCallback, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { formVoteObject } from 'store/selectors/voting/proposals';
import {
  SummarText,
  SummarTextType,
  SubTitle,
  Warning
} from 'components/Custom/ModalActions/styles';

function CreateStep3(props) {
  const { activeTab, register, errors, proposalContract } = props;
  const formData = useSelector(formVoteObject);

  const showCommonData = (answer) => {
    return (
      <div>
        <SubTitle>Chosen data:</SubTitle>
        <SummarText>Type:
          <SummarTextType> {formData?.first?.replace(/-/g, ' ')}</SummarTextType>
        </SummarText>
        <SummarText>Answer: {answer}</SummarText>
        {proposalContract === 'ConstitutionVoting' || proposalContract === 'GeneralUpdateVoting' ||
        proposalContract === 'EPDR_MembershipVoting' || proposalContract === 'EPQFI_MembershipVoting' ||
        proposalContract === 'RootsVoting' ?
          <Warning>Notice: Your currently locked amount of Q inside the Q Vault will be extended until the end of
            this proposal.</Warning>
          : null
        }
      </div>
    );
  };

  const contentSwitcher = useCallback(() => {
    switch (formData?.first) {
      case 'basic-vote-on-proposal':
        return showCommonData(formData['vote-proposal']);
      case 'constitution-check':
        return showCommonData(formData['constitution-check']);
      case 'q-community-veto':
        return showCommonData(formData?.veto);
      default:
        return null;
    }

  }, [activeTab, register, errors]);

  return (
    <>
      {contentSwitcher()}
    </>
  );
}

export default CreateStep3;

