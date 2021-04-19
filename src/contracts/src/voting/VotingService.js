import { contracts } from '../../config/config';
import {
  convertNumVotes,
  getPastEvents,
  getPastProposalsIds, transformToPercentage,
} from '../../handler/VotingHandler';

export default class VotingService {

  constructor(contractName) {
    this.contract = contracts[contractName];
    this.contractName = contractName;
  }

  async getProposalsEvent() {
    return await getPastEvents(this.contract, 'ProposalCreated');
  }

  async getProposal(id) {
    const result = await this.contract.methods.proposals(id)
      .call();
    return result;
  }

  async getProposalStatus(id) {
    const result = await this.contract.methods.getStatus(id)
      .call();
    return result;
  }

  async getProposalStats(id) {
    const result = await this.contract.methods.getProposalStats(id)
      .call();
    return result;
  }

  async getVetoesNumber(id) {
    const result = await this.contract.methods.getVetosNumber(id)
      .call();
    return result;
  }

  async getVetoesPercentage(id) {
    const result = await this.contract.methods.getVetosPercentage(id)
      .call();
    return result;
  }

  async voteAgainst(id, userAddress) {
    const result = await this.contract.methods.voteAgainst(id)
      .send(
        { from: userAddress });

    return result;
  }

  async voteFor(id, userAddress) {
    const result = await this.contract.methods.voteFor(id)
      .send(
        { from: userAddress });
    return result;
  }

  async veto(id, userAddress) {
    const result = await this.contract.methods.veto(id)
      .send(
        { from: userAddress });
    return result;
  }

  async execute(id, userAddress) {
    let promiseStatus = await this.getProposalStatus(id);
    let result = null;
    if (promiseStatus === '4') {
      result = await this.contract.methods.execute(id)
        .send(
          { from: userAddress });
    }
    return result;
  }

  async getOneProposal(id) {
    if (id) {
      let objRes = null;
      let promiseStatus = await this.getProposalStatus(id);
      if (promiseStatus === '1' || promiseStatus === '3' || promiseStatus === '4'
        || promiseStatus === '5') {
        let promiseRes = await this.getProposal(id);
        if (promiseRes) {
          objRes = await this.getProposalData(promiseRes, id, promiseStatus);
        }
      } else {
        return objRes;
      }
      return [objRes];
    }
  }

  async getProposalWithoutStatusChecked(id) {
    if (id) {
      let objRes = null;
      let promiseStatus = await this.getProposalStatus(id);
      let promiseRes = await this.getProposal(id);
      if (promiseRes) {
        objRes = await this.getProposalData(promiseRes, id, promiseStatus);
      }
      return [objRes];
    }
  }

  async getProposalData(promiseRes, id, promiseStatus) {
  }

  async getProposals() {
    const proposalEvents = await this.getProposalsEvent();
    const proposalIds = getPastProposalsIds(proposalEvents);
    let proposals = [];
    if (proposalIds) {
      for (let id of proposalIds) {
        let objRes = {};
        let promiseStatus = await this.getProposalStatus(id);
        if (promiseStatus === '1' || promiseStatus === '3' || promiseStatus === '4') {
          let promiseRes = await this.getProposal(id);
          if (promiseRes) {
            objRes = await this.getProposalData(promiseRes, id, promiseStatus);
            proposals.push(objRes);
          }
        }

      }
    }
    return proposals;
  }

  async getEndedProposals() {
    const proposalEvents = await this.getProposalsEvent();
    const proposalIds = getPastProposalsIds(proposalEvents);
    let proposals = [];
    if (proposalIds) {
      for (let id of proposalIds) {
        let objRes = {};
        let promiseStatus = await this.getProposalStatus(id);
        if (promiseStatus !== '1' || promiseStatus !== '3' || promiseStatus !== '4') {
          let promiseRes = await this.getProposal(id);
          if (promiseRes) {
            objRes = await this.getProposalData(promiseRes, id, promiseStatus);
            proposals.push(objRes);
          }
        }

      }
    }
    return proposals;
  }

  async getProposalStatsData(id) {
    let objRes = {};
    let proposalStats = await this.getProposalStats(id);
    objRes.currentMajority = transformToPercentage(proposalStats.currentMajority);
    objRes.currentQuorum = transformToPercentage(proposalStats.currentQuorum);
    objRes.currentVetoPercentage = transformToPercentage(proposalStats.currentVetoPercentage);
    objRes.requiredMajority = transformToPercentage(proposalStats.requiredMajority);
    objRes.requiredQuorum = transformToPercentage(proposalStats.requiredQuorum);
    objRes.vetoThreshold = '50';
    return objRes;
  }

  async getProposalsCount() {
    const proposalEvents = await this.getProposalsEvent();
    const proposalIds = getPastProposalsIds(proposalEvents);
    let proposalsActive = 0;
    let proposalsEnded = 0;
    if (proposalIds) {
      for (let id of proposalIds) {
        let promiseStatus = await this.getProposalStatus(id);
        if (promiseStatus === '1' || promiseStatus === '3' || promiseStatus === '4') {
          proposalsActive++;
        } else {
          proposalsEnded++;
        }
      }
    }
    return {
      ended: proposalsEnded,
      active: proposalsActive
    };
  }

  transformParameterType(id) {
    const type = ['None', 'Address', 'Uint', 'String', 'Byte', 'Boolean'];
    return type[Number(id)];
  }

  async getParametersArr(id) {
    const result = await this.contract.methods.getParametersArr(id)
      .call();
    return result;
  }

  async getProposalParametersData(id) {
    let objRes = {};
    const parametersArr = await this.getParametersArr(id);
    let value = null;
    let parameterType = this.transformParameterType(parametersArr[0].paramType);
    switch (parameterType) {
      case 'Address':
        value = parametersArr[0].addrValue;
        break;
      case 'Uint':
        value = parametersArr[0].uintValue;
        break;
      case 'String':
        value = parametersArr[0].strValue;
        break;
      case 'Byte':
        value = parametersArr[0].bytes32Value;
        break;
      case 'Boolean':
        value = parametersArr[0].boolValue;
        break;
    }
    objRes.parameterType = parameterType;
    objRes.parameterValue = value;
    objRes.parameterKey = parametersArr[0].paramKey;
    return objRes;
  }

}
