import { useMemo } from 'react';

import { Classification, ProposalStatus } from '@q-dev/q-js-sdk';
import { Proposal } from 'typings/proposals';
import { TagState } from 'ui/Tag';

import { ZERO_ADDRESS } from 'constants/config';

function useProposalDetails (proposal: Proposal | null) {
  const statusMap: Record<ProposalStatus, string> = {
    [ProposalStatus.ACCEPTED]: 'Accepted',
    [ProposalStatus.EXECUTED]: 'Executed',
    [ProposalStatus.EXPIRED]: 'Expired',
    [ProposalStatus.NONE]: 'None',
    [ProposalStatus.PASSED]: 'Passed',
    [ProposalStatus.PENDING]: 'Pending',
    [ProposalStatus.REJECTED]: 'Rejected',
    [ProposalStatus.OBSOLETE]: 'Obsolete',
  };

  const getStatusState = (): TagState => {
    switch (proposal?.status) {
      case ProposalStatus.PENDING:
        return 'pending';
      case ProposalStatus.REJECTED:
      case ProposalStatus.EXPIRED:
        return 'rejected';
      default:
        return 'approved';
    }
  };

  const getTitle = () => {
    const classificationMap: Record<Classification, string> = {
      [Classification.BASIC]: 'Basic',
      [Classification.DETAILED]: 'Detailed',
      [Classification.FUNDAMENTAL]: 'Fundamental',
    };

    switch (proposal?.contract) {
      case 'constitutionVoting':
        return `${classificationMap[proposal.classification || Classification.BASIC]} constitution proposal`;
      case 'generalUpdateVoting':
        return 'General update proposal';
      case 'emergencyUpdateVoting':
        return 'Emergency update proposal';
      case 'rootNodesMembershipVoting':
        if (proposal.candidate !== ZERO_ADDRESS && proposal.replaceDest !== ZERO_ADDRESS) {
          return 'Rode Node Swapping Proposal';
        }
        if (proposal.candidate && proposal.replaceDest === ZERO_ADDRESS) {
          return 'Root Node Adding Proposal';
        }
        return 'Root Node Removing proposal';
      case 'eprsMembershipVoting':
        return 'Q Root Node Selection Expert Panel';
      case 'epdrMembershipVoting':
        return 'DeFi Risk Expert membership';
      case 'epqfiMembershipVoting':
        return 'Fees & Incentives Experts membership';
      case 'eprsParametersVoting':
        return 'Q Root Node Selection Expert Panel Parameters';
      case 'epdrParametersVoting':
        return 'DeFi Risk Expert Parameters Proposal';
      case 'epqfiParametersVoting':
        return 'Fees & Incentives Experts Parameters Proposal';
      case 'rootNodesSlashingVoting':
        return 'Root Node Slashing Proposal';
      case 'validatorsSlashingVoting':
        return 'Validator Slashing Proposal';
      case 'addressVoting':
        return 'Address voting proposal';
      case 'upgradeVoting':
        return 'Upgrade voting proposal';
      default:
        return 'Unknown proposal';
    }
  };

  return {
    title: useMemo(getTitle, [proposal]),
    status: statusMap[proposal?.status || ProposalStatus.NONE],
    state: useMemo(getStatusState, [proposal]),
  };
}

export default useProposalDetails;
