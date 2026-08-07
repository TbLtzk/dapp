import { L0ExclusionListItem } from '@q-dev/q-js-sdk';
import { ethers } from 'ethers';

export function hasProposedExclusionList (
  proposed: L0ExclusionListItem | null | undefined,
): boolean {
  return Boolean(proposed?.exclusions?.length);
}

export function hasSignedProposedExclusionList (
  proposed: L0ExclusionListItem | null | undefined,
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
