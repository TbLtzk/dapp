import { useCallback, useEffect, useState } from 'react';

import { useWeb3Context } from 'context/Web3ContextProvider';

import {
  hasPendingAttestation,
  L0GovernanceSubmitAction,
  PendingAttestation,
  removePendingAttestation,
  removePendingAttestationsForWallet,
} from '../helpers/pending-attestation-store';

export function useAwaitingGovernanceIndexerConfirmation (
  action: L0GovernanceSubmitAction,
) {
  const { address, chainId } = useWeb3Context();

  const [isAwaiting, setIsAwaiting] = useState(() => (
    Boolean(chainId && address && hasPendingAttestation(chainId, address, action))
  ));

  useEffect(() => {
    setIsAwaiting(Boolean(
      chainId && address && hasPendingAttestation(chainId, address, action),
    ));
  }, [action, address, chainId]);

  const markAwaiting = useCallback((entry: PendingAttestation) => {
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
    } else if (address) {
      removePendingAttestationsForWallet(chainId, address, action);
    }

    setIsAwaiting(false);
  }, [action, address, chainId]);

  return {
    isAwaiting,
    markAwaiting,
    clearAwaiting,
  };
}
