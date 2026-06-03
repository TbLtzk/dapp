import { ethers } from 'ethers';

import {
  GovPubExclusionList,
  GovPubExclusionListSigningPayloadWithDigest,
  GovPubRootList,
  GovPubRootListSigningPayloadWithDigest,
  ZERO_HASH,
} from './types';

function isRpcMethodMissing (error: unknown): boolean {
  const candidate = error as { code?: number; message?: string };
  const message = candidate?.message?.toLowerCase() || '';

  return candidate?.code === -32601 ||
    message.includes('method not found') ||
    message.includes('does not exist');
}

export type GovPubRpcProvider = ethers.providers.JsonRpcProvider;

export function createGovPubProvider (rpcUrl: string): GovPubRpcProvider {
  return new ethers.providers.JsonRpcProvider(rpcUrl);
}

export async function probeGovPubRootListSigning (
  provider: GovPubRpcProvider,
): Promise<boolean> {
  try {
    await provider.send('govPub_signingPayloadRootListV1WithDigest', [{
      timestamp: 1,
      nodes: ['0x0000000000000000000000000000000000000001'],
      hash: ZERO_HASH,
      signatures: [],
    }]);
    return true;
  } catch (error) {
    if (isRpcMethodMissing(error)) {
      return false;
    }

    return true;
  }
}

export async function probeGovPubExclusionListSigning (
  provider: GovPubRpcProvider,
): Promise<boolean> {
  try {
    await provider.send('govPub_signingPayloadExclusionListV1WithDigest', [{
      timestamp: 1,
      validators: [{
        address: '0x0000000000000000000000000000000000000001',
        block: 1,
      }],
      hash: ZERO_HASH,
      signatures: [],
    }]);
    return true;
  } catch (error) {
    if (isRpcMethodMissing(error)) {
      return false;
    }

    return true;
  }
}

export async function fetchSigningPayloadRootListV1WithDigest (
  provider: GovPubRpcProvider,
  list: GovPubRootList,
): Promise<GovPubRootListSigningPayloadWithDigest> {
  return provider.send('govPub_signingPayloadRootListV1WithDigest', [list]);
}

export async function submitTypedSignedRootList (
  provider: GovPubRpcProvider,
  list: GovPubRootList,
): Promise<string> {
  return provider.send('govPub_submitTypedSignedRootList', [list]);
}

export function rootListFromSigningPayload (
  payload: GovPubRootListSigningPayloadWithDigest,
): GovPubRootList {
  const { metadata, nodes } = payload.payload;

  return {
    timestamp: metadata.timestamp,
    nodes,
    hash: metadata.payloadHash,
    signatures: [],
  };
}

export async function fetchSigningPayloadExclusionListV1WithDigest (
  provider: GovPubRpcProvider,
  list: GovPubExclusionList,
): Promise<GovPubExclusionListSigningPayloadWithDigest> {
  return provider.send('govPub_signingPayloadExclusionListV1WithDigest', [list]);
}

export async function submitTypedSignedExclusionList (
  provider: GovPubRpcProvider,
  list: GovPubExclusionList,
): Promise<string> {
  return provider.send('govPub_submitTypedSignedExclusionList', [list]);
}

export function exclusionListFromSigningPayload (
  payload: GovPubExclusionListSigningPayloadWithDigest,
): GovPubExclusionList {
  const { metadata, validators } = payload.payload;

  return {
    timestamp: metadata.timestamp,
    validators,
    hash: metadata.payloadHash,
    signatures: [],
  };
}

export function extractRpcErrorMessage (error: unknown): string {
  if (typeof error === 'string') {
    return error;
  }

  const candidate = error as { data?: { message?: string }; message?: string };
  return candidate?.data?.message || candidate?.message || 'Unknown RPC error';
}
