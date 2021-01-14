import {
  convertNumVotes,
  getPastEvents,
  getPastProposalsIds, transformToPercentage,
} from 'api/contracts/Voting/handler/commonFunc';

export default class AuctionService {

  constructor(drizzle, contractName) {

    this.drizzle = drizzle;

    this.contract = drizzle.contracts[contractName];
    this.contractName = contractName;
  }

  /**
   * get auction event
   * @return array
   */
  async getAuctionsEvent() {
    try {
      return await getPastEvents(this.drizzle, this.contractName, 'AuctionStarted');
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * get proposal
   * @param id
   * @return array
   */
  async getProposal(id) {
    try {
      const result = await this.contract.methods.proposals(id)
        .call();
      return result;
    } catch (e) {
      console.log(e);
    }
  }

}
