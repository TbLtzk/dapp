import React from 'react';

import ModalStep from 'components/Base/ModalStep';

import { useProposeDecision } from '../ProposeDecisionModal';

function ConfirmStep () {
  const { values, goBack, confirm } = useProposeDecision();

  return (
    <ModalStep
      onConfirm={confirm}
      onBack={goBack}
    >
      <h2>Chosen Data:</h2>

      <h5>Type:</h5>
      <p>Propose Decision</p>

      <h5>External Link</h5>
      <p>{values.externalLink}</p>

      <h5>Adjusted Percentage for Slashing</h5>
      <p>{values.percentage}</p>

      <h5>Did the Target of the Slashing Neglect a Formal Appeal?</h5>
      <p>{values.isAppealNeglected ? 'Yes' : 'No'}</p>
    </ModalStep>
  );
}

export default ConfirmStep;
