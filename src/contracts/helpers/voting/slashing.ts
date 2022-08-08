import { RootNodesSlashingVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/rootNodes/RootNodesSlashingVotingInstance';
import { ValidatorsSlashingVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/validators/ValidatorsSlashingVotingInstance';
import { flatten } from 'lodash';
import { ProposalContractType, ProposalEvent } from 'typings/contracts';
import { SlashingProposalForm } from 'typings/forms';
import { Proposal, SlashingProposal } from 'typings/proposals';

import { getContractProposals } from '.';

import { getRootNodeSlashingEscrowInstance, getRootNodesSlashingVotingInstance, getValidatorSlashingEscrowInstance, getValidatorsSlashingVotingInstance } from 'contracts/contract-instance';

import { ObjectionStatus } from 'constants/statuses';
import { fromWei } from 'utils/balance';
import { unixToDate } from 'utils/date';
import { transformToPercentage } from 'utils/formatters';
import { getPercentageFormat } from 'utils/useful';

export async function getSlashingProposals (
  proposals: ProposalEvent[],
  lastBlock: number
) {
  const newProposals = await Promise.all([
    getContractProposals({
      proposals,
      contract: await getValidatorsSlashingVotingInstance(),
      lastBlock,
      contractName: 'validatorsSlashingVoting'
    }),
    getContractProposals({
      proposals,
      contract: await getRootNodesSlashingVotingInstance(),
      lastBlock,
      contractName: 'rootNodesSlashingVoting'
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
    getPercentageFormat(form.percent),
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
    getPercentageFormat(form.percent),
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
  const contract = contractType === 'validatorsSlashingVoting'
    ? await getValidatorSlashingEscrowInstance()
    : await getRootNodeSlashingEscrowInstance();

  const status = await contract.instance.methods.getStatus(id).call();
  const escrowArbitrationInfo = await contract.arbitrationInfos(id);
  const [confirmations, requiredConfirmations, percentage] =
    await contract.instance.methods.getDecisionStats(id).call();

  return {
    objection: {
      appealConfirmed: escrowArbitrationInfo.appealConfirmed,
      appealEndTime: unixToDate(escrowArbitrationInfo.params.appealEndTime),
      objectionEndTime: unixToDate(escrowArbitrationInfo.params.objectionEndTime),
      status: status as ObjectionStatus,
      slashedAmount: fromWei(escrowArbitrationInfo.params.slashedAmount),
      executed: escrowArbitrationInfo.executed,
      remark: escrowArbitrationInfo.remark,
      proposerRemark: escrowArbitrationInfo.proposerRemark,
    },
    decision: {
      endDate: unixToDate(escrowArbitrationInfo.decision.endDate),
      externalReference: escrowArbitrationInfo.decision.externalReference,
      percentage: transformToPercentage(escrowArbitrationInfo.decision.percentage.toString()),
      proposer: escrowArbitrationInfo.decision.proposer,
      confirmationCount: confirmations,
      requiredConfirmations: requiredConfirmations,
      currentConfirmationPercentage: transformToPercentage(percentage),
    }
  };
}
