import { flatten } from 'lodash';
import { ProposalEvent } from 'typings/contracts';

import { getContractProposals } from './common';

import { getConstitutionVotingInstance, getEmergencyUpdateVotingInstance, getGeneralUpdateVotingInstance } from 'contracts/contract-instance';

import { CONTRACTS_NAMES } from 'constants/contracts';

export async function getQProposals (
  proposals: ProposalEvent[],
  lastBlock: number
) {
  const newProposals = await Promise.all([
    getContractProposals({
      proposals,
      contract: await getConstitutionVotingInstance(),
      lastBlock,
      contractName: CONTRACTS_NAMES.constitutionVoting
    }),
    getContractProposals({
      proposals,
      contract: await getEmergencyUpdateVotingInstance(),
      lastBlock,
      contractName: CONTRACTS_NAMES.emergencyUpdateVoting
    }),
    getContractProposals({
      proposals,
      contract: await getGeneralUpdateVotingInstance(),
      lastBlock,
      contractName: CONTRACTS_NAMES.generalUpdateVoting
    })
  ]);

  return flatten(newProposals);
}
