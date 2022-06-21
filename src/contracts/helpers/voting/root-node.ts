import { ProposalEvent } from 'typings/contracts';

import { getContractProposals } from './common';

import { getRootNodesMembershipVotingInstance } from 'contracts/contract-instance';

import { CONTRACTS_NAMES } from 'constants/contracts';

export async function getRootNodeProposals (
  proposals: ProposalEvent[],
  lastBlock: number
) {
  return getContractProposals({
    proposals,
    contract: await getRootNodesMembershipVotingInstance(),
    lastBlock,
    contractName: CONTRACTS_NAMES.rootsVoting
  });
}
