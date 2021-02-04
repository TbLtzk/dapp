import { drizzleRegistry, contracts, web3 } from '../../config/drizzle-config';
import VotingService from './VotingService';
import {
  convertNumVotes,
  getPastEvents,
  getPastProposalsIds,
  getStatusTransformation, transformToPercentage
} from '../../handler/VotingHandler';

/*EPDR_MembershipVoting, EPQFI_MembershipVoting*/
export default class MembershipVoting extends VotingService {

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
      objRes.addressToAdd = promiseRes.proposalDetails.addressToAdd;
      objRes.addressToRemove = promiseRes.proposalDetails.addressToRemove;
      objRes.vetosCount = promiseRes.base.counters.vetosCount;
      // objRes.votesAgainst = promiseRes.base.counters.weightAgainst;
      // objRes.votesFor = promiseRes.base.counters.weightFor;
      const weightAgainst = promiseRes.base.counters.weightAgainst;
      objRes.votesAgainst = drizzleRegistry.web3.utils.fromWei(weightAgainst, 'ether');
      const weightFor = promiseRes.base.counters.weightFor;
      objRes.votesFor = drizzleRegistry.web3.utils.fromWei(weightFor, 'ether');

      //the ending is given by: vetoEndTime.
      objRes.vetoEndTime = promiseRes.base.params.vetoEndTime;
      //the time until when users can vote
      objRes.votingEndTime = promiseRes.base.params.votingEndTime;
      objRes.status = getStatusTransformation(promiseStatus);
      objRes.title = this.contractName === 'EPDR_MembershipVoting'
        ? 'DeFi Risk Expert membership proposals'
        : 'Fees & Incentives Experts membership proposals';
      objRes.type = this.contractName === 'EPDR_MembershipVoting'
        ? 'DeFi Risk Expert membership'
        : 'Fees & Incentives Experts membership';
      objRes.kindVoting = 'membership';
      // objStats = await this.getProposalStatsData(id);
      let proposalStats = await this.getProposalStats(id);
      objRes.currentMajority = transformToPercentage(proposalStats.currentMajority);
      objRes.currentQuorum = transformToPercentage(proposalStats.currentQuorum);
      objRes.currentVetoPercentage = transformToPercentage(proposalStats.currentVetoPercentage);
      objRes.requiredMajority = transformToPercentage(proposalStats.requiredMajority);
      objRes.requiredQuorum = transformToPercentage(proposalStats.requiredQuorum);
      objRes.vetoThreshold = transformToPercentage(proposalStats.vetoThreshold);
      objRes.contract = this.contractName;

      return { ...objRes, ...objStats };
    } catch (e) {
      console.log('e', e);
    }
  }

  /**
   * get proposals
   * @return array
   */
  async getProposals() {
    try {
      //TODO: for createRemoveExpertProposal use RemoveProposalCreated event
      const proposalEvents = await this.getProposalsEvent();
      const proposalRemoveEvents = await getPastEvents(web3, this.contract, 'RemoveProposalCreated');
      const proposalIds = getPastProposalsIds([...proposalEvents, ...proposalRemoveEvents]);
      let proposals = [];
      if (proposalIds) {
        for (let id of proposalIds) {
          let objRes = {};
          let promiseStatus = await this.getProposalStatus(id);
          if (promiseStatus === '1' || promiseStatus === '3' || promiseStatus === '4') {
            let promiseRes = await this.getProposal(id);
            if (promiseRes) {
              objRes = await this.getProposalData(promiseRes, id, promiseStatus);
              proposals.push(objRes);
            }
          }

        }
      }
      return proposals;
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * get proposals
   * @return array
   */
  async getEndedProposals() {
    try {
      //TODO: for createRemoveExpertProposal use RemoveProposalCreated event
      const proposalEvents = await this.getProposalsEvent();
      const proposalRemoveEvents = await getPastEvents(web3, this.contract, 'RemoveProposalCreated');
      const proposalIds = getPastProposalsIds([...proposalEvents, ...proposalRemoveEvents]);
      let proposals = [];
      if (proposalIds) {
        for (let id of proposalIds) {
          let objRes = {};
          let promiseStatus = await this.getProposalStatus(id);
          if (promiseStatus !== '1') {
            let promiseRes = await this.getProposal(id);
            if (promiseRes) {
              objRes = await this.getProposalData(promiseRes, id, promiseStatus);
              proposals.push(objRes);
            }
          }

        }
      }
      return proposals;
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * create proposal
   * @param data
   * @param userAddress
   * @return string
   */
  async createProposal(data, userAddress) {
    let result = null;
    const link = data['external-link'];
    let candidate = data['address'];
    // console.log("candidate", candidate);
    // candidate = "0xde4a0D41cA0AE39A3e479Cb6a029c134274b1Bde"; //usual account 1
    // candidate = "0x00Ec0A77f6813dB9c01C65d2E2a086EE60e69ed7"; //usual account 1
    //TODO: createChangeExpertProposal
    if (data?.first === 'add-a-new-expert') {
      result = await this.contract.methods.createAddExpertProposal(link, candidate)
        .send(
          { from: userAddress });
    } else if (data?.first === 'remove-a-current-expert') {
      // candidate = "0x66316FfA38490d4d072F34EF7D7BA64Ce6b4478e"; //membership account
      result = await this.contract.methods.createRemoveExpertProposal(link, candidate)
        .send(
          { from: userAddress });
    }
    return result;
  }

  /**
   * get number of active and ended proposals
   * @return array
   */
  async getProposalsCount() {
    try {
      const proposalEvents = await this.getProposalsEvent();
      const proposalRemoveEvents = await getPastEvents(web3, this.contract, 'RemoveProposalCreated');
      const proposalIds = getPastProposalsIds([...proposalEvents, ...proposalRemoveEvents]);

      let proposalsActive = 0;
      let proposalsEnded = 0;
      if (proposalIds) {
        for (let id of proposalIds) {
          let promiseStatus = await this.getProposalStatus(id);
          if (promiseStatus === '1' || promiseStatus === '3' || promiseStatus === '4') {
            proposalsActive++;
          } else {
            proposalsEnded++;
          }

        }
      }
      return {
        ended: proposalsEnded,
        active: proposalsActive
      };
    } catch (e) {
      console.log(e);
    }
  }
}
