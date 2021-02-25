import { contracts, drizzleRegistry } from '../../config/drizzle-config';
import {
  convertNumVotes,
  getPastEvents,
  getPastProposalsIds,
  calculatePercentage,
  transformToPercentage,
  toFixed,
  bn,
  getStatusTransformation
} from '../../handler/VotingHandler';
import VotingService from './VotingService';
import { fromWei } from 'func/balance';

export default class ConstitutionVoting extends VotingService {
  constructor() {
    super();
    this.contract = contracts['ConstitutionVoting'];
    this.contractName = 'ConstitutionVoting';
  }

  /**
   * get proposal sting type
   * @param type
   * @return string
   */
  getProposalStringType(type) {
    switch (Number(type)) {
      case 0:
        return 'Basic';
      case 1:
        return 'Fundamental';
      case 2:
        return 'Detailed';
      default:
        return 'None';
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
    let objParameters = {};
    objRes.id = id;
    objRes.remark = promiseRes.base.remark;
    const proposalType = this.getProposalStringType(promiseRes.classification);
    objRes.type = proposalType;
    objRes.newConstitutionHash = promiseRes.newConstitutionHash;
    objRes.currentConstitutionHash = promiseRes.currentConstitutionHash;
    const parametersSize = promiseRes.parametersSize;
    if (parametersSize >= '1') {
      objParameters = await this.getProposalParametersData(id);
    }
    const weightAgainst = promiseRes.base.counters.weightAgainst;
    objRes.votesAgainst = fromWei(weightAgainst);
    const weightFor = promiseRes.base.counters.weightFor;
    objRes.votesFor = fromWei(weightFor);
    objRes.vetosCount = promiseRes.base.counters.vetosCount;
    objRes.votingEndTime = promiseRes.base.params.votingEndTime;
    objRes.vetoEndTime = promiseRes.base.params.vetoEndTime;

    objRes.status = getStatusTransformation(promiseStatus);
    // objRes.vetoesNumber = await this.getVetoesNumber(id);
    // objRes.vetoesPercentage = await this.getVetoesPercentage(id);
    objRes.title = `${proposalType} constitution proposal`;
    objStats = await this.getProposalStatsData(id);
    // console.log('UserVoted', await this.getProposalVotes(id));
    objRes.contract = this.contractName;
    return { ...objRes, ...objStats, ...objParameters };
  }

  /**
   * get proposal number type
   * @param type
   * @return number
   */
  getProposalNumberType(type) {
    switch (type) {
      case 'basic-part':
        return 0;
      case 'fundamental-part':
        return 1;
      case 'detailed-part':
        return 2;
      default:
        return 0;
    }
  }

  /**
   * create proposal
   * @param data
   * @param userAddress
   * @return string
   */
  async createProposal(data, userAddress) {
    try {
      let result = null;
      const classification = this.getProposalNumberType(data?.classification);
      // const hash = '0xc81ff8689878486c77098faba9d872fd6b0ab442fa97d9c76ff94c5c56d6a6a9'.toLowerCase();
      const hash = data.hash.toLowerCase();
      const link = data['external-link'];
      const type = data['type-proposal'];
      if (type) {
        const parameterKey = data['parameter-key'];
        let valueInput = data.value;
        switch (type) {
          case 'address':
            // valueInput = '0xcca19442F5b3e5Fa71aaE69C092aC280e81Fd39f';
            result = await this.contract.methods.createAddrProposal(link, classification, hash,
              parameterKey, valueInput)
              .send({ from: userAddress });
            break;
          case 'string':
            // valueInput = 'abcd';
            result = await this.contract.methods.createStrProposal(link, classification, hash,
              parameterKey, valueInput)
              .send({ from: userAddress });
            break;
          case 'boolean':
            valueInput = (valueInput.toLowerCase() === 'true');
            result = await this.contract.methods.createBoolProposal(link, classification, hash,
              parameterKey, valueInput)
              .send({ from: userAddress });
            break;
          case 'uint':
            valueInput = Number(valueInput);
            result = await this.contract.methods.createUintProposal(link, classification, hash,
              parameterKey, valueInput)
              .send({ from: userAddress });
            break;

        }
      } else {
        result = await this.contract.methods.createProposal(link, classification, hash, [])
          .send(
            { from: userAddress });
      }

      return result;
    } catch (e) {
      console.log('e', e);
    }
  }

  /**
   * get constitution hash
   * @return string
   */
  async getConstitutionHash() {
    const result = await this.contract.methods.constitutionHash()
      .call();
    return result;
  }

}
