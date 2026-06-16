import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { L0ExclusionListItem, L0RootListItem } from '@q-dev/q-js-sdk';
import { CosignatureStatus } from 'typings/root-nodes';

import {
  hasThirdPartyProposedSigners,
  isConnectedRootNotOnline,
  isL0GovernanceRelayPhase0,
} from '../helpers/governance-advisories';

import { L0GovernanceAction } from './useL0GovernanceActionGuard';
import { useGovPubCapabilitiesContext } from './GovPubCapabilitiesContext';

export type L0GovernanceAdvisoryAction = L0GovernanceAction | 'propose-exclusion';

export type L0GovernanceAdvisoryId =
  | 'connected-root-offline'
  | 'supersedes-signed-root-proposal'
  | 'supersedes-signed-exclusion-proposal';

export interface L0GovernanceAdvisory {
  id: L0GovernanceAdvisoryId;
  title: string;
  message: string;
}

export interface L0GovernanceAdvisoryGuardInput {
  connectedCosignatureStatus: CosignatureStatus | null;
  proposedRootList?: L0RootListItem | null;
  proposedExclusionList?: L0ExclusionListItem | null;
  walletAddress?: string;
}

export interface L0GovernanceAdvisoryGuardResult {
  advisories: L0GovernanceAdvisory[];
}

export function useL0GovernanceAdvisoryGuard (
  action: L0GovernanceAdvisoryAction,
  input: L0GovernanceAdvisoryGuardInput,
): L0GovernanceAdvisoryGuardResult {
  const { t } = useTranslation();
  const { qgovTypedRelayVersion } = useGovPubCapabilitiesContext();

  return useMemo(() => {
    const advisories: L0GovernanceAdvisory[] = [];

    if (isConnectedRootNotOnline(input.connectedCosignatureStatus)) {
      const offlineMessage = isL0GovernanceRelayPhase0(qgovTypedRelayVersion)
        ? t('L0_ADVISORY_CONNECTED_OFFLINE_MESSAGE_PHASE0')
        : t('L0_ADVISORY_CONNECTED_OFFLINE_MESSAGE');

      advisories.push({
        id: 'connected-root-offline',
        title: t('L0_ADVISORY_CONNECTED_OFFLINE_TITLE'),
        message: offlineMessage,
      });
    }

    if (
      action === 'propose-root' &&
      hasThirdPartyProposedSigners(input.proposedRootList?.signers, input.walletAddress)
    ) {
      advisories.push({
        id: 'supersedes-signed-root-proposal',
        title: t('L0_ADVISORY_SUPERSEDE_ROOT_TITLE'),
        message: t('L0_ADVISORY_SUPERSEDE_ROOT_MESSAGE'),
      });
    }

    if (
      action === 'propose-exclusion' &&
      hasThirdPartyProposedSigners(input.proposedExclusionList?.signers, input.walletAddress)
    ) {
      advisories.push({
        id: 'supersedes-signed-exclusion-proposal',
        title: t('L0_ADVISORY_SUPERSEDE_EXCLUSION_TITLE'),
        message: t('L0_ADVISORY_SUPERSEDE_EXCLUSION_MESSAGE'),
      });
    }

    return { advisories };
  }, [
    action,
    input.connectedCosignatureStatus,
    input.proposedExclusionList,
    input.proposedRootList,
    input.walletAddress,
    qgovTypedRelayVersion,
    t,
  ]);
}
