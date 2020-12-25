export const proposalsQExpert = state => state.proposals.proposalsArr;
export const errorQExpert = state => state.proposals.errorM;
export const loadingQExpert = state => state.proposals.loadingProposals;

/*create proposal staff*/
export const formObject = state => state.proposals.formObjectCreateProposal;
export const createdStepsLimit = state => state.proposals.createdStepsLimit;
export const stepCounterModal = state => state.proposals.stepCounter;
export const disabledContinueProposalBtn = state => state.proposals.disabledContinueBtn;

/*vote proposal staff*/
export const formVoteObject = state => state.proposals.formObjectVoteProposal;
export const stepVoteCounterModal = state => state.proposals.stepVoteCounter;
