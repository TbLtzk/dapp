import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { AliasPurpose, L0RootListItem } from '@q-dev/q-js-sdk';
import { useWeb3Context } from 'context/Web3ContextProvider';
import { ethers, providers } from 'ethers';
import { ErrorHandler } from 'helpers';
import { getRootNodesL0 } from 'helpers/root-node-metrics';

import useNetworkConfig from 'hooks/useNetworkConfig';

import {
  isAddressAmongAccounts,
  isSameAddress,
  resolveSigningAddress,
} from '../helpers/l0-governance-signing';

import { useGovPubCapabilitiesContext } from './GovPubCapabilitiesContext';

import { getAliasMap } from 'contracts/helpers/aliases-helper';

export type L0GovernanceEligibilityStatus =
  | 'loading'
  | 'disconnected'
  | 'wrong-network'
  | 'eligible'
  | 'signing-unavailable'
  | 'read-only';

export interface L0GovernanceEligibility {
  status: L0GovernanceEligibilityStatus;
  rootAccount?: string;
  aliasAccount?: string | null;
  signingAddress?: string;
  connectedAddress?: string;
  isSigningAddressAvailable: boolean;
  aliasSigningRequired: boolean | null;
}

const idleEligibility: L0GovernanceEligibility = {
  status: 'disconnected',
  isSigningAddressAvailable: false,
  aliasSigningRequired: null,
};

const L0GovernanceEligibilityContext = createContext<L0GovernanceEligibility | null>(null);

export function L0GovernanceEligibilityProvider ({ children }: { children: ReactNode }) {
  const value = useL0GovernanceEligibilityState();

  return (
    <L0GovernanceEligibilityContext.Provider value={value}>
      {children}
    </L0GovernanceEligibilityContext.Provider>
  );
}

export function useL0GovernanceEligibility (): L0GovernanceEligibility {
  const context = useContext(L0GovernanceEligibilityContext);

  if (!context) {
    throw new Error('useL0GovernanceEligibility must be used within L0GovernanceEligibilityProvider');
  }

  return context;
}

export function isGovernanceOperatorEligible (
  status: L0GovernanceEligibilityStatus,
): boolean {
  return status === 'eligible' || status === 'signing-unavailable';
}

function useL0GovernanceEligibilityState (): L0GovernanceEligibility {
  const { address, chainId, currentProvider, isConnected, isRightNetwork } = useWeb3Context();
  const { indexerUrl } = useNetworkConfig();
  const { aliasSigningRequired } = useGovPubCapabilitiesContext();

  const [isL0ActiveLoading, setIsL0ActiveLoading] = useState(true);
  const [rootNodesL0Active, setRootNodesL0Active] = useState<L0RootListItem | null>(null);
  const [l0RootAliasesMap, setL0RootAliasesMap] = useState<Record<string, string>>({});
  const [walletAccounts, setWalletAccounts] = useState<string[]>([]);

  useEffect(() => {
    let isMounted = true;

    async function loadRootNodesL0Active () {
      setIsL0ActiveLoading(true);

      try {
        const activeList = await getRootNodesL0(indexerUrl, 'active');
        if (!isMounted) return;
        setRootNodesL0Active(activeList);

        const activeRoots = activeList?.roots || [];
        const rootAccounts = activeRoots.map(({ mainAccount }) => mainAccount);

        if (!rootAccounts.length) {
          setL0RootAliasesMap({});
          return;
        }

        const aliasesMap = await getAliasMap(
          rootAccounts,
          Number(chainId),
          AliasPurpose.ROOT_NODE_OPERATION,
        );

        if (!isMounted) return;
        setL0RootAliasesMap(aliasesMap);
      } catch (error) {
        if (!isMounted) return;
        setRootNodesL0Active(null);
        setL0RootAliasesMap({});
        ErrorHandler.processWithoutFeedback(error);
      } finally {
        if (isMounted) {
          setIsL0ActiveLoading(false);
        }
      }
    }

    loadRootNodesL0Active();
    return () => {
      isMounted = false;
    };
  }, [chainId, indexerUrl]);

  useEffect(() => {
    let isMounted = true;

    async function loadWalletAccounts () {
      if (!isConnected || !currentProvider || !(currentProvider instanceof providers.Web3Provider)) {
        if (isMounted) {
          setWalletAccounts([]);
        }
        return;
      }

      try {
        const accounts = await currentProvider.listAccounts();
        if (isMounted) {
          setWalletAccounts(accounts);
        }
      } catch {
        if (isMounted) {
          setWalletAccounts(address ? [address] : []);
        }
      }
    }

    loadWalletAccounts();
    return () => {
      isMounted = false;
    };
  }, [address, currentProvider, isConnected]);

  return useMemo(() => {
    if (!isConnected || !address) {
      return {
        ...idleEligibility,
        status: 'disconnected',
        aliasSigningRequired,
      };
    }

    if (!isRightNetwork) {
      return {
        ...idleEligibility,
        status: 'wrong-network',
        connectedAddress: ethers.utils.getAddress(address),
        aliasSigningRequired,
      };
    }

    if (isL0ActiveLoading) {
      return {
        ...idleEligibility,
        status: 'loading',
        connectedAddress: ethers.utils.getAddress(address),
        aliasSigningRequired,
      };
    }

    const connectedAddress = ethers.utils.getAddress(address);
    const activeRoots = rootNodesL0Active?.roots || [];

    const matchedRoot = activeRoots.find(({ mainAccount }) => {
      const aliasAccount = l0RootAliasesMap[mainAccount] || null;

      return isSameAddress(mainAccount, connectedAddress) ||
        (aliasAccount && isSameAddress(aliasAccount, connectedAddress));
    });

    if (!matchedRoot) {
      return {
        status: 'read-only',
        connectedAddress,
        isSigningAddressAvailable: false,
        aliasSigningRequired,
      };
    }

    const rootAccount = ethers.utils.getAddress(matchedRoot.mainAccount);
    const aliasAccount = l0RootAliasesMap[matchedRoot.mainAccount] || null;
    const signingAddress = resolveSigningAddress(rootAccount, aliasAccount);
    const isSigningAddressAvailable = isAddressAmongAccounts(signingAddress, walletAccounts);

    if (!isSigningAddressAvailable) {
      return {
        status: 'signing-unavailable',
        rootAccount,
        aliasAccount,
        signingAddress,
        connectedAddress,
        isSigningAddressAvailable: false,
        aliasSigningRequired,
      };
    }

    return {
      status: 'eligible',
      rootAccount,
      aliasAccount,
      signingAddress,
      connectedAddress,
      isSigningAddressAvailable: true,
      aliasSigningRequired,
    };
  }, [
    address,
    aliasSigningRequired,
    isConnected,
    isL0ActiveLoading,
    isRightNetwork,
    l0RootAliasesMap,
    rootNodesL0Active,
    walletAccounts,
  ]);
}
