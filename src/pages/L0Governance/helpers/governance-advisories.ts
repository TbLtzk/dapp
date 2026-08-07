import { ethers } from 'ethers';

interface ProposedListSigner {
  mainAccount: string;
  signer?: string | null;
}

export function hasThirdPartyProposedSigners (
  signers: ProposedListSigner[] | null | undefined,
  walletAddress: string | undefined,
): boolean {
  if (!signers?.length || !walletAddress) {
    return false;
  }

  const wallet = ethers.utils.getAddress(walletAddress);

  return signers.some(({ mainAccount, signer }) => {
    const accounts = [mainAccount, signer].filter(Boolean) as string[];

    return accounts.some((account) => ethers.utils.getAddress(account) !== wallet);
  });
}

export function isConnectedRootNotOnline (
  connectedCosignatureStatus: string | null | undefined,
): boolean {
  return connectedCosignatureStatus != null && connectedCosignatureStatus !== 'online';
}

/** Phase 0: legacy signatures relay through the connected root node (no rebroadcast). */
export function isL0GovernanceRelayPhase0 (
  qgovTypedRelayVersion: number | null,
): boolean {
  return qgovTypedRelayVersion === null || qgovTypedRelayVersion < 1;
}
