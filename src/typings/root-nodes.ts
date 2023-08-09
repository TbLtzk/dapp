export type L0MembershipStatus = 'active' | 'proposed' | 'not-in-list';
export type L0ApprovalStatus = 'all-signed' | 'not-signed' | 'not-in-list';
export interface L0ApprovalMap {
  isRootActiveSigned: boolean;
  isRootProposedSigned: boolean;
  isExclusionActiveSigned: boolean;
  isExclusionProposedSigned: boolean;
}
