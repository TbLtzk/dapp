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
        {children}
        <SummarText>Bid: {formData['bid']}</SummarText>
      </div>
    );
  };

  const contentSwitcher = useCallback(() => {
    switch (activeTab) {
      case 'liquidation':
        return showCommonData(
          <>
            <SummarText style={{ marginBottom: 0 }}>Address of vault holder, which shall be liquidated:</SummarText>
            <SummarText>{formData.address}</SummarText>
            <SummarText>The Vault ID to be liquidated: {formData['vault-id']}</SummarText>
          </>
        );
      case 'system-debt' :
        return showCommonData(<></>);
      case 'system-surplus':
        return showCommonData(<></>);
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

