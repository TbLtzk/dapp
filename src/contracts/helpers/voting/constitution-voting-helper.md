import { Parameter } from '@q-dev/q-js-sdk';
import { ConstitutionVotingInstance } from '@q-dev/q-js-sdk/lib/contracts/governance/constitution/ConstitutionVotingInstance';
import { CreateProposalForm, Proposal } from 'typings/forms';

import { getStatusTransformation } from './base-voting-helper';

import { getConstitutionVotingInstance } from 'contracts/contract-instance';

import { CONTRACTS_NAMES } from 'constants/contracts';
import { fromWei } from 'func/balance';

export class ConstitutionVoting {
  contract: ConstitutionVotingInstance

  private constructor (contract: ConstitutionVotingInstance) {
    this.contract = contract;
  }

  static async create () {
    const contract = await getConstitutionVotingInstance();
    return new ConstitutionVoting(contract);
  }

  getProposalStringType (type: string) {
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
    const proposalType = this.getProposalStringType(promiseRes.classification);
    const proposal: Proposal = {
      contract: CONTRACTS_NAMES.constitutionVoting,
      status: getStatusTransformation(promiseStatus),
      title: `${proposalType} constitution proposal`,
      id: id,
      votingEndTime: promiseRes.base.params.votingEndTime,
      vetoEndTime: promiseRes.base.params.vetoEndTime
    };

    return proposal;
  }

  getProposalNumberType (type: string) {
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

  createProposal (proposal: CreateProposalForm, userAddress: string) {
    const params: Parameter[] = [];
    if (proposal.isParamsChanged) {
      const paramsArray = proposal.params.map((item) => ({
        paramType: item.type,
        paramKey: item.key,
        paramValue: item.value
      }));
      params.push(...paramsArray);
    }

    return this.contract.createProposal(
      proposal.externalLink,
      this.getProposalNumberType(proposal.classification),
      proposal.hash,
      params,
      { from: userAddress }
    );
  }

  getConstitutionHash () {
    return this.contract.constitutionHash();
  }
}
