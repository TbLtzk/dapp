import { ProposalStatus } from '@q-dev/q-js-sdk';
import { ConstitutionVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/constitution/ConstitutionVotingInstance';
import { ContractRegistryAddressVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/ContractRegistryAddressVoting';
import { ContractRegistryUpgradeVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/ContractRegistryUpgradeVoting';
import { EmergencyUpdateVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/EmergencyUpdateVotingInstance';
import { EPDRMembershipVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/experts/EPDRMembershipVotingInstance';
import { EPDRParametersVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/experts/EPDRParametersVotingInstance';
import { EPQFIMembershipVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/experts/EPQFIMembershipVotingInstance';
import { EPQFIParametersVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/experts/EPQFIParametersVotingInstance';
import { EPRSMembershipVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/experts/EPRSMembershipVotingInstance';
import { EPRSParametersVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/experts/EPRSParametersVotingInstance';
import { GeneralUpdateVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/GeneralUpdateVotingInstance';
import { RootNodesMembershipVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/rootNodes/RootNodesMembershipVotingInstance';
import { RootNodesSlashingVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/rootNodes/RootNodesSlashingVotingInstance';
import { ValidatorsSlashingVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/validators/ValidatorsSlashingVotingInstance';
import { uniqBy } from 'lodash';
import { ProposalEvent } from 'typings/contracts';

type Contract =
  | ConstitutionVotingInstance
  | EmergencyUpdateVotingInstance
  | GeneralUpdateVotingInstance
  | RootNodesMembershipVotingInstance
  | RootNodesSlashingVotingInstance
  | ValidatorsSlashingVotingInstance
  | ContractRegistryAddressVotingInstance
  | ContractRegistryUpgradeVotingInstance
  | EPQFIMembershipVotingInstance
  | EPDRMembershipVotingInstance
  | EPQFIParametersVotingInstance
  | EPDRParametersVotingInstance
  | EPRSParametersVotingInstance
  | EPRSMembershipVotingInstance

export async function getContractProposals ({
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

  const newProposals = await getProposalEvents(contract, {
    fromBlock: lastBlock,
    contractName
  });

  const proposalsWithStatus = await Promise.all(newProposals.map(async (proposal) => {
    const status = await contract.getStatus(proposal.id);
    if (status === ProposalStatus.NONE) return { ...proposal, status };

    const isActive = [
      ProposalStatus.PENDING,
      ProposalStatus.ACCEPTED,
      ProposalStatus.PASSED
    ].includes(status);

    return {
      ...proposal,
      status: isActive ? 'active' : 'ended'
    };
  }));

  return uniqBy([...proposalsWithStatus, ...activeProposalsByContract], 'id');
}

export async function getProposalEvents (
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
