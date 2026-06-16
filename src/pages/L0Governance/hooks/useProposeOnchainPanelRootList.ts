import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useWeb3Context } from 'context/Web3ContextProvider';
import { ethers } from 'ethers';
import { ErrorHandler } from 'helpers';
import { getRootNodesL0 } from 'helpers/root-node-metrics';

import useNetworkConfig from 'hooks/useNetworkConfig';

import {
  createGovPubProvider,
  extractRpcErrorMessage,
  fetchSigningPayloadRootListV1WithDigest,
  rootListFromSigningPayload,
  submitTypedSignedRootList,
} from '../helpers/gov-pub-rpc';
import { refreshGovernanceStateAfterSubmit } from '../helpers/governance-submit-refresh';
import { buildProposalTimestamp, computeRootListHash } from '../helpers/root-list-hash';
import { signRootListGovernancePayload } from '../helpers/sign-governance-typed-data';
import { GovPubRootList } from '../helpers/types';

import { useGovPubCapabilitiesContext } from './GovPubCapabilitiesContext';
import { useAwaitingGovernanceIndexerConfirmation } from './useAwaitingGovernanceIndexerConfirmation';

import { getRootNodesInstance } from 'contracts/contract-instance';

import { Bus } from 'utils/event-bus';

export type ProposeOnchainPanelPhase =
  | 'idle'
  | 'running'
  | 'success';

interface UseProposeOnchainPanelRootListResult {
  phase: ProposeOnchainPanelPhase;
  isGovPubAvailable: boolean | null;
  isCheckingGovPub: boolean;
  isRefreshingAfterSubmit: boolean;
  submittedProposalHash: string | null;
  proposeFromOnchainPanel: () => Promise<void>;
}

export function useProposeOnchainPanelRootList (): UseProposeOnchainPanelRootListResult {
  const { t } = useTranslation();
  const { rpcUrl, indexerUrl } = useNetworkConfig();
  const { address, chainId, currentSigner } = useWeb3Context();

  const {
    isRootListSigningAvailable: isGovPubAvailable,
    isChecking: isCheckingGovPub,
  } = useGovPubCapabilitiesContext();

  const { isAwaiting, clearAwaiting, markAwaiting } = useAwaitingGovernanceIndexerConfirmation('propose-root');

  const [phase, setPhase] = useState<ProposeOnchainPanelPhase>('idle');
  const [isRefreshingAfterSubmit, setIsRefreshingAfterSubmit] = useState(false);
  const [submittedProposalHash, setSubmittedProposalHash] = useState<string | null>(null);

  const govPubProvider = useMemo(
    () => (rpcUrl ? createGovPubProvider(rpcUrl) : null),
    [rpcUrl],
  );

  useEffect(() => {
    if (isAwaiting) {
      setPhase('success');
    }
  }, [isAwaiting]);

  const proposeFromOnchainPanel = useCallback(async () => {
    if (!currentSigner || !govPubProvider || !address || !chainId || !indexerUrl) {
      ErrorHandler.process(new Error('Wallet not connected'), t('L0_PROPOSE_DISCONNECTED'));
      return;
    }

    if (isGovPubAvailable === false) {
      ErrorHandler.process(new Error('govPub unavailable'), t('L0_PROPOSE_RPC_UNSUPPORTED'));
      return;
    }

    setPhase('running');
    setSubmittedProposalHash(null);

    try {
      const proposedBefore = await getRootNodesL0(indexerUrl, 'proposed');
      const baselineSignerCount = proposedBefore?.signers?.length ?? 0;

      const rootNodesContract = await getRootNodesInstance();
      const panelMembers: string[] = await rootNodesContract.getMembers();

      if (!panelMembers.length) {
        throw new Error(t('L0_PROPOSE_EMPTY_PANEL'));
      }

      const timestamp = buildProposalTimestamp();
      const nodes = panelMembers.map((member) => ethers.utils.getAddress(member));
      const hash = computeRootListHash(timestamp, nodes);
      const listFingerprint = String(timestamp);

      const unsignedList: GovPubRootList = {
        timestamp,
        nodes,
        hash,
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

      const proposalHash = await submitTypedSignedRootList(govPubProvider, signedList);

      setSubmittedProposalHash(proposalHash);
      setPhase('success');
      markAwaiting({
        attestationHash: proposalHash,
        action: 'propose-root',
        walletAddress: address,
        submittedAt: Date.now(),
        listFingerprint,
      });

      Bus.success({
        title: t('L0_PROPOSE_SUCCESS_TITLE'),
        message: t('L0_PROPOSE_SUCCESS_MESSAGE'),
      });

      setIsRefreshingAfterSubmit(true);

      const { result } = await refreshGovernanceStateAfterSubmit({
        chainId,
        indexerUrl,
        walletAddress: address,
        action: 'propose-root',
        attestationHash: proposalHash,
        listFingerprint,
        baselineSignerCount,
      });

      if (result === 'confirmed') {
        clearAwaiting(proposalHash);
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
      ErrorHandler.process(error, rpcMessage || t('L0_PROPOSE_FAILED'));
    } finally {
      setIsRefreshingAfterSubmit(false);
    }
  }, [
    address,
    chainId,
    clearAwaiting,
    currentSigner,
    govPubProvider,
    indexerUrl,
    isGovPubAvailable,
    markAwaiting,
    t,
  ]);

  return {
    phase,
    isGovPubAvailable,
    isCheckingGovPub,
    isRefreshingAfterSubmit,
    submittedProposalHash,
    proposeFromOnchainPanel,
  };
}

function isUserRejectedRequest (error: unknown): boolean {
  const candidate = error as { code?: number; message?: string };
  const message = candidate?.message?.toLowerCase() || '';

  return candidate?.code === 4001 ||
    message.includes('user rejected') ||
    message.includes('user denied');
}
