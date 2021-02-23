/*create proposal staff*/
export const formObject = state => state.proposals.formObjectCreateProposal;
export const createdStepsLimit = state => state.proposals.createdStepsLimit;
export const stepCounterModal = state => state.proposals.stepCounter;
export const disabledContinueProposalBtn = state => state.proposals.disabledContinueBtn;

/*vote proposal staff*/
export const formVoteObject = state => state.proposals.formObjectVoteProposal;
export const stepVoteCounterModal = state => state.proposals.stepVoteCounter;

/*for dashboard*/
export const numberOfAllProposals = state => state.proposals.numberOfAllProposals;
export const loadingNumberAll = state => state.proposals.loadingNumberAll;
export const constitutionHash = state => state.proposals.constitutionHash;
