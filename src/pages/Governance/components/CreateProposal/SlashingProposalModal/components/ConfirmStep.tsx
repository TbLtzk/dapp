
import ModalStep from 'components/Base/ModalStep';

import { useCreateProposal } from '../SlashingProposalModal';

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

      <h5>Candidate to Slash:</h5>
      <p>{values.address}</p>

      <h5>Stake Amount to Slash:</h5>
      <p>{values.percent} %</p>

      <h5>External Link</h5>
      <p>{values.externalLink}</p>
    </ModalStep>
  );
}

export default ConfirmStep;
