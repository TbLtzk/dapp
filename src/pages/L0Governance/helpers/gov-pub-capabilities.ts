import {
  GovPubRpcProvider,
  isRpcMethodMissing,
  probeGovPubExclusionListSigning,
  probeGovPubRootListSigning,
} from './gov-pub-rpc';

export interface GovPubListCapabilities {
  rawSubmit: boolean;
  typedSubmit: boolean;
  signingSchemes: string[];
  signingPayloadVersions: string[];
}

export interface GovPubSigningPayloadCapabilities {
  domain: string;
  version: string;
  verifyingContract: string;
  signingPayloadWithDigest: boolean;
}

export interface GovPubL0GovernanceCapabilities {
  schemaVersion: number;
  networkId: number;
  externalSubmissionEnabled: boolean;
  qgovTypedRelayVersion?: number;
  rootList: GovPubListCapabilities;
  exclusionList: GovPubListCapabilities;
  proposalStatus?: boolean;
  proposalStatusRequiredSigningAddress?: boolean;
  aliasSigningRequired?: boolean;
  signingPayload?: GovPubSigningPayloadCapabilities;
}

export type GovPubCapabilitySource = 'idle' | 'capabilities' | 'probe';

export interface ResolvedGovPubCapabilities {
  source: GovPubCapabilitySource;
  externalSubmissionEnabled: boolean | null;
  isExternalSubmissionDisabled: boolean;
  isRootListSigningAvailable: boolean | null;
  isExclusionListSigningAvailable: boolean | null;
  qgovTypedRelayVersion: number | null;
}

const EIP712_V1 = 'eip712-v1';

export async function fetchL0GovernanceCapabilities (
  provider: GovPubRpcProvider,
): Promise<GovPubL0GovernanceCapabilities> {
  return provider.send('govPub_l0GovernanceCapabilities', []);
}

function isListTypedSigningSupported (list: GovPubListCapabilities): boolean {
  return list.typedSubmit && list.signingPayloadVersions.includes(EIP712_V1);
}

export function isRootListGovernanceSupported (
  capabilities: GovPubL0GovernanceCapabilities,
): boolean {
  if (!capabilities.externalSubmissionEnabled) {
    return false;
  }

  if (!isListTypedSigningSupported(capabilities.rootList)) {
    return false;
  }

  if (capabilities.signingPayload?.signingPayloadWithDigest === false) {
    return false;
  }

  return true;
}

export function isExclusionListGovernanceSupported (
  capabilities: GovPubL0GovernanceCapabilities,
): boolean {
  if (!capabilities.externalSubmissionEnabled) {
    return false;
  }

  if (!isListTypedSigningSupported(capabilities.exclusionList)) {
    return false;
  }

  if (capabilities.signingPayload?.signingPayloadWithDigest === false) {
    return false;
  }

  return true;
}

export function resolveCapabilitiesFromEndpoint (
  capabilities: GovPubL0GovernanceCapabilities,
): ResolvedGovPubCapabilities {
  return {
    source: 'capabilities',
    externalSubmissionEnabled: capabilities.externalSubmissionEnabled,
    isExternalSubmissionDisabled: !capabilities.externalSubmissionEnabled,
    isRootListSigningAvailable: isRootListGovernanceSupported(capabilities),
    isExclusionListSigningAvailable: isExclusionListGovernanceSupported(capabilities),
    qgovTypedRelayVersion: capabilities.qgovTypedRelayVersion ?? null,
  };
}

export async function resolveGovPubCapabilities (
  provider: GovPubRpcProvider,
): Promise<ResolvedGovPubCapabilities> {
  try {
    const capabilities = await fetchL0GovernanceCapabilities(provider);
    return resolveCapabilitiesFromEndpoint(capabilities);
  } catch (error) {
    if (!isRpcMethodMissing(error)) {
      throw error;
    }
  }

  const [isRootListSigningAvailable, isExclusionListSigningAvailable] = await Promise.all([
    probeGovPubRootListSigning(provider),
    probeGovPubExclusionListSigning(provider),
  ]);

  return {
    source: 'probe',
    externalSubmissionEnabled: null,
    isExternalSubmissionDisabled: false,
    isRootListSigningAvailable,
    isExclusionListSigningAvailable,
    qgovTypedRelayVersion: null,
  };
}
