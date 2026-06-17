import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { L0ExclusionListItem } from '@q-dev/q-js-sdk';
import { useWeb3Context } from 'context/Web3ContextProvider';
import { ErrorHandler } from 'helpers';
import { getRootNodesExclusion } from 'helpers/root-node-metrics';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { fetchGovPubProposedExclusionList } from '../helpers/gov-pub-proposed-exclusion-list';
import {
  createGovPubProvider,
  exclusionListFromSigningPayload,
  fetchSigningPayloadExclusionListV1WithDigest,
  submitTypedSignedExclusionList,
} from '../helpers/gov-pub-rpc';
import { refreshGovernanceStateAfterSubmit } from '../helpers/governance-submit-refresh';
import { removePendingAttestationsForWallet } from '../helpers/pending-attestation-store';
import {
  hasProposedExclusionList,
  hasSignedProposedExclusionList,
} from '../helpers/proposed-exclusion-list-indexer';
import { signExclusionListGovernancePayload } from '../helpers/sign-governance-typed-data';
import { GovPubExclusionList } from '../helpers/types';

import { useGovPubCapabilitiesContext } from './GovPubCapabilitiesContext';
import { useAwaitingGovernanceIndexerConfirmation } from './useAwaitingGovernanceIndexerConfirmation';
import { useL0GovernanceSubmitSigning } from './useL0GovernanceSubmitSigning';

import { Bus } from 'utils/event-bus';

export type CosignProposedExclusionListPhase =
  | 'idle'
  | 'running'
  | 'success';

interface UseCosignProposedExclusionListResult {
  phase: CosignProposedExclusionListPhase;
  isGovPubAvailable: boolean | null;
  isCheckingGovPub: boolean;
  isLoadingProposed: boolean;
  isRefreshingAfterSubmit: boolean;
  hasProposed: boolean;
  hasAlreadySigned: boolean;
  submittedAttestationHash: string | null;
  cosignProposedExclusionList: () => Promise<void>;
}

