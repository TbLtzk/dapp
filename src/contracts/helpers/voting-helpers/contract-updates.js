import { address } from 'components/Custom/LoadingMetaMask/LoadingMetaMask';

import { getStatusTransformation } from './base-voting-helper';
import VotingService from './voting-service-helper';

import { CONTRACTS_NAMES } from 'constants/contracts';
import { transformToPercentage } from 'func/formatters';

export default class ContractUpdates extends VotingService {
  async getProposal (id, oneProposal) {
    if (oneProposal) {
      const pastEvents = await this.getPastEvents();
      const propIds = pastEvents.map(({ id }) => id);
      if (!propIds.includes(id)) {
        return { error: true };
      }
    }

    const contract = await this.getContractInstance();
    const proposal = await contract.getProposal(id);
    const status = await contract.getStatus(id);
    const stats = await contract.getProposalStats(id);
    const info = {};
    const rootNodesNumber = await this.getRootNodesNumber();
    const voteCount = await contract.instance.methods.voteCount(id).call();

    info.id = id;
    info.contract = this.contractName;
    info.status = getStatusTransformation(status);
    info.votingStartTime = proposal.votingStartTime;
    info.votingEndTime = proposal.votingExpiredTime;
    info.currentMajority = transformToPercentage(stats.currentMajority);
    info.requiredMajority = transformToPercentage(stats.requiredMajority);
    info.userVoted = await contract.instance.methods.voted(id, address).call();
    info.numberProposalVotes = {
      votesFor: Number(voteCount),
      votesAgainst: Number(rootNodesNumber) - Number(voteCount)
    };
    info.title = `${this.contractName === CONTRACTS_NAMES.upgradeVoting ? 'Upgrade' : 'Address'} voting proposal`;
    info.proxy = proposal.proxy;
    if (this.contractName === CONTRACTS_NAMES.upgradeVoting) {
      info.implementation = proposal.implementation;
    } else {
      info.key = proposal.key;
    }
    return info;
  }

  async getProposalsWithStatus (proposal) {
    const contract = await this.getContractInstance();
    const { executed } = await contract.getProposal(proposal.id);
    return { status: executed, ...proposal };
  }
}
