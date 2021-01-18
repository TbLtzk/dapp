import {
  convertNumVotes,
  getPastEvents,
  getPastProposalsIds, transformToPercentage,
} from 'api/contracts/Voting/handler/commonFunc';

export default class VotingService {

  constructor(drizzle, contractName) {
    this.drizzle = drizzle;

    this.contract = drizzle.contracts[contractName];
    this.contractName = contractName;
  }

  /**
   * get proposal event
   * @return array
   */
  async getProposalsEvent() {
    try {
      return await getPastEvents(this.drizzle, this.contractName, 'ProposalCreated');
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * get proposal
   * @param id
   * @return array
   */
  async getProposal(id) {
    try {
      const result = await this.contract.methods.proposals(id)
        .call();
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * get proposal status
   * @param id
   * @return string
   */
  async getProposalStatus(id) {
    try {
      const result = await this.contract.methods.getStatus(id)
        .call();
      // console.log("getStatus", result);
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * proposal stats
   * @param id
   * @return array
   */
  async getProposalStats(id) {
    try {
      const result = await this.contract.methods.getProposalStats(id)
        .call();
      // console.log("getProposalStats", result);
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * get vetoes number
   * @param id
   * @return array
   */
  async getVetoesNumber(id) {
    try {
      const result = await this.contract.methods.getVetosNumber(id)
        .call();
      // console.log("getVetoesNumber", result);
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * get vetoes percentage
   * @param id
   * @return array
   */
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

  /**
   * vote against proposal
   * @param id
   * @param userAddress
   * @return array
   */
  async voteAgainst(id, userAddress) {
    try {
      let result = null;
      if (this.contractName === 'RootNodesSlashingVoting' || this.contractName === 'ValidatorsSlashingVoting'
        || this.contractName === 'EPDR_ParametersVoting' || this.contractName === 'EPQFI_ParametersVoting'
        || this.contractName === 'EmergencyUpdateVoting') {
        result = await this.contract.methods.voteAgainst(id)
          .send(
            { from: userAddress });
      } else {
        result = await this.contract.methods.voteAgainst(id, true)
          .send(
            { from: userAddress });
      }
      console.log('voteAgainst', result);
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * vote for proposal
   * @param id
   * @param userAddress
   * @return array
   */
  async voteFor(id, userAddress) {
    let result = null;
    if (this.contractName === 'RootNodesSlashingVoting' || this.contractName === 'ValidatorsSlashingVoting'
      || this.contractName === 'EPDR_ParametersVoting' || this.contractName === 'EPQFI_ParametersVoting'
      || this.contractName === 'EmergencyUpdateVoting') {
      result = await this.contract.methods.voteFor(id)
        .send(
          { from: userAddress });
    } else {
      result = await this.contract.methods.voteFor(id, true)
        .send(
          { from: userAddress });
    }

    console.log('voteFor', result);
    return result;
  }

  /**
   * veto for proposal
   * @param id
   * @param userAddress
   * @return array
   */
  async veto(id, userAddress) {
    console.log('veto id', id);
    console.log('veto userAddress', userAddress);
    const result = await this.contract.methods.veto(id)
      .send(
        { from: userAddress });
    console.log('veto', result);
    return result;
  }

  /**
   * applies changes for specified proposal after voting
   * @param id
   * @param userAddress
   * @return array
   */
  async execute(id, userAddress) {
    // 4 === passed status
    console.log('execute id', id);
    console.log('execute userAddress', userAddress);
    let promiseStatus = await this.getProposalStatus(id);
    console.log('execute promiseStatus', promiseStatus);
    let result = null;
    if (promiseStatus === '4') {
      result = await this.contract.methods.execute(id)
        .send(
          { from: userAddress });
      console.log('execute', result);
    }
    return result;
  }

  /**
   * get one proposal
   * @param id
   * @return array
   */
  async getOneProposal(id) {
    try {
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
    } catch (e) {
      console.log(e);
    }

  }

  /**
   * get proposal with any status
   * @param id
   * @return array
   */
  async getProposalWithoutStatusChecked(id) {
    try {
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
    } catch (e) {
      console.log(e);
    }

  }

  /**
   * get proposal data
   * @param promiseRes
   * @param id
   * @param promiseStatus
   * @return array
   */
  async getProposalData(promiseRes, id, promiseStatus) {
  }

  /**
   * get proposals
   * @return array
   */
  async getProposals() {
    try {
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
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * get ended proposals
   * @return array
   */
  async getEndedProposals() {
    try {
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
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * proposal stats data
   * @param id
   * @return array
   */
  async getProposalStatsData(id) {
    try {
      let objRes = {};
      let proposalStats = await this.getProposalStats(id);
      objRes.currentMajority = transformToPercentage(proposalStats.currentMajority);
      objRes.currentQuorum = transformToPercentage(proposalStats.currentQuorum);
      objRes.currentVetoPercentage = transformToPercentage(proposalStats.currentVetoPercentage);
      objRes.requiredMajority = transformToPercentage(proposalStats.requiredMajority);
      objRes.requiredQuorum = transformToPercentage(proposalStats.requiredQuorum);
      objRes.vetoThreshold = transformToPercentage(proposalStats.vetoThreshold);
      return objRes;
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * VotingOption {NONE, FOR, AGAINST}
   * get proposal votes
   * @param id
   * @return array
   */
  async getProposalVotes(id) {

    try {
      const votesArrAll = await getPastEvents(this.drizzle, this.contractName, 'UserVoted');
      const votesArrById = votesArrAll?.filter((elem) => {
        if (elem.returnValues._id === id) {
          console.log('elem', elem);
          return elem.returnValues;
        }
      });
      const commonVotes = votesArrById?.reduce((sum, current) => {
        console.log('current.returnValues._votingOption', current.returnValues._votingOption);
        console.log('sum', sum);
        switch (current?.returnValues?._votingOption) {
          case '0': //NONE
            return sum['none'] = 0;
          case '1': //FOR
            console.log('sum.votesFor', sum.votesFor);
            return sum += 1;
          case '2': //AGAINST
            return sum['votesAgainst'] = sum['votesAgainst'] + 1;
        }
        // return sum + current.returnValues._votingOption
        // return {votesFor: 1, votesAgainst: 2};
      }, 0);
      console.log('votesArrById', votesArrById);
      console.log('commonVotes', commonVotes);
      return votesArrAll;
    } catch (e) {
      console.log(e);
    }
  }

}
