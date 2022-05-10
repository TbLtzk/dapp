import React from 'react';
import { useSelector } from 'react-redux';

import { formVoteObject } from 'store/voting/proposals/selectors';

import { CONTRACTS_NAMES } from 'constants/contracts';

function CreateStep2 ({ proposalContract }) {
  const formData = useSelector(formVoteObject);

  const showCommonData = (answer) => {
    return (
      <div>
        <h2>Chosen Data:</h2>
        <h5>Type</h5>
        <p className="text-capitalize">{formData?.first?.replace(/-/g, ' ')}</p>
        <h5>Answer</h5>
        <p>{answer}</p>
        {proposalContract === CONTRACTS_NAMES.constitutionVoting ||
                proposalContract === CONTRACTS_NAMES.generalUpdateVoting ||
                proposalContract === CONTRACTS_NAMES.ePDRMembershipVoting ||
                proposalContract === CONTRACTS_NAMES.ePRSMembershipVoting ||
                proposalContract === CONTRACTS_NAMES.ePQFIMembershipVoting ||
                proposalContract === CONTRACTS_NAMES.rootsVoting
          ? (
            <h2>
              Notice: Your currently locked amount of Q inside the Q Vault will be extended until the end of
              this Proposal.
            </h2>
          )
          : null}
      </div>
    );
  };

  switch (formData?.first) {
    case 'basic-vote-on-proposal':
      return showCommonData(formData['vote-proposal']);
    case 'constitution-check':
      return showCommonData(formData['constitution-check']);
    default:
      return null;
  }
}

export default CreateStep2;
