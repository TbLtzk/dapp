import { flatten } from 'lodash';
import { ProposalEvent } from 'typings/contracts';

import { getContractProposals } from './common';

import { getRootNodesSlashingVotingInstance, getValidatorsSlashingVotingInstance } from 'contracts/contract-instance';

import { CONTRACTS_NAMES } from 'constants/contracts';

export async function getSlashingProposals (
  activeProposals: ProposalEvent[],
  lastActiveBlock: number
) {
  const proposals = await Promise.all([
    getContractProposals({
      activeProposals,
      contract: await getValidatorsSlashingVotingInstance(),
      lastBlock: lastActiveBlock,
      contractName: CONTRACTS_NAMES.validatorsSlashingVoting
    }),
    getContractProposals({
      activeProposals,
      contract: await getRootNodesSlashingVotingInstance(),
      lastBlock: lastActiveBlock,
      contractName: CONTRACTS_NAMES.rootNodesSlashingVoting
    }),
  ]);

  return flatten(proposals);
}
