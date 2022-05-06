import React from 'react';
import { useSelector } from 'react-redux';

import { slashingTypes } from '../CreateStep1/constants';

import { formObject } from 'store/modal-handler/selectors';

function CreateStep2 ({ activeTab }) {
  const formData = useSelector(formObject);

  const showCommonData = (children) => (
    <div>
      <h2>Chosen Data:</h2>
      <h5>Type:</h5>
      <p className="text-capitalize">
        {formData?.first?.replace(/-/g, ' ')}
      </p>
      {children}
    </div>
  );

  switch (activeTab) {
    case slashingTypes.castObjection:
      return showCommonData(
        <>
          <h5>External Link</h5>
          <p>{formData['external-link'] || '–'}</p>
        </>
      );
    case slashingTypes.proposerRemark:
      return showCommonData(
        <>
          <h5>Proposer Remark</h5>
          <p>{formData['proposer-remark']}</p>
        </>
      );
    case slashingTypes.proposeDecision:
      return showCommonData(
        <>
          <h5>External Link</h5>
          <p>{formData['external-link']}</p>
          <h5>Adjusted Percentage for Slashing</h5>
          <p>{formData['%-value']}</p>
          <h5>Did the Target of the Slashing Neglect a Formal Appeal?</h5>
          <p>{formData['target-slashing-appeal']}</p>
        </>
      );
  }
}

export default CreateStep2;
