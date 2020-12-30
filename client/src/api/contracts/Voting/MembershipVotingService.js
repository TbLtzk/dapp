import VotingService from "api/contracts/Voting/VotingService";
import {
  convertNumVotes,
  getPastEvents,
  getPastProposalsIds,
  getStatusTransformation
} from "api/contracts/Voting/handler/commonFunc";

/*EPDR_MembershipVoting, EPQFI_MembershipVoting*/
export default class MembershipVotingService extends VotingService {

  /**
   * get proposal data
   * @param promiseRes
   * @param id
   * @param promiseStatus
   * @return array
   */
  async getProposalData(promiseRes, id, promiseStatus) {
    let objRes = {};
    try {
      objRes.id = id;
      objRes.remark = promiseRes.base.remark;
      objRes.addressToAdd = promiseRes.proposalDetails.addressToAdd;
      objRes.addressToRemove = promiseRes.proposalDetails.addressToRemove;
      objRes.vetosCount = promiseRes.base.counters.vetosCount;
      objRes.votesAgainst = promiseRes.base.counters.weightAgainst;
      objRes.votesFor = promiseRes.base.counters.weightFor;
      //the ending is given by: vetoEndTime.
      objRes.vetoEndTime = promiseRes.base.params.vetoEndTime;
      //the time until when users can vote
      objRes.votingEndTime = promiseRes.base.params.votingEndTime;
      objRes.status = getStatusTransformation(promiseStatus);
      objRes.title = this.contractName === "EPDR_MembershipVoting"
          ? "DeFi Risk Expert membership proposals"
          : "Fees & Incentives Experts membership proposals";
      objRes.type = this.contractName === "EPDR_MembershipVoting"
          ? "DeFi Risk Expert membership"
          : "Fees & Incentives Experts membership";
      objRes.kindVoting = "membership";
      let proposalStats = await this.getProposalStats(id);
      objRes.currentMajority = convertNumVotes(proposalStats.currentMajority);
      objRes.currentQuorum = convertNumVotes(proposalStats.currentQuorum);
      objRes.currentVetoPercentage = convertNumVotes(proposalStats.currentVetoPercentage);
      objRes.requiredMajority = convertNumVotes(proposalStats.requiredMajority);
      objRes.requiredQuorum = convertNumVotes(proposalStats.requiredQuorum);
      objRes.vetoThreshold = convertNumVotes(proposalStats.vetoThreshold);
      objRes.contract = this.contractName;

      return objRes;
    } catch (e) {
      console.log("e", e);
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
      const proposalRemoveEvents = await getPastEvents(this.drizzle, this.contractName, 'RemoveProposalCreated');
      const proposalIds = getPastProposalsIds([...proposalEvents, ...proposalRemoveEvents]);
      let proposals = [];
      if (proposalIds) {
        for (let id of proposalIds) {
          let objRes = {};
          let promiseStatus = await this.getProposalStatus(id);
          if (promiseStatus === "1") {
            let promiseRes = await this.proposalIteratorResult(id);
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
      const proposalRemoveEvents = await getPastEvents(this.drizzle, this.contractName, 'RemoveProposalCreated');
      const proposalIds = getPastProposalsIds([...proposalEvents, ...proposalRemoveEvents]);
      let proposals = [];
      if (proposalIds) {
        for (let id of proposalIds) {
          let objRes = {};
          let promiseStatus = await this.getProposalStatus(id);
          if (promiseStatus !== "1") {
            let promiseRes = await this.proposalIteratorResult(id);
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
    console.log("DATA MembershipVotingService", data);
    let result = null;
    const link = data["external-link"];
    let candidate = data["address"];
    console.log("candidate", candidate);
    candidate = "0xde4a0D41cA0AE39A3e479Cb6a029c134274b1Bde"; //usual account 1
    // candidate = "0x00Ec0A77f6813dB9c01C65d2E2a086EE60e69ed7"; //usual account 1
    //TODO: createChangeExpertProposal
    if (data?.first === "add-a-new-expert") {
      result = await this.contract.methods.createAddExpertProposal(link, candidate).send(
          {from: userAddress});
      console.log("result", result);
    } else if (data?.first === "remove-a-current-expert") {
      candidate = "0x66316FfA38490d4d072F34EF7D7BA64Ce6b4478e"; //expert account
      result = await this.contract.methods.createRemoveExpertProposal(link, candidate).send(
          {from: userAddress});
      console.log("result", result);
    }
    return result;
  }
}
