import { ProposalEvent } from 'typings/contracts';

import { getContractProposals } from './common';

import { getConstitutionVotingInstance, getEmergencyUpdateVotingInstance, getGeneralUpdateVotingInstance } from 'contracts/contract-instance';

import { CONTRACTS_NAMES } from 'constants/contracts';

export async function getQProposals (
  activeProposals: ProposalEvent[],
  lastActiveBlock: number
) {
  const [
    constitutionProposals,
    emergencyProposals,
    generalProposals
  ] = await Promise.all([
    getContractProposals({
      activeProposals,
      contract: await getConstitutionVotingInstance(),
      lastBlock: lastActiveBlock,
      contractName: CONTRACTS_NAMES.constitutionVoting
    }),
    getContractProposals({
      activeProposals,
      contract: await getEmergencyUpdateVotingInstance(),
      lastBlock: lastActiveBlock,
      contractName: CONTRACTS_NAMES.emergencyUpdateVoting
    }),
    getContractProposals({
      activeProposals,
      contract: await getGeneralUpdateVotingInstance(),
      lastBlock: lastActiveBlock,
      contractName: CONTRACTS_NAMES.generalUpdateVoting
    })
  ]);

  return [...constitutionProposals, ...emergencyProposals, ...generalProposals];
}
