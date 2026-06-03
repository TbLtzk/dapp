export interface GovPubRootList {
  timestamp: number;
  nodes: string[];
  hash: string;
  signatures: string[];
}

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

export interface GovPubRootListSigningPayloadWithDigest {
  payload: GovPubRootListSigningPayload;
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
  payload: GovPubExclusionListSigningPayload;
  digest: string;
}

export const ZERO_HASH = '0x0000000000000000000000000000000000000000000000000000000000000000';
