import { L0RootListItem } from '@q-dev/q-js-sdk';
import { ethers } from 'ethers';

export function hasProposedRootList (proposed: L0RootListItem | null | undefined): boolean {
  return Boolean(proposed?.roots?.length);
}

export function hasSignedProposedRootList (
  proposed: L0RootListItem | null | undefined,
  walletAddress: string | undefined,
): boolean {
  if (!proposed?.signers?.length || !walletAddress) {
    return false;
  }

  const wallet = ethers.utils.getAddress(walletAddress);

  return proposed.signers.some(({ mainAccount, signer }) => {
    const accounts = [mainAccount, signer].filter(Boolean) as string[];
    return accounts.some((account) => ethers.utils.getAddress(account) === wallet);
  });
}
