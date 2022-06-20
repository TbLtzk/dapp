import { ProposalEvent } from 'typings/contracts';

import { getContractProposals } from './common';

import { getRootNodesMembershipVotingInstance } from 'contracts/contract-instance';

import { CONTRACTS_NAMES } from 'constants/contracts';

export async function getRootNodeProposals (
  activeProposals: ProposalEvent[],
  lastActiveBlock: number
) {
  return getContractProposals({
    activeProposals,
    contract: await getRootNodesMembershipVotingInstance(),
    lastBlock: lastActiveBlock,
    contractName: CONTRACTS_NAMES.rootsVoting
  });
}
