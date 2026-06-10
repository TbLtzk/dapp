import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useWeb3Context } from 'context/Web3ContextProvider';

import useNetworkConfig from 'hooks/useNetworkConfig';

import {
  GovPubCapabilitySource,
  resolveGovPubCapabilities,
} from '../helpers/gov-pub-capabilities';
import { createGovPubProvider } from '../helpers/gov-pub-rpc';

export interface GovPubCapabilities {
  hasRpcUrl: boolean;
  capabilitySource: GovPubCapabilitySource;
  externalSubmissionEnabled: boolean | null;
  isExternalSubmissionDisabled: boolean;
  isRootListSigningAvailable: boolean | null;
  isExclusionListSigningAvailable: boolean | null;
  qgovTypedRelayVersion: number | null;
  isChecking: boolean;
}

const GovPubCapabilitiesContext = createContext<GovPubCapabilities | null>(null);

const idleCapabilities: GovPubCapabilities = {
  hasRpcUrl: false,
  capabilitySource: 'idle',
  externalSubmissionEnabled: null,
  isExternalSubmissionDisabled: false,
  isRootListSigningAvailable: null,
  isExclusionListSigningAvailable: null,
  qgovTypedRelayVersion: null,
  isChecking: false,
};

export function GovPubCapabilitiesProvider ({ children }: { children: ReactNode }) {
  const value = useGovPubCapabilitiesState();

  return (
    <GovPubCapabilitiesContext.Provider value={value}>
      {children}
    </GovPubCapabilitiesContext.Provider>
  );
}

export function useGovPubCapabilitiesContext (): GovPubCapabilities {
  const context = useContext(GovPubCapabilitiesContext);

  if (!context) {
    throw new Error('useGovPubCapabilitiesContext must be used within GovPubCapabilitiesProvider');
  }

  return context;
}

function useGovPubCapabilitiesState (): GovPubCapabilities {
  const { rpcUrl } = useNetworkConfig();
  const { isConnected } = useWeb3Context();

  const hasRpcUrl = Boolean(rpcUrl);

  const govPubProvider = useMemo(
    () => (rpcUrl ? createGovPubProvider(rpcUrl) : null),
    [rpcUrl],
  );

  const [resolved, setResolved] = useState<Omit<GovPubCapabilities, 'hasRpcUrl'>>({
    capabilitySource: 'idle',
    externalSubmissionEnabled: null,
    isExternalSubmissionDisabled: false,
    isRootListSigningAvailable: null,
    isExclusionListSigningAvailable: null,
    qgovTypedRelayVersion: null,
    isChecking: false,
  });

  useEffect(() => {
    let isMounted = true;

    async function loadCapabilities () {
      if (!govPubProvider || !isConnected) {
        if (isMounted) {
          setResolved({
            capabilitySource: 'idle',
            externalSubmissionEnabled: null,
            isExternalSubmissionDisabled: false,
            isRootListSigningAvailable: null,
            isExclusionListSigningAvailable: null,
            qgovTypedRelayVersion: null,
            isChecking: false,
          });
        }
        return;
      }

      setResolved((current) => ({
        ...current,
        isChecking: true,
      }));

      try {
        const next = await resolveGovPubCapabilities(govPubProvider);
        if (isMounted) {
          setResolved({
            capabilitySource: next.source,
            externalSubmissionEnabled: next.externalSubmissionEnabled,
            isExternalSubmissionDisabled: next.isExternalSubmissionDisabled,
            isRootListSigningAvailable: next.isRootListSigningAvailable,
            isExclusionListSigningAvailable: next.isExclusionListSigningAvailable,
            qgovTypedRelayVersion: next.qgovTypedRelayVersion,
            isChecking: false,
          });
        }
      } catch {
        if (isMounted) {
          setResolved({
            capabilitySource: 'probe',
            externalSubmissionEnabled: null,
            isExternalSubmissionDisabled: false,
            isRootListSigningAvailable: false,
            isExclusionListSigningAvailable: false,
            qgovTypedRelayVersion: null,
            isChecking: false,
          });
        }
      }
    }

    loadCapabilities();

    return () => {
      isMounted = false;
    };
  }, [govPubProvider, isConnected]);

  return useMemo(
    () => ({
      hasRpcUrl,
      ...resolved,
    }),
    [hasRpcUrl, resolved],
  );
}

export { idleCapabilities };
