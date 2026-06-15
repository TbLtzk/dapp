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
  CosignatureStatus,
  L0ApprovalMap,
  L0ApprovalStatus,
  L0MembershipStatus,
  OnchainMembershipStatus,
} from 'typings/root-nodes';

export const COSIGNATURE_TRANSITION_BLOCK_DELTA = 10;

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
    l0RootApprovalStatus: L0ApprovalStatus;
    l0ExclusionApprovalStatus: L0ApprovalStatus;
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
      l0RootApprovalStatus: 'not-in-list',
      l0ExclusionApprovalStatus: 'not-in-list',
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

  const l0RootApprovalStatus: L0ApprovalStatus =
    (listsSigned.isRootActiveSigned && listsSigned.isRootProposedSigned)
      ? 'all-signed'
      : 'not-signed';

  const l0ExclusionApprovalStatus: L0ApprovalStatus =
    (listsSigned.isExclusionActiveSigned && listsSigned.isExclusionProposedSigned)
      ? 'all-signed'
      : 'not-signed';

  return {
    l0RootApprovalStatus,
    l0ExclusionApprovalStatus,
    listsSigned,
  };
}

export function getOnchainMembershipStatus (isOnchain: boolean): OnchainMembershipStatus {
  return isOnchain ? 'member' : 'not-member';
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

export function getCosignatureStatus (
  address: string,
  latestCosignatureMetrics: RootNodeMetric | null,
  blockHeight?: number | null,
): CosignatureStatus {
  const metrics = latestCosignatureMetrics?.byAddress.find(({ mainAccount }) =>
    mainAccount.toLocaleLowerCase() === address.toLocaleLowerCase()
  );
  if (!metrics || !latestCosignatureMetrics) return 'offline';

  const { lastTransitionBlock } = latestCosignatureMetrics;
  const { lastObservedApproval } = metrics;

  if (lastObservedApproval.block === lastTransitionBlock) return 'online';

  const inActiveTransitionWindow = blockHeight != null &&
    blockHeight - lastTransitionBlock < COSIGNATURE_TRANSITION_BLOCK_DELTA;

  if (
    inActiveTransitionWindow &&
    lastObservedApproval.block > 0 &&
    lastObservedApproval.block < lastTransitionBlock
  ) {
    return 'waiting-approval';
  }

  return 'offline';
}

export function getCosignatureStats (address: string, metrics: RootNodeMetric | null): CosignatureStats | null {
  const accountMetrics = metrics?.byAddress.find(({ mainAccount }) =>
    mainAccount.toLocaleLowerCase() === address.toLocaleLowerCase()
  );

  if (!accountMetrics) return null;

  const { lastObservedApproval, firstObservedApproval } = accountMetrics;

  if (firstObservedApproval.dueCycles === null) return null;

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
    addressVoting: userVotingsStats?.counts.addressVoting || 0,
    upgradeVoting: userVotingsStats?.counts.upgradeVoting || 0,
    emergencyUpdateVoting: userVotingsStats?.counts.emergencyUpdateVoting || 0,
    validatorsSlashingVoting: userVotingsStats?.counts.validatorsSlashingVoting || 0,
  };

  const qTHVotings = {
    total: qTHVotingsStats?.total.all || 0,
    totalOfUser: userQTHVotingsStats?.counts.all || 0,
    constitutionVoting: userQTHVotingsStats?.counts.constitutionVoting || 0,
    epdrMembershipVoting: userQTHVotingsStats?.counts.epdrMembershipVoting || 0,
    epqfiMembershipVoting: userQTHVotingsStats?.counts.epqfiMembershipVoting || 0,
    eprsMembershipVoting: userQTHVotingsStats?.counts.eprsMembershipVoting || 0,
    generalUpdateVoting: userQTHVotingsStats?.counts.generalUpdateVoting || 0,
    rootNodesMembershipVoting: userQTHVotingsStats?.counts.rootNodesMembershipVoting || 0,
    rootNodesSlashingVoting: userQTHVotingsStats?.counts.rootNodesSlashingVoting || 0,
  };

  const rootNodeProposals = {
    totalOfUser: userProposalsStats?.counts.all || 0,
    emergencyUpdateVoting: userProposalsStats?.counts.emergencyUpdateVoting || 0,
    rootNodesSlashingVoting: userProposalsStats?.counts.rootNodesSlashingVoting || 0,
    validatorsSlashingVoting: userProposalsStats?.counts.validatorsSlashingVoting || 0,
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
