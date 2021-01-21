import React, { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { formObject } from 'store/selectors/auctions/modalHandler';

import { SubTitle, SummarText, SummarTextType } from 'components/Custom/ModalActions/styles';

function CreateStep2(props) {
  const { activeTab, register, errors } = props;
  const formData = useSelector(formObject);

  const contentSwitcher = useCallback(() => {
    return (
      <div>
        <SubTitle>Chosen data:</SubTitle>
        <SummarText>Type:
          <SummarTextType> {formData?.first?.replace(/-/g, ' ')}</SummarTextType>
        </SummarText>
        <SummarText>Bid: {formData?.bid}</SummarText>
      </div>
    );
  }, [activeTab, register, errors]);

  return (
    <>
      {contentSwitcher()}
    </>
  );
}

export default CreateStep2;

