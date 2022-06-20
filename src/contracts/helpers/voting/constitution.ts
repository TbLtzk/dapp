import { ConstitutionVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/constitution/ConstitutionVotingInstance';
import { EmergencyUpdateVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/EmergencyUpdateVotingInstance';
import { GeneralUpdateVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/GeneralUpdateVotingInstance';
import { uniqBy } from 'lodash';
import { ProposalEvent } from 'typings/contracts';

import { getConstitutionVotingInstance, getEmergencyUpdateVotingInstance, getGeneralUpdateVotingInstance } from 'contracts/contract-instance';

import { CONTRACTS_NAMES } from 'constants/contracts';

type Contract =
  | ConstitutionVotingInstance
  | EmergencyUpdateVotingInstance
  | GeneralUpdateVotingInstance

export async function getQProposals (
  activeProposals: any[],
  lastActiveBlock: number
) {
  const [
    constitutionProposals,
    emergencyProposals,
    generalProposals
  ] = await Promise.all([
    getConstitutionProposals(activeProposals, lastActiveBlock),
    getEmergencyProposals(activeProposals, lastActiveBlock),
    getGeneralProposals(activeProposals, lastActiveBlock)
  ]);

  return [...constitutionProposals, ...emergencyProposals, ...generalProposals];
}

async function getConstitutionProposals (
  activeProposals: any[],
  lastActiveBlock: number
) {
  const contract = await getConstitutionVotingInstance();

  return getContractProposals({
    activeProposals,
    contract,
    lastBlock: lastActiveBlock,
    contractName: CONTRACTS_NAMES.constitutionVoting
  });
}

async function getEmergencyProposals (
  activeProposals: any[],
  lastActiveBlock: number
) {
  const contract = await getEmergencyUpdateVotingInstance();

  return getContractProposals({
    activeProposals,
    contract,
    lastBlock: lastActiveBlock,
    contractName: CONTRACTS_NAMES.emergencyUpdateVoting
  });
}

async function getGeneralProposals (
  activeProposals: any[],
  lastActiveBlock: number
) {
  const contract = await getGeneralUpdateVotingInstance();

  return getContractProposals({
    activeProposals,
    contract,
    lastBlock: lastActiveBlock,
    contractName: CONTRACTS_NAMES.generalUpdateVoting
  });
}

async function getContractProposals ({
  activeProposals,
  contract,
  lastBlock,
  contractName
}: {
  activeProposals: any[],
  contract: Contract,
  lastBlock: number,
  contractName: string
}): Promise<ProposalEvent[]> {
  const activeProposalsByContract = activeProposals
    .filter((proposal) => proposal.contract === contractName);

  const newProposals = await getPastEvents(contract, {
    fromBlock: lastBlock,
    contractName
  });

  const proposalsWithStatus = await Promise.all(newProposals.map(async (proposal) => {
    const status = await contract.getStatus(proposal.id);
    if (status === '0') return { ...proposal, status };

    return {
      ...proposal,
      status: status === '1' || status === '3' || status === '4' ? 'active' : 'ended'
    };
  }));

  return uniqBy([...proposalsWithStatus, ...activeProposalsByContract], 'id');
}

async function getPastEvents (
  contract: Contract,
  { fromBlock = 0, toBlock = 'latest', contractName = '' }
): Promise<ProposalEvent[]> {
  const pastEvents = await contract.instance.getPastEvents(
    'ProposalCreated',
    { fromBlock, toBlock }
  );

  return pastEvents.map((evt) => ({
    blockNumber: evt.blockNumber,
    id: evt.returnValues._id || evt.returnValues._proposalId,
    contract: contractName
  }));
}
