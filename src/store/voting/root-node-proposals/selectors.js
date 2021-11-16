/* ended proposals staff */
export const rootNodeEndedProposals = state => state.rootNodeProposals.endedProposals
export const rootNodeLoadingEndedProposals = state => state.rootNodeProposals.loadingEndedProposals
export const rootNodeErrorEnded = state => state.rootNodeProposals.errorEnded

export const oneRootNodeProposal = state => state.rootNodeProposals.oneProposal

/* get list of proposals */
export const rootNodeProposalsArr = state => state.rootNodeProposals.proposalsArr
export const rootNodeLoadingProposals = state => state.rootNodeProposals.loadingProposals
export const rootNodeErrorM = state => state.rootNodeProposals.errorM

export const rootEndedProposalsCountSelector = state => state.rootNodeProposals.rootEndedProposalsCount
export const rootActiveProposalsCountSelector = state => state.rootNodeProposals.rootActiveProposalsCount
export const rootLoadingProposalsCountSelector = state => state.rootNodeProposals.rootLoadingProposalsCount
