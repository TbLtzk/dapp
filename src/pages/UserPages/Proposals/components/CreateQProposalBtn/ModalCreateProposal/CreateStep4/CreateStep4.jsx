import React, { useCallback } from 'react';

import { useSelector } from 'react-redux';
import { formObject } from 'store/selectors/voting/proposals';
import { PROPOSALS_TYPES } from 'constants/statuses';

function CreateStep4(props) {
  const { activeTab } = props;
  const formData = useSelector(formObject);

  const contentSwitcher = useCallback(() => {
    switch (activeTab) {
      case PROPOSALS_TYPES.proposals:
        if (formData['change-constitution-parameter'] === 'yes') {
          return (
            <div>
              <h2>Chosen data</h2>
              <h5>Type</h5>
              <p>{formData?.first?.replace(/-/g, ' ')}</p>
              <h5>Classification</h5>
              <p>{formData?.classification?.replace(/-/g, ' ')}</p>
              <h5>External link</h5>
              <p>{formData['external-link']}</p>
              <h5>Hash</h5>
              <p>{formData.hash}</p>
              <h5>Change Constitution Parameter</h5>
              <p>{formData['change-constitution-parameter']}</p>
              <h5>Parameter key</h5>
              <p>{formData['parameter-key']}</p>
              <h5>Type Proposal</h5>
              <p>{formData['type-proposal']}</p>
              <h5>Value</h5>
              <p>{formData['value']}</p>
            </div>
          );
        }
        break;
      default:
        return null;
    }

  }, [activeTab]);

  return (
    <>
      {contentSwitcher()}
    </>
  );
}

export default CreateStep4;

