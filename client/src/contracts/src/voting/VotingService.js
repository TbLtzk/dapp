import { drizzleRegistry, contracts } from '../../config/drizzle-config';
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

  //get proposal event
  async getProposalsEvent() {
    return await getPastEvents(this.contract, 'ProposalCreated');
  }

  //get proposal
  async getProposal(id) {
    const result = await this.contract.methods.proposals(id)
      .call();
    return result;
  }

  //get proposal status
  async getProposalStatus(id) {
    const result = await this.contract.methods.getStatus(id)
      .call();
    return result;
  }

  //proposal stats
  async getProposalStats(id) {
    const result = await this.contract.methods.getProposalStats(id)
      .call();
    // console.log("getProposalStats", result);
    return result;
  }

  //get vetoes number
  async getVetoesNumber(id) {
    const result = await this.contract.methods.getVetosNumber(id)
      .call();
    // console.log("getVetoesNumber", result);
    return result;
  }

  //get vetoes percentage
  async getVetoesPercentage(id) {
    try {
      const result = await this.contract.methods.getVetosPercentage(id)
        .call();
      // console.log("getVetoesPercentage", result);
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  //vote against proposal
  async voteAgainst(id, userAddress) {
    const result = await this.contract.methods.voteAgainst(id)
      .send(
        { from: userAddress });

    return result;
  }

  //vote for proposal
  async voteFor(id, userAddress) {
    const result = await this.contract.methods.voteFor(id)
      .send(
        { from: userAddress });
    return result;
  }

  // veto for proposal
  async veto(id, userAddress) {
    const result = await this.contract.methods.veto(id)
      .send(
        { from: userAddress });
    return result;
  }

  //applies changes for specified proposal after voting
  async execute(id, userAddress) {
    // 4 === passed status
    let promiseStatus = await this.getProposalStatus(id);
    let result = null;
    if (promiseStatus === '4') {
      result = await this.contract.methods.execute(id)
        .send(
          { from: userAddress });
    }
    return result;
  }

  //get one proposal
  async getOneProposal(id) {
    if (id) {
      let objRes = null;
      let promiseStatus = await this.getProposalStatus(id);
      // console.log('promiseStatus', promiseStatus);
      if (promiseStatus === '1' || promiseStatus === '3' || promiseStatus === '4'
        || promiseStatus === '5') {
        let promiseRes = await this.getProposal(id);
        if (promiseRes) {
          objRes = await this.getProposalData(promiseRes, id, promiseStatus);
          // console.log("objRes", objRes);
        }
      } else {
        // console.log('objRes', objRes);
        return objRes;
      }
      return [objRes];
    }
  }

  //get proposal with any status
  async getProposalWithoutStatusChecked(id) {
    if (id) {
      let objRes = null;
      let promiseStatus = await this.getProposalStatus(id);
      let promiseRes = await this.getProposal(id);
      if (promiseRes) {
        objRes = await this.getProposalData(promiseRes, id, promiseStatus);
        // console.log("objRes", objRes);
      }
      return [objRes];
    }
  }

  //get proposal data
  async getProposalData(promiseRes, id, promiseStatus) {
  }

  //get proposals
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

  //get ended proposals
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

  //proposal stats data
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

  /**
   * VotingOption {NONE, FOR, AGAINST}
   * get proposal votes
   * @param id
   * @return array
   */
  async getProposalVotes(id) {

    try {
      const votesArrAll = await getPastEvents(drizzleRegistry, this.contract, 'UserVoted');
      const votesArrById = votesArrAll?.filter((elem) => {
        if (elem.returnValues._id === id) {
          return elem.returnValues;
        }
      });
      const commonVotes = votesArrById?.reduce((sum, current) => {
        // console.log('current.returnValues._votingOption', current.returnValues._votingOption);
        // console.log('sum', sum);
        switch (current?.returnValues?._votingOption) {
          case '0': //NONE
            return sum['none'] = 0;
          case '1': //FOR
            // console.log('sum.votesFor', sum.votesFor);
            return sum += 1;
          case '2': //AGAINST
            return sum['votesAgainst'] = sum['votesAgainst'] + 1;
        }
        // return sum + current.returnValues._votingOption
        // return {votesFor: 1, votesAgainst: 2};
      }, 0);
      // console.log('votesArrById', votesArrById);
      // console.log('commonVotes', commonVotes);
      return votesArrAll;
    } catch (e) {
      console.log(e);
    }
  }

  // get number of active and ended proposals
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
    console.log('getParametersArr', result);
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
