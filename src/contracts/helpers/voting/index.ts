import { ParameterType, ProposalStatus, RawParameter, VotingStats } from '@q-dev/q-js-sdk';
import { ConstitutionVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/constitution/ConstitutionVotingInstance';
import { ContractRegistryAddressVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/ContractRegistryAddressVoting';
import { EPQFIMembershipVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/experts/EPQFIMembershipVotingInstance';
import { RootNodesMembershipVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/rootNodes/RootNodesMembershipVotingInstance';
import { RootNodesSlashingVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/rootNodes/RootNodesSlashingVotingInstance';
import { uniqBy } from 'lodash';
import { ContractType, ProposalContractType, ProposalEvent, ProposalsContract } from 'typings/contracts';
import { CreateProposalForm, FormParameter } from 'typings/forms';
import { Proposal, ProposalType, SlashingProposal } from 'typings/proposals';

import { createConstitutionProposal, createEmergencyProposal, createGeneralProposal, getConstitutionProposal, getQProposals } from './constitution';
import { getContractUpdateProposal, getContractUpdateProposals } from './contract-update';
import { createAddExpertProposal, createParameterVoteProposal, createRemoveExpertProposal, getExpertProposal, getExpertProposals } from './expert';
import { createRootNodeProposal, getRootNodeProposal, getRootNodeProposals } from './root-node';
import { createRootNodeSlashingProposal, createValidatorSlashingProposal, getSlashingEscrow, getSlashingProposal, getSlashingProposals } from './slashing';

import { store } from 'store';

import { getInstance, getRootNodesInstance } from 'contracts/contract-instance';

import { captureError } from 'utils/errors';
import { transformToPercentage } from 'utils/formatters';

export async function getContractProposals ({
  proposals,
  contract,
  lastBlock,
  contractName
}: {
  proposals: ProposalEvent[],
  contract: ProposalsContract,
  lastBlock: number,
  contractName: ContractType
}): Promise<ProposalEvent[]> {
  const contractProposals = proposals.filter(({ contract }) => contract === contractName);
  const activeProposals = contractProposals.filter(({ status }) => status === 'active');

  const newProposals = await getProposalPastEvents(contract, {
    fromBlock: lastBlock,
    contractName
  });

  const proposalsToCheck = [...activeProposals, ...newProposals];
  const result = await Promise.all(proposalsToCheck.map(async (proposal) => {
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

  return uniqBy([...result, ...contractProposals], 'id');
}

export async function getProposalPastEvents (
  contract: ProposalsContract,
  { fromBlock = 0, toBlock = 'latest', contractName = '' }
): Promise<ProposalEvent[]> {
  const pastEvents = await contract.instance.getPastEvents(
    'ProposalCreated',
    { fromBlock, toBlock }
  );

  return pastEvents.map((evt) => ({
    blockNumber: evt.blockNumber,
    id: evt.returnValues._id || evt.returnValues._proposalId,
    contract: contractName as ProposalContractType,
  }));
}

export function getProposalEvents (
  proposalType: ProposalType,
  proposals: ProposalEvent[],
  lastBlock: number,
) {
  switch (proposalType) {
    case 'q':
      return getQProposals(proposals, lastBlock);
    case 'rootNode':
      return getRootNodeProposals(proposals, lastBlock);
    case 'expert':
      return getExpertProposals(proposals, lastBlock);
    case 'slashing':
      return getSlashingProposals(proposals, lastBlock);
    case 'contractUpdate':
      return getContractUpdateProposals(proposals, lastBlock);
  }
}

export function createProposal (form: CreateProposalForm, address: string) {
  switch (form.type) {
    case 'constitution':
      return createConstitutionProposal(form, address);
    case 'emergency':
      return createEmergencyProposal(form, address);
    case 'general':
      return createGeneralProposal(form, address);
    case 'add-root-node':
    case 'remove-root-node':
      return createRootNodeProposal(form, address);
    case 'root-slashing':
      return createRootNodeSlashingProposal(form, address);
    case 'validator-slashing':
      return createValidatorSlashingProposal(form, address);
    case 'add-expert':
      return createAddExpertProposal(form, address);
    case 'remove-expert':
      return createRemoveExpertProposal(form, address);
    case 'parameter-vote':
      return createParameterVoteProposal(form, address);
  };
}

export function getProposalTypeByContract (contract: ProposalContractType): ProposalType {
  switch (contract) {
    case 'constitutionVoting':
    case 'emergencyUpdateVoting':
    case 'generalUpdateVoting':
      return 'q';
    case 'rootNodesMembershipVoting':
      return 'rootNode';
    case 'epqfiMembershipVoting':
    case 'epdrMembershipVoting':
    case 'epqfiParametersVoting':
    case 'epdrParametersVoting':
    case 'eprsMembershipVoting':
    case 'eprsParametersVoting':
      return 'expert';
    case 'rootNodesSlashingVoting':
    case 'validatorsSlashingVoting':
      return 'slashing';
    case 'upgradeVoting':
    case 'addressVoting':
      return 'contractUpdate';
  }
}

export async function getProposal<T extends ProposalContractType> (
  contractType: T,
  id: string
): Promise<Proposal | null> {
  try {
    const { userInf } = store.getState();
    const userAddress = userInf.userAddress;

    const contract = await getInstance<T>(contractType)();
    const status = await contract.getStatus(id);
    if (status === ProposalStatus.NONE) return null;

    const proposal = await getContractProposal({ contract, contractType, status, id });
    const stats = await contract.getProposalStats(id) as VotingStats;
    const parameters = 'getParametersArr' in contract
      ? await contract.getParametersArr(id)
      : [];

    const userVoted = 'hasUserVoted' in contract
      ? await contract.hasUserVoted(id, userAddress)
      : false;
    const userVetoed = 'hasRootVetoed' in contract
      ? await contract.hasRootVetoed(id, userAddress)
      : false;

    const rootNodesInstance = await getRootNodesInstance();
    const rootNodesNumber = await rootNodesInstance.getSize();

    return {
      id,
      status,
      contract: contractType,
      parameters: convertProposalParameters(parameters),
      requiredMajority: Number(transformToPercentage(stats.requiredMajority)),
      userVoted,
      userVetoed,
      rootNodesNumber: Number(rootNodesNumber),
      vetoThreshold: 50,
      requiredQuorum: Number(transformToPercentage(stats.requiredQuorum)) || 0,
      currentQuorum: Number(transformToPercentage(stats.currentQuorum)) || 0,
      ...proposal,
    } as Proposal;
  } catch (e) {
    captureError(e);
    return null;
  }
}

async function getContractProposal ({ contract, id, status, contractType }: {
  contract: ProposalsContract,
  id: string,
  status: ProposalStatus,
  contractType: ProposalContractType
}) {
  let proposal: Partial<Proposal> = {};
  switch (contractType) {
    case 'constitutionVoting':
    case 'emergencyUpdateVoting':
    case 'generalUpdateVoting':
      proposal = await getConstitutionProposal(contract as ConstitutionVotingInstance, id);
      break;
    case 'rootNodesMembershipVoting':
      proposal = await getRootNodeProposal(contract as RootNodesMembershipVotingInstance, id);
      break;
    case 'epqfiMembershipVoting':
    case 'epdrMembershipVoting':
    case 'eprsMembershipVoting':
    case 'epqfiParametersVoting':
    case 'epdrParametersVoting':
    case 'eprsParametersVoting':
      proposal = await getExpertProposal(contract as EPQFIMembershipVotingInstance, id);
      break;
    case 'rootNodesSlashingVoting':
    case 'validatorsSlashingVoting':
      proposal = await getSlashingProposal(contract as RootNodesSlashingVotingInstance, id);
      if (status === ProposalStatus.EXECUTED) {
        (proposal as SlashingProposal).objEscrow = await getSlashingEscrow(id, contractType);
      }
      break;
    case 'upgradeVoting':
    case 'addressVoting':
      proposal = await getContractUpdateProposal(contract as ContractRegistryAddressVotingInstance, id);
      break;
  }

  return proposal;
}

function convertProposalParameters (params: RawParameter[]): FormParameter[] {
  return params.map((item) => {
    const parameterValueMap: Record<ParameterType, string> = {
      [ParameterType.ADDRESS]: item.addrValue,
      [ParameterType.BOOL]: String(item.boolValue),
      [ParameterType.BYTE]: item.bytes32value,
      [ParameterType.UINT]: item.uintValue,
      [ParameterType.STRING]: item.strValue,
      [ParameterType.NONE]: '',
    };

    return {
      type: item.paramType,
      value: parameterValueMap[item.paramType],
      key: item.paramKey,
    };
  });
}
