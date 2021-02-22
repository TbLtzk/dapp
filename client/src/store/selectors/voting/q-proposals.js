/*vote proposal staff*/
export const formVoteObject = state => state.proposals.formObjectVoteProposal;
export const stepVoteCounterModal = state => state.proposals.stepVoteCounter;

/*ended proposals staff*/
export const endedProposals = state => state.proposals.endedProposals;
export const loadingEndedProposals = state => state.proposals.loadingEndedProposals;
export const errorEnded = state => state.proposals.errorEnded;

/*get list of proposals*/
export const qProposalsArr = state => state.proposals.proposalsArr;
export const qLoadingProposals = state => state.proposals.loadingProposals;
export const qErrorM = state => state.proposals.errorM;

