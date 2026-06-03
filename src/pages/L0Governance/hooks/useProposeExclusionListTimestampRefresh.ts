import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { L0ExclusionListItem } from '@q-dev/q-js-sdk';
import { useWeb3Context } from 'context/Web3ContextProvider';
import { ErrorHandler } from 'helpers';
import { getRootNodesExclusion } from 'helpers/root-node-metrics';

import useNetworkConfig from 'hooks/useNetworkConfig';

import { hasActiveExclusionList } from '../helpers/active-exclusion-list-indexer';
import { fetchGovPubActiveExclusionList } from '../helpers/gov-pub-active-exclusion-list';
import {
  createGovPubProvider,
  exclusionListFromSigningPayload,
  extractRpcErrorMessage,
  fetchSigningPayloadExclusionListV1WithDigest,
  probeGovPubExclusionListSigning,
  submitTypedSignedExclusionList,
} from '../helpers/gov-pub-rpc';
import { buildProposalTimestamp } from '../helpers/root-list-hash';
import { signExclusionListGovernancePayload } from '../helpers/sign-governance-typed-data';
import { GovPubExclusionList, ZERO_HASH } from '../helpers/types';

import { Bus } from 'utils/event-bus';

export type ProposeExclusionListPhase =
  | 'idle'
  | 'running'
  | 'success';

interface UseProposeExclusionListTimestampRefreshResult {
  phase: ProposeExclusionListPhase;
  isGovPubAvailable: boolean | null;
  isCheckingGovPub: boolean;
  isLoadingActive: boolean;
  hasActive: boolean;
  submittedProposalHash: string | null;
  proposeExclusionListTimestampRefresh: () => Promise<void>;
}

export function useProposeExclusionListTimestampRefresh (): UseProposeExclusionListTimestampRefreshResult {
  const { t } = useTranslation();
  const { rpcUrl, indexerUrl } = useNetworkConfig();
  const { currentSigner, isConnected } = useWeb3Context();

  const [phase, setPhase] = useState<ProposeExclusionListPhase>('idle');
  const [isGovPubAvailable, setIsGovPubAvailable] = useState<boolean | null>(null);
  const [isCheckingGovPub, setIsCheckingGovPub] = useState(false);
  const [isLoadingActive, setIsLoadingActive] = useState(false);
  const [activeFromIndexer, setActiveFromIndexer] = useState<L0ExclusionListItem | null>(null);
  const [submittedProposalHash, setSubmittedProposalHash] = useState<string | null>(null);

  const govPubProvider = useMemo(
    () => (rpcUrl ? createGovPubProvider(rpcUrl) : null),
    [rpcUrl],
  );

  const hasActive = hasActiveExclusionList(activeFromIndexer);

  useEffect(() => {
    let isMounted = true;

    async function checkCapabilities () {
      if (!govPubProvider || !isConnected) {
        if (isMounted) {
          setIsGovPubAvailable(null);
          setIsCheckingGovPub(false);
        }
        return;
      }

      setIsCheckingGovPub(true);

      try {
        const isAvailable = await probeGovPubExclusionListSigning(govPubProvider);
        if (isMounted) {
          setIsGovPubAvailable(isAvailable);
        }
      } catch {
        if (isMounted) {
          setIsGovPubAvailable(false);
        }
      } finally {
        if (isMounted) {
          setIsCheckingGovPub(false);
        }
      }
    }

    checkCapabilities();

    return () => {
      isMounted = false;
    };
  }, [govPubProvider, isConnected]);

  useEffect(() => {
    let isMounted = true;

    async function loadActiveFromIndexer () {
      if (!isConnected || !indexerUrl) {
        if (isMounted) {
          setActiveFromIndexer(null);
          setIsLoadingActive(false);
        }
        return;
      }

      setIsLoadingActive(true);

      try {
        const active = await getRootNodesExclusion(indexerUrl, 'active');
        if (isMounted) {
          setActiveFromIndexer(active);
        }
      } catch {
        if (isMounted) {
          setActiveFromIndexer(null);
        }
      } finally {
        if (isMounted) {
          setIsLoadingActive(false);
        }
      }
    }

    loadActiveFromIndexer();

    return () => {
      isMounted = false;
    };
  }, [indexerUrl, isConnected]);

  const proposeExclusionListTimestampRefresh = useCallback(async () => {
    if (!currentSigner || !govPubProvider) {
      ErrorHandler.process(new Error('Wallet not connected'), t('L0_EXCLUSION_PROPOSE_DISCONNECTED'));
      return;
    }

    if (isGovPubAvailable === false) {
      ErrorHandler.process(new Error('govPub unavailable'), t('L0_PROPOSE_RPC_UNSUPPORTED'));
      return;
    }

    if (!hasActive) {
      ErrorHandler.process(new Error('No active exclusion list'), t('L0_EXCLUSION_PROPOSE_NO_ACTIVE'));
      return;
    }

    setPhase('running');
    setSubmittedProposalHash(null);

    try {
      const activeList = await fetchGovPubActiveExclusionList(govPubProvider);

      if (!activeList) {
        throw new Error(t('L0_EXCLUSION_PROPOSE_NO_ACTIVE'));
      }

      const timestamp = Math.max(
        buildProposalTimestamp(),
        activeList.timestamp + 1,
      );

      const unsignedList: GovPubExclusionList = {
        timestamp,
        validators: activeList.validators,
        hash: ZERO_HASH,
        signatures: [],
      };

      const payloadBundle = await fetchSigningPayloadExclusionListV1WithDigest(
        govPubProvider,
        unsignedList,
      );

      const canonicalList = exclusionListFromSigningPayload(payloadBundle);
      const signature = await signExclusionListGovernancePayload(
        currentSigner,
        payloadBundle,
      );

      const signedList: GovPubExclusionList = {
        ...canonicalList,
        signatures: [signature],
      };

      const proposalHash = await submitTypedSignedExclusionList(govPubProvider, signedList);

      setSubmittedProposalHash(proposalHash);
      setPhase('success');
      Bus.success({
        title: t('L0_EXCLUSION_PROPOSE_SUCCESS_TITLE'),
        message: t('L0_EXCLUSION_PROPOSE_SUCCESS_MESSAGE'),
      });
    } catch (error) {
      setPhase('idle');

      if (isUserRejectedRequest(error)) {
        ErrorHandler.process(error, t('L0_PROPOSE_SIGN_REJECTED'));
        return;
      }

      const rpcMessage = extractRpcErrorMessage(error);
      ErrorHandler.process(error, rpcMessage || t('L0_EXCLUSION_PROPOSE_FAILED'));
    }
  }, [currentSigner, govPubProvider, hasActive, isGovPubAvailable, t]);

  return {
    phase,
    isGovPubAvailable,
    isCheckingGovPub,
    isLoadingActive,
    hasActive,
    submittedProposalHash,
    proposeExclusionListTimestampRefresh,
  };
}

function isUserRejectedRequest (error: unknown): boolean {
  const candidate = error as { code?: number; message?: string };
  const message = candidate?.message?.toLowerCase() || '';

  return candidate?.code === 4001 ||
    message.includes('user rejected') ||
    message.includes('user denied');
}
