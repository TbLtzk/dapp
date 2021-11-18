export const oneExpertProposal = (state) => state.expertProposals.oneProposal

/* get list of proposals */
export const expertActiveProposalsSelector = (state) => state.expertProposals.activeProposals
export const expertLoadingActiveProposalsSelector = (state) => state.expertProposals.loadingActiveProposals
export const expertActiveProposalsErrorSelector = (state) => state.expertProposals.activeProposalsError

/* get list of ended proposals */
export const expertEndedProposalsSelector = (state) => state.expertProposals.endedProposals
export const expertLoadingEndedProposalsSelector = (state) => state.expertProposals.loadingEndedProposals
export const expertEndedProposalsErrorSelector = (state) => state.expertProposals.endedProposalsError

/* count of proposals */
export const expertEndedProposalsCountSelector = (state) => state.expertProposals.expertEndedProposalsCount
export const expertActiveProposalsCountSelector = (state) => state.expertProposals.expertActiveProposalsCount
export const expertLoadingProposalsCountSelector = (state) => state.expertProposals.expertLoadingProposalsCount
