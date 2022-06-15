
import ModalStep from 'components/Base/ModalStep';

import { useVote } from '../VoteModal';

import { CONTRACTS_NAMES } from 'constants/contracts';

function ConfirmStep ({ contract, type }) {
  const { values, goBack, confirm } = useVote();

  const isExtendNoteShown = [
    CONTRACTS_NAMES.constitutionVoting,
    CONTRACTS_NAMES.generalUpdateVoting,
    CONTRACTS_NAMES.ePDRMembershipVoting,
    CONTRACTS_NAMES.ePRSMembershipVoting,
    CONTRACTS_NAMES.ePQFIMembershipVoting,
    CONTRACTS_NAMES.rootsVoting,
  ].includes(contract);

  return (
    <ModalStep
      onConfirm={confirm}
      onBack={goBack}
    >
      <h2>Chosen Data:</h2>

      <h5>Type</h5>
      <p className="text-capitalize">
        {type.replace(/-/g, ' ')}
      </p>

      <h5>Answer</h5>
      <p>{values.isVotedFor ? 'Yes' : 'No'}</p>

      {isExtendNoteShown && (
        <h2>
          Notice: Your currently locked amount of Q inside the Q Vault will be extended until the end of this Proposal.
        </h2>
      )}
    </ModalStep>
  );
}

export default ConfirmStep;
