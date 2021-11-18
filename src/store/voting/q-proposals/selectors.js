export const oneQProposal = (state) => state.qProposals.oneProposal

/* get list of proposals */
export const qActiveProposalsSelector = (state) => state.qProposals.activeProposals
export const qLoadingActiveProposalsSelector = (state) => state.qProposals.loadingActiveProposals
export const qActiveProposalsErrorSelector = (state) => state.qProposals.activeProposalsError

/* get list of ended proposals */
export const qEndedProposalsSelector = (state) => state.qProposals.endedProposals
export const qLoadingEndedProposalsSelector = (state) => state.qProposals.loadingEndedProposals
export const qEndedProposalsErrorSelector = (state) => state.qProposals.endedProposalsError

/* count of proposals */
export const qEndedProposalsCountSelector = (state) => state.qProposals.qEndedProposalsCount
export const qActiveProposalsCountSelector = (state) => state.qProposals.qActiveProposalsCount
export const qLoadingProposalsCountSelector = (state) => state.qProposals.qLoadingProposalsCount
