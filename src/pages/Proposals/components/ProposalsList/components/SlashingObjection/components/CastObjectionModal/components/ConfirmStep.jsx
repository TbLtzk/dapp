import React from 'react';

import ModalStep from 'components/Base/ModalStep';

import { useCastObjection } from '../CastObjectionModal';

function ConfirmStep () {
  const { values, goBack, confirm } = useCastObjection();

  return (
    <ModalStep
      onConfirm={confirm}
      onBack={goBack}
    >
      <h2>Chosen Data:</h2>

      <h5>Type:</h5>
      <p>Cast Objection</p>

      <h5>External Link</h5>
      <p>{values.externalLink || '–'}</p>
    </ModalStep>
  );
}

export default ConfirmStep;
