export const isUserEPQFIMembershipSelector = (state) => state.membership.isUserEPQFIMembership
export const isUserEPDRMembershipSelector = (state) => state.membership.isUserEPDRMembership
export const isUserEPRSMembershipSelector = (state) => state.membership.isUserEPRSMembership

export const EPQFIMembersSelector = (state) => state.membership.EPQFIMembers
export const EPQFIMembersLoadingSelector = (state) => state.membership.EPQFIMembersLoading
export const EPQFIMembersErrorSelector = (state) => state.membership.EPQFIMembersError

export const EPDRMembersSelector = (state) => state.membership.EPDRMembers
export const EPDRMembersLoadingSelector = (state) => state.membership.EPDRMembersLoading
export const EPDRMembersErrorSelector = (state) => state.membership.EPDRMembersError

export const EPRSMembersSelector = (state) => state.membership.EPRSMembers
export const EPRSMembersLoadingSelector = (state) => state.membership.EPRSMembersLoading
export const EPRSMembersErrorSelector = (state) => state.membership.EPRSMembersError
