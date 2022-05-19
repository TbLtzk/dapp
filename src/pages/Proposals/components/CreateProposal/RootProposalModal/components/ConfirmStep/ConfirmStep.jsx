import React from 'react';

import ModalStep from 'components/Base/ModalStep';

import { useCreateProposal } from '../../RootProposalModal';

function ConfirmStep () {
  const { values, confirm, goBack } = useCreateProposal();

  return (
    <ModalStep
      onConfirm={confirm}
      onBack={goBack}
    >
      <h2>Chosen data:</h2>

      <h5>Type:</h5>
      <p className="text-capitalize">{values.type.replace(/-/g, ' ')}</p>

      <h5>Hash:</h5>
      <p>{values.hash}</p>

      <h5>Remove a Current Root Node:</h5>
      <p className="text-capitalize">{values.isRemovingNode ? 'yes' : 'no'}</p>

      {values.isRemovingNode && (
        <>
          <h5>Root Node to Remove:</h5>
          <p>{values.address}</p>
        </>
      )}

      <h5>External Link:</h5>
      <p>{values.externalLink}</p>
    </ModalStep>
  );
}

export default ConfirmStep;
