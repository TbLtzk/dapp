import type { ChainId } from '@distributedlab/w3p';
import { RootNodeSlashingEscrowInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/rootNodes/RootNodeSlashingEscrowInstance';
import { RootNodesSlashingVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/rootNodes/RootNodesSlashingVotingInstance';
import { ValidatorSlashingEscrowInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/validators/ValidatorSlashingEscrowInstance';
import { ValidatorsSlashingVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/validators/ValidatorsSlashingVotingInstance';
import { getFixedPercentage, transformToPercentage } from '@q-dev/utils';
import flatten from 'lodash/flatten';
import { ProposalContractType, ProposalEvent } from 'typings/contracts';
import { SlashingProposalForm } from 'typings/forms';
import { Proposal, SlashingProposal } from 'typings/proposals';

import { getContractProposals } from '.';

import { getRootNodeSlashingEscrowInstance, getRootNodesSlashingVotingInstance, getValidatorSlashingEscrowInstance, getValidatorsSlashingVotingInstance } from 'contracts/contract-instance';

import { ObjectionStatus } from 'constants/slashing';
import { unixToDate } from 'utils/date';
import { fromWei } from 'utils/web3';

export async function getSlashingProposals (
  proposals: ProposalEvent[],
  lastBlock: number,
  chainId: ChainId

) {
  const newProposals = await Promise.all([
    getContractProposals({
      proposals,
      contract: await getValidatorsSlashingVotingInstance(),
      lastBlock,
      contractName: 'validatorsSlashingVoting',
      chainId
    }),
    getContractProposals({
      proposals,
      contract: await getRootNodesSlashingVotingInstance(),
      lastBlock,
      contractName: 'rootNodesSlashingVoting',
      chainId
    }),
  ]);

  return flatten(newProposals);
}

export async function createRootNodeSlashingProposal (
  form: SlashingProposalForm,
  address: string
) {
  const contract = await getRootNodesSlashingVotingInstance();
  return contract.createProposal(
    form.externalLink,
    form.address,
    getFixedPercentage(form.percent),
    { from: address }
  );
}

export async function createValidatorSlashingProposal (
  form: SlashingProposalForm,
  address: string
) {
  const contract = await getValidatorsSlashingVotingInstance();
  return contract.createProposal(
    form.externalLink,
    form.address,
    getFixedPercentage(form.percent),
    { from: address }
  );
}

export async function getSlashingProposal (
  contract: RootNodesSlashingVotingInstance | ValidatorsSlashingVotingInstance,
  id: string
): Promise<Partial<Proposal>> {
  const proposal = await contract.getProposal(id);
  const weightFor = proposal.base.counters.weightFor;
  const weightAgainst = proposal.base.counters.weightAgainst;

  return {
    proposer: proposal.proposer,
    vetoEndTime: Number(proposal.base.params.vetoEndTime),
    votingEndTime: Number(proposal.base.params.votingEndTime),
    remark: proposal.base.remark,
    candidate: proposal.candidate,
    amountToSlash: fromWei(proposal.amountToSlash),
    vetoesNumber: Number(proposal.base.counters.vetosCount),
    votesFor: contract instanceof ValidatorsSlashingVotingInstance
      ? Number(weightFor)
      : Number(fromWei(weightFor)),
    votesAgainst: contract instanceof ValidatorsSlashingVotingInstance
      ? Number(weightAgainst)
      : Number(fromWei(weightAgainst)),
  };
}

export async function getSlashingEscrow (
  id: string,
  contractType: ProposalContractType
): Promise<SlashingProposal['objEscrow']> {
  const contract = await getEscrowInstance(contractType);
  const [
    status,
    escrowArbitrationInfo,
    [confirmations, requiredConfirmations, percentage]
  ] = await Promise.all([
    contract.instance.getStatus(id),
    contract.arbitrationInfos(id),
    contract.instance.getDecisionStats(id),
  ]);

  return {
    objection: {
      appealConfirmed: escrowArbitrationInfo.appealConfirmed,
      appealEndTime: unixToDate(escrowArbitrationInfo.params.appealEndTime as string),
      objectionEndTime: unixToDate(escrowArbitrationInfo.params.objectionEndTime as string),
      status: status.toString() as ObjectionStatus,
      slashedAmount: fromWei(escrowArbitrationInfo.params.slashedAmount.toString()),
      executed: escrowArbitrationInfo.executed,
      remark: escrowArbitrationInfo.remark,
      proposerRemark: escrowArbitrationInfo.proposerRemark,
    },
    decision: {
      endDate: unixToDate(escrowArbitrationInfo.decision.endDate as string),
      externalReference: escrowArbitrationInfo.decision.externalReference,
      percentage: transformToPercentage(escrowArbitrationInfo.decision.percentage.toString()),
      proposer: escrowArbitrationInfo.decision.proposer,
      confirmationCount: confirmations.toString(),
      requiredConfirmations: requiredConfirmations.toString(),
      currentConfirmationPercentage: transformToPercentage(percentage.toString()),
    }
  };
}

export async function checkConfirmedDecision ({ proposal, address }: {
  proposal: SlashingProposal;
  address: string;
}): Promise<boolean> {
  const contract = await getEscrowInstance(proposal.contract);
  return contract.instance
    .hasAlreadyConfirmedDecision(proposal.id, address);
}

function getEscrowInstance (contractType: ProposalContractType):
Promise<RootNodeSlashingEscrowInstance | ValidatorSlashingEscrowInstance> {
  return contractType === 'validatorsSlashingVoting'
    ? getValidatorSlashingEscrowInstance()
    : getRootNodeSlashingEscrowInstance();
}
