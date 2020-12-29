/*create proposal staff*/
export const formObject = state => state.proposals.formObjectCreateProposal;
export const createdStepsLimit = state => state.proposals.createdStepsLimit;
export const stepCounterModal = state => state.proposals.stepCounter;
export const disabledContinueProposalBtn = state => state.proposals.disabledContinueBtn;

/*vote proposal staff*/
export const formVoteObject = state => state.proposals.formObjectVoteProposal;
export const stepVoteCounterModal = state => state.proposals.stepVoteCounter;

/*ended proposals staff*/
export const endedProposals = state => state.proposals.endedProposals;
export const loadingEndedProposals = state => state.proposals.loadingEndedProposals;
export const errorEnded = state => state.proposals.errorEnded;
