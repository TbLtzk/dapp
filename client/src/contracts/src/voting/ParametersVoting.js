import { drizzleRegistry, contracts } from '../../config/drizzle-config';
import VotingService from './VotingService';
import {
  convertNumVotes,
  getParameterTypeTransformation,
  getStatusTransformation, transformToPercentage
} from '../../handler/VotingHandler';

/*EPQFI_ParametersVoting, EPDR_ParametersVoting*/
export default class ParametersVoting extends VotingService {

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
      objRes.id = id;
      objRes.remark = promiseRes.base.remark;
      objRes.parameterKey = promiseRes.parameterKey;
      objRes.parameterType = getParameterTypeTransformation(promiseRes.parameterType);
      objRes.addrValue = promiseRes.parameterValue.addrValue;
      objRes.boolValue = promiseRes.parameterValue.boolValue;
      objRes.bytes32Value = promiseRes.parameterValue.bytes32Value;
      objRes.strValue = promiseRes.parameterValue.strValue;
      objRes.uintValue = promiseRes.parameterValue.uintValue;

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
      objRes.title = this.contractName === 'EPDR_ParametersVoting'
        ? 'DeFi Risk Expert parameter voting proposals'
        : 'Fees & Incentives Experts parameter voting proposals';
      objRes.type = this.contractName === 'EPDR_ParametersVoting'
        ? 'DeFi Risk Expert Parameters Proposals'
        : 'Fees & Incentives Experts Parameters Proposals';
      objRes.kindVoting = 'parameters';
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
    try {
      let result = null;
      const link = data['external-link'];
      const typeValueProposal = data['type-value-proposal'];
      const key = data.key;
      let valueInput = data.value;
      // candidate = "0x00Ec0A77f6813dB9c01C65d2E2a086EE60e69ed7"; //usual account 1
      switch (typeValueProposal) {
        case 'address':
          // valueInput = '0x00Ec0A77f6813dB9c01C65d2E2a086EE60e69ed7';
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
          valueInput = Number(valueInput);
          result = await this.contract.methods.createUintProposal(link, key, valueInput)
            .send(
              { from: userAddress });
          break;
        // case "asset-uint":
        //     valueInput = Number(valueInput);
        //     result = await this.contract.methods.createAssetUintProposal(link, key, valueInput, 'QBTC:QUSD').send(
        //         {from: userAddress});
        //     break;
        default:
          return null;
      }
      return result;
    } catch (e) {
      console.warn('ERROR', e);
    }

  }
}
