import {
  L0ExclusionListItem,
  L0RootListItem,
  RootNodeMetric,
  RootNodeProposalsAggregated,
  RootNodeQTHVotingsAggregated,
  RootNodeVotingsAggregated
} from '@q-dev/q-js-sdk';
import {
  CosignatureStats,
  L0ApprovalMap,
  L0ApprovalStatus,
  L0MembershipStatus
} from 'typings/root-nodes';

interface L0ApprovalStatusArgs {
  address: string;
  isL0Active: boolean;
  rootNodesL0Active: L0RootListItem | null;
  rootNodesL0Proposed: L0RootListItem | null;
  rootNodesExclusionActive: L0ExclusionListItem | null;
  rootNodesExclusionProposed: L0ExclusionListItem | null;
}

interface L0MembershipStatusArgs {
  address: string;
  rootNodesL0Active: L0RootListItem | null;
  rootNodesL0Proposed: L0RootListItem | null;
}

interface VotingParticipationStatsArgs {
  address: string;
  qTHVotingsStats: RootNodeQTHVotingsAggregated | null;
  votingsStats: RootNodeVotingsAggregated | null;
  proposalsStats: RootNodeProposalsAggregated | null;
}

export function getL0ApprovalStatus ({
  address,
  isL0Active,
  rootNodesL0Active,
  rootNodesL0Proposed,
  rootNodesExclusionActive,
  rootNodesExclusionProposed,
}: L0ApprovalStatusArgs): {
    l0ApprovalStatus: L0ApprovalStatus;
    listsSigned: L0ApprovalMap;
  } {
  const listsSigned = {
    isRootActiveSigned: false,
    isRootProposedSigned: false,
    isExclusionActiveSigned: false,
    isExclusionProposedSigned: false,
  };

  if (!isL0Active) {
    return {
      l0ApprovalStatus: 'not-in-list',
      listsSigned,
    };
  }

  listsSigned.isRootActiveSigned = !rootNodesL0Active?.signers ||
    rootNodesL0Active.signers.some(({ mainAccount }) => mainAccount === address);
  listsSigned.isRootProposedSigned = !rootNodesL0Proposed?.signers ||
    rootNodesL0Proposed.signers.some(({ mainAccount }) => mainAccount === address);
  listsSigned.isExclusionActiveSigned = !rootNodesExclusionActive?.signers ||
    rootNodesExclusionActive.signers.some(({ mainAccount }) => mainAccount === address);
  listsSigned.isExclusionProposedSigned = !rootNodesExclusionProposed?.signers ||
    rootNodesExclusionProposed.signers.some(({ mainAccount }) => mainAccount === address);

  const l0ApprovalStatus = Object.values(listsSigned).every(i => i)
    ? 'all-signed'
    : 'not-signed';
  return {
    l0ApprovalStatus,
    listsSigned,
  };
}

export function getL0MembershipStatus ({
  address,
  rootNodesL0Active,
  rootNodesL0Proposed
}: L0MembershipStatusArgs): L0MembershipStatus {
  const isL0ActiveStatus = rootNodesL0Active?.roots.some(({ mainAccount }) => mainAccount === address);
  if (isL0ActiveStatus) return 'active';

  const isL0ProposedStatus = rootNodesL0Proposed?.roots.some(
    ({ mainAccount }) => mainAccount === address
  );

  return isL0ProposedStatus
    ? 'proposed'
    : 'not-in-list';
}

export function getCosignatureStatus (address: string, latestCosignatureMetrics: RootNodeMetric | null) {
  const metrics = latestCosignatureMetrics?.byAddress.find(({ mainAccount }) =>
    mainAccount.toLocaleLowerCase() === address.toLocaleLowerCase()
  );
  if (!metrics) return 'offline';
  if (metrics.lastObservedApproval.block === latestCosignatureMetrics?.lastTransitionBlock) {
    return 'online';
  }
  if (metrics.firstObservedApproval.block ===
      latestCosignatureMetrics?.firstTransitionBlock) {
    return 'waiting-approval';
  }

  return 'offline';
}

export function getCosignatureStats (address: string, metrics: RootNodeMetric | null): CosignatureStats {
  const accountMetrics = metrics?.byAddress.find(({ mainAccount }) =>
    mainAccount.toLocaleLowerCase() === address.toLocaleLowerCase()
  );

  if (!accountMetrics) {
    return {
      dueCycles: 0,
      offlineCycles: 0,
      actualApprovals: 0,
      availability: 0,
    };
  }
  const { lastObservedApproval, firstObservedApproval } = accountMetrics;
  const actualApprovals = firstObservedApproval.dueCycles - lastObservedApproval.offlineCycles;

  return {
    actualApprovals,
    dueCycles: firstObservedApproval.dueCycles,
    offlineCycles: lastObservedApproval.offlineCycles,
    availability: firstObservedApproval.dueCycles && actualApprovals
      ? actualApprovals / firstObservedApproval.dueCycles * 100
      : 0
  };
}

export function getVotingParticipationStats ({
  address,
  qTHVotingsStats,
  votingsStats,
  proposalsStats,
}: VotingParticipationStatsArgs) {
  const userVotingsStats = votingsStats?.byAddress.find(
    ({ accountAddress }) => accountAddress.toLocaleLowerCase() === address.toLocaleLowerCase()
  );
  const userQTHVotingsStats = qTHVotingsStats?.byAddress.find(
    ({ accountAddress }) => accountAddress.toLocaleLowerCase() === address.toLocaleLowerCase()
  );
  const userProposalsStats = proposalsStats?.byAddress.find(
    ({ accountAddress }) => accountAddress.toLocaleLowerCase() === address.toLocaleLowerCase()
  );

  const rootNodeVotings = {
    total: votingsStats?.total.all || 0,
    totalOfUser: userVotingsStats?.counts.all || 0,
  };

  const qTHVotings = {
    total: qTHVotingsStats?.total.all || 0,
    totalOfUser: userQTHVotingsStats?.counts.all || 0,
  };

  const rootNodeProposals = {
    totalOfUser: userProposalsStats?.counts.all || 0,
  };

  const totalVotings = rootNodeVotings.total + qTHVotings.total;
  const totalOfUserVotings = rootNodeVotings.totalOfUser + qTHVotings.totalOfUser;
  const aggregatePercentage = totalOfUserVotings && totalVotings
    ? totalOfUserVotings / totalVotings * 100
    : 0;

  return {
    aggregatePercentage,
    rootNodeProposals,
    rootNodeVotings: {
      ...rootNodeVotings,
      participationPercentage: rootNodeVotings.total && rootNodeVotings.totalOfUser
        ? rootNodeVotings.totalOfUser / rootNodeVotings.total * 100
        : 0
    },
    qTHVotings: {
      ...qTHVotings,
      participationPercentage: qTHVotings.total && qTHVotings.totalOfUser
        ? qTHVotings.totalOfUser / qTHVotings.total * 100
        : 0
    }
  };
}
