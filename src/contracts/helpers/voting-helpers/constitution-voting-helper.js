import { getStatusTransformation } from './base-voting-helper';
import VotingService from './voting-service-helper';

import { CONTRACTS_NAMES } from 'constants/contracts';
import { fromWei } from 'func/balance';

export default class ConstitutionVoting extends VotingService {
  getProposalStringType (type) {
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

  async getProposalAdditionalData (promiseRes, id) {
    const objRes = {};
    let objStats = {};
    let parameters = [];
    objRes.remark = promiseRes.base.remark;
    const proposalType = this.getProposalStringType(promiseRes.classification);
    objRes.type = proposalType;
    objRes.newConstitutionHash = promiseRes.newConstitutionHash;
    objRes.currentConstitutionHash = promiseRes.currentConstitutionHash;
    const parametersSize = promiseRes.parametersSize;
    if (parametersSize >= '1') {
      parameters = await this.getProposalParametersData(id);
    }
    const weightAgainst = promiseRes.base.counters.weightAgainst;
    objRes.votesAgainst = fromWei(weightAgainst);
    const weightFor = promiseRes.base.counters.weightFor;
    objRes.votesFor = fromWei(weightFor);
    objRes.vetosCount = promiseRes.base.counters.vetosCount;

    objStats = await this.getProposalStatsData(id);

    if (weightFor > 0 || weightAgainst > 0) {
      objRes.numberProposalVotes = {
        votesFor: Number(objRes.votesFor),
        votesAgainst: Number(objRes.votesAgainst)
      };
    }

    return {
      ...objRes,
      ...objStats,
      parameters
    };
  }

  getProposalData (promiseRes, id, promiseStatus) {
    const objRes = {};
    objRes.contract = CONTRACTS_NAMES.constitutionVoting;
    const proposalType = this.getProposalStringType(promiseRes.classification);
    objRes.status = getStatusTransformation(promiseStatus);
    objRes.title = `${proposalType} constitution proposal`;
    objRes.id = id;
    objRes.votingEndTime = promiseRes.base.params.votingEndTime;
    objRes.vetoEndTime = promiseRes.base.params.vetoEndTime;
    return objRes;
  }
}
