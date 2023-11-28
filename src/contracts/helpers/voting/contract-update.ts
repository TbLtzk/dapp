import type { ChainId } from '@distributedlab/w3p';
import flatten from 'lodash/flatten';
import { ContractUpdateProposalsContractType, ProposalEvent } from 'typings/contracts';
import { Proposal } from 'typings/proposals';

import { getContractProposals } from '.';

import { getAddressVotingInstance, getGenericContractRegistryVoting, getRootNodesInstance, getUpgradeVotingInstance } from 'contracts/contract-instance';

import { chainIdToNetworkMap, networkConfigsMap } from 'constants/config';

export async function getContractUpdateProposals (
  proposals: ProposalEvent[],
  lastBlock: number,
  chainId: ChainId
) {
  const { genericContractRegistryVoting } = networkConfigsMap[chainIdToNetworkMap[chainId]].featureFlags;

  const newProposals = await Promise.all([
    getContractProposals({
      proposals,
      contract: await getAddressVotingInstance(),
      lastBlock,
      contractName: 'addressVoting',
      chainId,
    }),
    getContractProposals({
      proposals,
      contract: await getUpgradeVotingInstance(),
      lastBlock,
      contractName: 'upgradeVoting',
      chainId,
    }),
    genericContractRegistryVoting
      ? getContractProposals({
        proposals,
        contract: await getGenericContractRegistryVoting(),
        lastBlock,
        contractName: 'genericContractRegistryVoting',
        chainId,
      })
      : [],
  ]);

  return flatten(newProposals);
}

export async function getContractUpdateProposal (
  contract: ContractUpdateProposalsContractType,
  id: string
): Promise<Partial<Proposal>> {
  const proposal = await contract.getProposal(id);
  const voteCount = await contract.instance.voteCount(id);

  const rootNodesInstance = await getRootNodesInstance();
  const rootNodesNumber = await rootNodesInstance.getSize();

  return {
    proxy: 'proxy' in proposal ? proposal.proxy : '',
    implementation: 'implementation' in proposal ? proposal.implementation : '',
    key: 'key' in proposal ? proposal.key : '',
    remark: 'remark' in proposal ? proposal.remark : '',
    callData: 'callData' in proposal ? proposal.callData : '',
    votingEndTime: Number(proposal.votingExpiredTime),
    votesFor: Number(voteCount),
    votesAgainst: Number(rootNodesNumber) - Number(voteCount),
    currentQuorum: Number(voteCount) / Number(rootNodesNumber) * 100,
    requiredQuorum: 50
  };
}
