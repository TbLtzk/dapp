import { flatten } from 'lodash';
import { ProposalEvent } from 'typings/contracts';

import { getContractProposals } from './common';

import { getRootNodesSlashingVotingInstance, getValidatorsSlashingVotingInstance } from 'contracts/contract-instance';

import { CONTRACTS_NAMES } from 'constants/contracts';

export async function getSlashingProposals (
  proposals: ProposalEvent[],
  lastBlock: number
) {
  const newProposals = await Promise.all([
    getContractProposals({
      proposals,
      contract: await getValidatorsSlashingVotingInstance(),
      lastBlock,
      contractName: CONTRACTS_NAMES.validatorsSlashingVoting
    }),
    getContractProposals({
      proposals,
      contract: await getRootNodesSlashingVotingInstance(),
      lastBlock,
      contractName: CONTRACTS_NAMES.rootNodesSlashingVoting
    }),
  ]);

  return flatten(newProposals);
}
