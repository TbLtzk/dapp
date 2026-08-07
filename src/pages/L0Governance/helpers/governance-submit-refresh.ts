import { L0ExclusionListItem, L0RootListItem } from '@q-dev/q-js-sdk';
import { getRootNodesExclusion, getRootNodesL0 } from 'helpers/root-node-metrics';

import {
  addPendingAttestation,
  L0GovernanceSubmitAction,
  PendingAttestation,
  removePendingAttestation,
} from './pending-attestation-store';
import { hasSignedProposedExclusionList } from './proposed-exclusion-list-indexer';
import { hasSignedProposedRootList } from './proposed-root-list-indexer';

import { Bus } from 'utils/event-bus';

export const GOVERNANCE_SUBMIT_POLL_DELAYS_MS = [0, 3000, 9000, 27000, 81000] as const;

export type GovernanceSubmitRefreshResult = 'confirmed' | 'pending';

interface GovernanceSubmitRefreshArgs {
  chainId: string | number;
  indexerUrl: string;
  walletAddress: string;
  action: L0GovernanceSubmitAction;
  attestationHash: string;
  listFingerprint?: string;
  baselineSignerCount: number;
}

function sleep (ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function countSigners (signers: { length: number } | null | undefined): number {
  return signers?.length ?? 0;
}

function isRootListRefreshConfirmed (
  action: L0GovernanceSubmitAction,
  proposed: L0RootListItem | null,
  walletAddress: string,
  baselineSignerCount: number,
): boolean {
  if (!proposed) {
    return false;
  }

  if (hasSignedProposedRootList(proposed, walletAddress)) {
    return true;
  }

  if (action === 'propose-root') {
    return countSigners(proposed.signers) > baselineSignerCount;
  }

  return false;
}

function isExclusionListRefreshConfirmed (
  action: L0GovernanceSubmitAction,
  proposed: L0ExclusionListItem | null,
  walletAddress: string,
  baselineSignerCount: number,
): boolean {
  if (!proposed) {
    return false;
  }

  if (hasSignedProposedExclusionList(proposed, walletAddress)) {
    return true;
  }

  if (action === 'propose-exclusion') {
    return countSigners(proposed.signers) > baselineSignerCount;
  }

  return false;
}

function isRefreshConfirmed (
  action: L0GovernanceSubmitAction,
  proposedRoot: L0RootListItem | null,
  proposedExclusion: L0ExclusionListItem | null,
  walletAddress: string,
  baselineSignerCount: number,
): boolean {
  if (action === 'cosign-root' || action === 'propose-root') {
    return isRootListRefreshConfirmed(action, proposedRoot, walletAddress, baselineSignerCount);
  }

  return isExclusionListRefreshConfirmed(
    action,
    proposedExclusion,
    walletAddress,
    baselineSignerCount,
  );
}

async function fetchProposedLists (
  indexerUrl: string,
  action: L0GovernanceSubmitAction,
): Promise<{ proposedRoot: L0RootListItem | null; proposedExclusion: L0ExclusionListItem | null }> {
  if (action === 'cosign-root' || action === 'propose-root') {
    const proposedRoot = await getRootNodesL0(indexerUrl, 'proposed');
    return { proposedRoot, proposedExclusion: null };
  }

  const proposedExclusion = await getRootNodesExclusion(indexerUrl, 'proposed');
  return { proposedRoot: null, proposedExclusion };
}

export async function refreshGovernanceStateAfterSubmit (
  args: GovernanceSubmitRefreshArgs,
): Promise<{
    result: GovernanceSubmitRefreshResult;
    proposedRoot: L0RootListItem | null;
    proposedExclusion: L0ExclusionListItem | null;
  }> {
  const pendingEntry: PendingAttestation = {
    attestationHash: args.attestationHash,
    action: args.action,
    walletAddress: args.walletAddress,
    submittedAt: Date.now(),
    listFingerprint: args.listFingerprint,
  };

  addPendingAttestation(args.chainId, pendingEntry);
  Bus.refreshRootNodesMonitoring();

  let proposedRoot: L0RootListItem | null = null;
  let proposedExclusion: L0ExclusionListItem | null = null;

  for (let attempt = 0; attempt < GOVERNANCE_SUBMIT_POLL_DELAYS_MS.length; attempt++) {
    const delayMs = GOVERNANCE_SUBMIT_POLL_DELAYS_MS[attempt];

    if (delayMs > 0) {
      await sleep(delayMs);
    }

    const fetched = await fetchProposedLists(args.indexerUrl, args.action);
    proposedRoot = fetched.proposedRoot;
    proposedExclusion = fetched.proposedExclusion;

    if (isRefreshConfirmed(
      args.action,
      proposedRoot,
      proposedExclusion,
      args.walletAddress,
      args.baselineSignerCount,
    )) {
      removePendingAttestation(args.chainId, args.attestationHash);
      Bus.refreshRootNodesMonitoring();

      return {
        result: 'confirmed',
        proposedRoot,
        proposedExclusion,
      };
    }
  }

  Bus.refreshRootNodesMonitoring();

  return {
    result: 'pending',
    proposedRoot,
    proposedExclusion,
  };
}
