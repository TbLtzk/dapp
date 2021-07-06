import VotingService from './VotingService';

import {
  getStatusTransformation, transformToPercentage
} from '../../handler/VotingHandler';
import { BN } from 'func/useful';
import { ParameterType } from '@q-dev/q-js-sdk';
import { parameterVote } from 'pages/UserPages/Proposals/components/CreateQProposalBtn/ModalCreateProposal/CreateStep2/QExpertS2/constants';
import { epqfiParametersVoting, epdrParametersVoting } from 'contracts/contracts';
import { GOVERNS_TYPES } from 'constants/contracts';

/*EPQFI_ParametersVoting, EPDR_ParametersVoting*/
export default class ParametersVoting extends VotingService {

  async getProposalData(promiseRes, id, promiseStatus) {
    let objRes = {};
    let objStats = {};
    let parameters = [];
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
      parameters = await this.getProposalParametersData(id);
    }
    if (weightFor > 0 || weightAgainst > 0) {
      objRes.numberProposalVotes = {
        votesFor: Number(objRes.votesFor),
        votesAgainst: Number(objRes.votesAgainst)
      };
    }
    return {
      ...objRes,
      ...objStats,
      parameters: parameters
    };
  }

  async createProposal(data) {
    let result = {};
    const link = data['external-link'];
    const paramInputs = data[parameterVote.parameterType]
      .reduce((types, item, index) => {
        let inputValue = data[parameterVote.parameterValue][index];
        switch (+item) {
          case ParameterType.BOOL:
            inputValue = (inputValue.toLowerCase() === 'true');
            break;
          case ParameterType.UINT:
            inputValue = BN(inputValue)
              .toFixed();
            break;
        }
        types.push({
          paramType: item,
          paramKey: data[parameterVote.parameterKey][index],
          paramValue: inputValue,
        });
        return types;
      }, []);
    switch (data[parameterVote.radioBtnName]) {
      case GOVERNS_TYPES.qFee:
        result = epqfiParametersVoting.createProposal(link, paramInputs);
        break;
      case GOVERNS_TYPES.qDefi:
        result = epdrParametersVoting.createProposal(link, paramInputs);
        break;
      default:
        console.error('Unknown type');
        return null;
    }
    return result;
  }
}
