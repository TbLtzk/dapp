import { ethers, providers, Signer } from 'ethers';
import { TFunction } from 'i18next';

export function resolveSigningAddress (
  rootAccount: string,
  aliasAccount?: string | null,
): string {
  return aliasAccount || rootAccount;
}

export function isSameAddress (left: string, right: string): boolean {
  return ethers.utils.getAddress(left) === ethers.utils.getAddress(right);
}

export function isAddressAmongAccounts (
  targetAddress: string,
  walletAccounts: string[],
): boolean {
  if (!walletAccounts.length) {
    return false;
  }

  const normalizedTarget = ethers.utils.getAddress(targetAddress);

  return walletAccounts.some((account) => (
    ethers.utils.getAddress(account) === normalizedTarget
  ));
}

export async function getGovernanceSigningSigner (
  provider: providers.Web3Provider,
  signingAddress: string,
): Promise<Signer> {
  const accounts = await provider.listAccounts();
  const normalizedSigningAddress = ethers.utils.getAddress(signingAddress);

  if (!isAddressAmongAccounts(normalizedSigningAddress, accounts)) {
    throw new Error('SIGNING_ADDRESS_UNAVAILABLE');
  }

  return provider.getSigner(normalizedSigningAddress);
}

export function isUserRejectedSigningRequest (error: unknown): boolean {
  const candidate = error as { code?: number; message?: string };
  const message = candidate?.message?.toLowerCase() || '';

  return candidate?.code === 4001 ||
    message.includes('user rejected') ||
    message.includes('user denied');
}

export function mapGovernanceSubmitError (message: string, t: TFunction): string {
  const normalized = message.toLowerCase();

  if (normalized.includes('signing_address_unavailable')) {
    return t('L0_SIGNING_ADDRESS_UNAVAILABLE');
  }

  if (normalized.includes('unknown signer')) {
    return t('L0_SIGNING_ERROR_UNKNOWN_SIGNER');
  }

  if (
    normalized.includes('alias') &&
    (normalized.includes('mismatch') || normalized.includes('required'))
  ) {
    return t('L0_SIGNING_ERROR_ALIAS_MISMATCH');
  }

  return message;
}
