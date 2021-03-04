import VotingService from './VotingService';

import {
  getPastEvents,
  getPastProposalsIds,
  getStatusTransformation
} from '../../handler/VotingHandler';

import { fromWei } from 'func/balance';

/*EPDR_MembershipVoting, EPQFI_MembershipVoting*/
export default class MembershipVoting extends VotingService {

  async getProposalData(promiseRes, id, promiseStatus) {
    let objRes = {};
    let objStats = {};
    objRes.id = id;
    objRes.remark = promiseRes.base.remark;
    objRes.addressToAdd = promiseRes.proposalDetails.addressToAdd;
    objRes.addressToRemove = promiseRes.proposalDetails.addressToRemove;
    objRes.vetosCount = promiseRes.base.counters.vetosCount;
    // objRes.votesAgainst = promiseRes.base.counters.weightAgainst;
    // objRes.votesFor = promiseRes.base.counters.weightFor;
    const weightAgainst = promiseRes.base.counters.weightAgainst;
    objRes.votesAgainst = fromWei(weightAgainst);
    const weightFor = promiseRes.base.counters.weightFor;
    objRes.votesFor = fromWei(weightFor);

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
    objStats = await this.getProposalStatsData(id);
    objRes.contract = this.contractName;
    objRes.numberProposalVotes = await this.getProposalVotes(id);

    return { ...objRes, ...objStats };
  }

  async getProposals() {
    //TODO: bug from blockchain for createRemoveExpertProposal use RemoveProposalCreated event
    const proposalEvents = await this.getProposalsEvent();
    const proposalRemoveEvents = await getPastEvents(this.contract, 'RemoveProposalCreated');
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
  }

  async getEndedProposals() {
    //TODO: for createRemoveExpertProposal use RemoveProposalCreated event
    const proposalEvents = await this.getProposalsEvent();
    const proposalRemoveEvents = await getPastEvents(this.contract, 'RemoveProposalCreated');
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
  }

  async createProposal(data, userAddress) {
    let result = null;
    const link = data['external-link'];
    let candidate = data['address'];
    //TODO: createChangeExpertProposal
    if (data?.first === 'add-a-new-expert') {
      result = await this.contract.methods.createAddExpertProposal(link, candidate)
        .send(
          { from: userAddress });
    } else if (data?.first === 'remove-a-current-expert') {
      result = await this.contract.methods.createRemoveExpertProposal(link, candidate)
        .send(
          { from: userAddress });
    }
    return result;
  }

  //get number of active and ended proposals
  async getProposalsCount() {
    try {
      const proposalEvents = await this.getProposalsEvent();
      const proposalRemoveEvents = await getPastEvents(this.contract, 'RemoveProposalCreated');
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