export function useCosignProposedExclusionList (): UseCosignProposedExclusionListResult {
  const { t } = useTranslation();
  const { rpcUrl, indexerUrl } = useNetworkConfig();
  const { chainId, isConnected } = useWeb3Context();
  const {
    signingAddress,
    requireSigningSigner,
    processSubmitError,
  } = useL0GovernanceSubmitSigning();

  const {
    isExclusionListSigningAvailable: isGovPubAvailable,
    isChecking: isCheckingGovPub,
  } = useGovPubCapabilitiesContext();

  const { isAwaiting, clearAwaiting, markAwaiting } = useAwaitingGovernanceIndexerConfirmation('cosign-exclusion');

  const [phase, setPhase] = useState<CosignProposedExclusionListPhase>('idle');
  const [isLoadingProposed, setIsLoadingProposed] = useState(false);
  const [isRefreshingAfterSubmit, setIsRefreshingAfterSubmit] = useState(false);
  const [proposedFromIndexer, setProposedFromIndexer] = useState<L0ExclusionListItem | null>(null);
  const [submittedAttestationHash, setSubmittedAttestationHash] = useState<string | null>(null);

  const govPubProvider = useMemo(
    () => (rpcUrl ? createGovPubProvider(rpcUrl) : null),
    [rpcUrl],
  );

  const hasProposed = hasProposedExclusionList(proposedFromIndexer);
  const hasAlreadySignedFromIndexer = hasSignedProposedExclusionList(proposedFromIndexer, signingAddress);
  const hasAlreadySigned = hasAlreadySignedFromIndexer || isAwaiting;

  useEffect(() => {
    let isMounted = true;

    async function loadProposedFromIndexer () {
      if (!isConnected || !indexerUrl) {
        if (isMounted) {
          setProposedFromIndexer(null);
          setIsLoadingProposed(false);
        }
        return;
      }

      setIsLoadingProposed(true);

      try {
        const proposed = await getRootNodesExclusion(indexerUrl, 'proposed');
        if (isMounted) {
          setProposedFromIndexer(proposed);

          if (proposed && signingAddress && chainId && hasSignedProposedExclusionList(proposed, signingAddress)) {
            removePendingAttestationsForWallet(chainId, signingAddress, 'cosign-exclusion');
            clearAwaiting();
            setPhase('idle');
          }
        }
      } catch {
        if (isMounted) {
          setProposedFromIndexer(null);
        }
      } finally {
        if (isMounted) {
          setIsLoadingProposed(false);
        }
      }
    }

    loadProposedFromIndexer();

    return () => {
      isMounted = false;
    };
  }, [chainId, clearAwaiting, indexerUrl, isConnected, signingAddress]);

  const cosignProposedExclusionList = useCallback(async () => {
    if (!govPubProvider || !signingAddress || !chainId || !indexerUrl) {
      ErrorHandler.process(new Error('Wallet not connected'), t('L0_EXCLUSION_COSIGN_DISCONNECTED'));
      return;
    }

    if (isGovPubAvailable === false) {
      ErrorHandler.process(new Error('govPub unavailable'), t('L0_PROPOSE_RPC_UNSUPPORTED'));
      return;
    }

    if (!hasProposed) {
      ErrorHandler.process(new Error('No proposed exclusion list'), t('L0_EXCLUSION_COSIGN_NO_PROPOSAL'));
      return;
    }

    if (hasAlreadySigned) {
      ErrorHandler.process(new Error('Already signed'), t('L0_EXCLUSION_COSIGN_ALREADY_SIGNED'));
      return;
    }

    const signingSigner = await requireSigningSigner();
    if (!signingSigner) {
      return;
    }

    const baselineSignerCount = proposedFromIndexer?.signers?.length ?? 0;
    const listFingerprint = proposedFromIndexer?.timestamp != null
      ? String(proposedFromIndexer.timestamp)
      : undefined;

    setPhase('running');
    setSubmittedAttestationHash(null);

    try {
      const proposedList = await fetchGovPubProposedExclusionList(govPubProvider);

      if (!proposedList) {
        throw new Error(t('L0_EXCLUSION_COSIGN_NO_PROPOSAL'));
      }

      const unsignedList: GovPubExclusionList = {
        ...proposedList,
        signatures: [],
      };

      const payloadBundle = await fetchSigningPayloadExclusionListV1WithDigest(
        govPubProvider,
        unsignedList,
      );

      const canonicalList = exclusionListFromSigningPayload(payloadBundle);
      const signature = await signExclusionListGovernancePayload(
        signingSigner,
        payloadBundle,
      );

      const signedList: GovPubExclusionList = {
        ...canonicalList,
        signatures: [signature],
      };

      const attestationHash = await submitTypedSignedExclusionList(govPubProvider, signedList);

      setSubmittedAttestationHash(attestationHash);
      setPhase('success');
      markAwaiting({
        attestationHash,
        action: 'cosign-exclusion',
        walletAddress: signingAddress,
        submittedAt: Date.now(),
        listFingerprint,
      });

      Bus.success({
        title: t('L0_EXCLUSION_COSIGN_SUCCESS_TITLE'),
        message: t('L0_EXCLUSION_COSIGN_SUCCESS_MESSAGE'),
      });

      setIsRefreshingAfterSubmit(true);

      const { result, proposedExclusion } = await refreshGovernanceStateAfterSubmit({
        chainId,
        indexerUrl,
        walletAddress: signingAddress,
        action: 'cosign-exclusion',
        attestationHash,
        listFingerprint,
        baselineSignerCount,
      });

      if (proposedExclusion) {
        setProposedFromIndexer(proposedExclusion);
      }

      if (result === 'confirmed') {
        clearAwaiting(attestationHash);
        setPhase('idle');
      } else {
        Bus.warning({
          title: t('L0_GOVERNANCE_REFRESH_PENDING_TITLE'),
          message: t('L0_GOVERNANCE_REFRESH_PENDING_MESSAGE'),
        });
      }
    } catch (error) {
      setPhase('idle');
      processSubmitError(error, t('L0_EXCLUSION_COSIGN_FAILED'));
    } finally {
      setIsRefreshingAfterSubmit(false);
    }
  }, [
    chainId,
    clearAwaiting,
    govPubProvider,
    hasAlreadySigned,
    hasProposed,
    indexerUrl,
    isGovPubAvailable,
    markAwaiting,
    processSubmitError,
    proposedFromIndexer,
    requireSigningSigner,
    signingAddress,
    t,
  ]);

  return {
    phase,
    isGovPubAvailable,
    isCheckingGovPub,
    isLoadingProposed,
    isRefreshingAfterSubmit,
    hasProposed,
    hasAlreadySigned,
    submittedAttestationHash,
    cosignProposedExclusionList,
  };
}
