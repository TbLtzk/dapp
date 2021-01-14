import { web3, contracts } from '../../config/drizzle-config';
import {
  getStatusTransformation,
  convertNumVotes, transformToPercentage
} from '../../handler/VotingHandler';
import VotingService from './VotingService';

const EMPTY_ADDR = '0x0000000000000000000000000000000000000000';

export default class RootsVoting extends VotingService {

  /**
   * check proposal type depends on candidate and replaceDest addresses
   * @param candidateAddress
   * @param replaceDestAddress
   * @return string
   */
  checkProposalTitle(candidateAddress, replaceDestAddress) {
    if (candidateAddress !== EMPTY_ADDR && replaceDestAddress !== EMPTY_ADDR) {
      return 'Rode Node Swapping Proposal';
    } else if (candidateAddress && replaceDestAddress === EMPTY_ADDR) {
      return 'Root Node Adding Proposal';
    } else if (candidateAddress === EMPTY_ADDR && replaceDestAddress) {
      return 'Root Node Removing proposal';
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
    let objRes = {};
    let objStats = {};
    try {
      console.log('promiseRes', promiseRes);
      objRes.id = id;
      objRes.remark = promiseRes.base.remark;
      const candidateAddress = promiseRes.candidate;
      objRes.candidate = candidateAddress;
      const replaceDestAddress = promiseRes.replaceDest;
      objRes.replaceDest = replaceDestAddress;
      objRes.votesCount = promiseRes.votesCount;
      // objRes.votesAgainst = promiseRes.base.counters.weightAgainst;
      // objRes.votesFor = promiseRes.base.counters.weightFor;
      const weightAgainst = promiseRes.base.counters.weightAgainst;
      objRes.votesAgainst = web3.utils.fromWei(weightAgainst, 'ether');

      const weightFor = promiseRes.base.counters.weightFor;
      objRes.votesFor = web3.utils.fromWei(weightFor, 'ether');
      objRes.requiredMajority = promiseRes.base.params.requiredMajority;
      objRes.requiredQuorum = promiseRes.base.params.requiredQuorum;
      //the ending is given by: vetoEndTime.
      objRes.vetoEndTime = promiseRes.base.params.vetoEndTime;
      objRes.vetoThreshold = promiseRes.base.params.vetoThreshold;
      //the time until when users can vote
      objRes.votingEndTime = promiseRes.base.params.votingEndTime;

      objRes.title = this.checkProposalTitle(candidateAddress, replaceDestAddress);
      // let getVotesAddress = await this.isUserVote(id, "0x00Ec0A77f6813dB9c01C65d2E2a086EE60e69ed7");
      let getVetoesNumber = await this.getVetoesNumber(id);
      let getVetoesPercentage = await this.getVetoesPercentage(id);
      objRes.vetoesNumber = getVetoesNumber;
      objRes.vetoesPercentage = getVetoesPercentage;
      objStats = await this.getProposalStatsData(id);
      objRes.status = getStatusTransformation(promiseStatus);
      objRes.contract = this.contractName;
      return { ...objRes, ...objStats };
    } catch (e) {
      console.log('e', e);
    }
  }

  /**
   * check is user vote
   * @param id
   * @param address
   * @return boolean
   */
  async isUserVote(id, address) {
    try {
      const result = await this.RootsVoting.methods.votes(id, address)
        .call();
      console.log('votes', result);
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * create proposal
   * @param data
   * @param userAddress
   * @return string
   */
  async createProposal(data, userAddress) {
    console.log("data", data);
    // console.log("DATA", data);
    let result = null;
    // const hash = '0xc81ff8689878486c77098faba9d872fd6b0ab442fa97d9c76ff94c5c56d6a6a9'.toLowerCase();
    // const hash = data.hash.toLowerCase();
    const link = data['external-link'];
    let addressToRemove = data.address;
    // const EMPTY_ADDR = '0x0000000000000000000000000000000000000000';
    if (data.first === 'add-a-new-root-node') {
      const removeCurrent = data['remove-current'];
      if (removeCurrent === 'no') {
        //TODO: in future backenders add to argument list - hash
        result = await this.contract.methods.createProposal(link, userAddress, EMPTY_ADDR)
          .send(
            { from: userAddress });
      } else {
        // addressToRemove = '0x6A39B688d591Ea00C9EA69658438794204B5cC62'; //remove root address
        result = await this.contract.methods.createProposal(link, userAddress, addressToRemove)
          .send(
            { from: userAddress });
      }
    } else if (data.first === 'remove-a-current-root-node') {
      // addressToRemove = '0x6A39B688d591Ea00C9EA69658438794204B5cC62'; //remove root address
      result = await this.contract.methods.createProposal(link, EMPTY_ADDR, addressToRemove)
        .send(
          { from: userAddress });
    }

    return result;
  }
}
