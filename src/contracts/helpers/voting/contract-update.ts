import { flatten } from 'lodash';
import { ProposalEvent } from 'typings/contracts';

import { getContractProposals } from './common';

import { getAddressVotingInstance, getUpgradeVotingInstance } from 'contracts/contract-instance';

import { CONTRACTS_NAMES } from 'constants/contracts';

export async function getContractUpdateProposals (
  activeProposals: ProposalEvent[],
  lastActiveBlock: number
) {
  const proposals = await Promise.all([
    getContractProposals({
      activeProposals,
      contract: await getAddressVotingInstance(),
      lastBlock: lastActiveBlock,
      contractName: CONTRACTS_NAMES.addressVoting
    }),
    getContractProposals({
      activeProposals,
      contract: await getUpgradeVotingInstance(),
      lastBlock: lastActiveBlock,
      contractName: CONTRACTS_NAMES.upgradeVoting
    }),
  ]);

  return flatten(proposals);
}
