import { drizzleRegistry, contracts } from '../../config/drizzle-config';
import {
  getStatusTransformation,
  convertNumVotes,
  getPercentageFormat, transformToPercentage
} from '../../handler/VotingHandler';
import VotingService from './VotingService';

/*contacts: RootNodesSlashingVoting, ValidatorsSlashingVoting*/
export default class SlashingVoting extends VotingService {

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
      console.log("promiseRes", promiseRes);
      objRes.id = id;
      objRes.remark = promiseRes.base.remark;
      objRes.candidate = promiseRes.candidate;
      objRes.amountToSlash = drizzleRegistry.web3.utils.fromWei(promiseRes.amountToSlash, 'ether');
      objRes.vetosCount = promiseRes.base.counters.vetosCount;
      // objRes.votesAgainst = promiseRes.base.counters.weightAgainst;
      // objRes.votesFor = promiseRes.base.counters.weightFor;
      //number of voting people against
      const weightAgainst = promiseRes.base.counters.weightAgainst;
      objRes.votesAgainst = weightAgainst;
      //number of voting people for
      const weightFor = promiseRes.base.counters.weightFor;
      objRes.votesFor =  weightFor;
      //the ending is given by: vetoEndTime.
      objRes.vetoEndTime = promiseRes.base.params.vetoEndTime;
      //the time until when users can vote
      objRes.votingEndTime = promiseRes.base.params.votingEndTime;

      objRes.status = getStatusTransformation(promiseStatus);
      objRes.title = this.contractName === 'ValidatorsSlashingVoting'
        ? 'Validator slashing proposals' : 'Root Nodes slashing proposals';
      objRes.type = this.contractName === 'ValidatorsSlashingVoting'
        ? 'validator slashing' : 'root nodes slashing';
      objStats = await this.getProposalStatsData(id);
      objRes.contract = this.contractName;

      return { ...objRes, ...objStats };
    } catch (e) {
      console.log('e', e);
    }
  }

  /**
   * create proposal
   * @param data
   * @param userAddress
   * @return string
   */
  async createProposal(data, userAddress) {
    console.log('DATA', data);
    const link = data['external-link'];
    //percentage of stake to slash
    let percentageStake = data['%-value'];
    percentageStake = getPercentageFormat(percentageStake);
    let candidate = data['address'];
    // console.log("candidate", candidate);
    // console.log("percentageStake", percentageStake);
    // candidate = "0x6a39b688d591ea00c9ea69658438794204b5cc62";
    // candidate = this.contractName === 'ValidatorsSlashingVoting' //validator member
    //   ? '0x6a39b688d591ea00c9ea69658438794204b5cc62'
    //   : '0x4a14D788D86D021670EBcecE1196631d66595984'; //root member
    const result = await this.contract.methods.createProposal(link, candidate, percentageStake)
      .send(
        { from: userAddress });
    return result;
  }
}
