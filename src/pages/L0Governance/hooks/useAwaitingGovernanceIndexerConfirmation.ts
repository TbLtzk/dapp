import { useCallback, useEffect, useState } from 'react';

import { useWeb3Context } from 'context/Web3ContextProvider';

import {
  hasPendingAttestation,
  L0GovernanceSubmitAction,
  PendingAttestation,
  removePendingAttestation,
  removePendingAttestationsForWallet,
} from '../helpers/pending-attestation-store';

import { useL0GovernanceEligibility } from './L0GovernanceEligibilityContext';

export function useAwaitingGovernanceIndexerConfirmation (
  action: L0GovernanceSubmitAction,
) {
  const { chainId } = useWeb3Context();
  const { signingAddress } = useL0GovernanceEligibility();
  const walletAddress = signingAddress;

  const [isAwaiting, setIsAwaiting] = useState(() => (
    Boolean(chainId && walletAddress && hasPendingAttestation(chainId, walletAddress, action))
  ));

  useEffect(() => {
    setIsAwaiting(Boolean(
      chainId && walletAddress && hasPendingAttestation(chainId, walletAddress, action),
    ));
  }, [action, chainId, walletAddress]);

  const markAwaiting = useCallback((_: PendingAttestation) => {
    if (!chainId) {
      return;
    }

    setIsAwaiting(true);
  }, [chainId]);

  const clearAwaiting = useCallback((attestationHash?: string) => {
    if (!chainId) {
      return;
    }

    if (attestationHash) {
      removePendingAttestation(chainId, attestationHash);
    } else if (walletAddress) {
      removePendingAttestationsForWallet(chainId, walletAddress, action);
    }

    setIsAwaiting(false);
  }, [action, chainId, walletAddress]);

  return {
    isAwaiting,
    markAwaiting,
    clearAwaiting,
  };
}
