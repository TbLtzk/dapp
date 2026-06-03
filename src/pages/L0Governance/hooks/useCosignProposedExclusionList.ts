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
  extractRpcErrorMessage,
  fetchSigningPayloadExclusionListV1WithDigest,
  probeGovPubExclusionListSigning,
  submitTypedSignedExclusionList,
} from '../helpers/gov-pub-rpc';
import {
  hasProposedExclusionList,
  hasSignedProposedExclusionList,
} from '../helpers/proposed-exclusion-list-indexer';
import { signExclusionListGovernancePayload } from '../helpers/sign-governance-typed-data';
import { GovPubExclusionList } from '../helpers/types';

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
  hasProposed: boolean;
  hasAlreadySigned: boolean;
  submittedAttestationHash: string | null;
  cosignProposedExclusionList: () => Promise<void>;
}

export function useCosignProposedExclusionList (): UseCosignProposedExclusionListResult {
  const { t } = useTranslation();
  const { rpcUrl, indexerUrl } = useNetworkConfig();
  const { address, currentSigner, isConnected } = useWeb3Context();

  const [phase, setPhase] = useState<CosignProposedExclusionListPhase>('idle');
  const [isGovPubAvailable, setIsGovPubAvailable] = useState<boolean | null>(null);
  const [isCheckingGovPub, setIsCheckingGovPub] = useState(false);
  const [isLoadingProposed, setIsLoadingProposed] = useState(false);
  const [proposedFromIndexer, setProposedFromIndexer] = useState<L0ExclusionListItem | null>(null);
  const [submittedAttestationHash, setSubmittedAttestationHash] = useState<string | null>(null);

  const govPubProvider = useMemo(
    () => (rpcUrl ? createGovPubProvider(rpcUrl) : null),
    [rpcUrl],
  );

  const hasProposed = hasProposedExclusionList(proposedFromIndexer);
  const hasAlreadySigned = hasSignedProposedExclusionList(proposedFromIndexer, address);

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
  }, [indexerUrl, isConnected]);

  const cosignProposedExclusionList = useCallback(async () => {
    if (!currentSigner || !govPubProvider) {
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
        currentSigner,
        payloadBundle,
      );

      const signedList: GovPubExclusionList = {
        ...canonicalList,
        signatures: [signature],
      };

      const attestationHash = await submitTypedSignedExclusionList(govPubProvider, signedList);

      setSubmittedAttestationHash(attestationHash);
      setPhase('success');
      Bus.success({
        title: t('L0_EXCLUSION_COSIGN_SUCCESS_TITLE'),
        message: t('L0_EXCLUSION_COSIGN_SUCCESS_MESSAGE'),
      });
    } catch (error) {
      setPhase('idle');

      if (isUserRejectedRequest(error)) {
        ErrorHandler.process(error, t('L0_PROPOSE_SIGN_REJECTED'));
        return;
      }

      const rpcMessage = extractRpcErrorMessage(error);
      ErrorHandler.process(error, rpcMessage || t('L0_EXCLUSION_COSIGN_FAILED'));
    }
  }, [
    currentSigner,
    govPubProvider,
    hasAlreadySigned,
    hasProposed,
    isGovPubAvailable,
    t,
  ]);

  return {
    phase,
    isGovPubAvailable,
    isCheckingGovPub,
    isLoadingProposed,
    hasProposed,
    hasAlreadySigned,
    submittedAttestationHash,
    cosignProposedExclusionList,
  };
}

function isUserRejectedRequest (error: unknown): boolean {
  const candidate = error as { code?: number; message?: string };
  const message = candidate?.message?.toLowerCase() || '';

  return candidate?.code === 4001 ||
    message.includes('user rejected') ||
    message.includes('user denied');
}
