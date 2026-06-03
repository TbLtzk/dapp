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

export const ZERO_HASH = '0x0000000000000000000000000000000000000000000000000000000000000000';
