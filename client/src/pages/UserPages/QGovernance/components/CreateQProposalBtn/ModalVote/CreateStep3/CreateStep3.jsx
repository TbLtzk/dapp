import React, { useCallback, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { formVoteObject } from 'store/selectors/voting/proposals';
import { SubTitle } from 'pages/UserPages/QGovernance/components/CreateQProposalBtn/ModalVote/styles';
import {
  SummarText,
  SummarTextType,
} from 'pages/UserPages/QGovernance/components/CreateQProposalBtn/ModalCreateProposal/styles';

function CreateStep3(props) {
  const { activeTab, register, errors } = props;
  const formData = useSelector(formVoteObject);

  const showCommonData = (answer) => {
    return (
      <div>
        <SubTitle>Chosen data:</SubTitle>
        <SummarText>Type:
          <SummarTextType> {formData?.first?.replace(/-/g, ' ')}</SummarTextType>
        </SummarText>
        <SummarText>Answer: {answer}</SummarText>
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

