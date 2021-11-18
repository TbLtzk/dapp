export const oneRootNodeProposal = (state) => state.rootNodeProposals.oneProposal

/* get list of proposals */
export const rootActiveProposalsSelector = (state) => state.rootNodeProposals.activeProposals
export const rootLoadingActiveProposalsSelector = (state) => state.rootNodeProposals.loadingActiveProposals
export const rootActiveProposalsErrorSelector = (state) => state.rootNodeProposals.activeProposalsError

/* get list of ended proposals */
export const rootEndedProposalsSelector = (state) => state.rootNodeProposals.endedProposals
export const rootLoadingEndedProposalsSelector = (state) => state.rootNodeProposals.loadingEndedProposals
export const rootEndedProposalsErrorSelector = (state) => state.rootNodeProposals.endedProposalsError

/* count of proposals */
export const rootEndedProposalsCountSelector = (state) => state.rootNodeProposals.rootEndedProposalsCount
export const rootActiveProposalsCountSelector = (state) => state.rootNodeProposals.rootActiveProposalsCount
export const rootLoadingProposalsCountSelector = (state) => state.rootNodeProposals.rootLoadingProposalsCount
