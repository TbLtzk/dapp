import { _TypedDataEncoder } from '@ethersproject/hash';
import { ethers, Signer } from 'ethers';

import {
  GovPubEip712TypedData,
  GovPubExclusionListSigningPayload,
  GovPubExclusionListSigningPayloadWithDigest,
  GovPubRootListSigningPayload,
  GovPubRootListSigningPayloadWithDigest,
} from './types';

/** Matches q-client `GovernanceEIP712RootListTypeName` (issue #32). */
export const ROOT_LIST_PRIMARY_TYPE = 'QGOVL0RootListProposal';

/** Matches q-client `GovernanceEIP712ExclusionListTypeName` (issue #32). */
export const EXCLUSION_LIST_PRIMARY_TYPE = 'QGOVL0ExclusionListProposal';

const EXCLUDED_VALIDATOR_TYPE = 'QGOVL0ExcludedValidator';

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export function buildRootListEip712TypedData (payload: GovPubRootListSigningPayload) {
  const { metadata, nodes } = payload;

  return {
    domain: {
      name: metadata.domain,
      version: metadata.version,
      chainId: metadata.chainId,
      verifyingContract: ZERO_ADDRESS,
    },
    types: {
      [ROOT_LIST_PRIMARY_TYPE]: [
        { name: 'proposalType', type: 'string' },
        { name: 'timestamp', type: 'uint256' },
        { name: 'payloadHash', type: 'bytes32' },
        { name: 'nodes', type: 'address[]' },
      ],
    },
    message: {
      proposalType: metadata.proposalType,
      timestamp: metadata.timestamp,
      payloadHash: metadata.payloadHash,
      nodes: nodes.map((node) => ethers.utils.getAddress(node)),
    },
  };
}

export function computeRootListEip712Digest (
  payload: GovPubRootListSigningPayload,
): string {
  const { domain, types, message } = buildRootListEip712TypedData(payload);
  return _TypedDataEncoder.hash(domain, types, message);
}

export function buildExclusionListEip712TypedData (payload: GovPubExclusionListSigningPayload) {
  const { metadata, validators } = payload;

  return {
    domain: {
      name: metadata.domain,
      version: metadata.version,
      chainId: metadata.chainId,
      verifyingContract: ZERO_ADDRESS,
    },
    types: {
      [EXCLUSION_LIST_PRIMARY_TYPE]: [
        { name: 'proposalType', type: 'string' },
        { name: 'timestamp', type: 'uint256' },
        { name: 'payloadHash', type: 'bytes32' },
        { name: 'validators', type: `${EXCLUDED_VALIDATOR_TYPE}[]` },
      ],
      [EXCLUDED_VALIDATOR_TYPE]: [
        { name: 'address', type: 'address' },
        { name: 'block', type: 'uint256' },
        { name: 'endBlock', type: 'uint256' },
      ],
    },
    message: {
      proposalType: metadata.proposalType,
      timestamp: metadata.timestamp,
      payloadHash: metadata.payloadHash,
      validators: validators.map((validator) => ({
        address: ethers.utils.getAddress(validator.address),
        block: validator.block,
        endBlock: validator.endBlock ?? 0,
      })),
    },
  };
}

export function computeExclusionListEip712Digest (
  payload: GovPubExclusionListSigningPayload,
): string {
  const { domain, types, message } = buildExclusionListEip712TypedData(payload);
  return _TypedDataEncoder.hash(domain, types, message);
}

async function signWithEip712TypedData (
  signer: Signer,
  typedData: GovPubEip712TypedData,
): Promise<string> {
  const provider = signer.provider;
  if (!provider) {
    throw new Error('Signer has no provider');
  }

  const signature: string = await (provider as ethers.providers.JsonRpcProvider).send(
    'eth_signTypedData_v4',
    [
      await signer.getAddress(),
      JSON.stringify(typedData),
    ],
  );

  return ethers.utils.hexlify(ethers.utils.arrayify(signature));
}

export async function signRootListGovernancePayload (
  signer: Signer,
  bundle: GovPubRootListSigningPayloadWithDigest,
): Promise<string> {
  if (bundle.typedData) {
    return signWithEip712TypedData(signer, bundle.typedData);
  }

  if (!bundle.payload) {
    throw new Error('govPub signing response missing typedData and legacy payload');
  }

  const { domain, types, message } = buildRootListEip712TypedData(bundle.payload);
  const eip712Digest = computeRootListEip712Digest(bundle.payload);

  if (
    bundle.digest &&
    bundle.digest.toLowerCase() !== eip712Digest.toLowerCase()
  ) {
    console.warn(
      '[L0 governance] RPC digest does not match locally built EIP-712 hash:',
      { rpcDigest: bundle.digest, eip712Digest },
    );
  }

  const provider = signer.provider;
  if (!provider) {
    throw new Error('Signer has no provider');
  }

  const typedDataPayload = _TypedDataEncoder.getPayload(domain, types, message);
  const signature: string = await (provider as ethers.providers.JsonRpcProvider).send(
    'eth_signTypedData_v4',
    [
      await signer.getAddress(),
      JSON.stringify(typedDataPayload),
    ],
  );

  return ethers.utils.hexlify(ethers.utils.arrayify(signature));
}

export async function signExclusionListGovernancePayload (
  signer: Signer,
  bundle: GovPubExclusionListSigningPayloadWithDigest,
): Promise<string> {
  if (bundle.typedData) {
    return signWithEip712TypedData(signer, bundle.typedData);
  }

  if (!bundle.payload) {
    throw new Error('govPub signing response missing typedData and legacy payload');
  }

  const { domain, types, message } = buildExclusionListEip712TypedData(bundle.payload);
  const eip712Digest = computeExclusionListEip712Digest(bundle.payload);

  if (
    bundle.digest &&
    bundle.digest.toLowerCase() !== eip712Digest.toLowerCase()
  ) {
    console.warn(
      '[L0 governance] RPC digest does not match locally built EIP-712 hash:',
      { rpcDigest: bundle.digest, eip712Digest },
    );
  }

  const provider = signer.provider;
  if (!provider) {
    throw new Error('Signer has no provider');
  }

  const typedDataPayload = _TypedDataEncoder.getPayload(domain, types, message);
  const signature: string = await (provider as ethers.providers.JsonRpcProvider).send(
    'eth_signTypedData_v4',
    [
      await signer.getAddress(),
      JSON.stringify(typedDataPayload),
    ],
  );

  return ethers.utils.hexlify(ethers.utils.arrayify(signature));
}
