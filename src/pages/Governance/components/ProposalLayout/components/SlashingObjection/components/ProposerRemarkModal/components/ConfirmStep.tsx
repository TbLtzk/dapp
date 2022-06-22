import ModalStep from 'components/Base/ModalStep';

import { useProposerRemark } from '../ProposerRemarkModal';

function ConfirmStep () {
  const { values, goBack, confirm } = useProposerRemark();

  return (
    <ModalStep
      onConfirm={confirm}
      onBack={goBack}
    >
      <h2>Chosen Data:</h2>

      <h5>Type:</h5>
      <p>Proposer Remark</p>

      <h5>Remark</h5>
      <p>{values.proposerRemark}</p>
    </ModalStep>
  );
}

export default ConfirmStep;
