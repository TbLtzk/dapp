import { flatten } from 'lodash';
import { ProposalEvent } from 'typings/contracts';

import { getContractProposals } from './common';

import { getAddressVotingInstance, getUpgradeVotingInstance } from 'contracts/contract-instance';

import { CONTRACTS_NAMES } from 'constants/contracts';

export async function getContractUpdateProposals (
  proposals: ProposalEvent[],
  lastBlock: number
) {
  const newProposals = await Promise.all([
    getContractProposals({
      proposals,
      contract: await getAddressVotingInstance(),
      lastBlock,
      contractName: CONTRACTS_NAMES.addressVoting
    }),
    getContractProposals({
      proposals,
      contract: await getUpgradeVotingInstance(),
      lastBlock,
      contractName: CONTRACTS_NAMES.upgradeVoting
    }),
  ]);

  return flatten(newProposals);
}
