import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { L0RootListItem } from '@q-dev/q-js-sdk';
import { useWeb3Context } from 'context/Web3ContextProvider';
import { ErrorHandler } from 'helpers';
import { getRootNodesL0 } from 'helpers/root-node-metrics';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { fetchGovPubProposedRootList } from '../helpers/gov-pub-proposed-root-list';
import {
  createGovPubProvider,
  extractRpcErrorMessage,
  fetchSigningPayloadRootListV1WithDigest,
  rootListFromSigningPayload,
  submitTypedSignedRootList,
} from '../helpers/gov-pub-rpc';
import { refreshGovernanceStateAfterSubmit } from '../helpers/governance-submit-refresh';
import { removePendingAttestationsForWallet } from '../helpers/pending-attestation-store';
import {
  hasProposedRootList,
  hasSignedProposedRootList,
} from '../helpers/proposed-root-list-indexer';
import { signRootListGovernancePayload } from '../helpers/sign-governance-typed-data';
import { GovPubRootList } from '../helpers/types';

import { useGovPubCapabilitiesContext } from './GovPubCapabilitiesContext';
import { useAwaitingGovernanceIndexerConfirmation } from './useAwaitingGovernanceIndexerConfirmation';

import { Bus } from 'utils/event-bus';

export type CosignProposedRootListPhase =
  | 'idle'
  | 'running'
  | 'success';

interface UseCosignProposedRootListResult {
  phase: CosignProposedRootListPhase;
  isGovPubAvailable: boolean | null;
  isCheckingGovPub: boolean;
  isLoadingProposed: boolean;
  isRefreshingAfterSubmit: boolean;
  hasProposed: boolean;
  hasAlreadySigned: boolean;
  submittedAttestationHash: string | null;
  cosignProposedRootList: () => Promise<void>;
}

export function useCosignProposedRootList (): UseCosignProposedRootListResult {
  const { t } = useTranslation();
  const { rpcUrl, indexerUrl } = useNetworkConfig();
  const { address, chainId, currentSigner, isConnected } = useWeb3Context();

  const {
    isRootListSigningAvailable: isGovPubAvailable,
    isChecking: isCheckingGovPub,
  } = useGovPubCapabilitiesContext();

  const { isAwaiting, clearAwaiting, markAwaiting } = useAwaitingGovernanceIndexerConfirmation('cosign-root');

  const [phase, setPhase] = useState<CosignProposedRootListPhase>('idle');
  const [isLoadingProposed, setIsLoadingProposed] = useState(false);
  const [isRefreshingAfterSubmit, setIsRefreshingAfterSubmit] = useState(false);
  const [proposedFromIndexer, setProposedFromIndexer] = useState<L0RootListItem | null>(null);
  const [submittedAttestationHash, setSubmittedAttestationHash] = useState<string | null>(null);

  const govPubProvider = useMemo(
    () => (rpcUrl ? createGovPubProvider(rpcUrl) : null),
    [rpcUrl],
  );

  const hasProposed = hasProposedRootList(proposedFromIndexer);
  const hasAlreadySignedFromIndexer = hasSignedProposedRootList(proposedFromIndexer, address);
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
        const proposed = await getRootNodesL0(indexerUrl, 'proposed');
        if (isMounted) {
          setProposedFromIndexer(proposed);

          if (proposed && address && chainId && hasSignedProposedRootList(proposed, address)) {
            removePendingAttestationsForWallet(chainId, address, 'cosign-root');
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
  }, [address, chainId, clearAwaiting, indexerUrl, isConnected]);

  const cosignProposedRootList = useCallback(async () => {
    if (!currentSigner || !govPubProvider || !address || !chainId || !indexerUrl) {
      ErrorHandler.process(new Error('Wallet not connected'), t('L0_COSIGN_DISCONNECTED'));
      return;
    }

    if (isGovPubAvailable === false) {
      ErrorHandler.process(new Error('govPub unavailable'), t('L0_PROPOSE_RPC_UNSUPPORTED'));
      return;
    }

    if (!hasProposed) {
      ErrorHandler.process(new Error('No proposed root list'), t('L0_COSIGN_NO_PROPOSAL'));
      return;
    }

    if (hasAlreadySigned) {
      ErrorHandler.process(new Error('Already signed'), t('L0_COSIGN_ALREADY_SIGNED'));
      return;
    }

    const baselineSignerCount = proposedFromIndexer?.signers?.length ?? 0;
    const listFingerprint = proposedFromIndexer?.timestamp != null
      ? String(proposedFromIndexer.timestamp)
      : undefined;

    setPhase('running');
    setSubmittedAttestationHash(null);

    try {
      const proposedList = await fetchGovPubProposedRootList(govPubProvider);

      if (!proposedList) {
        throw new Error(t('L0_COSIGN_NO_PROPOSAL'));
      }

      const unsignedList: GovPubRootList = {
        ...proposedList,
        signatures: [],
      };

      const payloadBundle = await fetchSigningPayloadRootListV1WithDigest(
        govPubProvider,
        unsignedList,
      );

      const canonicalList = rootListFromSigningPayload(payloadBundle);
      const signature = await signRootListGovernancePayload(
        currentSigner,
        payloadBundle,
      );

      const signedList: GovPubRootList = {
        ...canonicalList,
        signatures: [signature],
      };

      const attestationHash = await submitTypedSignedRootList(govPubProvider, signedList);

      setSubmittedAttestationHash(attestationHash);
      setPhase('success');
      markAwaiting({
        attestationHash,
        action: 'cosign-root',
        walletAddress: address,
        submittedAt: Date.now(),
        listFingerprint,
      });

      Bus.success({
        title: t('L0_COSIGN_SUCCESS_TITLE'),
        message: t('L0_COSIGN_SUCCESS_MESSAGE'),
      });

      setIsRefreshingAfterSubmit(true);

      const { result, proposedRoot } = await refreshGovernanceStateAfterSubmit({
        chainId,
        indexerUrl,
        walletAddress: address,
        action: 'cosign-root',
        attestationHash,
        listFingerprint,
        baselineSignerCount,
      });

      if (proposedRoot) {
        setProposedFromIndexer(proposedRoot);
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

      if (isUserRejectedRequest(error)) {
        ErrorHandler.process(error, t('L0_PROPOSE_SIGN_REJECTED'));
        return;
      }

      const rpcMessage = extractRpcErrorMessage(error);
      ErrorHandler.process(error, rpcMessage || t('L0_COSIGN_FAILED'));
    } finally {
      setIsRefreshingAfterSubmit(false);
    }
  }, [
    address,
    chainId,
    clearAwaiting,
    currentSigner,
    govPubProvider,
    hasAlreadySigned,
    hasProposed,
    indexerUrl,
    isGovPubAvailable,
    markAwaiting,
    proposedFromIndexer,
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
    cosignProposedRootList,
  };
}

function isUserRejectedRequest (error: unknown): boolean {
  const candidate = error as { code?: number; message?: string };
  const message = candidate?.message?.toLowerCase() || '';

  return candidate?.code === 4001 ||
    message.includes('user rejected') ||
    message.includes('user denied');
}
