import { contracts } from '../../config/drizzle-config';
import VotingService from './VotingService';

import {
  getStatusTransformation
} from '../../handler/VotingHandler';
import { BN, fromWei } from 'func/balance';

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

  async createProposal(data, userAddress) {
    let result = null;
    const classification = this.getProposalNumberType(data?.classification);
    const hash = data.hash;
    const link = data['external-link'];
    const type = data['type-proposal'];
    if (type) {
      const parameterKey = data['parameter-key'];
      let valueInput = data.value;
      switch (type) {
        case 'address':
          result = await this.contract.methods.createAddrProposal(link, classification, hash,
            parameterKey, valueInput)
            .send({ from: userAddress });
          break;
        case 'string':
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
          valueInput = BN(valueInput);
          result = await this.contract.methods.createUintProposal(link, classification, hash,
            parameterKey, valueInput)
            .send({ from: userAddress });
          break;

      }
    } else {
      result = await this.contract.methods.createProposal(link, classification, hash, [])
        .send({ from: userAddress });
    }
    return result;
  }

  async getConstitutionHash() {
    const result = await this.contract.methods.constitutionHash()
      .call();
    return result;
  }

}
