import { ethers } from 'ethers';

import {
  GovPubExcludedValidator,
  GovPubExclusionList,
  GovPubExclusionListSigningPayloadWithDigest,
  GovPubRootList,
  GovPubRootListSigningPayloadWithDigest,
  ZERO_HASH,
} from './types';

export function isRpcMethodMissing (error: unknown): boolean {
  const candidate = error as { code?: number; message?: string };
  const message = candidate?.message?.toLowerCase() || '';

  return candidate?.code === -32601 ||
    message.includes('method not found') ||
    message.includes('does not exist');
}

export function parseEip712Uint256 (value: unknown): number {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'string') {
    if (value.startsWith('0x') || value.startsWith('0X')) {
      return parseInt(value, 16);
    }

    return Number(value);
  }

  return Number(value);
}

function excludedValidatorFromEip712Message (
  validator: Record<string, unknown>,
): GovPubExcludedValidator {
  const block = parseEip712Uint256(validator.block);
  const endBlockRaw = validator.endBlock != null
    ? parseEip712Uint256(validator.endBlock)
    : undefined;

  const normalized: GovPubExcludedValidator = {
    address: ethers.utils.getAddress(String(validator.address)),
    block,
  };

  if (endBlockRaw) {
    normalized.endBlock = endBlockRaw;
  }

  return normalized;
}

export type GovPubRpcProvider = ethers.providers.JsonRpcProvider;

/** q-client v2.3.0-rc3+ (PR #38): `signatures` are `0x` hex in JSON-RPC, not base64. */
function toGovPubRpcSignature (signature: string): string {
  return ethers.utils.hexlify(ethers.utils.arrayify(signature));
}

function toGovPubRpcRootList (list: GovPubRootList) {
  return {
    timestamp: list.timestamp,
    nodes: list.nodes.map((node) => node.toLowerCase()),
    hash: list.hash,
    signatures: list.signatures.map(toGovPubRpcSignature),
  };
}

function toGovPubRpcExclusionList (list: GovPubExclusionList) {
  return {
    timestamp: list.timestamp,
    validators: list.validators.map((validator) => {
      const entry: {
        address: string;
        block: number;
        endBlock?: number;
      } = {
        address: validator.address.toLowerCase(),
        block: validator.block,
      };
      if (validator.endBlock) {
        entry.endBlock = validator.endBlock;
      }
      return entry;
    }),
    hash: list.hash,
    signatures: list.signatures.map(toGovPubRpcSignature),
  };
}

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
  return provider.send('govPub_submitTypedSignedRootList', [toGovPubRpcRootList(list)]);
}

export function rootListFromSigningPayload (
  bundle: GovPubRootListSigningPayloadWithDigest,
): GovPubRootList {
  if (bundle.typedData) {
    const { message } = bundle.typedData;
    const nodes = (message.nodes as string[]).map((node) => ethers.utils.getAddress(node));

    return {
      timestamp: parseEip712Uint256(message.timestamp),
      nodes,
      hash: String(message.payloadHash),
      signatures: [],
    };
  }

  if (!bundle.payload) {
    throw new Error('govPub signing response missing typedData and legacy payload');
  }

  const { metadata, nodes } = bundle.payload;

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
  return provider.send('govPub_submitTypedSignedExclusionList', [toGovPubRpcExclusionList(list)]);
}

export function exclusionListFromSigningPayload (
  bundle: GovPubExclusionListSigningPayloadWithDigest,
): GovPubExclusionList {
  if (bundle.typedData) {
    const { message } = bundle.typedData;
    const validators = (message.validators as Record<string, unknown>[])
      .map(excludedValidatorFromEip712Message);

    return {
      timestamp: parseEip712Uint256(message.timestamp),
      validators,
      hash: String(message.payloadHash),
      signatures: [],
    };
  }

  if (!bundle.payload) {
    throw new Error('govPub signing response missing typedData and legacy payload');
  }

  const { metadata, validators } = bundle.payload;

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
