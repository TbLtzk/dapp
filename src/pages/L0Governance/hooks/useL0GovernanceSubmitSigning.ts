import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useWeb3Context } from 'context/Web3ContextProvider';
import { providers, Signer } from 'ethers';
import { ErrorHandler } from 'helpers';

import {
  getGovernanceSigningSigner,
  isUserRejectedSigningRequest,
  mapGovernanceSubmitError,
} from '../helpers/l0-governance-signing';

import { useL0GovernanceEligibility } from './L0GovernanceEligibilityContext';

interface UseL0GovernanceSubmitSigningResult {
  signingAddress?: string;
  canSign: boolean;
  requireSigningSigner: () => Promise<Signer | null>;
  processSubmitError: (error: unknown, fallbackMessage: string) => void;
}

export function useL0GovernanceSubmitSigning (): UseL0GovernanceSubmitSigningResult {
  const { t } = useTranslation();
  const { currentProvider } = useWeb3Context();
  const {
    signingAddress,
    isSigningAddressAvailable,
    status,
  } = useL0GovernanceEligibility();

  const canSign = status === 'eligible' && isSigningAddressAvailable && Boolean(signingAddress);

  const requireSigningSigner = useCallback(async () => {
    if (!currentProvider || !(currentProvider instanceof providers.Web3Provider)) {
      ErrorHandler.process(new Error('Wallet not connected'), t('L0_SIGNING_ADDRESS_UNAVAILABLE'));
      return null;
    }

    if (!signingAddress || !isSigningAddressAvailable) {
      ErrorHandler.process(new Error('Signing address unavailable'), t('L0_SIGNING_ADDRESS_UNAVAILABLE'));
      return null;
    }

    try {
      return await getGovernanceSigningSigner(currentProvider, signingAddress);
    } catch (error) {
      ErrorHandler.process(error, t('L0_SIGNING_ADDRESS_UNAVAILABLE'));
      return null;
    }
  }, [currentProvider, isSigningAddressAvailable, signingAddress, t]);

  const processSubmitError = useCallback((error: unknown, fallbackMessage: string) => {
    if (isUserRejectedSigningRequest(error)) {
      ErrorHandler.process(error, t('L0_PROPOSE_SIGN_REJECTED'));
      return;
    }

    const candidate = error as { message?: string };
    const message = candidate?.message || fallbackMessage;
    ErrorHandler.process(error, mapGovernanceSubmitError(message, t) || fallbackMessage);
  }, [t]);

  return {
    signingAddress,
    canSign,
    requireSigningSigner,
    processSubmitError,
  };
}
