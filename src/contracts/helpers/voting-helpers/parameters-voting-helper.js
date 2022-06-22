
import { getStatusTransformation } from './base-voting-helper';
import VotingService from './voting-service-helper';

import { CONTRACT_TYPES, CONTRACTS_NAMES } from 'constants/contracts';

const proposalTitle = {
  [CONTRACTS_NAMES.ePRSParametersVoting]: 'Q Root Node Selection Expert Panel Parameters',
  [CONTRACTS_NAMES.ePDRParametersVoting]: 'DeFi Risk Expert Parameters Proposals',
  [CONTRACTS_NAMES.ePQFIParametersVoting]: 'Fees & Incentives Experts Parameters Proposals'
};

export default class ParametersVoting extends VotingService {
  async getProposalAdditionalData (data, id) {
    const info = {};
    const statsInfo = await this.getProposalStatsData(id);
    const weightAgainst = data.base.counters.weightAgainst;
    const weightFor = data.base.counters.weightFor;
    const parameters = [];

    info.remark = data.base.remark;
    info.vetosCount = data.base.counters.vetosCount;
    info.votesAgainst = weightAgainst;
    info.votesFor = weightFor;
    info.type = proposalTitle[this.contractName];
    info.kindVoting = CONTRACT_TYPES.parameters;

    if (Number(data.parametersSize) >= 1) {
      const proposalParametersData = await this.getProposalParametersData(id);
      parameters.push(...proposalParametersData);
    }

    if (weightFor > 0 || weightAgainst > 0) {
      info.numberProposalVotes = {
        votesFor: Number(info.votesFor),
        votesAgainst: Number(info.votesAgainst)
      };
    }

    return {
      ...info,
      ...statsInfo,
      parameters
    };
  }

  getProposalData (data, id, status) {
    const info = {};
    info.id = id;
    info.vetoEndTime = data.base.params.vetoEndTime;
    info.votingEndTime = data.base.params.votingEndTime;
    info.status = getStatusTransformation(status);
    info.title = proposalTitle[this.contractName];
    info.contract = this.contractName;
    return info;
  }
}
