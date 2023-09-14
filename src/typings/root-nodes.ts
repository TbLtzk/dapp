export type L0MembershipStatus = 'active' | 'proposed' | 'not-in-list';
export type L0ApprovalStatus = 'all-signed' | 'not-signed' | 'not-in-list';
export type CosignatureStatus = 'online' | 'offline' | 'waiting-approval';
export interface L0ApprovalMap {
  isRootActiveSigned: boolean;
  isRootProposedSigned: boolean;
  isExclusionActiveSigned: boolean;
  isExclusionProposedSigned: boolean;
}

export interface CosignatureStats {
  dueCycles: number;
  offlineCycles: number;
  actualApprovals: number;
  availability: number;
}

export interface VotingParticipationStats {
  aggregatePercentage: number;
  rootNodeProposals: {
    totalOfUser: number;
  };
  rootNodeVotings: {
    total: number;
    totalOfUser: number;
    participationPercentage: number;
  };
  qTHVotings: {
    total: number;
    totalOfUser: number;
    participationPercentage: number;
  };
}
