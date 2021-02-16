import React, { useCallback } from 'react';

import { useSelector } from 'react-redux';
import { formObject } from 'store/selectors/auctions/modalHandler';

import { SubTitle, SummarText, SummarTextType } from 'components/Custom/ModalActions/styles';

function CreateStep2(props) {
  const { activeTab, register, errors } = props;
  const formData = useSelector(formObject);

  const showCommonData = (children) => {
    return (
      <div>
        <SubTitle>Chosen data:</SubTitle>
        <SummarText>Type:
          <SummarTextType> {formData?.first?.replace(/-/g, ' ')}</SummarTextType>
        </SummarText>
        <SummarText>External link: {formData['external-link']}</SummarText>
        {children}

      </div>
    );
  };

  const contentSwitcher = useCallback(() => {
    switch (activeTab) {
      case 'cast-objection':
        return showCommonData(<></>);
      case 'propose-decision' :
        return showCommonData(
          <>
            <SummarText>Adjusted percentage for slashing: {formData['%-value']}</SummarText>
            <SummarText>Did the target of the slashing appeal? {formData['target-slashing-appeal']}</SummarText>
          </>
        );
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

export default CreateStep2;

