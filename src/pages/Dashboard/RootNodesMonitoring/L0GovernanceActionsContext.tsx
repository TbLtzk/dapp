import { createContext, ReactNode, useContext, useMemo } from 'react';

import { GovPubCapabilitiesProvider } from 'pages/L0Governance/hooks/GovPubCapabilitiesContext';
import { useCosignProposedExclusionList } from 'pages/L0Governance/hooks/useCosignProposedExclusionList';
import { useCosignProposedRootList } from 'pages/L0Governance/hooks/useCosignProposedRootList';
import { useProposeOnchainPanelRootList } from 'pages/L0Governance/hooks/useProposeOnchainPanelRootList';

interface L0GovernanceActionsContextValue {
  proposeRootList: ReturnType<typeof useProposeOnchainPanelRootList>;
  cosignRootList: ReturnType<typeof useCosignProposedRootList>;
  cosignExclusionList: ReturnType<typeof useCosignProposedExclusionList>;
}

const L0GovernanceActionsContext = createContext<L0GovernanceActionsContextValue | null>(null);

export function L0GovernanceActionsProvider ({ children }: { children: ReactNode }) {
  return (
    <GovPubCapabilitiesProvider>
      <L0GovernanceActionsProviderInner>
        {children}
      </L0GovernanceActionsProviderInner>
    </GovPubCapabilitiesProvider>
  );
}

function L0GovernanceActionsProviderInner ({ children }: { children: ReactNode }) {
  const proposeRootList = useProposeOnchainPanelRootList();
  const cosignRootList = useCosignProposedRootList();
  const cosignExclusionList = useCosignProposedExclusionList();

  const value = useMemo(
    () => ({ proposeRootList, cosignRootList, cosignExclusionList }),
    [proposeRootList, cosignRootList, cosignExclusionList],
  );

  return (
    <L0GovernanceActionsContext.Provider value={value}>
      {children}
    </L0GovernanceActionsContext.Provider>
  );
}

export function useL0GovernanceActions (): L0GovernanceActionsContextValue {
  const context = useContext(L0GovernanceActionsContext);

  if (!context) {
    throw new Error('useL0GovernanceActions must be used within L0GovernanceActionsProvider');
  }

  return context;
}
