import { ParameterType } from '@q-dev/q-js-sdk';
import { includes, uniqBy } from 'lodash';

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

  async getProposalStatus (id) {
    const contract = await this.getContractInstance();
    const result = await contract.getStatus(id);
    return result;
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
    if (address === ZERO_ADDRESS) {
      return true;
    } else {
      const contract = await this.getContractInstance();
      const promiseStatus = await this.getProposalStatus(id);
      let result = null;
      if (promiseStatus === '4') {
        result = await contract.execute(id, { from: userAddress });
      }
      return result;
    }
  }

  async approve (id, userAddress) {
    if (address === ZERO_ADDRESS) {
      return null;
    } else {
      const contract = await this.getContractInstance();
      const result = await contract.aprove(id, { from: userAddress });
      return result;
    }
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

  async getRootNodesNumber () {
    const contract = await getRootNodesInstance();
    return await contract.getSize();
  }

  async getProposalStatsData (id) {
    const objRes = {};
    const proposalStats = await this.getProposalStats(id);
    const getVetoesNumber = await this.getVetoesNumber(id);
    const rootNodesNumber = await this.getRootNodesNumber();
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

  async checkProposalsByStatus (proposals) {
    const contract = await this.getContractInstance();
    const activeIds = [];
    const endedIds = [];
    for (const proposal of proposals) {
      const status = await contract.getStatus(proposal.id);
      if (status === '0') {
        continue;
      } else if (status === '1' || status === '3' || status === '4') {
        activeIds.push({ ...proposal, status });
      } else {
        endedIds.push({ ...proposal, status });
      }
    }
    return [activeIds, endedIds];
  }

  async getNewProposalsAndCheckActive (activeProposals, lastActiveBlock) {
    const activeProposalsByContract = activeProposals.filter((proposal) => proposal.contract === this.contractName);
    const newProposals = await this.getPastEvents(lastActiveBlock);
    const proposals = uniqBy([...newProposals, ...activeProposalsByContract], 'id');
    const proposalsWithStatus = await this.checkProposalsByStatus(proposals);
    return proposalsWithStatus;
  }

  async getProposalsCount (minimalActiveBlockHeight) {
    const allProposals = await this.getPastEvents();
    const [activeIds] = await this.checkProposalsByStatus(
      allProposals.filter((proposals) => proposals.blockNumber >= minimalActiveBlockHeight)
    );

    const transformToId = activeIds.map((item) => item.id);
    const endedIds = allProposals.filter(({ id }) => !includes(transformToId, id));
    return [activeIds, endedIds];
  }

  transformParameterType (id) {
    const type = ['None', 'Address', 'Uint', 'String', 'Byte', 'Boolean'];
    return type[Number(id)];
  }

  async getParametersArr (id) {
    const contract = await this.getContractInstance();
    const result = await contract.getParametersArr(id);
    return result;
  }

  async getProposalParametersData (id) {
    const parameters = await this.getParametersArr(id);
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
