import { drizzleRegistry, contracts } from '../config/drizzle-config';
import {
  getStatusTransformation,
  convertNumVotes,
  getPercentageFormat, transformToPercentage
} from '../handler/VotingHandler';
import { fromWei } from 'func/balance';

/*contacts: RootNodesSlashingEscrow, ValidatorsSlashingEscrow*/
export default class SlashingEscrow {

  constructor(contractName) {
    this.contract = contracts[contractName];
    this.contractName = contractName;
  }

  getTitleStatus(statusID){
    const status = ['None', 'Open', 'Accepted', 'Pending', 'Decided', 'Executed'];
    return status[Number(statusID)];
  }

  async getStatus(id) {
    try {
      const result = await this.contract.methods.getStatus(id)
        .call();
      console.log("getStatus", result);
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async getArbitrationInfos(id) {
    try {
      const result = await this.contract.methods.arbitrationInfos(id)
        .call();
      console.log("getArbitrationInfos", result);
      return result;
    } catch (e) {
      console.log(e);
    }
  }
}
