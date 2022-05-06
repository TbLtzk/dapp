import { getStatusTransformation } from './base-voting-helper';
import VotingService from './voting-service-helper';

import { getConstitutionVotingInstance } from 'contracts/contract-instance';

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

  getProposalNumberType (type) {
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

  async createProposal (data, userAddress) {
    const contract = await this.getContractInstance();
    const classification = this.getProposalNumberType(data?.classification);
    const hash = data.hash;
    const link = data['external-link'];
    const changeParams = data['change-constitution-parameter'] === 'yes';
    const params = [];
    if (changeParams) {
      const paramsArray = data['parameter-type'].reduce((types, item, index) => {
        types.push({
          paramType: item,
          paramKey: data['parameter-key'][index],
          paramValue: data['parameter-value'][index]
        });
        return types;
      }, []);
      params.push(...paramsArray);
    }
    return await contract.createProposal(link, classification, hash, params, {
      from: userAddress
    });
  }

  async getConstitutionHash () {
    const contract = await getConstitutionVotingInstance();
    const result = await contract.constitutionHash();
    return result;
  }
}
