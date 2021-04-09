import { drizzleRegistry } from '../../config/drizzle-config';
import VotingService from './VotingService';

import {
  getStatusTransformation, transformToPercentage
} from '../../handler/VotingHandler';
import { BN } from 'func/useful';

/*EPQFI_ParametersVoting, EPDR_ParametersVoting*/
export default class ParametersVoting extends VotingService {

  async getProposalData(promiseRes, id, promiseStatus) {
    let objRes = {};
    let objStats = {};
    let objParameters = {};
    objRes.id = id;
    objRes.remark = promiseRes.base.remark;
    objRes.vetosCount = promiseRes.base.counters.vetosCount;
    // objRes.votesAgainst = promiseRes.base.counters.weightAgainst;
    // objRes.votesFor = promiseRes.base.counters.weightFor;
    //number of voting people against
    const weightAgainst = promiseRes.base.counters.weightAgainst;
    objRes.votesAgainst = weightAgainst;
    //number of voting people for
    const weightFor = promiseRes.base.counters.weightFor;
    objRes.votesFor = weightFor;
    //the ending is given by: vetoEndTime.
    objRes.vetoEndTime = promiseRes.base.params.vetoEndTime;
    //the time until when users can vote
    objRes.votingEndTime = promiseRes.base.params.votingEndTime;

    objRes.status = getStatusTransformation(promiseStatus);
    objRes.title = this.contractName === 'EPDR_ParametersVoting'
      ? 'DeFi Risk Expert parameter voting proposals'
      : 'Fees & Incentives Experts parameter voting proposals';
    objRes.type = this.contractName === 'EPDR_ParametersVoting'
      ? 'DeFi Risk Expert Parameters Proposals'
      : 'Fees & Incentives Experts Parameters Proposals';
    objRes.kindVoting = 'parameters';
    objStats = await this.getProposalStatsData(id);
    objRes.contract = this.contractName;
    const parametersSize = promiseRes.parametersSize;
    if (parametersSize >= '1') {
      objParameters = await this.getProposalParametersData(id);
    }
    if (weightFor > 0 || weightAgainst > 0) {
      objRes.numberProposalVotes = {
        votesFor: Number(weightFor),
        votesAgainst: Number(weightAgainst)
      };
    }
    return { ...objRes, ...objStats, ...objParameters };
  }

  async createProposal(data, userAddress) {
    let result = null;
    const link = data['external-link'];
    const typeValueProposal = data['type-value-proposal'];
    const key = data.key;
    let valueInput = data.value;
    switch (typeValueProposal) {
      case 'address':
        result = await this.contract.methods.createAddrProposal(link, key, valueInput)
          .send(
            { from: userAddress });
        break;
      case 'boolean':
        valueInput = (valueInput.toLowerCase() === 'true');
        result = await this.contract.methods.createBoolProposal(link, key, valueInput)
          .send(
            { from: userAddress });
        break;
      case 'string':
        result = await this.contract.methods.createStrProposal(link, key, valueInput)
          .send(
            { from: userAddress });
        break;
      case 'bytes':
        valueInput = drizzleRegistry.web3.utils.fromAscii(valueInput);
        result = await this.contract.methods.createBytesProposal(link, key, valueInput)
          .send(
            { from: userAddress });
        break;
      case 'uint':
        valueInput = BN(valueInput);
        result = await this.contract.methods.createUintProposal(link, key, valueInput)
          .send(
            { from: userAddress });
        break;
      default:
        return null;
    }
    return result;
  }
}
