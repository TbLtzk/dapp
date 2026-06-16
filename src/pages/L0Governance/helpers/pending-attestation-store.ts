import { ethers } from 'ethers';

export type L0GovernanceSubmitAction =
  | 'cosign-root'
  | 'cosign-exclusion'
  | 'propose-root'
  | 'propose-exclusion';

export interface PendingAttestation {
  attestationHash: string;
  action: L0GovernanceSubmitAction;
  walletAddress: string;
  submittedAt: number;
  listFingerprint?: string;
}

export const PENDING_ATTESTATION_TTL_MS = 24 * 60 * 60 * 1000;

const STORAGE_KEY_PREFIX = 'l0-gov-pending-attestations:v1';

function storageKey (chainId: string | number): string {
  return `${STORAGE_KEY_PREFIX}:${chainId}`;
}

function normalizeWallet (walletAddress: string): string {
  return ethers.utils.getAddress(walletAddress);
}

function readEntries (chainId: string | number): PendingAttestation[] {
  try {
    const raw = localStorage.getItem(storageKey(chainId));
    if (!raw) return [];

    const parsed = JSON.parse(raw) as PendingAttestation[];
    if (!Array.isArray(parsed)) return [];

    const now = Date.now();

    return parsed.filter((entry) => (
      entry?.attestationHash &&
      entry?.action &&
      entry?.walletAddress &&
      typeof entry.submittedAt === 'number' &&
      now - entry.submittedAt < PENDING_ATTESTATION_TTL_MS
    ));
  } catch {
    return [];
  }
}

function writeEntries (chainId: string | number, entries: PendingAttestation[]): void {
  localStorage.setItem(storageKey(chainId), JSON.stringify(entries));
}

export function addPendingAttestation (
  chainId: string | number,
  entry: PendingAttestation,
): void {
  const walletAddress = normalizeWallet(entry.walletAddress);
  const entries = readEntries(chainId).filter((existing) => (
    existing.attestationHash !== entry.attestationHash
  ));

  entries.push({
    ...entry,
    walletAddress,
  });

  writeEntries(chainId, entries);
}

export function removePendingAttestation (
  chainId: string | number,
  attestationHash: string,
): void {
  const entries = readEntries(chainId).filter((entry) => entry.attestationHash !== attestationHash);
  writeEntries(chainId, entries);
}

export function removePendingAttestationsForWallet (
  chainId: string | number,
  walletAddress: string,
  action?: L0GovernanceSubmitAction,
): void {
  const wallet = normalizeWallet(walletAddress);
  const entries = readEntries(chainId).filter((entry) => {
    if (normalizeWallet(entry.walletAddress) !== wallet) {
      return true;
    }

    return action != null && entry.action !== action;
  });

  writeEntries(chainId, entries);
}

export function hasPendingAttestation (
  chainId: string | number,
  walletAddress: string,
  action: L0GovernanceSubmitAction,
): boolean {
  const wallet = normalizeWallet(walletAddress);

  return readEntries(chainId).some((entry) => (
    entry.action === action &&
    normalizeWallet(entry.walletAddress) === wallet
  ));
}

export function getPendingAttestations (
  chainId: string | number,
  walletAddress?: string,
  action?: L0GovernanceSubmitAction,
): PendingAttestation[] {
  const entries = readEntries(chainId);

  if (!walletAddress && !action) {
    return entries;
  }

  return entries.filter((entry) => {
    if (action && entry.action !== action) {
      return false;
    }

    if (walletAddress && normalizeWallet(entry.walletAddress) !== normalizeWallet(walletAddress)) {
      return false;
    }

    return true;
  });
}
