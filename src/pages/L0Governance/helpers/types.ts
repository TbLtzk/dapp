export interface GovPubRootList {
  timestamp: number;
  nodes: string[];
  hash: string;
  signatures: string[];
}

/** Legacy pre-#32 signing payload (metadata + nodes). */
export interface GovPubRootListSigningMetadata {
  domain: string;
  version: string;
  chainId: number;
  proposalType: string;
  timestamp: number;
  payloadHash: string;
}

export interface GovPubRootListSigningPayload {
  metadata: GovPubRootListSigningMetadata;
  nodes: string[];
}

export interface GovPubEip712TypeField {
  name: string;
  type: string;
}

export interface GovPubEip712TypedData {
  types: Record<string, GovPubEip712TypeField[]>;
  primaryType: string;
  domain: {
    name: string;
    version: string;
    chainId: string | number;
    verifyingContract: string;
  };
  message: Record<string, unknown>;
}

export interface GovPubRootListSigningPayloadWithDigest {
  typedData?: GovPubEip712TypedData;
  /** @deprecated Pre-q-client #32; use typedData when present. */
  payload?: GovPubRootListSigningPayload;
  digest: string;
}

export interface GovPubExcludedValidator {
  address: string;
  block: number;
  endBlock?: number;
}

export interface GovPubExclusionList {
  timestamp: number;
  validators: GovPubExcludedValidator[];
  hash: string;
  signatures: string[];
}

export interface GovPubExclusionListSigningPayload {
  metadata: GovPubRootListSigningMetadata;
  validators: GovPubExcludedValidator[];
}

export interface GovPubExclusionListSigningPayloadWithDigest {
  typedData?: GovPubEip712TypedData;
  /** @deprecated Pre-q-client #32; use typedData when present. */
  payload?: GovPubExclusionListSigningPayload;
  digest: string;
}

export const ZERO_HASH = '0x0000000000000000000000000000000000000000000000000000000000000000';
