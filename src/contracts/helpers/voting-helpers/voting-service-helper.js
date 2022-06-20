import { ParameterType, ProposalStatus } from '@q-dev/q-js-sdk';

import { address } from 'components/Custom/LoadingMetaMask/LoadingMetaMask';

import { getInstance, getRootNodesInstance } from 'contracts/contract-instance';

import { ZERO_ADDRESS } from 'constants/config';
import { transformToPercentage } from 'func/formatters';

export default class VotingService {
  constructor (contractName) {
    this.contractName = contractName;
  }

  async getContractInstance () {
    const initInstance = getInstance(this.contractName);
    return initInstance();
  }

  async hasUserVotedVetoed (id) {
    if (address === ZERO_ADDRESS) {
      return { userVetoed: false, userVoted: false };
    } else {
      const contract = await this.getContractInstance();
      let userVetoed;
      if (contract.hasRootVetoed) {
        userVetoed = await contract.hasRootVetoed(id, address);
      }
      const userVoted = await contract.hasUserVoted(id, address);
      return { userVetoed, userVoted };
    }
  }

  async getProposalStats (id) {
    const contract = await this.getContractInstance();
    const result = await contract.getProposalStats(id);
    return result;
  }

  async getVetoesNumber (id) {
    try {
      const contract = await this.getContractInstance();
      if (contract.instance.methods.getVetosNumber) {
        const result = await contract.instance.methods.getVetosNumber(id).call();
        return result;
      } else {
        return 0;
      }
    } catch (err) {
      return 0;
    }
  }

  async getVetoesPercentage (id) {
    const contract = await this.getContractInstance();
    const result = await contract.getVetosPercentage(id);
    return result;
  }

  async voteAgainst (id, userAddress) {
    if (address === ZERO_ADDRESS) {
      return true;
    } else {
      const contract = await this.getContractInstance();
      const result = await contract.voteAgainst(id, { from: userAddress });
      return result;
    }
  }

  async voteFor (id, userAddress) {
    if (address === ZERO_ADDRESS) {
      return true;
    } else {
      const contract = await this.getContractInstance();
      const result = await contract.voteFor(id, { from: userAddress });
      return result;
    }
  }

  async veto (id, userAddress) {
    if (address === ZERO_ADDRESS) {
      return true;
    } else {
      const contract = await this.getContractInstance();
      const result = await contract.veto(id, { from: userAddress });
      return result;
    }
  }

  async execute (id, userAddress) {
    if (address === ZERO_ADDRESS) return;

    const contract = await this.getContractInstance();
    const promiseStatus = await contract.getStatus(id);

    if (promiseStatus === ProposalStatus.PASSED) {
      return contract.execute(id, { from: userAddress });
    }
  }

  async approve (id, userAddress) {
    if (address === ZERO_ADDRESS) return;

    const contract = await this.getContractInstance();
    return contract.aprove(id, { from: userAddress });
  }

  async getProposal (id, oneProposal) {
    if (oneProposal) {
      const pastEvents = await this.getPastEvents();
      const propIds = pastEvents.map(({ id }) => id);
      if (!propIds.includes(id)) {
        return { error: true };
      }
    }
    const contract = await this.getContractInstance();
    const proposal = await contract.getProposalWithStatus(id);
    const headerInfo = this.getProposalData(proposal, proposal.id, proposal.status);
    const additionalInfo = await this.getProposalAdditionalData(proposal, id);
    const userVotedVetoed = await this.hasUserVotedVetoed(id);
    return { ...headerInfo, ...additionalInfo, ...userVotedVetoed };
  }

  async getProposalStatsData (id) {
    const objRes = {};
    const contract = await getRootNodesInstance();
    const proposalStats = await this.getProposalStats(id);
    const getVetoesNumber = await this.getVetoesNumber(id);
    const rootNodesNumber = await contract.getSize();
    objRes.vetoesNumber = getVetoesNumber;
    objRes.noVote = rootNodesNumber - getVetoesNumber;
    objRes.vetoesPercentage = ((getVetoesNumber * 100) / rootNodesNumber).toFixed(2);
    objRes.currentMajority = transformToPercentage(proposalStats.currentMajority);
    objRes.currentQuorum = transformToPercentage(proposalStats.currentQuorum);
    objRes.requiredMajority = transformToPercentage(proposalStats.requiredMajority);
    objRes.requiredQuorum = transformToPercentage(proposalStats.requiredQuorum);
    objRes.vetoThreshold = '50.00';
    return objRes;
  }

  async getPastEvents (fromBlock = 0, toBlock = 'latest') {
    const contract = await this.getContractInstance();

    const pastEvents = await contract.instance.getPastEvents('ProposalCreated', {
      fromBlock,
      toBlock
    });

    return pastEvents.map((evt) => ({
      blockNumber: evt.blockNumber,
      id: evt.returnValues._id || evt.returnValues._proposalId,
      contract: this.contractName
    }));
  }

  async getProposalParametersData (id) {
    const contract = await this.getContractInstance();
    const parameters = await contract.getParametersArr(id);

    return parameters.map((item) => {
      let value = null;
      switch (item.paramType) {
        case ParameterType.ADDRESS:
          value = item.addrValue;
          break;
        case ParameterType.BOOL:
          value = item.boolValue;
          break;
        case ParameterType.STRING:
          value = item.strValue;
          break;
        case ParameterType.UINT:
          value = item.uintValue;
          break;
        case ParameterType.BYTE:
          value = item.bytes32Value;
          break;
      }
      return {
        parameterType: item.paramType,
        parameterValue: value,
        parameterKey: item.paramKey
      };
    });
  }
}
