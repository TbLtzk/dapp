import { L0ExclusionListItem, L0RootListItem, RootNodeMetric } from '@q-dev/q-js-sdk';
import { CosignatureStats, L0ApprovalMap, L0ApprovalStatus, L0MembershipStatus } from 'typings/root-nodes';

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
  // TODO: change `observedApprovals[0]` after fix endpoint
  if (metrics.observedApprovals[0].lastObservedApproval.Block === latestCosignatureMetrics?.lastTransitionBlock) {
    return 'online';
  }
  // TODO: change `observedApprovals[0]` after fix endpoint
  if (metrics.observedApprovals[0].firstObservedApproval.Block ===
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
  // TODO: change `observedApprovals[0]` after fix endpoint
  const { lastObservedApproval, firstObservedApproval } = accountMetrics.observedApprovals[0];

  const actualApprovals = firstObservedApproval.DueCycles - lastObservedApproval.OfflineCycles;
  return {
    actualApprovals,
    dueCycles: firstObservedApproval.DueCycles,
    offlineCycles: lastObservedApproval.OfflineCycles,
    availability: firstObservedApproval.DueCycles && actualApprovals
      ? actualApprovals / firstObservedApproval.DueCycles * 100
      : 0
  };
}
