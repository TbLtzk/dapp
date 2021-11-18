export const oneSlashingProposal = (state) => state.slashingProposals.oneProposal

/* get list of proposals */
export const slashingActiveProposalsSelector = (state) => state.slashingProposals.activeProposals
export const slashingLoadingActiveProposalsSelector = (state) => state.slashingProposals.loadingActiveProposals
export const slashingActiveProposalsErrorSelector = (state) => state.slashingProposals.activeProposalsError

/* get list of ended proposals */
export const slashingEndedProposalsSelector = (state) => state.slashingProposals.endedProposals
export const slashingLoadingEndedProposalsSelector = (state) => state.slashingProposals.loadingEndedProposals
export const slashingEndedProposalsErrorSelector = (state) => state.slashingProposals.endedProposalsError

/* count of proposals */
export const slashingEndedProposalsCountSelector = (state) => state.slashingProposals.slashingEndedProposalsCount
export const slashingActiveProposalsCountSelector = (state) => state.slashingProposals.slashingActiveProposalsCount
export const slashingLoadingProposalsCountSelector = (state) => state.slashingProposals.slashingLoadingProposalsCount
