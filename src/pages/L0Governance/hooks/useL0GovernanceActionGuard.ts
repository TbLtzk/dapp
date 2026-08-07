import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useGovPubCapabilitiesContext } from './GovPubCapabilitiesContext';

export type L0GovernanceAction = 'propose-root' | 'cosign-root' | 'cosign-exclusion';

export type L0GovernanceActionPhase = 'idle' | 'running' | 'success';

export interface L0GovernanceActionGuardInput {
  phase: L0GovernanceActionPhase;
  isLoadingProposed?: boolean;
  hasProposed?: boolean;
  hasAlreadySigned?: boolean;
  isOnchainPanelEmpty?: boolean;
  isSigningAddressUnavailable?: boolean;
}

export interface L0GovernanceActionGuardResult {
  enabled: boolean;
  disabledReasons: string[];
  isChecking: boolean;
}

export function useL0GovernanceActionGuard (
  action: L0GovernanceAction,
  input: L0GovernanceActionGuardInput,
): L0GovernanceActionGuardResult {
  const { t } = useTranslation();
  const {
    hasRpcUrl,
    capabilitySource,
    isExternalSubmissionDisabled,
    isRootListSigningAvailable,
    isExclusionListSigningAvailable,
    isChecking,
  } = useGovPubCapabilitiesContext();

  return useMemo(() => {
    if (input.phase === 'running' || input.phase === 'success') {
      return { enabled: false, disabledReasons: [], isChecking: false };
    }

    if (isChecking || input.isLoadingProposed) {
      return { enabled: false, disabledReasons: [], isChecking: true };
    }

    if (input.isSigningAddressUnavailable) {
      return {
        enabled: false,
        disabledReasons: [t('L0_SIGNING_ADDRESS_UNAVAILABLE')],
        isChecking: false,
      };
    }

    if (!hasRpcUrl) {
      return {
        enabled: false,
        disabledReasons: [t('L0_GUARD_RPC_UNAVAILABLE')],
        isChecking: false,
      };
    }

    const needsRootSigning = action === 'propose-root' || action === 'cosign-root';
    const needsExclusionSigning = action === 'cosign-exclusion';

    if (
      capabilitySource === 'capabilities' &&
      isExternalSubmissionDisabled
    ) {
      return {
        enabled: false,
        disabledReasons: [t('L0_GUARD_EXTERNAL_SUBMISSION_DISABLED')],
        isChecking: false,
      };
    }

    if (needsRootSigning && isRootListSigningAvailable === false) {
      return {
        enabled: false,
        disabledReasons: [t('L0_PROPOSE_RPC_UNSUPPORTED')],
        isChecking: false,
      };
    }

    if (needsExclusionSigning && isExclusionListSigningAvailable === false) {
      return {
        enabled: false,
        disabledReasons: [t('L0_GUARD_EXCLUSION_RPC_UNSUPPORTED')],
        isChecking: false,
      };
    }

    if (
      (needsRootSigning && isRootListSigningAvailable === null) ||
      (needsExclusionSigning && isExclusionListSigningAvailable === null)
    ) {
      return { enabled: false, disabledReasons: [], isChecking: true };
    }

    if (action === 'cosign-root') {
      if (input.hasProposed === false) {
        return {
          enabled: false,
          disabledReasons: [t('L0_COSIGN_NO_PROPOSAL')],
          isChecking: false,
        };
      }

      if (input.hasAlreadySigned) {
        return {
          enabled: false,
          disabledReasons: [t('L0_COSIGN_ALREADY_SIGNED')],
          isChecking: false,
        };
      }
    }

    if (action === 'cosign-exclusion') {
      if (input.hasProposed === false) {
        return {
          enabled: false,
          disabledReasons: [t('L0_EXCLUSION_COSIGN_NO_PROPOSAL')],
          isChecking: false,
        };
      }

      if (input.hasAlreadySigned) {
        return {
          enabled: false,
          disabledReasons: [t('L0_EXCLUSION_COSIGN_ALREADY_SIGNED')],
          isChecking: false,
        };
      }
    }

    if (action === 'propose-root' && input.isOnchainPanelEmpty) {
      return {
        enabled: false,
        disabledReasons: [t('L0_PROPOSE_EMPTY_PANEL')],
        isChecking: false,
      };
    }

    return { enabled: true, disabledReasons: [], isChecking: false };
  }, [
    action,
    capabilitySource,
    hasRpcUrl,
    input.hasAlreadySigned,
    input.hasProposed,
    input.isLoadingProposed,
    input.isOnchainPanelEmpty,
    input.isSigningAddressUnavailable,
    input.phase,
    isExclusionListSigningAvailable,
    isExternalSubmissionDisabled,
    isRootListSigningAvailable,
    isChecking,
    t,
  ]);
}
