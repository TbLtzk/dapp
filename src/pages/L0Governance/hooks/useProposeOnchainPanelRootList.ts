import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useWeb3Context } from 'context/Web3ContextProvider';
import { ethers } from 'ethers';
import { ErrorHandler } from 'helpers';

import useNetworkConfig from 'hooks/useNetworkConfig';

import {
  createGovPubProvider,
  extractRpcErrorMessage,
  fetchSigningPayloadRootListV1WithDigest,
  rootListFromSigningPayload,
  submitTypedSignedRootList,
} from '../helpers/gov-pub-rpc';
import { buildProposalTimestamp, computeRootListHash } from '../helpers/root-list-hash';
import { signRootListGovernancePayload } from '../helpers/sign-governance-typed-data';
import { GovPubRootList } from '../helpers/types';

import { useGovPubCapabilitiesContext } from './GovPubCapabilitiesContext';

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
  submittedProposalHash: string | null;
  proposeFromOnchainPanel: () => Promise<void>;
}

export function useProposeOnchainPanelRootList (): UseProposeOnchainPanelRootListResult {
  const { t } = useTranslation();
  const { rpcUrl } = useNetworkConfig();
  const { currentSigner } = useWeb3Context();

  const {
    isRootListSigningAvailable: isGovPubAvailable,
    isChecking: isCheckingGovPub,
  } = useGovPubCapabilitiesContext();

  const [phase, setPhase] = useState<ProposeOnchainPanelPhase>('idle');
  const [submittedProposalHash, setSubmittedProposalHash] = useState<string | null>(null);

  const govPubProvider = useMemo(
    () => (rpcUrl ? createGovPubProvider(rpcUrl) : null),
    [rpcUrl],
  );

  const proposeFromOnchainPanel = useCallback(async () => {
    if (!currentSigner || !govPubProvider) {
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
      const rootNodesContract = await getRootNodesInstance();
      const panelMembers: string[] = await rootNodesContract.getMembers();

      if (!panelMembers.length) {
        throw new Error(t('L0_PROPOSE_EMPTY_PANEL'));
      }

      const timestamp = buildProposalTimestamp();
      const nodes = panelMembers.map((member) => ethers.utils.getAddress(member));
      const hash = computeRootListHash(timestamp, nodes);

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
      Bus.success({
        title: t('L0_PROPOSE_SUCCESS_TITLE'),
        message: t('L0_PROPOSE_SUCCESS_MESSAGE'),
      });
    } catch (error) {
      setPhase('idle');

      if (isUserRejectedRequest(error)) {
        ErrorHandler.process(error, t('L0_PROPOSE_SIGN_REJECTED'));
        return;
      }

      const rpcMessage = extractRpcErrorMessage(error);
      ErrorHandler.process(error, rpcMessage || t('L0_PROPOSE_FAILED'));
    }
  }, [currentSigner, govPubProvider, isGovPubAvailable, t]);

  return {
    phase,
    isGovPubAvailable,
    isCheckingGovPub,
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
