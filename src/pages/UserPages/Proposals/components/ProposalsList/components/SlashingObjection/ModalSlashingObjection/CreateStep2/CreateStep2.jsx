import React, { useCallback } from 'react';

import { useSelector } from 'react-redux';
import { formObject } from 'store/selectors/auctions/modalHandler';

function CreateStep2(props) {
  const {
    activeTab,
    register,
    errors
  } = props;
  const formData = useSelector(formObject);

  const showCommonData = (children) => {
    return (
      <div>
        <h2>Chosen data:</h2>
        <h5>Type:</h5>
        <p>{formData?.first?.replace(/-/g, ' ')}</p>
        <h5>External link</h5>
        <p>{formData['external-link']}</p>
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
            <h5>Adjusted percentage for slashing</h5>
            <p>{formData['%-value']}</p>
            <h5>Did the target of the slashing neglect a formal appeal?</h5>
            <p>{formData['target-slashing-appeal']}</p>
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

