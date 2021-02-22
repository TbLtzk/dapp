import { contracts } from '../../config/drizzle-config';
import { fromWei } from 'func/balance';
import { getPercentageFormat } from '../../handler/VotingHandler';

/*contacts: RootNodesSlashingEscrow, ValidatorsSlashingEscrow*/
export default class SlashingEscrow {

  constructor(contractName) {
    this.contract = contracts[contractName];
    this.contractName = contractName;
  }

  getTitleStatus(statusID) {
    const status = ['None', 'Open', 'Accepted', 'Pending', 'Decided', 'Executed'];
    return status[Number(statusID)];
  }

  async getStatus(id) {
    const result = await this.contract.methods.getStatus(id)
      .call();
    return result;
  }

  async getDecisionStats(id) {
    const result = await this.contract.methods.getDecisionStats(id)
      .call();
    return result;
  }

  async recallProposedDecision(id, userAddress) {
    const result = await this.contract.methods.recallProposedDecision(id)
      .send(
        { from: userAddress });
    return result;
  }

  async confirmDecision(id, userAddress) {
    const result = await this.contract.methods.confirmDecision(id)
      .send(
        { from: userAddress });
    return result;
  }

  async getArbitrationInfos(id) {
    const result = await this.contract.methods.arbitrationInfos(id)
      .call();
    return result;
  }

  async castObjection(id, link, userAddress) {
    const result = await this.contract.methods.castObjection(id, link)
      .send(
        { from: userAddress });
    return result;
  }

  async proposeDecision(id, percentage, notAppealed, link, userAddress) {
    const percentageStake = getPercentageFormat(percentage);
    const result = await this.contract.methods.proposeDecision(id, percentageStake, notAppealed, link)
      .send(
        { from: userAddress });
    return result;
  }
}
